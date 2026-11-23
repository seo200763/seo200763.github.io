/* dospad.js — js-dos 용 기기별 화면(모바일/태블릿/PC) + 키 전달 보정
   · 엔터/스페이스/ESC 등이 게임에 안 먹는 문제: 키를 직접 가로채 js-dos 에 '충분히 길게' 눌렀다 뗍니다.
   · 모바일: 방향키 + 버튼 패드 (세로: 화면 아래, 가로: 화면 좌우), 태블릿: 켜고 끌 수 있는 작은 패드, PC: 키보드 그대로
   사용:  GWPad.init({root:'#dos', win:false});  js-dos 의 onEvent 에서 ci-ready 때  GWPad.setCI(ci);  */
(function (W) {
  var K = { Enter: 257, NumpadEnter: 257, Space: 32, Escape: 256, Tab: 258, Backspace: 259,
    ArrowRight: 262, ArrowLeft: 263, ArrowDown: 264, ArrowUp: 265, ShiftLeft: 340, ShiftRight: 344,
    ControlLeft: 341, ControlRight: 345, AltLeft: 342, AltRight: 346, Comma: 44, Period: 46 };
  for (var i = 0; i < 26; i++) K['Key' + String.fromCharCode(65 + i)] = 65 + i;
  for (i = 0; i < 10; i++) { K['Digit' + i] = 48 + i; K['Numpad' + i] = 320 + i; }
  for (i = 1; i <= 12; i++) K['F' + i] = 289 + i;
  var HOLD = { 257: 1, 32: 1, 256: 1, 258: 1 };          /* 최소 유지 시간이 필요한 키 */
  var ci = null, down = {}, since = {}, mode = 'pc', root, box, winMode = false, padOn = true;

  function detect() {
    var q = new URLSearchParams(location.search).get('ui');
    if (q === 'mobile' || q === 'tablet' || q === 'pc') return q;
    var touch = (W.matchMedia && matchMedia('(pointer:coarse)').matches) || navigator.maxTouchPoints > 1;
    var s = Math.min(screen.width, screen.height);
    return touch ? (s < 600 ? 'mobile' : 'tablet') : 'pc';
  }
  function send(code, on) { if (ci && ci.sendKeyEvent) { try { ci.sendKeyEvent(code, on); } catch (e) { } } }
  function press(code) { if (down[code]) return; down[code] = 1; since[code] = Date.now(); send(code, true); }
  function release(code) {
    if (!down[code]) return;
    var wait = HOLD[code] ? Math.max(0, 110 - (Date.now() - since[code])) : 0;
    setTimeout(function () { down[code] = 0; send(code, false); }, wait);
  }
  function focusDos() { var c = root && (root.querySelector('canvas') || root); try { c.setAttribute('tabindex', '0'); c.focus({ preventScroll: true }); } catch (e) { } }

  /* ---- 실제 키보드: 엔터 등 중요한 키는 직접 전달 (IME 한글 입력 상태에서도 동작) ---- */
  function onKey(e) {
    var code = K[e.code]; if (!code || !ci) return;
    if (e.code === 'F5' || e.code === 'F11' || e.code === 'F12') return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (e.type === 'keydown') { if (!e.repeat) press(code); else send(code, true); }
    else release(code);
  }

  /* ---- 화면 패드 ---- */
  function btn(label, codes, cls, big) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.className = 'gwb ' + (cls || '');
    var list = [].concat(codes), act = 0;
    function on(e) { e.preventDefault(); if (act) return; act = 1; b.classList.add('on'); list.forEach(press); if (navigator.vibrate) try { navigator.vibrate(8); } catch (_) { } }
    function off(e) { if (e) e.preventDefault(); if (!act) return; act = 0; b.classList.remove('on'); list.forEach(release); }
    b.addEventListener('pointerdown', function (e) { try { b.setPointerCapture(e.pointerId); } catch (_) { } on(e); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) { b.addEventListener(t, off); });
    b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    return b;
  }
  var CSS = '.gwpad{position:fixed;z-index:25;user-select:none;-webkit-user-select:none;touch-action:none;font-family:system-ui,"Malgun Gothic",sans-serif}' +
    '.gwb{font:700 15px/1 system-ui,sans-serif;color:#fff;background:rgba(30,70,160,.62);border:2px solid rgba(255,255,255,.55);border-radius:14px;min-width:46px;height:46px;padding:0 8px;touch-action:none;-webkit-tap-highlight-color:transparent}' +
    '.gwb.on{background:rgba(255,255,255,.75);color:#123}.gwb.rd{border-radius:50%;width:58px;height:58px;font-size:17px}' +
    '.gwdp{position:fixed;display:grid;grid-template-columns:repeat(3,58px);grid-template-rows:repeat(3,58px);gap:4px}.gwdp .gwb{min-width:0;width:58px;height:58px;font-size:22px}' +
    '.gwab{position:fixed;display:grid;grid-template-columns:repeat(2,64px);gap:8px}' +
    '.gwtop{position:fixed;display:flex;gap:6px;flex-wrap:wrap}.gwtop .gwb{height:36px;min-width:40px;font-size:13px;border-radius:10px}' +
    '.gwkeys{position:fixed;display:none;flex-wrap:wrap;gap:5px;max-width:min(520px,92vw);background:rgba(0,0,30,.78);padding:8px;border-radius:12px}.gwkeys.show{display:flex}.gwkeys .gwb{height:38px;min-width:42px;font-size:13px}' +
    '.gwhide .gwdp,.gwhide .gwab{display:none}' +
    /* 세로 화면: 게임은 위, 패드는 아래 */
    '@media (orientation:portrait){.gwm #dos{height:calc(100% - 215px)!important}.gwm .gwdp{left:12px;bottom:max(12px,env(safe-area-inset-bottom))}.gwm .gwab{right:12px;bottom:max(34px,env(safe-area-inset-bottom))}.gwm .gwtop{left:8px;bottom:190px}.gwm .gwkeys{left:8px;bottom:232px}}' +
    /* 가로 화면: 게임 전체 + 좌우에 반투명 패드 */
    '@media (orientation:landscape){.gwm .gwdp{left:max(14px,env(safe-area-inset-left));bottom:14px;opacity:.85}.gwm .gwab{right:max(14px,env(safe-area-inset-right));bottom:20px;opacity:.85}.gwm .gwtop{left:50%;transform:translateX(-50%);bottom:8px}.gwm .gwkeys{left:50%;transform:translateX(-50%);bottom:52px}}' +
    '@media (orientation:portrait){.gww #dos{height:100%!important}.gww .gwtop{bottom:12px!important}.gww .gwkeys{bottom:56px!important}}' +
    '.gwt .gwdp{left:12px;bottom:12px;opacity:.8}.gwt .gwab{right:12px;bottom:18px;opacity:.8}.gwt .gwtop{right:10px;top:46px}.gwt .gwkeys{right:10px;top:90px}' +
    '.gwp .gwtop{right:10px;top:46px}.gwp .gwkeys{right:10px;top:90px}';

  function build() {
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    if (winMode) document.body.classList.add('gww');
    document.body.classList.add(mode === 'mobile' ? 'gwm' : mode === 'tablet' ? 'gwt' : 'gwp');
    box = document.createElement('div'); box.className = 'gwpad'; document.body.appendChild(box);
    var top = document.createElement('div'); top.className = 'gwtop';
    function tb(label, fn) { var b = document.createElement('button'); b.type = 'button'; b.className = 'gwb'; b.textContent = label; b.onclick = fn; top.appendChild(b); return b; }
    tb('⛶', fullscreen);
    var keysBox = document.createElement('div'); keysBox.className = 'gwkeys gwpad';
    var keyDefs = [['Esc', 256], ['Enter', 257], ['Space', 32], ['Tab', 258], ['Y', 89], ['N', 78], ['1', 49], ['2', 50], ['3', 51], ['4', 52], ['5', 53], ['F1', 290], ['F2', 291], ['F3', 292], ['F4', 293], ['F5', 294], ['F10', 299], ['Shift', 340], ['Ctrl', 341], ['Alt', 342], ['BS', 259]];
    keyDefs.forEach(function (d) { keysBox.appendChild(btn(d[0], d[1])); });
    tb('⌨', function () { keysBox.classList.toggle('show'); });
    if (mode !== 'pc') tb('🎮', function () { padOn = !padOn; document.body.classList.toggle('gwhide', !padOn); });
    box.appendChild(top); box.appendChild(keysBox);
    if (mode !== 'pc' && !winMode) {
      var dp = document.createElement('div'); dp.className = 'gwdp';
      var cells = [null, ['▲', K.ArrowUp], null, ['◀', K.ArrowLeft], ['●', K.Enter], ['▶', K.ArrowRight], null, ['▼', K.ArrowDown], null];
      cells.forEach(function (c) { if (!c) { dp.appendChild(document.createElement('span')); return; } dp.appendChild(btn(c[0], c[1])); });
      var ab = document.createElement('div'); ab.className = 'gwab';
      [['Enter', K.Enter], ['Space', K.Space], ['Ctrl', K.ControlLeft], ['Alt', K.AltLeft], ['Shift', K.ShiftLeft], ['Esc', K.Escape]].forEach(function (d) { ab.appendChild(btn(d[0], d[1], 'rd')); });
      box.appendChild(dp); box.appendChild(ab);
    }
    /* 패드 요소는 box 안이지만 fixed 로 배치되므로 box 자체는 클릭을 막지 않게 */
    box.style.cssText = 'position:static;pointer-events:none'; box.querySelectorAll('button').forEach(function (b) { b.style.pointerEvents = 'auto'; });
    keysBox.style.pointerEvents = 'auto';
    if (mode === 'tablet') { padOn = false; document.body.classList.add('gwhide'); }   /* 태블릿은 기본 숨김 (🎮 로 켜기) */
  }
  function fullscreen() {
    var el = document.documentElement, f = document.fullscreenElement;
    if (f) { try { document.exitFullscreen(); } catch (_) { } return; }
    var p = (el.requestFullscreen || el.webkitRequestFullscreen || function () { return Promise.reject(); }).call(el);
    Promise.resolve(p).then(function () { try { screen.orientation.lock('landscape'); } catch (_) { } }).catch(function () { });
  }

  W.GWPad = {
    mode: function () { return mode; },
    init: function (o) {
      o = o || {}; root = document.querySelector(o.root || '#dos'); winMode = !!o.win; mode = detect();
      build();
      window.addEventListener('keydown', onKey, true); window.addEventListener('keyup', onKey, true);
      window.addEventListener('blur', function () { Object.keys(down).forEach(function (c) { if (down[c]) { down[c] = 0; send(+c, false); } }); });
      document.addEventListener('pointerdown', function (e) { if (!(e.target.closest && e.target.closest('.gwpad,#back'))) focusDos(); }, true);
      document.addEventListener('contextmenu', function (e) { if (mode !== 'pc') e.preventDefault(); });
      return mode;
    },
    setCI: function (c) { ci = c; setTimeout(focusDos, 300); },
    focus: focusDos
  };
})(window);
