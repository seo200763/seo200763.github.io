/* =====================================================================
   mamegame.js — '마메게임' 공통 코드  (desktop / mobile / classic 이 함께 사용)

   · 게임 목록 : MAME/ 폴더에 롬(zip)을 올리면 목록에 자동으로 나타납니다.
                (GitHub Pages 는 폴더 안 파일을 직접 볼 수 없어서 GitHub 파일 목록을 읽어 오고,
                 읽지 못하면 MAME/games.json 을 대신 사용합니다.)
   · 바이오스  : MAME/_bios/neogeo.zip 을 자동으로 사용합니다.
                네오지오 게임은 게임 zip 에 바이오스를 자동으로 합쳐서 실행합니다.
   · 엔진(코어): FinalBurn Neo → MAME 2003-Plus 순서로 시도하고,
                게임이 시작되기 전에 오류가 나면 다른 코어로 다시 시작합니다. 한 번 시작된 뒤에는 자동으로 바꾸지 않으며, 화면 위 '코어' 버튼으로 수동 변경할 수 있습니다.
   · 내 기기의 롬(zip)을 직접 불러와도 같은 방식으로 실행됩니다.

   [2026.11.11 확장] 모든 기종 공통 '서버 롬 목록'
   · ROMS/<기종폴더>/ 에 롬을 올리면 해당 기종 화면의 게임 목록에 자동으로 나타나고,
     목록에서 누르면 서버에서 받아 바로 실행합니다. (마메게임만 기존 MAME/ 폴더 사용)
   · 목록 읽기 순서: GitHub 파일 목록(API) → ROMS/list.json (GitHub Actions 가 자동 생성)
   · 한글 게임 이름은 ROMS/titles.json 에 적으면 됩니다. (ROMS/README.txt 참고)
   ===================================================================== */
(function(){
'use strict';
var DIR='MAME/',BIOSDIR='MAME/_bios/',BIOSZIP='neogeo.zip';
var CN={fbneo:'FinalBurn Neo',mame2003_plus:'MAME 2003-Plus',mame2003:'MAME 2003',arcade:'FinalBurn Neo'};
/* 게임 이름 기본값 (MAME/games.json 의 title 이 있으면 그것이 우선) */
var TITLES={kof98:'킹 오브 파이터98',kof96:'킹 오브 파이터96',mslug:'메탈슬러그',raiden:'라이덴',tektagt:'철권태그',outrun:'아웃런',twcup90:'테크모 월드컵 90'};
var FAIL_RE=/missing files for THIS VERSION|ROM with name .* is missing|failed to load content|unable to load content|romset .*(missing|not found)/i;

function isRom(n){return /\.(zip|7z)$/i.test(n||'')}
function baseName(n){return String(n||'').replace(/\.[^.]+$/,'')}
function abs(u){try{return new URL(u,location.href).href}catch(e){return u}}
function say(m){try{if(typeof toast==='function')toast(m);else alert(m)}catch(e){}}
function readBuf(f){
 if(f.arrayBuffer)return f.arrayBuffer();
 return new Promise(function(res,rej){var r=new FileReader();r.onload=function(){res(r.result)};r.onerror=function(){rej(r.error)};r.readAsArrayBuffer(f)});
}
function fmtSize(n){return n>=1048576?(n/1048576).toFixed(n>=10485760?0:1)+'MB':n>=1024?Math.round(n/1024)+'KB':''}

/* ---------------------------------------------------------------------
   게임 목록
   --------------------------------------------------------------------- */
/* 기종별 서버 롬 폴더 (마메게임은 기존 MAME/ 폴더 그대로) */
var ROOT='ROMS/';
var FOLDER={atari2600:'ATARI2600',nes:'NES',sms:'MASTERSYSTEM',pce:'PCENGINE',md:'MEGADRIVE',gb:'GAMEBOY',lynx:'LYNX',snes:'SNES',gg:'GAMEGEAR',segacd:'SEGACD','3do':'3DO',jaguar:'JAGUAR',psx:'PLAYSTATION',saturn:'SEGASATURN',s32x:'SEGA32X',vb:'VIRTUALBOY',n64:'NINTENDO64',ngp:'NEOGEOPOCKET',gbc:'GAMEBOYCOLOR',gba:'GAMEBOYADVANCE',nds:'NINTENDODS'};
var CDSYS={psx:1,segacd:1,'3do':1,saturn:1};   /* CD 기종: .cue/.bin/.m3u 단독 파일은 목록에서 제외 (zip·chd·iso 사용) */
function isMame(c){return!!c&&c.id==='mamegame'}
function dirOf(c){if(!c)return null;if(isMame(c))return DIR;var f=FOLDER[c.id];return f?ROOT+f+'/':null}
function dirName(dir){return String(dir||'').replace(/^ROMS\//,'').replace(/\/$/,'')}
function romTest(c){
 if(isMame(c))return isRom;
 var a=String(c.x||'').split(/\s+/).filter(Boolean).map(function(x){return x.replace(/^\./,'').toLowerCase()});
 if(CDSYS[c.id])a=a.filter(function(e){return!/^(cue|bin|m3u)$/.test(e)});
 return function(n){var m=/\.([^.\/]+)$/.exec(n||'');return!!m&&a.indexOf(m[1].toLowerCase())>=0};
}

var lists={},idxP=null,titP=null;
function ghRepo(){
 var h=location.hostname,p=location.pathname.split('/').filter(Boolean);
 if(!/\.github\.io$/i.test(h))return null;
 var owner=h.split('.')[0];
 /* 개인 사이트(owner.github.io)는 저장소 이름이 도메인과 같고, 프로젝트 사이트는 첫 경로가 저장소 이름 */
 var repo=(p.length&&!/\.[a-z0-9]+$/i.test(p[0]))?p[0]:h;
 return owner+'/'+repo;
}
function viaApi(dir,ok){
 var r=ghRepo();if(!r)return Promise.reject(0);
 var key='mg.list.'+r+'.'+dir,c=null;
 try{c=JSON.parse(sessionStorage.getItem(key)||'null')}catch(e){}
 if(c&&Date.now()-c.t<600000)return Promise.resolve(c.v);
 return fetch('https://api.github.com/repos/'+r+'/contents/'+dir.replace(/\/$/,''),{headers:{Accept:'application/vnd.github+json'}})
  .then(function(res){if(!res.ok)throw 0;return res.json()})
  .then(function(arr){
   if(!Array.isArray(arr))throw 0;
   var v=arr.filter(function(f){return f.type==='file'&&ok(f.name)}).map(function(f){return{file:f.name,size:f.size||0}});
   try{sessionStorage.setItem(key,JSON.stringify({t:Date.now(),v:v}))}catch(e){}
   return v;
  });
}
/* MAME/games.json (마메게임 전용: 목록 + 한글 이름) */
function viaJson(){
 return fetch(DIR+'games.json?t='+Date.now(),{cache:'no-store'})
  .then(function(r){if(!r.ok)throw 0;return r.json()})
  .then(function(j){
   var a=Array.isArray(j)?j:(j&&j.games)||[];
   return a.map(function(g){return typeof g==='string'?{file:g}:g}).filter(function(g){return g&&g.file&&isRom(g.file)});
  });
}
/* ROMS/list.json (GitHub Actions 가 만든 전체 목록) — API 가 막혔을 때 대신 사용 */
function viaIndex(dir,ok){
 if(!idxP)idxP=fetch(ROOT+'list.json?t='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()});
 return idxP.then(function(j){
  var a=(j&&j[dirName(dir)])||[];
  if(!Array.isArray(a))throw 0;
  return a.map(function(g){return typeof g==='string'?{file:g}:g}).filter(function(g){return g&&g.file&&ok(g.file)});
 });
}
/* ROMS/titles.json — {"NES":{"mario.nes":"슈퍼 마리오"}} 형태의 한글 이름표 (없어도 됨) */
function viaTitles(){
 if(!titP)titP=fetch(ROOT+'titles.json?t='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()});
 return titP;
}
function titleOf(file,given,mame){
 if(given)return given;
 var b=baseName(file);
 if(mame){var t=TITLES[b.toLowerCase()];if(t)return t}
 return b.replace(/[_]+/g,' ');
}
function loadList(c,force){
 var dir=dirOf(c);
 if(!dir)return Promise.resolve({items:[],known:false,dir:null});
 if(lists[dir]&&!force)return lists[dir];
 if(force){
  try{var r=ghRepo();if(r)sessionStorage.removeItem('mg.list.'+r+'.'+dir)}catch(e){}
  if(!isMame(c)){idxP=null;titP=null}
 }
 var ok=romTest(c),mame=isMame(c);
 lists[dir]=Promise.all([
  viaApi(dir,ok).catch(function(){return null}),
  (mame?viaJson():viaIndex(dir,ok)).catch(function(){return null}),
  (mame?Promise.resolve(null):viaTitles()).catch(function(){return null})
 ]).then(function(r){
  var api=r[0],js=r[1],tt=r[2]||{},given={};
  if(mame){(js||[]).forEach(function(g){given[g.file.toLowerCase()]=g})}
  else{var m=tt[dirName(dir)]||{};Object.keys(m).forEach(function(k){given[k.toLowerCase()]={title:m[k]}})}
  var base=api||js||[];
  var items=base.map(function(g){
   var j=given[g.file.toLowerCase()]||{};
   return{file:g.file,size:g.size||j.size||0,title:titleOf(g.file,j.title,mame)};
  });
  items.sort(function(a,b){return a.title.localeCompare(b.title,'ko')});
  return{items:items,known:!!(api||js),dir:dir};
 });
 return lists[dir];
}

/* ---------------------------------------------------------------------
   롬 내려받기 (진행률 표시)
   --------------------------------------------------------------------- */
function fetchBlob(url,prog,dir){
 return fetch(url).then(function(r){
  if(!r.ok)throw new Error(r.status===404?String(dir||'').replace(/\/$/,'')+' 폴더에서 롬 파일을 찾지 못했어요\n(방금 올렸다면 1~2분 뒤 다시 시도해 주세요)':'서버 오류 ('+r.status+')');
  var tot=+r.headers.get('content-length')||0;
  if(!r.body||!r.body.getReader)return r.blob();
  var rd=r.body.getReader(),parts=[],got=0;
  return(function pump(){
   return rd.read().then(function(x){
    if(x.done)return new Blob(parts);
    parts.push(x.value);got+=x.value.length;
    if(prog)prog(got,tot);
    return pump();
   });
  })();
 });
}

/* ---------------------------------------------------------------------
   네오지오 바이오스 합치기 (게임 zip 뒤에 바이오스 zip 구조를 이어 붙임 — 다시 압축하지 않아 빠름)
   --------------------------------------------------------------------- */
var biosP=null;
function biosInfo(){
 if(biosP)return biosP;
 biosP=fetch(BIOSDIR+BIOSZIP).then(function(r){if(!r.ok)throw 0;return r.arrayBuffer()})
  .then(function(buf){return{url:abs(BIOSDIR+BIOSZIP),buf:buf}})
  .catch(function(){return null});
 return biosP;
}
function parseZip(buf){
 var dv=new DataView(buf),u8=new Uint8Array(buf),size=buf.byteLength;
 var from=Math.max(0,size-70000),e=-1,i;
 for(i=size-22;i>=from;i--){if(dv.getUint32(i,true)===0x06054b50){e=i;break}}
 if(e<0)return null;
 var n=dv.getUint16(e+10,true),sz=dv.getUint32(e+12,true),off=dv.getUint32(e+16,true);
 if(n===0xFFFF||off===0xFFFFFFFF||off+sz>size)return null;
 var ents=[],p=off,dec=new TextDecoder(),k;
 for(k=0;k<n&&p+46<=off+sz;k++){
  if(dv.getUint32(p,true)!==0x02014b50)break;
  var nl=dv.getUint16(p+28,true),el=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),len=46+nl+el+cl;
  ents.push({name:dec.decode(u8.subarray(p+46,p+46+nl)),raw:u8.slice(p,p+len)});
  p+=len;
 }
 return{off:off,ents:ents,u8:u8};
}
function bn(n){return String(n||'').split('/').pop().toLowerCase()}
function merge(gameBuf,biosBuf){
 var g=parseZip(gameBuf),b=parseZip(biosBuf);
 if(!g||!b)return null;
 var neo=0,have={},re=/^\d{3}-[cpmsv]\d?[a-z]?\d*\.[a-z]+\d*$/;
 g.ents.forEach(function(e){var x=bn(e.name);have[x]=true;if(re.test(x))neo++});
 /* 네오지오 롬셋이 아니거나, 이미 바이오스 파일이 들어 있으면 합치지 않음 */
 if(neo<3||have['sm1.sm1']||have['sfix.sfix'])return null;
 var cds=[],total=0,n=g.ents.length,added=0;
 g.ents.forEach(function(e){cds.push(e.raw);total+=e.raw.length});
 b.ents.forEach(function(e){
  if(have[bn(e.name)])return;
  var raw=e.raw.slice(0),dv=new DataView(raw.buffer);
  dv.setUint32(42,dv.getUint32(42,true)+g.off,true);
  cds.push(raw);total+=raw.length;n++;added++;
 });
 if(!added||n>65000)return null;
 var eocd=new Uint8Array(22),ev=new DataView(eocd.buffer);
 ev.setUint32(0,0x06054b50,true);ev.setUint16(8,n,true);ev.setUint16(10,n,true);
 ev.setUint32(12,total,true);ev.setUint32(16,g.off+b.off,true);
 return new Blob([g.u8.subarray(0,g.off),b.u8.subarray(0,b.off)].concat(cds).concat([eocd]),{type:'application/zip'});
}

/* ---------------------------------------------------------------------
   실행 준비: 롬 zip → (네오지오면 바이오스 합침) + 코어에 넘길 바이오스 목록(file.mgBios)
   --------------------------------------------------------------------- */
function prepare(file){
 return biosInfo().then(function(bi){
  if(!bi){file.mgBios=[];return file}
  var done=function(f){f.mgBios=[{name:BIOSZIP,url:bi.url}];return f};
  if(!/\.zip$/i.test(file.name))return done(file);
  return readBuf(file).then(function(gb){
   var m=null;try{m=merge(gb,bi.buf)}catch(e){}
   return done(m?new File([m],file.name,{type:'application/zip'}):file);
  });
 });
}

/* ---------------------------------------------------------------------
   게임이 안 뜰 때 다른 코어로 자동 전환 (FBNeo ↔ MAME 2003-Plus)
   --------------------------------------------------------------------- */
var failHint=false;
function hook(w){
 failHint=false;
 try{
  ['log','info','warn','error'].forEach(function(k){
   var o=w.console[k];
   w.console[k]=function(){
    try{if(FAIL_RE.test(Array.prototype.join.call(arguments,' ')))failHint=true}catch(x){}
    return o.apply(w.console,arguments);
   };
  });
 }catch(e){}
}
function frameBad(w){
 return Promise.resolve().then(function(){return w.EJS_emulator.gameManager.screenshot()}).then(function(r){
  var blob=r instanceof Blob?r:(r&&r.byteLength>200?new Blob([r],{type:'image/png'}):null);
  if(!blob)return false;
  return createImageBitmap(blob).then(function(bm){
   var c=document.createElement('canvas');c.width=64;c.height=48;
   var x=c.getContext('2d');x.drawImage(bm,0,0,64,48);
   var d=x.getImageData(0,0,64,48).data,n=64*48,light=0,dark=0,i;
   for(i=0;i<d.length;i+=4){
    var r2=d[i],g=d[i+1],b=d[i+2];
    if(Math.abs(r2-g)<8&&Math.abs(g-b)<8){if(r2>=222&&r2<=252)light++;else if(r2>=28&&r2<=62)dark++}
   }
   return light/n>0.45||dark/n>0.45; /* 에러 화면(밝은 회색) 또는 레트로아크 메뉴(어두운 회색) */
  });
 }).catch(function(){return false});
}
/* alive(): 같은 게임이 계속 실행 중인지 / hasNext: 시도할 다음 코어가 있는지 / goNext(): 다음 코어로 재시작 / fail(msg): 모두 실패 */
function watch(w,alive,hasNext,goNext,fail){
 /* 게임이 한 번 시작(onStart)된 뒤에는 코어를 자동으로 바꾸지 않습니다.
    (화면 색 검사로 '실패'를 추측하면 정상 화면도 잘못 판단해 코어가 바뀌는 문제가 있었음)
    시작 전 오류로 인한 자동 전환은 각 html 의 onFail 에서 그대로 처리하고,
    화면이 안 나오면 화면 위 '🧩 코어' 버튼으로 직접 바꾸세요. */
}

/* ---------------------------------------------------------------------
   화면: 에뮬레이터 첫 화면(#drop) 안에 게임 목록을 붙임
   --------------------------------------------------------------------- */
function css(){
 if(document.getElementById('mgCss'))return;
 var s=document.createElement('style');s.id='mgCss';
 s.textContent=
 '#drop.mgOn{overflow-y:auto;justify-content:flex-start;-webkit-overflow-scrolling:touch}'+
 '#drop.mgOn>:first-child{margin-top:auto}#drop.mgOn>:last-child{margin-bottom:auto}'+
 '#drop.mgOn>*{flex:none}#drop.mgOn .big{width:min(22vw,84px)}'+
 '#mgBox{width:min(100%,520px);display:flex;flex-direction:column;gap:8px;text-align:left}'+
 '#mgBox .mgh{display:flex;align-items:center;gap:8px;color:var(--acc2,#f1d9a0);font:600 15px var(--sans,system-ui)}'+
 '#mgBox .mgh span{color:var(--mut,#8d8a80);font-weight:400;font-size:12.5px}'+
 '#mgBox .mgh #mgX{display:none}#drop.mgLive #mgBox .mgh #mgX{display:inline-block}'+
    '#mgBox .mgh #mgRef{margin-left:auto}#mgBox .mgh #mgX{margin-left:0}'+
    '#mgBox .mgh button{border:0;border-radius:14px;padding:5px 12px;background:rgba(255,255,255,.1);color:inherit;font:inherit;font-size:14px;cursor:pointer}'+
 '#mgQ{width:100%;box-sizing:border-box;height:40px;border:1px solid rgba(255,255,255,.16);border-radius:12px;padding:0 14px;background:rgba(255,255,255,.07);color:#fff;font:400 15px var(--sans,system-ui);outline:0}'+
 '#mgQ:focus{border-color:var(--acc,#d4af6a)}'+
 '#mgL{max-height:min(34vh,300px);overflow-y:auto;border-radius:14px;background:rgba(255,255,255,.05);-webkit-overflow-scrolling:touch}'+
 '#mgL .mgr{display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;padding:12px 14px;border:0;border-bottom:1px solid rgba(255,255,255,.08);background:none;color:#fff;font:500 15px var(--sans,system-ui);text-align:left;cursor:pointer}'+
 '#mgL .mgr:last-child{border-bottom:0}#mgL .mgr:hover,#mgL .mgr:active{background:rgba(255,255,255,.1)}'+
 '#mgL .mgr b{flex:1;font-weight:500;word-break:keep-all;overflow-wrap:anywhere}'+
 '#mgL .mgr small{color:var(--mut,#8d8a80);font-size:12px;flex:none}'+
 '#mgL .mgr i{flex:none;font-style:normal;color:var(--acc,#d4af6a);font-size:15px}'+
 '#mgL .mgn{padding:18px 14px;color:var(--mut,#8d8a80);font:400 13.5px/1.7 var(--sans,system-ui);text-align:center;white-space:pre-line}';
 document.head.appendChild(s);
}
var busy=false;

/* 서버에서 롬을 받아 File 로 돌려줌 (마메게임은 네오지오 바이오스까지 합쳐서) */
function download(c,g,prog){
 var dir=dirOf(c);
 return fetchBlob(dir+encodeURIComponent(g.file),prog,dir).then(function(blob){
  var f=new File([blob],g.file,{type:isMame(c)?'application/zip':(blob.type||'application/octet-stream')});
  return isMame(c)?prepare(f):f;
 });
}
function play(c,g){
 if(busy)return;busy=true;
 var has=function(n){return typeof window[n]==='function'};
 if(has('loadShow'))loadShow(g.title+' · 롬 내려받는 중',20,true);
 download(c,g,function(got,tot){
  if(has('loadProgress'))loadProgress(tot?Math.min(55,got/tot*55):20,'롬 내려받는 중… '+fmtSize(got)+(tot?' / '+fmtSize(tot):''));
 }).then(function(f){busy=false;startGame(f)})
 .catch(function(e){busy=false;if(has('loadHide'))loadHide();say('🕹️ '+((e&&e.message)||'롬을 불러오지 못했어요'))});
}
function mount(c){
 var d=document.getElementById('drop'),btn=document.getElementById('dBtn');
 if(!d||!btn)return;
 var old=document.getElementById('mgBox');if(old)old.remove();
 d.classList.remove('mgOn','mgLive');
 var p0=d.querySelector('p:not(#dExt)');
 if(btn.dataset.o!=null){btn.textContent=btn.dataset.o;delete btn.dataset.o}
 if(p0&&p0.dataset.o!=null){p0.textContent=p0.dataset.o;delete p0.dataset.o}
 var dir=dirOf(c);
 if(!dir)return;
 css();
 d.classList.add('mgOn');
 btn.dataset.o=btn.textContent;btn.textContent=isMame(c)?'📂 내 기기의 롬(zip) 불러오기':'📂 내 기기의 롬 불러오기';
 if(p0){p0.dataset.o=p0.textContent;p0.textContent='아래 서버 목록에서 게임을 고르거나, 내 기기의 롬 파일을 직접 불러올 수 있어요'}
 var box=document.createElement('div');box.id='mgBox';
 box.innerHTML='<div class="mgh"><b>🕹️ '+(isMame(c)?'마메게임':c.n)+' 게임 목록</b><span id="mgCnt"></span><button type="button" id="mgRef" title="목록 새로고침">↻</button><button type="button" id="mgX" title="닫고 게임으로 돌아가기">✕ 닫기</button></div>'+
  '<input id="mgQ" type="search" placeholder="게임 검색" autocomplete="off"><div id="mgL"><div class="mgn">목록을 불러오는 중…</div></div>';
 d.insertBefore(box,btn);
 var L=box.querySelector('#mgL'),Q=box.querySelector('#mgQ'),cnt=box.querySelector('#mgCnt'),data=null;
 function row(g){
  var b=document.createElement('button');b.type='button';b.className='mgr';
  var t=document.createElement('b');t.textContent=g.title;
  var s=document.createElement('small');s.textContent=fmtSize(g.size);
  var i=document.createElement('i');i.textContent='▶';
  b.appendChild(t);b.appendChild(s);b.appendChild(i);
  b.onclick=function(){play(c,g)};
  return b;
 }
 function render(){
  if(!data)return;
  var q=Q.value.trim().toLowerCase();
  var rows=data.items.filter(function(g){return!q||(g.title+' '+g.file).toLowerCase().indexOf(q)>=0});
  cnt.textContent='('+data.items.length+')';
  L.innerHTML='';
  if(!rows.length){
   var n=document.createElement('div');n.className='mgn';
   n.textContent=data.items.length?'검색 결과가 없어요':(data.known?dir.replace(/\/$/,'')+' 폴더에 롬을 올리면 여기에 나타나요.\n또는 아래 버튼으로 내 기기의 롬을 불러오세요.':'게임 목록을 불러오지 못했어요.\n아래 버튼으로 내 기기의 롬을 불러오세요.');
   L.appendChild(n);return;
  }
  rows.forEach(function(g){L.appendChild(row(g))});
 }
 function load(force){
  L.innerHTML='<div class="mgn">목록을 불러오는 중…</div>';
  loadList(c,force).then(function(r){data=r;render()});
 }
 Q.oninput=render;
 box.querySelector('#mgRef').onclick=function(){load(true)};
 box.querySelector('#mgX').onclick=function(){d.classList.add('hidden')};
 load(false);
}
/* 게임을 하는 중에 '게임 불러오기' 를 누르면 서버 목록을 다시 보여줌 (목록이 없으면 false → 파일 선택창) */
function show(){
 var d=document.getElementById('drop');
 if(!d||!document.getElementById('mgBox'))return false;
 if(d.classList.contains('hidden'))d.classList.add('mgLive');
 d.classList.remove('hidden');
 var l=document.getElementById('mgL');if(l)l.scrollTop=0;
 return true;
}

var MG=window.MG={
 is:isMame,
 hasList:function(c){return!!dirOf(c)},
 dirOf:dirOf,
 list:loadList,
 download:download,
 coreName:function(c){return CN[c]||c},
 isRom:isRom,
 mount:mount,
 show:show,
 prepare:prepare,
 hook:hook,
 watch:watch,
 hint:'위 목록에서 게임을 누르면 바로 실행돼요. 내 기기의 롬(zip)도 아래 버튼으로 불러올 수 있어요.\n네오지오 바이오스(neogeo.zip)는 자동으로 적용됩니다.'
};
})();
