/* 로그인 확인 — 모든 페이지 맨 위에서 실행됩니다. 로그인하지 않았으면 login.html 로 보냅니다. */
(function(){var K='yh_s',B=(document.currentScript&&document.currentScript.src||'').replace(/auth\.js.*$/,'');
function ok(){try{var s=JSON.parse(sessionStorage.getItem(K));return s&&s.t?s:null}catch(e){return null}}
var s=ok();
if(!s){document.documentElement.style.display='none';location.replace(B+'login.html?next='+encodeURIComponent(location.href));return}

window.YH={logout:function(){try{sessionStorage.removeItem(K)}catch(e){}location.replace(B+'login.html')}};})();
