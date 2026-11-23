/* 기종·확장자 정보 — 새 기종은 여기만 고치면 됩니다. ROMS/<폴더>/ 안에 게임을 넣으세요. */
const CD=['BIOS/bios_CD_U.bin','BIOS/bios_CD_E.bin','BIOS/bios_CD_J.bin'];
const E=(n,f,core,ex,c,l,o)=>Object.assign({n,f,eng:'ejs',core,ex:ex.split(' '),c,l},o||{});
const RD={
M:{
nes:E('패미컴 / NES','NES','nes','nes zip','#f0384f','NES'),
snes:E('슈퍼패미컴','SNES','snes','sfc smc zip','#8b5cf6','SNES'),
sms:E('마스터시스템','SMS','segaMS','sms zip','#2f6bff','SMS'),
pce:E('PC엔진','PCE','pce','pce zip','#ff9d1a','PCE'),
md:E('메가드라이브게임','MD','segaMD','md gen bin zip','#e11d8f','MD',{img:'mega'}),
n64:E('닌텐도 64','N64','n64','z64 n64 v64 zip','#22c55e','N64'),
psx:E('플레이스테이션','PSX','psx','chd pbp iso img bin cue m3u zip','#7b8aa3','PS1',{cd:1}),
segacd:E('세가 CD','SEGACD','segaCD','chd iso cue bin zip','#4f6bd8','SCD',{cd:1,bios:CD}),
saturn:E('세가 새턴','SATURN','segaSaturn','chd iso cue bin zip','#6a7ca0','SAT',{cd:1,bios:['BIOS/saturn_bios.bin','BIOS/sega_101.bin','BIOS/mpr-17933.bin']}),
s32x:E('세가 32X','S32X','sega32x','32x bin md zip','#2fb4c9','32X'),
'3do':E('3DO','3DO','3do','iso chd cue bin','#e0a43a','3DO',{cd:1,bios:['BIOS/panafz10.bin','BIOS/panafz1.bin']}),
jaguar:E('아타리 재규어','JAGUAR','jaguar','j64 jag rom zip','#d6472f','JAG'),
atari2600:E('아타리 2600','ATARI2600','atari2600','a26 bin','#a0693a','2600'),
handheld:{n:'휴대용게임',img:'handheld',grp:['gb','gbc','gba','gg','lynx','ngp','vb','nds']},
gb:E('게임보이','GB','gb','gb zip','#a8c93a','GB'),gbc:E('게임보이 컬러','GBC','gb','gbc zip','#1fd1c0','GBC'),
gba:E('게임보이 어드밴스','GBA','gba','gba zip','#7478ff','GBA'),gg:E('게임기어','GG','segaGG','gg zip','#12b5ee','GG'),
lynx:E('아타리 링스','LYNX','lynx','lnx zip','#ff8a2b','LYNX'),ngp:E('네오지오 포켓','NGP','ngp','ngp ngc zip','#ff5a5a','NGP'),
vb:E('버추얼보이','VB','vb','vb zip','#e82020','VB'),nds:E('닌텐도 DS','NDS','desmume2015','nds zip','#aab6c8','NDS'),
win31:{n:'윈도우 3.1',eng:'v86',open:'win31',c:'#3b82f6',l:'3.1'},win95:{n:'윈도우 95',eng:'v86',open:'win95',c:'#14b8a6',l:'95'},
win98:{n:'윈도우 98',eng:'v86',open:'win98',c:'#60a5fa',l:'98'},msdos:{n:'MS-DOS 부팅',eng:'v86',open:'dos',c:'#4b5563',l:'DOS'},
dosgame:{n:'도스게임',f:'DOS',eng:'jsdos',ex:['jsdos','zip'],c:'#4b5563',l:'DOS',note:'JSDOS 변환기(도스 게임)로 만든 .jsdos 파일을 올리세요. 게임 폴더를 그냥 zip 으로 묶어 올려도 자동 설정으로 실행을 시도합니다(.exe 한 개만 올리면 실행되지 않습니다).'},
win31game:{n:'윈도우 3.1 게임',f:'WIN31',eng:'jsdos',ex:['jsdos','zip'],c:'#3b82f6',l:'3.1',note:'JSDOS 변환기(윈도우 3.1 게임)로 만든 .jsdos 파일을 올리세요. 윈도우 3.1 폴더가 함께 들어 있어야 하며, 용량이 커서 PC 에서 하는 것을 권장합니다.'},
win95game:{n:'윈도우 95 게임',f:'WIN95',eng:'jsdos',ex:['jsdos'],c:'#14b8a6',l:'95',note:'JSDOS 변환기(윈도우 95 게임)로 만든 .jsdos 파일을 올리세요. 공용 윈도우 이미지 os/win95/win95.zip 이 있어야 실행됩니다(zip 안에 .img). PC 에서 하는 것을 권장하며 폰에서는 느리거나 안 될 수 있어요.'},
mame:E('오락실게임 (마메)','MAME','fbneo','zip','#ff7a1a','MAME',{bios:['ROMS/MAME/_bios/neogeo.zip','MAME/_bios/neogeo.zip'],note:'네오지오 게임(킹 오브 파이터즈, 메탈슬러그 등)은 ROMS/MAME/_bios/neogeo.zip 바이오스가 필요합니다.'}),
folderphone:{n:'폴더폰게임',f:'FOLDER',eng:'none',ex:['jar','jad'],note:'폴더폰·자바 게임(.jar)을 실행해 주는 웹 엔진이 아직 연결되지 않았어요. 파일 보관용 목록으로만 보입니다.'},
java:{n:'자바게임',f:'JAVA',eng:'none',ex:['jar','jad'],note:'자바(.jar) 게임을 실행해 주는 웹 엔진이 아직 연결되지 않았어요. 파일 보관용 목록으로만 보입니다.'},
webgame:{n:'웹게임',f:'WEB',eng:'html',ex:['html','htm'],note:'게임 전체가 .html 파일 하나에 들어 있어야 실행됩니다.'},
html5:{n:'HTML5게임',f:'HTML5',eng:'html',ex:['html','htm'],note:'게임 전체가 .html 파일 하나에 들어 있어야 실행됩니다.'},
flash:{n:'플래시게임',f:'FLASH',eng:'swf',ex:['swf'],note:'Ruffle 플래시 에뮬레이터로 실행합니다. 일부 오래된 ActionScript 3 게임은 안 열릴 수 있어요.'}
},
CATS:[
{k:'pc',n:'PC게임',ms:['win31','win95','win98','msdos']},{k:'dos',n:'도스게임',ms:['dosgame','win31game','win95game']},
{k:'classic',n:'고전게임',ms:['nes','snes','sms','pce','md','n64','psx','segacd','saturn','s32x','3do','jaguar','atari2600','handheld']},
{k:'arcade',n:'오락실게임',ms:['mame']},{k:'folder',n:'폴더폰게임',ms:['folderphone']},{k:'web',n:'웹게임',ms:['webgame']},
{k:'java',n:'자바게임',ms:['java']},{k:'html5',n:'HTML5게임',ms:['html5']},{k:'flash',n:'플래시게임',ms:['flash']}],
WHY:{zip:'압축(zip) 파일 한 개 안에 게임이 들어 있는 형태입니다. 압축을 풀지 말고 zip 그대로 올리세요.',
cue:'.cue 는 안내 파일이라 혼자서는 실행되지 않습니다. .bin 과 함께 zip 으로 묶거나 .chd 로 바꿔 올리세요.',
bin:'CD 기종에서는 .cue 와 짝인 데이터 파일이라 .cue 와 함께 zip 으로 묶어야 합니다. 메가드라이브·아타리는 롬 파일 그 자체입니다.',
chd:'CD 이미지를 한 파일로 줄인 형식이라 가장 안정적입니다. 용량도 작아서 추천합니다.',
iso:'CD 이미지 한 파일 형식입니다. 바로 실행할 수 있습니다.',img:'CD 이미지 한 파일 형식입니다.',pbp:'플레이스테이션 게임 한 파일 형식이라 용량이 작아 휴대폰에서도 잘 돌아갑니다.',
m3u:'여러 장짜리 CD 게임의 목록 파일입니다. CD 이미지와 같은 폴더에 두고 zip 으로 묶으세요.',
jsdos:'JSDOS 변환기로 만든 게임 파일입니다(도스·윈도우 3.1·윈도우 95 공용). 폴더를 zip 으로 묶고 .jsdos 설정 파일을 넣은 형태예요.',swf:'플래시 게임 파일입니다.',html:'브라우저에서 바로 열리는 웹 게임입니다.',htm:'브라우저에서 바로 열리는 웹 게임입니다.',
jar:'자바 게임 파일입니다(지금은 보관만 가능).',jad:'자바 게임 설명 파일입니다(지금은 보관만 가능).'},
BAD:{'7z':'7z 는 브라우저 에뮬레이터가 풀지 못합니다. zip 으로 다시 압축해 올리세요.',rar:'rar 는 브라우저 에뮬레이터가 풀지 못합니다. zip 으로 다시 압축해 올리세요.',
exe:'.exe 는 윈도우 프로그램이라 직접 실행할 수 없습니다. 윈도우/DOS 기종에서 쓰세요.',txt:'설명 파일이라 게임이 아닙니다.',json:'설명 파일이라 게임이 아닙니다.',md:'설명 파일이라 게임이 아닙니다.'}
};

/* 게임목록 위에 보이는 '게임 올리는 방법' 안내문 */
RD.guide=function(m,open){var ex=m.ex.map(function(e){return'.'+e}).join(' '),e1='.'+m.ex[0];
var more=m.ex.map(function(e){return RD.WHY[e]?'<li><b>.'+e+'</b> '+RD.WHY[e]+'</li>':''}).join('')
+(m.cd?'<li>CD 게임은 용량이 커서 저사양 폰에서 느릴 수 있어요. .chd 로 줄이면 가장 안정적입니다.</li>':'')
+(m.bios?'<li><b>바이오스</b> '+m.bios[0]+' 같은 파일을 올려 두면 자동으로 사용합니다. (본인이 합법적으로 가진 것만)</li>':'')+(m.note?'<li>'+m.note+'</li>':'');
return'<details class="card guide"'+(open?' open':'')+'><summary>게임 올리는 방법</summary>'
+'<p style="margin:10px 0 0">게임을 올리려면 <b>게임 파일('+ex+')</b>과 <b>이름이 같은 사진</b>을 함께 선택해서 올려주세요. 사진은 없어도 올릴 수 있어요.</p>'
+'<ol><li><b>게임추가</b> 버튼을 누르세요.</li><li>게임 파일을 고르세요. 예: <b>game'+e1+'</b></li><li>같은 이름의 사진을 고르세요. 예: <b>game.png</b> (없으면 건너뛰어도 돼요)</li><li>GitHub 토큰을 넣고 <b>올리기</b>를 누르세요.</li></ol>'
+'<p class="pill">올린 게임은 <b>ROMS/'+m.f+'/</b> 폴더에 저장되고, 사진이 없으면 목록에 파란 배경의 ‘사진없음’으로 보여요.</p>'
+(more?'<details><summary style="font-size:16px;color:var(--mut)">파일 종류 자세히 보기</summary><ul>'+more+'</ul></details>':'')+'</details>'};
