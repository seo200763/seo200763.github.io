/* gamehub.js — 영호의 게임에뮬레이터 공용 모듈 (홈 / 목록 / 플레이어가 함께 사용)
   · SYS      : 지원 기종 10개 (폴더, 코어, 아이콘, 검색어)
   · listRoms : ROMS/<기종>/ 폴더의 게임 목록 (GitHub 파일 목록 → games.json → 폴더 목록 순서로 시도)
   · 즐겨찾기 / 설정 / 기기 구분(폰·태블릿·PC) */
(function(W){
'use strict';
var EJS='https://cdn.emulatorjs.org/stable/data/';
var SYS=[
 {id:'gba',n:'게임보이 어드밴스',s:'GBA',dir:['ROMS/GBA/'],core:'gba',fn:'GBA',a:'#7478ff',ext:'.gba .zip',kw:'게임보이 어드밴스 게임보이어드밴스 지비에이 닌텐도 gba gameboy advance nintendo'},
 {id:'nds',n:'닌텐도 DS',s:'NDS',dir:['ROMS/NDS/'],core:'desmume2015',alt:['melonds','desmume'],fn:'NINTENDODS',a:'#aab6c8',ext:'.nds .zip',kw:'닌텐도 디에스 듀얼스크린 닌텐도ds nds ds nintendo'},
 {id:'psx',n:'플레이스테이션',s:'PS1',dir:['ROMS/PSX/'],core:'psx',fn:'PLAYSTATION',a:'#7b8aa3',ext:'.chd .pbp .iso .bin .img .zip',kw:'플레이스테이션 플스 플레이 스테이션 소니 피에스원 ps1 psx playstation sony'},
 {id:'nes',n:'패미컴 (NES)',s:'NES',dir:['ROMS/NES/'],core:'nes',fn:'NES',a:'#f0384f',ext:'.nes .zip',kw:'패미컴 패미콤 닌텐도 엔이에스 패밀리 nes famicom nintendo'},
 {id:'mame',n:'마메 (아케이드)',s:'MAME',dir:['ROMS/MAME/','MAME/'],core:'fbneo',alt:['mame2003_plus'],fn:'MAMEGAME',a:'#ff7a1a',ext:'.zip .7z',kw:'마메 마메게임 오락실 아케이드 네오지오 철권 메탈슬러그 mame arcade neogeo'},
 {id:'sms',n:'세가 마스터 시스템',s:'SMS',dir:['ROMS/SMS/'],core:'segaMS',fn:'SEGAMS',a:'#2f6bff',ext:'.sms .zip',kw:'세가 마스터 시스템 마스터시스템 sega master system sms'},
 {id:'pce',n:'PC 엔진',s:'PCE',dir:['ROMS/PCE/'],core:'pce',fn:'PCENGINE',a:'#ffb020',ext:'.pce .zip',kw:'피씨엔진 pc엔진 엔진 nec pce pcengine'},
 {id:'dos',n:'MS-DOS',s:'DOS',os:1,href:'dos.html',a:'#9ca3af',kw:'도스 엠에스도스 마이크로소프트 dos msdos ms-dos 컴퓨터 pc'},
 {id:'win31',n:'Windows 3.1',s:'WIN3.1',os:1,dir:['ROMS/WIN31/'],href:'winlauncher.html?os=win31',a:'#3b82f6',kw:'윈도우 윈도우즈 윈도 윈도우3.1 마이크로소프트 windows win31 3.1 microsoft'},
 {id:'win95',n:'Windows 95',s:'WIN95',os:1,dir:['ROMS/WIN95/'],href:'winlauncher.html?os=win95',a:'#14b8a6',kw:'윈도우 윈도우즈 윈도 윈도우95 마이크로소프트 windows win95 95 microsoft'}
];
SYS.forEach(function(s){s.icon='assets/sys/'+s.id+'.png'});
function byId(id){for(var i=0;i<SYS.length;i++)if(SYS[i].id===id)return SYS[i];return null}

/* ---------- 저장소 (즐겨찾기 / 설정) ---------- */
function jget(k,d){try{var v=JSON.parse(localStorage.getItem(k)||'null');return v==null?d:v}catch(e){return d}}
function jset(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var fav={
 all:function(){var f=jget('yh.fav',{});return{sys:f.sys||[],games:f.games||[]}},
 has:function(t,k){return fav.all()[t].indexOf(k)>=0},
 toggle:function(t,k){var f=fav.all(),i=f[t].indexOf(k);if(i>=0)f[t].splice(i,1);else f[t].push(k);jset('yh.fav',f);return i<0}
};
var set={
 get:function(){var s=jget('yh.set',{});return{theme:s.theme||'purple',player:s.player||'auto'}},
 put:function(o){var s=set.get();for(var k in o)s[k]=o[k];jset('yh.set',s);return s}
};

/* ---------- 기기 구분: phone / tablet / pc ---------- */
function device(){
 var ua=navigator.userAgent||'',touch=(navigator.maxTouchPoints||0)>1;
 var ipad=/iPad/.test(ua)||(/Macintosh/.test(ua)&&touch);
 if(/iPhone|iPod/.test(ua)||(/Android/.test(ua)&&/Mobile/.test(ua)))return'phone';
 if(ipad||(/Android/.test(ua)&&!/Mobile/.test(ua)))return'tablet';
 return touch&&Math.min(screen.width,screen.height)<600?'phone':'pc';
}
function playerPage(){
 var p=set.get().player;
 if(p==='phone')return'mplay.html';if(p==='pc')return'pcplay.html';
 return device()==='phone'?'mplay.html':'pcplay.html';
}
function playUrl(sys,g){
 return playerPage()+'?sys='+sys.id+(g?'&d='+(g.di||0)+'&f='+encodeURIComponent(g.file):'&local=1');
}

/* ---------- ROM 목록 ---------- */
function ghRepo(){
 var h=location.hostname,p=location.pathname.split('/').filter(Boolean);
 if(!/\.github\.io$/i.test(h))return null;
 var owner=h.split('.')[0],repo=(p.length&&!/\.[a-z0-9]+$/i.test(p[0]))?p[0]:h;
 return owner+'/'+repo;
}
var SKIP=/(^[._])|\.(json|txt|md|html?|js|css|db|ini|url)$|^readme/i;
function title(f){return f.replace(/\.[^.]+$/,'').replace(/[_]+/g,' ').trim()}
function viaApi(dir){
 var r=ghRepo();if(!r)return Promise.reject(0);
 var key='yh.ls.'+r+dir,c=null;
 try{c=JSON.parse(sessionStorage.getItem(key)||'null')}catch(e){}
 if(c&&Date.now()-c.t<600000)return Promise.resolve(c.v);
 return fetch('https://api.github.com/repos/'+r+'/contents/'+dir.replace(/\/$/,''),{headers:{Accept:'application/vnd.github+json'}})
  .then(function(x){if(!x.ok)throw x.status;return x.json()})
  .then(function(a){
   if(!Array.isArray(a))throw 0;
   var v=a.filter(function(f){return f.type==='file'}).map(function(f){return{file:f.name,size:f.size||0}});
   try{sessionStorage.setItem(key,JSON.stringify({t:Date.now(),v:v}))}catch(e){}
   return v;
  });
}
function viaJson(dir){
 return fetch(dir+'games.json?t='+Date.now(),{cache:'no-store'}).then(function(x){if(!x.ok)throw 0;return x.json()})
  .then(function(j){var a=Array.isArray(j)?j:(j&&j.games)||[];return a.map(function(g){return typeof g==='string'?{file:g}:g}).filter(function(g){return g&&g.file})});
}
function viaIndex(dir){   /* 로컬 테스트용: 폴더 목록 페이지(python -m http.server 등) 읽기 */
 return fetch(dir).then(function(x){if(!x.ok)throw 0;return x.text()}).then(function(h){
  var out=[],re=/href="([^"?#]+)"/g,m;
  while((m=re.exec(h))){var n=decodeURIComponent(m[1]);if(n.slice(-1)!=='/'&&n.indexOf('/')<0)out.push({file:n})}
  if(!out.length)throw 0;return out;
 });
}
function listDir(dir,di){
 return Promise.all([viaApi(dir).catch(function(){return null}),viaJson(dir).catch(function(){return null})]).then(function(r){
  var api=r[0],js=r[1];
  return(api?Promise.resolve(null):(js?Promise.resolve(null):viaIndex(dir).catch(function(){return null}))).then(function(ix){
   var given={};(js||[]).forEach(function(g){given[g.file.toLowerCase()]=g});
   var base=api||js||ix||[];
   return base.filter(function(g){return !SKIP.test(g.file)}).map(function(g){
    var j=given[g.file.toLowerCase()]||{};
    return{file:g.file,size:g.size||j.size||0,title:j.title||title(g.file),di:di,known:!!(api||js||ix)};
   });
  });
 });
}
function listRoms(sys,force){
 if(force){try{Object.keys(sessionStorage).forEach(function(k){if(k.indexOf('yh.ls.')===0)sessionStorage.removeItem(k)})}catch(e){}}
 return Promise.all(sys.dir.map(listDir)).then(function(parts){
  var seen={},out=[],known=false;
  parts.forEach(function(p){p.forEach(function(g){known=known||g.known;var k=g.file.toLowerCase();if(!seen[k]){seen[k]=1;out.push(g)}})});
  out.sort(function(a,b){return a.title.localeCompare(b.title,'ko')});
  return{items:out,known:known};
 });
}

/* ---------- 롬 내려받기(진행률) / 마메 바이오스 합치기 ---------- */
function fetchBlob(url,prog){
 return fetch(url).then(function(r){
  if(!r.ok)throw new Error(r.status===404?'게임 파일을 찾지 못했어요 (404)':'서버 오류 ('+r.status+')');
  var tot=+r.headers.get('content-length')||0;
  if(!r.body||!r.body.getReader)return r.blob();
  var rd=r.body.getReader(),parts=[],got=0;
  return(function pump(){return rd.read().then(function(x){
   if(x.done)return new Blob(parts);
   parts.push(x.value);got+=x.value.length;if(prog)prog(got,tot);return pump();
  })})();
 });
}
function romUrl(sys,di,file){return sys.dir[+di||0]+encodeURIComponent(file)}
function getRom(sys,di,file,prog){
 return fetchBlob(romUrl(sys,di,file),prog).then(function(b){
  var f=new File([b],file);
  return sys.id==='mame'&&W.MG?W.MG.prepare(f):f;
 });
}
function fmtSize(n){return n>=1048576?(n/1048576).toFixed(n>=10485760?0:1)+'MB':n>=1024?Math.round(n/1024)+'KB':''}
function norm(s){return String(s||'').toLowerCase().replace(/[\s\-_.]+/g,'')}
function search(q){
 var ws=String(q||'').toLowerCase().split(/\s+/).filter(Boolean).map(norm);
 if(!ws.length)return[];
 return SYS.filter(function(s){var h=norm(s.n+' '+s.s+' '+s.id+' '+s.kw);return ws.every(function(w){return h.indexOf(w)>=0})});
}
W.Hub={SYS:SYS,byId:byId,fav:fav,set:set,device:device,playerPage:playerPage,playUrl:playUrl,listRoms:listRoms,
 getRom:getRom,fetchBlob:fetchBlob,romUrl:romUrl,fmtSize:fmtSize,search:search,EJS:EJS};
})(window);
