import re,base64,os
src=open('/home/claude/site/seo200763.github.io-main/index.html',encoding='utf-8').read()

CSS=r"""
:root{--cy:#35e6ff;--vi:#8b5cff;--mg:#e040fb;--pk:#ff4fa8;
 --kr:"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{background:#050035}
html,body{margin:0;min-height:100%;color:#fff;font-family:var(--kr)}
body{min-height:100dvh;overflow-x:hidden;background:transparent}
a{color:inherit;text-decoration:none}
button{font-family:inherit}
#skyBg{position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none}
#skyP{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none}
html.ds-saver #skyBg,html.ds-saver #skyP{opacity:.6}

.poster{position:relative;min-height:100vh;min-height:100dvh;overflow:hidden;isolation:isolate;display:flex;flex-direction:column;align-items:center;justify-content:center;
 gap:clamp(10px,2.4vh,24px);padding:max(18px,env(safe-area-inset-top)) 14px max(58px,env(safe-area-inset-bottom));
 background:#050138 url(menuicons/n-bg.webp) center bottom/cover no-repeat}
h1.title{margin:0;line-height:0}
h1.title img{display:block;height:auto;width:min(92vw,880px,calc(34vh*2.886));filter:drop-shadow(0 0 14px rgba(150,110,255,.55));animation:logoGlow 4s ease-in-out infinite alternate}
@keyframes logoGlow{from{filter:drop-shadow(0 0 8px rgba(120,160,255,.4))}to{filter:drop-shadow(0 0 20px rgba(255,130,235,.75))}}

.infobar{max-width:min(94vw,860px);padding:11px 20px;border:2px solid transparent;border-radius:14px;text-align:center;font:500 clamp(12px,3.3vw,19px)/1.5 var(--kr);word-break:keep-all;
 background:linear-gradient(rgba(8,10,70,.85),rgba(8,10,70,.85)) padding-box,linear-gradient(90deg,var(--cy),var(--vi) 55%,var(--pk)) border-box;
 box-shadow:0 0 14px rgba(53,230,255,.35),0 0 22px rgba(255,79,168,.22)}
.pick{display:flex;align-items:center;gap:16px;width:min(94vw,820px);margin:0;font:500 clamp(15px,4.2vw,22px) var(--kr);text-shadow:0 2px 10px rgba(0,0,40,.8)}
.pick:before,.pick:after{content:"";flex:1;height:2px;background:linear-gradient(90deg,transparent,var(--cy));box-shadow:0 0 8px var(--cy)}
.pick:after{background:linear-gradient(270deg,transparent,var(--pk));box-shadow:0 0 8px var(--pk)}
.pick span{white-space:nowrap}

.menu{display:grid;grid-template-columns:repeat(2,1fr);gap:12px 14px;width:min(92vw,470px)}
@media(min-width:760px){.menu{grid-template-columns:repeat(4,1fr);width:min(94vw,1180px);gap:18px}}
.bt{display:block;transition:transform .18s,filter .2s}
.bt img{display:block;width:100%;height:auto;filter:drop-shadow(0 0 8px rgba(80,120,255,.5))}
.bt:hover,.bt:focus-visible{transform:translateY(-5px);filter:brightness(1.15);outline:none}
.bt:active{transform:scale(.97)}

.mwrap{position:relative;margin-top:clamp(2px,1.5vh,14px);filter:drop-shadow(0 0 10px rgba(190,90,255,.75))}
.mbtn{position:relative;appearance:none;border:0;cursor:pointer;display:block;width:min(56vw,300px);height:clamp(52px,7vh,70px);padding:0;color:#fff;
 background:linear-gradient(90deg,var(--cy),var(--vi) 55%,var(--pk));clip-path:polygon(16px 0,calc(100% - 16px) 0,100% 50%,calc(100% - 16px) 100%,16px 100%,0 50%);transition:transform .18s}
.mbtn:before{content:"";position:absolute;inset:3px;background:linear-gradient(180deg,#1a0d78,#0d0650);clip-path:polygon(14px 0,calc(100% - 14px) 0,100% 50%,calc(100% - 14px) 100%,14px 100%,0 50%)}
.mbtn span{position:relative;display:flex;align-items:center;justify-content:center;gap:14px;font:700 clamp(18px,2.2vw,26px) var(--kr);letter-spacing:.04em}
.mbtn svg{width:28px;height:auto;fill:#fff}
.mwrap:hover .mbtn{transform:translateY(-3px)}
.mwrap .dot{display:none;position:absolute;top:-5px;right:10px;width:15px;height:15px;border-radius:50%;background:#ff3b5c;border:2px solid #fff;box-shadow:0 0 8px #ff3b5c;z-index:3}
body:has(#bNotice.new) .mwrap .dot{display:block}
.ver{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));z-index:2;font:500 clamp(11px,1.2vw,15px) var(--kr);color:#ff7ee9;text-shadow:0 0 8px rgba(224,64,251,.7)}

/* 메뉴 패널 */
#mp{position:fixed;inset:0;z-index:45;display:flex;align-items:center;justify-content:center;padding:14px;background:rgba(3,0,28,.72);opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s .25s}
#mp.on{opacity:1;visibility:visible;transition-delay:0s}
#mp .pn{width:min(100%,640px);max-height:90vh;max-height:90dvh;overflow:auto;padding:16px;border:2px solid var(--cy);border-radius:22px;background:linear-gradient(180deg,#14096a,#0a0540);box-shadow:0 0 22px rgba(53,230,255,.45),0 24px 60px rgba(0,0,30,.7)}
.pn-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding:0 4px}
.pn-h b{font:900 20px var(--kr);color:var(--cy)}
.pn-h button{border:0;border-radius:99px;background:linear-gradient(135deg,#ff6fb9,#c026d3);color:#fff;font:700 13.5px var(--kr);cursor:pointer;padding:7px 16px;box-shadow:0 0 12px rgba(224,64,251,.5)}
.tools{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.tb{appearance:none;background:none;border:0;padding:0;cursor:pointer;position:relative;transition:transform .18s,filter .2s}
.tb img{display:block;width:100%;height:auto;filter:drop-shadow(0 0 6px rgba(80,120,255,.45))}
.tb:hover,.tb:focus-visible{transform:translateY(-3px);filter:brightness(1.15);outline:none}
.tb:active{transform:scale(.97)}
.tb .dot{position:absolute;top:-4px;right:-3px;width:15px;height:15px;border-radius:50%;background:#ff3b5c;border:2px solid #fff;display:none;box-shadow:0 0 8px #ff3b5c}
.tb.new .dot{display:block}
.more{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.more a{flex:1 1 40%;text-align:center;padding:11px 8px;border-radius:12px;border:1px solid rgba(120,160,255,.45);background:rgba(60,50,190,.3);font:700 14px var(--kr)}
.more a:hover{background:rgba(80,70,220,.5)}
.foot{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 16px;margin-top:14px;font:400 12px var(--kr);color:#b9c3ff}
.foot b{color:#ffe08a;font-weight:700}
.foot .vis{display:inline-flex;gap:10px;align-items:center}
.foot .vis u{width:1px;height:11px;background:rgba(185,195,255,.45);text-decoration:none}
.keep{display:inline-flex;align-items:center;gap:7px;cursor:pointer;user-select:none;color:#e2e7ff}
.keep input{width:16px;height:16px;accent-color:#ff4fa8}
.foot .lk{display:inline-flex;gap:12px;flex-wrap:wrap;justify-content:center}
.foot .lk a,.foot .lk button{appearance:none;background:none;border:0;border-bottom:1px dotted rgba(185,195,255,.6);padding:0 0 1px;color:#b9c3ff;font:inherit;cursor:pointer}
.foot .lk a:hover,.foot .lk button:hover{color:#fff;border-color:#fff}
.foot button:disabled{opacity:.6}

"""

HTML=r"""<canvas id="skyBg" aria-hidden="true"></canvas>
<div class="poster">
  <canvas id="skyP" aria-hidden="true"></canvas>
  <h1 class="title"><img src="menuicons/n-logo.webp" alt="영호의 게임세상" width="1100" height="381" decoding="async"></h1>
  <div class="infobar">이 사이트는 게임을 제공하는 사이트가 아닙니다. 콘솔게임 웹에뮬레이터 사이트입니다.</div>
  <p class="pick"><span>사용하시는 기종을 선택하세요.</span></p>
  <nav class="menu" aria-label="기종 선택">
    <a class="bt" href="emulator.html" data-k="e"><img src="menuicons/n-pc.webp" alt="PC"></a>
    <a class="bt" href="mobile.html" data-k="m"><img src="menuicons/n-mobile.webp" alt="Mobile"></a>
    <a class="bt" href="gallery.html"><img src="menuicons/n-photo.webp" alt="Photo"></a>
    <a class="bt" href="music.html"><img src="menuicons/n-music.webp" alt="Music"></a>
  </nav>
  <div class="mwrap"><button type="button" class="mbtn" id="mBtn" aria-haspopup="dialog"><span><svg viewBox="0 0 28 20" aria-hidden="true"><rect width="6" height="4"/><rect x="9" width="19" height="4"/><rect y="8" width="6" height="4"/><rect x="9" y="8" width="19" height="4"/><rect y="16" width="6" height="4"/><rect x="9" y="16" width="19" height="4"/></svg>메뉴</span></button><i class="dot"></i></div>
  <span class="ver">영호의 게임세상 &nbsp;v1.0</span>
</div>

<div id="mp" aria-hidden="true"><div class="pn" role="dialog" aria-modal="true" aria-label="메뉴">
  <div class="pn-h"><b>메뉴</b><button type="button" id="mpX">닫기</button></div>
  <nav class="tools" aria-label="안내 메뉴">
    <button type="button" class="tb" id="bInstall"><img src="menuicons/n-install.webp" alt="어플 설치하기"></button>
    <button type="button" class="tb" id="bSave"><img src="menuicons/n-save.webp" alt="세이브파일 저장방법"></button>
    <button type="button" class="tb" id="bHow"><img src="menuicons/n-howto.webp" alt="에뮬레이터 사용법"></button>
    <button type="button" class="tb" id="bNotice"><img src="menuicons/n-notice.webp" alt="공지사항"><i class="dot"></i></button>
  </nav>
  <div class="more">
    <a href="romsite.html">Rom Site · 롬파일 찾기</a>
    <a href="GAMESTART/index.html">🎮 WEB GAMES · 웹 포팅 PC게임</a>
  </div>
  <div class="foot">
    <span class="vis"><span>오늘 방문 <b id="vToday">…</b></span><u></u><span>전체 방문 <b id="vTotal">…</b></span></span>
    <label class="keep"><input type="checkbox" id="keep">다음부터 이 화면으로 바로 접속</label>
    <span class="lk">
      <a href="multi/win10.html" data-k="x">멀티기능</a>
      <a href="videos.html" data-k="v">게임동영상</a>
      <a href="classic.html" data-k="c">통합화면</a>
      <button type="button" id="bCache"><span id="bCacheT">캐쉬삭제</span></button>
      <button type="button" class="js-wipe" id="bWipe"><span id="bWipeT">데이터삭제</span></button>
    </span>
  </div>
</div></div>
<script>
(function(){var p=document.getElementById('mp');function o(v){p.classList.toggle('on',v);p.setAttribute('aria-hidden',v?'false':'true')}
document.getElementById('mBtn').onclick=function(){o(true)};document.getElementById('mpX').onclick=function(){o(false)};
p.addEventListener('click',function(e){if(e.target===p)o(false)});addEventListener('keydown',function(e){if(e.key==='Escape')o(false)})})();
</script>

"""

# 1) CSS 교체 (기존 안내시트/설치배너 CSS는 유지)
m='/* ───────── 안내 시트(공지·설치·게임방법) ───────── */'
a=src.index('<style>')+len('<style>'); b=src.index('</style>')
old_tail=src[src.index(m):b]
out=src[:a]+CSS+old_tail+src[b:]
# 2) 본문 마크업 교체: skyBg 캔버스 ~ 안내 시트 직전
s=out.index('<canvas id="skyBg"'); e=out.index('<div id="sh" aria-hidden="true">')
out=out[:s]+HTML+out[e:]
out=out.replace('<title>영호의 게임에뮬레이터</title>','<title>영호의 게임세상</title>')
os.makedirs('/home/claude/build',exist_ok=True)
open('/home/claude/build/index.html','w',encoding='utf-8').write(out)

# 3) 미리보기용(이미지 내장)
prev=out
for f in sorted(os.listdir('/home/claude/build/menuicons')):
    d=base64.b64encode(open('/home/claude/build/menuicons/'+f,'rb').read()).decode()
    prev=prev.replace('menuicons/'+f,'data:image/webp;base64,'+d)
prev=re.sub(r'<script src="(noads|saver)\.js"></script>\n','',prev)
prev=prev.replace('<script src="adnotice.js" defer></script>\n','')
open('/mnt/user-data/outputs/index-preview.html','w',encoding='utf-8').write(prev)
print(len(out),len(prev))
