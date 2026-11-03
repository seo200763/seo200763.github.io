/* 공통 화면 조각: 모바일 하단 탭바 · 실행방법/공지사항/설정/테마 창 */
(function(W,D){
'use strict';
var Y=W.YH;
var I={
 home:'<svg class="ic" viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
 pad:'<svg class="ic" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.500 12.500h5"/><circle cx="16" cy="11.500" r="1"/><circle cx="18.500" cy="14" r="1"/></svg>',
 star:'<svg class="ic" viewBox="0 0 24 24"><path d="M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z"/></svg>',
 gear:'<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.400 15a1.700 1.700 0 0 0 .3 1.800l.1.100a2 2 0 1 1-2.800 2.800l-.1-.1a1.700 1.700 0 0 0-1.800-.3 1.700 1.700 0 0 0-1 1.500V21a2 2 0 1 1-4 0v-.1a1.700 1.700 0 0 0-1.100-1.500 1.700 1.700 0 0 0-1.800.3l-.1.100a2 2 0 1 1-2.800-2.800l.1-.1a1.700 1.700 0 0 0 .3-1.800 1.700 1.700 0 0 0-1.500-1H3a2 2 0 1 1 0-4h.1a1.700 1.700 0 0 0 1.500-1.100 1.700 1.700 0 0 0-.3-1.800l-.1-.1a2 2 0 1 1 2.800-2.800l.1.100a1.700 1.700 0 0 0 1.800.3H9a1.700 1.700 0 0 0 1-1.500V3a2 2 0 1 1 4 0v.1a1.700 1.700 0 0 0 1 1.500 1.700 1.700 0 0 0 1.800-.3l.1-.1a2 2 0 1 1 2.800 2.800l-.1.100a1.700 1.700 0 0 0-.3 1.800V9a1.700 1.700 0 0 0 1.500 1H21a2 2 0 1 1 0 4h-.1a1.700 1.700 0 0 0-1.500 1z"/></svg>',
 search:'<svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.300-4.300"/></svg>'
};
function modal(id,html){
 var m=D.getElementById(id);if(m)m.remove();
 m=D.createElement('div');m.className='modal';m.id=id;
 m.innerHTML='<div class="mbox">'+html+'</div>';
 m.addEventListener('click',function(e){if(e.target===m||e.target.closest('[data-x]'))m.classList.remove('on')});
 D.body.appendChild(m);return m;
}
function open(id){var m=D.getElementById(id);if(m)m.classList.add('on')}

function help(){
 modal('mHelp','<h3>실행방법</h3><ol>'+
 '<li>홈에서 게임기 아이콘을 누르세요.</li>'+
 '<li>해당 기종 폴더(<b>ROMS/기종/</b>)에 올려 둔 게임 목록이 나와요. 게임을 누르면 바로 실행됩니다.</li>'+
 '<li>윈도우 3.1 · 윈도우 95 는 아이콘을 누르면 윈도우 에뮬레이터가 열립니다.</li>'+
 '<li>하트(♡)를 누르면 즐겨찾기에 담겨요.</li>'+
 '<li>롬 파일은 GitHub 저장소의 <b>ROMS/기종폴더</b>(예: ROMS/SNES, ROMS/GBA, ROMS/MD …)에 올리면 목록에 자동으로 나타나요. 폴더 이름은 ROMS/README.txt 를 보세요.</li>'+
 '<li>📱 스마트폰 화면에는 가벼운 기종만, 🖥️ PC 화면에는 <b>PC 전용(고사양)</b> 기종(N64·새턴·세가CD·32X·3DO·재규어·윈도우XP)이 따로 더 나와요.</li></ol>'+
 '<div class="row"><button class="pbtn" data-x>닫기</button></div>');
}
function notice(){
 var m=modal('mNotice','<h3>공지사항</h3><p id="nBody">불러오는 중…</p><div class="row"><button class="pbtn" data-x>닫기</button></div>');
 fetch('INFO-WEB.TXT?t='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){
  D.getElementById('nBody').innerHTML=Y.esc(t.trim()||'등록된 공지가 없어요.').replace(/\n/g,'<br>');
 }).catch(function(){D.getElementById('nBody').textContent='등록된 공지가 없어요.'});
}
function settings(){
 modal('mSet','<h3>설정</h3><p>로그인 상태 · 즐겨찾기를 관리할 수 있어요.</p>'+
 '<div class="row" style="justify-content:flex-start"><button class="gbtn" id="sFav">즐겨찾기 초기화</button><button class="gbtn" id="sTh">테마 변경</button><button class="gbtn" id="sOld">예전 화면(기존 사이트)</button><button class="pbtn" id="sOut">로그아웃</button></div>'+
 '<div class="row"><button class="gbtn" data-x>닫기</button></div>');
 D.getElementById('sFav').onclick=function(){if(confirm('즐겨찾기를 모두 지울까요?')){Y.Fav.clear();Y.toast('즐겨찾기를 초기화했어요');setTimeout(function(){location.reload()},500)}};
 D.getElementById('sTh').onclick=function(){D.getElementById('mSet').classList.remove('on');theme()};
 D.getElementById('sOld').onclick=function(){location.href='index-old.html?select=1'};
 D.getElementById('sOut').onclick=Y.logout;
}
function theme(){
 var cur=Y.theme(),names={violet:'바이올렛',cyan:'시안',pink:'핑크',green:'그린'};
 var sw=Object.keys(Y.THEMES).map(function(k){var t=Y.THEMES[k];return'<button type="button" data-t="'+k+'" title="'+names[k]+'" class="'+(k===cur?'on':'')+'" style="background:linear-gradient(135deg,'+t[0]+','+t[1]+')"></button>'}).join('');
 var m=modal('mTheme','<h3>테마</h3><p>강조 색상을 골라 주세요.</p><div class="sw">'+sw+'</div><div class="row"><button class="pbtn" data-x>확인</button></div>');
 m.querySelectorAll('[data-t]').forEach(function(b){b.onclick=function(){Y.theme(b.dataset.t);m.querySelectorAll('[data-t]').forEach(function(x){x.classList.toggle('on',x===b)})}});
 m.classList.add('on');
}
function tabbar(active){
 var t=D.createElement('nav');t.className='tabbar';
 t.innerHTML=
  '<a href="home.html'+suffix()+'" class="'+(active==='home'?'on':'')+'">'+I.home+'<span>홈</span></a>'+
  '<a href="find.html'+suffix()+'" class="'+(active==='find'?'on':'')+'">'+I.pad+'<span>게임찾기</span></a>'+
  '<a href="fav.html'+suffix()+'" class="'+(active==='fav'?'on':'')+'">'+I.star+'<span>즐겨찾기</span></a>'+
  '<a href="#" id="tbSet">'+I.gear+'<span>설정</span></a>';
 D.body.appendChild(t);
 D.getElementById('tbSet').onclick=function(e){e.preventDefault();open('mSet')};
}
function suffix(){return Y.qs.get('m')==='1'?'?m=1':(Y.qs.get('pc')==='1'?'?pc=1':'')}
function init(active){
 help();notice();settings();
 tabbar(active);
}
/* 검색창: 2글자 이상 입력하면 검색 아이콘이 나타납니다 */
function searchBox(input,btn,go){
 function upd(){btn.classList.toggle('show',input.value.trim().length>=2)}
 input.addEventListener('input',upd);
 input.addEventListener('keydown',function(e){if(e.key==='Enter'&&input.value.trim().length>=2){e.preventDefault();go(input.value.trim())}});
 btn.addEventListener('click',function(){if(input.value.trim().length>=2)go(input.value.trim())});
 upd();
}
W.Shell={init:init,open:open,help:help,notice:notice,settings:settings,theme:theme,I:I,searchBox:searchBox,suffix:suffix};
})(window,document);
