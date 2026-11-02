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

/* 기종 목록 (이 파일만 고치면 기종이 바뀝니다) */
var SYS=[
 {id:'gba',n:'게임보이 어드밴스',s:'GBA',folders:['GBA'],core:'gba',ext:'gba zip 7z',a:'#7478ff',kw:'게임보이어드밴스 어드밴스 게임보이 닌텐도 gameboy advance gba 지비에이'},
 {id:'nds',n:'닌텐도 DS',s:'NDS',folders:['NDS'],core:'desmume2015',alt:['melonds','desmume'],ext:'nds zip 7z',a:'#aab6c8',kw:'닌텐도ds 닌텐도 디에스 듀얼스크린 nintendo ds nds'},
 {id:'psx',n:'플레이스테이션',s:'PSX',folders:['PSX','PS1'],core:'psx',ext:'bin cue iso img chd pbp m3u zip',a:'#7b8aa3',kw:'플레이스테이션 플스 플레이 스테이션 소니 sony ps1 psx playstation'},
 {id:'nes',n:'패미컴',s:'NES',folders:['NES','FC'],core:'nes',ext:'nes zip 7z',a:'#f0384f',kw:'패미컴 패미콤 패밀리 닌텐도 패밀리컴퓨터 famicom nes 엔이에스 마리오'},
 {id:'mame',n:'아케이드',s:'MAME',folders:['MAME','ARCADE'],legacy:['MAME'],core:'fbneo',alt:['mame2003_plus'],ext:'zip 7z',mame:1,a:'#ff7a1a',kw:'마메 마메게임 mame 오락실 아케이드 arcade 네오지오 철권 킹오브파이터즈 메탈슬러그 캡콤 capcom'},
 {id:'sms',n:'세가 마스터 시스템',s:'SMS',folders:['SMS','MASTER','SEGAMS'],core:'segaMS',ext:'sms zip 7z',a:'#2f6bff',kw:'마스터시스템 마스터 시스템 세가 sega master sms 엠에스에스'},
 {id:'pce',n:'PC엔진',s:'PCE',folders:['PCE','PCENGINE'],core:'pce',ext:'pce zip 7z',a:'#ffb020',kw:'피씨엔진 pc엔진 엔진 pcengine pce nec 투엔진'},
 {id:'dos',n:'MS-DOS',s:'DOS',folders:['DOS','MSDOS'],kind:'dos',ext:'zip jsdos',a:'#4b5563',kw:'도스 엠에스도스 msdos ms-dos dos 마이크로소프트 컴퓨터 pc게임'},
 {id:'win31',n:'윈도우 3.1',s:'WIN3.1',kind:'win',os:'win31',a:'#3b82f6',kw:'윈도우 윈도우즈 윈도 windows 마이크로소프트 윈도우3.1 win31 3.1'},
 {id:'win95',n:'윈도우 95',s:'WIN95',kind:'win',os:'win95',a:'#14b8a6',kw:'윈도우 윈도우즈 윈도 windows 마이크로소프트 윈도우95 win95 95'}
];
SYS.forEach(function(x){x.img='ui/img/'+x.id+'.png'});
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

W.YH={SYS:SYS,byId:byId,phone:phone,qs:qs,cred:cred,authed:authed,login:login,logout:logout,guard:guard,Fav:Fav,theme:theme,THEMES:THEMES,
 games:games,fetchBlob:fetchBlob,playUrl:playUrl,openSys:openSys,toast:toast,esc:esc,fmt:fmt,ext:ext,base:base,HEART:HEART,REPO:REPO,
 ghFetch:function(path,tok){return fetch('https://api.github.com'+path,{headers:{Accept:'application/vnd.github+json',Authorization:'Bearer '+tok}})}};
})(window,document);
