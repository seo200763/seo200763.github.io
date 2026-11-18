(function(){var B=(document.currentScript.src||'').replace(/gw\.js.*$/,'');
var SV={html5:'<svg viewBox="0 0 64 72"><polygon points="4,4 60,4 55,60 32,68 9,60" fill="#f26a21"/><polygon points="32,10 32,62 50,56 54,10" fill="#ff8a3d"/><text x="32" y="46" font-size="36" font-weight="900" text-anchor="middle" fill="#fff" font-family="sans-serif">5</text></svg>',
flash:'<svg viewBox="0 0 64 64"><rect x="2" y="2" width="60" height="60" rx="10" fill="#e8271f" stroke="#0b1b4a" stroke-width="3"/><text x="33" y="50" font-size="52" font-style="italic" font-weight="900" text-anchor="middle" fill="#fff" font-family="serif">f</text></svg>'};
var ST={html5:['#12b5c9','#d9f7fb'],flash:['#b36bff','#efe3ff']};
window.GW={base:B,esc:function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})},
tile:function(o){var a=document.createElement('a');a.className='tile';a.href=o.href;a.setAttribute('aria-label',o.label);
if(o.img)a.innerHTML='<img src="'+B+'gameicons/'+o.img+'.webp" alt="'+o.label+'">';
else{var s=o.svg?ST[o.svg]:[o.c||'#888','#f1f6ff'];a.innerHTML='<div class="gt" style="--c:'+s[0]+';--b:'+s[1]+'">'+(o.svg?SV[o.svg]:'<span class="bd">'+GW.esc(o.l||'')+'</span>')+'<b>'+GW.esc(o.label)+'</b></div>'}return a}};})();
