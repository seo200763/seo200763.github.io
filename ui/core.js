/* 영호의 게임에뮬레이터 — 새 디자인 공통 코드 (로그인 · 기종 목록 · 즐겨찾기 · 롬 목록 · 테마) */
(function(W,D){
'use strict';
var REPO={o:'seo200763',r:'seo200763.github.io'};
var UA=navigator.userAgent||'';
var qs=new URLSearchParams(location.search);
/* 스마트폰만 '모바일 화면', 태블릿·PC 는 'PC 화면'. (?m=1 / ?pc=1 로 강제 전환 가능) */
var phone=/iPhone|iPod|Android.+Mobile|Windows Phone|Mobile.+Firefox/i.test(UA);
if(qs.get('m')==='1')phone=true;if(qs.get('pc')==='1')phone=false;
D.documentElement.dataset.dev=phone?'m':'pc';

/* 기종 목록 (이 파일만 고치면 기종이 바뀝니다)
   tier : 'm'  = 스마트폰·태블릿·PC 모두에서 원활하게 돌아가는 가벼운 기종 (기본값)
          'pc' = PC 인터넷(크롬·엣지 등)에서 잘 돌아가는 고사양 기종 → 스마트폰 화면에는 나오지 않음
   bios : BIOS/ 폴더에서 찾을 바이오스 파일 이름들   biosReq:1 = 바이오스가 없으면 실행 불가
   hint : 게임 목록 위에 보여줄 안내 문구 */
var CDHINT='CD 게임은 .cue+.bin 파일을 zip 하나로 묶거나 .chd 로 변환해서 올려 주세요. (용량이 커서 PC 전용이에요)';
var SYS=[
 /* ───── 스마트폰 · 태블릿 · PC 모두 OK ───── */
 {id:'gba',n:'게임보이 어드밴스',s:'GBA',folders:['GBA'],core:'gba',ext:'gba zip 7z',a:'#7478ff',kw:'게임보이어드밴스 어드밴스 게임보이 닌텐도 gameboy advance gba 지비에이'},
 {id:'nds',n:'닌텐도 DS',s:'NDS',folders:['NDS'],core:'desmume2015',alt:['melonds','desmume'],ext:'nds zip 7z',a:'#aab6c8',kw:'닌텐도ds 닌텐도 디에스 듀얼스크린 nintendo ds nds'},
 {id:'psx',n:'플레이스테이션',s:'PSX',folders:['PSX','PS1'],core:'psx',ext:'bin cue iso img chd pbp m3u zip',a:'#7b8aa3',kw:'플레이스테이션 플스 플레이 스테이션 소니 sony ps1 psx playstation'},
 {id:'nes',n:'패미컴',s:'NES',folders:['NES','FC'],core:'nes',ext:'nes zip 7z',a:'#f0384f',kw:'패미컴 패미콤 패밀리 닌텐도 패밀리컴퓨터 famicom nes 엔이에스 마리오'},
 {id:'snes',n:'슈퍼 패미컴',s:'SNES',folders:['SNES','SFC','SUPERFAMICOM'],core:'snes',ext:'sfc smc fig swc zip 7z',a:'#8b5cf6',kw:'슈퍼패미컴 슈패 슈퍼 패미컴 닌텐도 에스엔이에스 superfamicom super famicom snes 슈퍼마리오 젤다'},
 {id:'md',n:'메가 드라이브',s:'MD',folders:['MD','MEGADRIVE','GENESIS'],core:'segaMD',ext:'md gen smd bin zip 7z',a:'#3a3f4d',kw:'메가드라이브 메가 드라이브 제네시스 세가 sega megadrive genesis md 소닉'},
 {id:'sms',n:'세가 마스터 시스템',s:'SMS',folders:['SMS','MASTER','SEGAMS'],core:'segaMS',ext:'sms zip 7z',a:'#2f6bff',kw:'마스터시스템 마스터 시스템 세가 sega master sms 엠에스에스'},
 {id:'gb',n:'게임보이',s:'GB',folders:['GB','GAMEBOY'],core:'gb',ext:'gb zip 7z',a:'#a8c93a',kw:'게임보이 보이 닌텐도 gameboy gb 포켓몬 테트리스'},
 {id:'gbc',n:'게임보이 컬러',s:'GBC',folders:['GBC','GAMEBOYCOLOR'],core:'gb',ext:'gbc gb zip 7z',a:'#1fd1c0',kw:'게임보이컬러 컬러 게임보이 닌텐도 gameboycolor gameboy color gbc 포켓몬'},
 {id:'gg',n:'게임기어',s:'GG',folders:['GG','GAMEGEAR'],core:'segaGG',ext:'gg zip 7z',a:'#12b5ee',kw:'게임기어 기어 세가 sega gamegear game gear gg'},
 {id:'pce',n:'PC엔진',s:'PCE',folders:['PCE','PCENGINE'],core:'pce',ext:'pce zip 7z',a:'#ffb020',kw:'피씨엔진 pc엔진 엔진 pcengine pce nec 투엔진 터보그래픽스 turbografx'},
 {id:'ngp',n:'네오지오 포켓',s:'NGP',folders:['NGP','NGPC','NEOGEOPOCKET'],core:'ngp',ext:'ngp ngc zip 7z',a:'#ff5a5a',kw:'네오지오포켓 네오지오 포켓 snk neogeo pocket ngp ngpc 컬러'},
 {id:'ws',n:'원더스완',s:'WS',folders:['WS','WSC','WONDERSWAN'],core:'ws',ext:'ws wsc zip 7z',a:'#b04fd8',kw:'원더스완 원더 스완 반다이 bandai wonderswan wonder swan ws wsc 컬러'},
 {id:'lynx',n:'아타리 링스',s:'LYNX',folders:['LYNX'],core:'lynx',ext:'lnx lyx zip 7z',a:'#ff8a2b',kw:'링스 링크스 아타리 atari lynx'},
 {id:'vb',n:'버추얼보이',s:'VB',folders:['VB','VIRTUALBOY'],core:'vb',ext:'vb vboy zip 7z',a:'#e82020',kw:'버추얼보이 버추얼 가상 닌텐도 virtualboy virtual boy vb'},
 {id:'a2600',n:'아타리 2600',s:'2600',folders:['A2600','ATARI2600'],core:'atari2600',ext:'a26 bin zip 7z',a:'#a0693a',kw:'아타리 아타리2600 2600 atari atari2600'},
 {id:'a7800',n:'아타리 7800',s:'7800',folders:['A7800','ATARI7800'],core:'atari7800',ext:'a78 bin zip 7z',a:'#c98a3a',kw:'아타리 아타리7800 7800 atari atari7800'},
 {id:'coleco',n:'콜레코비전',s:'COL',folders:['COLECO','COLECOVISION'],core:'coleco',ext:'col rom bin zip 7z',a:'#4a78d0',kw:'콜레코비전 콜레코 coleco colecovision'},
 {id:'mame',n:'아케이드',s:'MAME',folders:['MAME','ARCADE'],legacy:['MAME'],core:'fbneo',alt:['mame2003_plus'],ext:'zip 7z',mame:1,a:'#ff7a1a',kw:'마메 마메게임 mame 오락실 아케이드 arcade 네오지오 철권 킹오브파이터즈 메탈슬러그 캡콤 capcom'},
 {id:'dos',n:'MS-DOS',s:'DOS',folders:['DOS','MSDOS'],kind:'dos',ext:'zip jsdos',a:'#4b5563',kw:'도스 엠에스도스 msdos ms-dos dos 마이크로소프트 컴퓨터 pc게임'},
 {id:'win31',n:'윈도우 3.1',s:'WIN3.1',kind:'win',os:'win31',a:'#3b82f6',kw:'윈도우 윈도우즈 윈도 windows 마이크로소프트 윈도우3.1 win31 3.1'},
 {id:'win95',n:'윈도우 95',s:'WIN95',kind:'win',os:'win95',a:'#14b8a6',kw:'윈도우 윈도우즈 윈도 windows 마이크로소프트 윈도우95 win95 95'},

 /* ───── PC 전용 (PC 인터넷에서 잘 돌아가는 고사양 기종) ───── */
 {id:'n64',tier:'pc',n:'닌텐도 64',s:'N64',folders:['N64','NINTENDO64'],core:'n64',ext:'z64 n64 v64 zip 7z',a:'#22c55e',kw:'닌텐도64 닌텐도 64 엔64 nintendo64 n64 마리오64 젤다 시간의오카리나'},
 {id:'saturn',tier:'pc',n:'세가 새턴',s:'SATURN',folders:['SATURN','SAT'],core:'segaSaturn',ext:'cue chd iso bin zip 7z',bios:['saturn_bios.bin','sega_101.bin','mpr-17933.bin'],a:'#6a7ca0',hint:CDHINT+'\n바이오스(선택): BIOS 폴더에 saturn_bios.bin 을 올려 두면 호환성이 좋아져요.',kw:'세가새턴 새턴 세가 sega saturn'},
 {id:'segacd',tier:'pc',n:'세가 CD (메가 CD)',s:'SEGA CD',folders:['SEGACD','MEGACD','SCD'],core:'segaCD',ext:'cue chd iso bin zip 7z',bios:['bios_CD_U.bin','bios_CD_E.bin','bios_CD_J.bin'],biosReq:1,a:'#4f6bd8',hint:CDHINT+'\n바이오스(필수): BIOS 폴더에 bios_CD_U.bin (또는 bios_CD_E.bin / bios_CD_J.bin) 을 올려 두세요.',kw:'세가cd 세가씨디 메가cd 메가씨디 세가 sega segacd megacd'},
 {id:'s32x',tier:'pc',n:'세가 32X',s:'32X',folders:['32X','S32X','SEGA32X'],core:'sega32x',ext:'32x bin md zip 7z',a:'#2fb4c9',kw:'세가32x 32x 세가 sega 32엑스 sega32x'},
 {id:'3do',tier:'pc',n:'3DO',s:'3DO',folders:['3DO'],core:'3do',ext:'iso cue chd bin zip 7z',bios:['panafz10.bin','panafz1.bin'],biosReq:1,a:'#e0a43a',hint:CDHINT+'\n바이오스(필수): BIOS 폴더에 panafz10.bin 을 올려 두세요.',kw:'3do 쓰리디오 삼디오 파나소닉'},
 {id:'jaguar',tier:'pc',n:'아타리 재규어',s:'JAGUAR',folders:['JAGUAR','JAG'],core:'jaguar',ext:'j64 jag rom abs zip 7z',a:'#d6472f',kw:'재규어 아타리재규어 아타리 jaguar atari'},
 {id:'winxp',tier:'pc',n:'윈도우 XP',s:'WINXP',kind:'win',os:'winxp',a:'#3b82f6',hint:'윈도우 XP 이미지는 다른 사이트에서 주소(URL)로 불러오거나, 내 기기에서 직접 선택해요. (PC 전용 · 부팅에 몇 분 걸릴 수 있어요)',kw:'윈도우 윈도우즈 윈도 windows 마이크로소프트 윈도우xp winxp xp 엑스피'}
];
SYS.forEach(function(x){x.img='ui/img/'+x.id+'.png';if(!x.tier)x.tier='m'});
/* 지금 화면(스마트폰/PC)에서 보여줄 기종 : 스마트폰은 가벼운 기종(tier 'm')만, PC·태블릿은 전부 */
function visible(x){return !phone||x.tier!=='pc'}
function list(tier){return SYS.filter(function(x){return visible(x)&&(!tier||x.tier===tier)})}
function byId(id){for(var i=0;i<SYS.length;i++)if(SYS[i].id===id)return SYS[i];return null}

/* ---------- 로그인 ----------
   (정적 사이트라 화면을 가리는 용도입니다. 값은 base64 로만 감춰 두었어요.) */
var CRED=['d2tzZWhkMjAwMQ==','ZWtxd2tkMTI='];
function cred(){return{id:atob(CRED[0]),pw:atob(CRED[1])}}
function authed(){try{return sessionStorage.getItem('yh_auth')==='1'||localStorage.getItem('yh_auth')==='1'}catch(e){return false}}
function login(id,pw,keep){
 var c=cred();if(id!==c.id||pw!==c.pw)return false;
 try{sessionStorage.setItem('yh_auth','1');if(keep)localStorage.setItem('yh_auth','1');else localStorage.removeItem('yh_auth')}catch(e){}
 return true;
}
function logout(){try{sessionStorage.removeItem('yh_auth');localStorage.removeItem('yh_auth')}catch(e){}location.replace('index.html')}
function guard(){if(!authed()){location.replace('index.html')}}

/* ---------- 즐겨찾기 / 설정 ---------- */
function jget(k,d){try{var v=JSON.parse(localStorage.getItem(k)||'null');return v==null?d:v}catch(e){return d}}
function jset(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var Fav={
 sys:function(){return jget('yh_fav_sys',[])},
 games:function(){return jget('yh_fav_games',[])},
 hasSys:function(id){return Fav.sys().indexOf(id)>=0},
 hasGame:function(k){return Fav.games().some(function(g){return g.k===k})},
 toggleSys:function(id){var a=Fav.sys(),i=a.indexOf(id);if(i>=0)a.splice(i,1);else a.push(id);jset('yh_fav_sys',a);return i<0},
 toggleGame:function(g){var a=Fav.games(),i=-1;a.forEach(function(x,n){if(x.k===g.k)i=n});if(i>=0)a.splice(i,1);else a.push({k:g.k,sys:g.sys,p:g.p,t:g.t});jset('yh_fav_games',a);return i<0},
 clear:function(){jset('yh_fav_sys',[]);jset('yh_fav_games',[])}
};
var THEMES={violet:['#5b3df5','#8b5cf6','#38bdf8'],cyan:['#0891b2','#22d3ee','#a78bfa'],pink:['#db2777','#f472b6','#fbbf24'],green:['#16a34a','#4ade80','#38bdf8']};
function applyTheme(n){
 var t=THEMES[n]||THEMES.violet,r=D.documentElement.style;
 r.setProperty('--ac',t[0]);r.setProperty('--ac2',t[1]);r.setProperty('--ac3',t[2]);
}
function theme(n){if(n){try{localStorage.setItem('yh_theme',n)}catch(e){}applyTheme(n)}else{try{return localStorage.getItem('yh_theme')||'violet'}catch(e){return'violet'}}}
applyTheme(theme());

/* ---------- 롬 목록 (GitHub 파일 목록 → 없으면 games.json) ---------- */
function ext(n){var m=/\.([^.]+)$/.exec(n||'');return m?m[1].toLowerCase():''}
function base(n){return String(n||'').replace(/\.[^.]+$/,'')}
function fmt(n){return n>=1048576?(n/1048576).toFixed(n>=10485760?0:1)+'MB':n>=1024?Math.round(n/1024)+'KB':''}
function api(path){
 var key='yh.api.'+path,c=null;
 try{c=JSON.parse(sessionStorage.getItem(key)||'null')}catch(e){}
 if(c&&Date.now()-c.t<600000)return Promise.resolve(c.v);
 return fetch('https://api.github.com/repos/'+REPO.o+'/'+REPO.r+'/contents/'+path,{headers:{Accept:'application/vnd.github+json'}})
  .then(function(r){if(!r.ok)throw r.status;return r.json()})
  .then(function(v){try{sessionStorage.setItem(key,JSON.stringify({t:Date.now(),v:v}))}catch(e){}return v});
}
function titleOf(f){return base(f).replace(/[_]+/g,' ').trim()}
function listDir(dir,exts){
 return api(dir).then(function(a){
  if(!Array.isArray(a))throw 0;
  return a.filter(function(f){return f.type==='file'&&exts.indexOf(ext(f.name))>=0}).map(function(f){return{file:f.name,size:f.size||0,dir:dir}});
 });
}
function viaJson(dir,exts){
 return fetch(dir+'/games.json?t='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){
  var a=Array.isArray(j)?j:(j&&j.games)||[];
  return a.map(function(g){return typeof g==='string'?{file:g}:g}).filter(function(g){return g&&g.file&&(exts.indexOf(ext(g.file))>=0)}).map(function(g){return{file:g.file,size:g.size||0,title:g.title,dir:dir}});
 });
}
var memo={};
/* 기종의 롬 목록: [{file,size,title,dir,p}] */
function games(sys,force){
 if(sys.kind==='win')return Promise.resolve({items:[],known:true});
 if(memo[sys.id]&&!force)return memo[sys.id];
 var exts=sys.ext.split(' ');
 if(force){try{Object.keys(sessionStorage).forEach(function(k){if(k.indexOf('yh.api.')===0)sessionStorage.removeItem(k)})}catch(e){}}
 var p=api('ROMS').catch(function(){return null}).then(function(root){
  var dirs=[];
  if(Array.isArray(root)){
   root.forEach(function(d){if(d.type==='dir'&&sys.folders.some(function(f){return f.toLowerCase()===d.name.toLowerCase()}))dirs.push('ROMS/'+d.name)});
  }else{sys.folders.forEach(function(f){dirs.push('ROMS/'+f)})}
  (sys.legacy||[]).forEach(function(d){dirs.push(d)});
  return Promise.all(dirs.map(function(d){
   return listDir(d,exts).catch(function(){return null}).then(function(r){
    return viaJson(d,exts).catch(function(){return null}).then(function(j){return{api:r,js:j}});
   });
  })).then(function(rs){
   var seen={},items=[],known=false;
   rs.forEach(function(r){
    var given={};(r.js||[]).forEach(function(g){given[g.file.toLowerCase()]=g});
    var b=r.api||r.js;if(b)known=true;
    (b||[]).forEach(function(g){
     var key=g.file.toLowerCase();if(seen[key])return;seen[key]=1;
     var j=given[key]||{};
     items.push({file:g.file,size:g.size||j.size||0,title:j.title||titleOf(g.file),dir:g.dir,p:g.dir+'/'+g.file});
    });
   });
   if(sys.mame)items=items.filter(function(g){return g.file.charAt(0)!=='_'});
   items.sort(function(a,b){return a.title.localeCompare(b.title,'ko')});
   return{items:items,known:known};
  });
 });
 memo[sys.id]=p;return p;
}
/* 롬 파일 내려받기 (진행률) */
function fetchBlob(url,onProg){
 return fetch(url).then(function(r){
  if(!r.ok)throw new Error('롬 파일을 찾을 수 없어요 ('+r.status+')');
  var tot=+r.headers.get('content-length')||0;
  if(!r.body||!r.body.getReader)return r.blob().then(function(b){onProg&&onProg(b.size,b.size);return b});
  var rd=r.body.getReader(),parts=[],got=0;
  return(function pump(){return rd.read().then(function(x){
   if(x.done)return new Blob(parts);
   parts.push(x.value);got+=x.value.length;onProg&&onProg(got,tot);return pump();
  })})();
 });
}
/* 플레이 페이지 주소 */
function playUrl(sys,p){
 var page=sys.kind==='dos'?'play-dos.html':(phone?'play-m.html':'play-pc.html');
 return page+'?sys='+sys.id+(p?'&p='+encodeURIComponent(p):'&local=1')+(qs.get('m')==='1'?'&m=1':'')+(qs.get('pc')==='1'?'&pc=1':'');
}
function openSys(sys){
 if(sys.kind==='win')location.href='winemu.html?os='+sys.os;
 else location.href='games.html?sys='+sys.id+(qs.get('m')==='1'?'&m=1':'')+(qs.get('pc')==='1'?'&pc=1':'');
}
/* 작은 알림 */
function toast(m){
 var t=D.getElementById('yhToast');
 if(!t){t=D.createElement('div');t.id='yhToast';D.body.appendChild(t)}
 t.textContent=m;t.className='on';clearTimeout(t._t);t._t=setTimeout(function(){t.className=''},2600);
}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
var HEART='<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

W.YH={SYS:SYS,list:list,visible:visible,byId:byId,phone:phone,qs:qs,cred:cred,authed:authed,login:login,logout:logout,guard:guard,Fav:Fav,theme:theme,THEMES:THEMES,
 games:games,fetchBlob:fetchBlob,playUrl:playUrl,openSys:openSys,toast:toast,esc:esc,fmt:fmt,ext:ext,base:base,HEART:HEART,REPO:REPO,
 ghFetch:function(path,tok){return fetch('https://api.github.com'+path,{headers:{Accept:'application/vnd.github+json',Authorization:'Bearer '+tok}})}};
})(window,document);
