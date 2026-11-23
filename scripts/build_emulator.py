import re,base64,os
SRC='/home/claude/site/seo200763.github.io-main/emulator.html'
src=open(SRC,encoding='utf-8').read()
U=lambda s:re.sub(r'@(\d+(?:\.\d+)?)',lambda m:'calc(var(--u)*%s)'%m.group(1),s)

CSS=U(r"""
/* ===== 시안(게임 에뮬레이터 선택) 디자인 : 16:9 배경 위에 실제 버튼·기종 타일을 올림 ===== */
html #rp{--u:calc(min(100vw,177.7778vh) / 1672);--rpdef:url(emuicons/bg.webp);background:#9cc8f7 var(--rpbg,var(--rpdef)) center/cover no-repeat;overflow:hidden}
#rp .st{position:absolute;left:50%;top:50%;width:@1672;height:@941;transform:translate(-50%,-50%);background:url(emuicons/bg.webp) 0 0/100% 100% no-repeat}
#rp .ttl{display:none}
#rp .bk{position:absolute;left:@30;top:@855;width:@242;height:@76;border:0;border-radius:@38;background:transparent;cursor:pointer;transition:background .2s}
#rp .bk:hover{background:rgba(255,255,255,.28)}
#rp .bk span{display:none}
#rp .tb{position:absolute;left:@300;width:@930;top:@868;display:flex;justify-content:center;gap:@10}
#rp .tb .rp-nav{font-size:max(10px,@17);padding:@9 @14;color:#1f4e84;background:rgba(255,255,255,.62)}
#rp .pn{position:absolute;left:@528;top:@192;width:@1124;height:@648;border-radius:@34;background:linear-gradient(180deg,#d8e9fe,#ecf7fd);box-shadow:inset 0 0 0 @3 rgba(255,255,255,.75)}
#rp .sc{position:absolute;inset:@14 @8 @14 @22;overflow-y:auto;padding:0 @10 0 0;scrollbar-width:thin;scrollbar-color:#5b9bf0 #cfe3fb}
#rp .sc::-webkit-scrollbar{width:max(8px,@14)}
#rp .sc::-webkit-scrollbar-track{background:#cfe3fb;border-radius:99px}
#rp .sc::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#8fc3ff,#4d8fee);border-radius:99px;border:2px solid #e8f3ff}
#rp .stt{position:absolute;width:@84;height:@84;pointer-events:none;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 6l7.5 16.5 18 2-13.4 12.2 3.8 17.8L32 45.2 16.1 54.5l3.8-17.8L6.5 24.5l18-2z' fill='%23ffe27a' stroke='%23ffb347' stroke-width='4' stroke-linejoin='round'/%3E%3C/svg%3E") center/contain no-repeat;filter:drop-shadow(0 3px 4px rgba(60,120,200,.35))}
#rp .s1{left:@555;top:@155}#rp .s2{left:@1558;top:@150}#rp .s3{left:@518;top:@778}#rp .s4{left:@1563;top:@780}
#rp .sc .rp-sec{margin:@10 @4 @12;font-size:max(11px,@17);color:#2f6fb5;text-shadow:0 1px 0 #fff}
#rp .sc .rp-sec::after{background:linear-gradient(90deg,#7fb2f0,rgba(127,178,240,0))}
#rp .sc .rp-sec:not(:first-child){margin-top:@26}
#rp .sc .rp-ft{margin-top:@28;color:#4a78b0;text-shadow:none;font-size:max(10px,@14)}
#rp .rp-grid{grid-template-columns:repeat(4,1fr);gap:@18}
#rp .rp-it{transition:transform .18s,filter .2s}
#rp .rp-it:hover,#rp .rp-it:focus-visible{transform:translateY(-3px);filter:brightness(1.06)}
#rp .rp-it:active{transform:scale(.97)}
#rp .rp-it.img img{display:block;width:100%;aspect-ratio:600/410;filter:drop-shadow(0 4px 8px rgba(60,120,200,.25))}
#rp .rp-it:not(.img){aspect-ratio:600/410;justify-content:center;gap:0;border:max(2px,@3) solid #77abf0;border-radius:@30;background:linear-gradient(160deg,#f1f9ff,#cfe5fc);padding:@8}
#rp .rp-it:not(.img) .rp-box,#rp .rp-it:not(.img):hover .rp-box{width:auto;height:58%;aspect-ratio:1;border:0;background:none;box-shadow:none;transform:none;-webkit-backdrop-filter:none;backdrop-filter:none}
#rp .rp-it:not(.img) .rp-box img,#rp .rp-it:not(.img) .rp-box svg{width:100%;height:100%}
#rp .rp-it:not(.img) .rp-nm{color:#1b3fb8;background:none;text-shadow:0 0 3px #fff,0 0 3px #fff;font-size:max(11px,@21);font-weight:700;padding:0}
@media not all and (min-aspect-ratio:13/10){
 html #rp{--rpdef:linear-gradient(180deg,#8cc4ff,#d9eeff);overflow-y:auto}
 #rp .st{position:static;width:auto;height:auto;transform:none;background:none;max-width:780px;margin:0 auto;padding:10px 12px 36px;display:flex;flex-direction:column;gap:12px}
 #rp .ttl{display:block;width:100%;height:auto;-webkit-mask-image:radial-gradient(ellipse 62% 72% at 50% 50%,#000 60%,transparent 100%);mask-image:radial-gradient(ellipse 62% 72% at 50% 50%,#000 60%,transparent 100%)}
 #rp .bk{position:static;width:auto;height:auto;align-self:flex-start;border:1px solid #fff;background:rgba(255,255,255,.6);color:#1f4e84;font:600 14px 'Fredoka','Noto Sans KR',sans-serif;padding:8px 16px;border-radius:99px}
 #rp .bk span{display:inline}
 #rp .tb{position:static;width:auto;flex-wrap:wrap;justify-content:flex-start;gap:6px}
 #rp .tb .rp-nav{font-size:12.5px;padding:7px 10px}
 #rp .pn{position:static;width:auto;height:auto;border-radius:22px;padding:10px;border:2px solid #fff}
 #rp .sc{position:static;overflow:visible;padding:0}
 #rp .stt{display:none}
 #rp .rp-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
 #rp .rp-it:not(.img){border-radius:18px}
 #rp .rp-it:not(.img) .rp-nm{font-size:13px}
 #rp .sc .rp-sec{font-size:13px}
}
""")

MARK=r"""<div id="rp">
 <div class="st">
  <img class="ttl" src="emuicons/title.webp" alt="게임 에뮬레이터 선택">
  <button type="button" class="bk" id="rVer" aria-label="뒤로가기"><span>‹ 뒤로가기</span></button>
  <div class="tb">
   <button type="button" class="rp-nav" id="rNotice">공지사항</button>
   <button type="button" class="rp-nav" id="rGuide">안내</button>
   <button type="button" class="rp-nav js-cache" id="rCache">캐쉬지우기</button>
   <button type="button" class="rp-nav" id="rBg">배경선택</button>
   <button type="button" class="rp-nav" id="rIcon">아이콘선택</button>
  </div>
  <div class="pn"><div class="sc">
   <div class="rp-sec">GAME CONSOLES</div><div class="rp-grid" id="rpC"></div>
   <div class="rp-sec">PC · DOS · WINDOWS</div><div class="rp-grid" id="rpP"></div>
   <div class="rp-sec">TOOLS</div><div class="rp-grid" id="rpT"></div>
   <div class="rp-ft">ROM 파일은 본인이 합법적으로 소유한 게임만 사용하세요 · EmulatorJS · v86</div>
  </div></div>
  <i class="stt s1"></i><i class="stt s2"></i><i class="stt s3"></i><i class="stt s4"></i>
 </div>
</div>
"""
IDS=['atari2600','nes','sms','pce','md','gb','lynx','snes','gg','segacd','3do']
IMGT='var IMGT={'+','.join("'%s':'emuicons/%s.webp'"%(i,i) for i in IDS)+'};\n'
TILE=("function tile(kind,id,name,inner){\n"
 "  if(kind==='c'&&mode==='color'&&IMGT[id])return '<button type=\"button\" class=\"rp-it img\" data-k=\"c\" data-id=\"'+id+'\" title=\"'+esc(name)+'\"><img src=\"'+IMGT[id]+'\" alt=\"'+esc(name)+'\" draggable=\"false\"></button>';\n")

out=src
# 1) CSS
k=out.index('</style>\n<link rel="stylesheet" href="cutegame.css?v=1">')
out=out[:k]+CSS+out[k:]
# 2) 마크업
s=out.index('<div id="rp">'); e=out.index('<div id="rpm"')
out=out[:s]+MARK+out[e:]
# 3) JS
assert "function tile(kind,id,name,inner){\n" in out and "var mode=ls.get('rpIcon','color');" in out
out=out.replace("function tile(kind,id,name,inner){\n",TILE,1)
out=out.replace("var mode=ls.get('rpIcon','color');",IMGT+"var mode=ls.get('rpIcon','color');",1)
# 4) rVer 는 그대로 index.html?select=1 로 이동(뒤로가기)
os.makedirs('/home/claude/b2/out',exist_ok=True)
open('/home/claude/b2/out/emulator.html','w',encoding='utf-8').write(out)

# ---- 미리보기(이미지 내장, 홈 화면만) ----
rpcss=src[src.index('<style id="rpcss">')+len('<style id="rpcss">'):src.index('</style>',src.index('<style id="rpcss">'))]
C=[('atari2600','Atari 2600'),('nes','Famicom / NES'),('sms','Master System'),('pce','PC Engine'),('md','Mega Drive / Genesis'),('gb','Game Boy'),('lynx','Atari Lynx'),('snes','Super Famicom / SNES'),('gg','Game Gear'),('segacd','Sega CD'),('3do','3DO'),('jaguar','Atari Jaguar'),('psx','PlayStation'),('saturn','Sega Saturn'),('s32x','Sega 32X'),('vb','Virtual Boy'),('n64','Nintendo 64'),('ngp','Neo Geo Pocket'),('gbc','Game Boy Color'),('dc','Dreamcast'),('ps2','PlayStation 2'),('gba','Game Boy Advance'),('gc','GameCube'),('mamegame','마메게임'),('nds','Nintendo DS'),('wii','Wii')]
P=['MS-DOS','Windows 1.0','Windows 2.0','Windows 3.0','Windows 3.1','Windows 95','Windows 98']
T=['지도','메모장','계산기']
js=r"""
var IMGT=%s,C=%s,P=%s,T=%s;
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var IC='<svg viewBox="0 0 64 64"><rect x="8" y="22" width="48" height="24" rx="4"/><path d="M16 34h10M20.5 29.5v9"/><circle cx="42" cy="33" r="2.5"/><circle cx="48" cy="37" r="2.5"/></svg>';
function t(n,inner,img){return img?'<button class="rp-it img" title="'+esc(n)+'"><img src="'+img+'" alt="'+esc(n)+'"></button>':'<button class="rp-it" title="'+esc(n)+'"><span class="rp-box">'+inner+'</span><span class="rp-nm">'+esc(n)+'</span></button>'}
document.getElementById('rpC').innerHTML=C.map(function(c){return t(c[1],IC,IMGT[c[0]])}).join('');
document.getElementById('rpP').innerHTML=P.map(function(n){return t(n,IC)}).join('');
document.getElementById('rpT').innerHTML=T.map(function(n){return t(n,IC)}).join('');
""" % ('{'+','.join("'%s':'emuicons/%s.webp'"%(i,i) for i in IDS)+'}',str([list(x) for x in C]),str(P),str(T))
prev='<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>게임 에뮬레이터 선택 - 미리보기</title><link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap" rel="stylesheet"><style>html,body{margin:0;height:100%}'+rpcss+CSS+'</style></head><body>'+MARK+'<script>'+js+'</script></body></html>'
for f in os.listdir('emuicons'):
    if f.endswith('.webp'):
        d=base64.b64encode(open('emuicons/'+f,'rb').read()).decode()
        prev=prev.replace('emuicons/'+f,'data:image/webp;base64,'+d)
open('/mnt/user-data/outputs/emulator-preview.html','w',encoding='utf-8').write(prev)
print(len(out),len(prev))
