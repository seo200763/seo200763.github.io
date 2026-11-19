/* js-dos 번들 도우미 (화면과 무관한 순수 함수) — dosplay.html 이 사용합니다. */
(function (root) {
  var BAD = /(setup|install|uninst|unwise|config|readme|dos4gw|pkunzip|vesa|univbe|extract|patch|cwsdpmi)/i;

  function ext(n) { var i = n.lastIndexOf('.'); return i < 0 ? '' : n.slice(i + 1).toLowerCase(); }
  function norm(p) { return String(p).replace(/\\/g, '/').replace(/^\/+/, ''); }

  /* 실행 후보 (exe/com/bat). 설치/설정용 파일은 뒤로, 얕은 폴더 먼저 */
  function pickExes(names, kind) {
    var ok = kind === 'win' ? ['exe', 'pif', 'bat', 'com'] : ['exe', 'com', 'bat'];
    var list = names.map(norm).filter(function (n) {
      return ok.indexOf(ext(n)) >= 0 && !/^\.jsdos\//i.test(n) && !/^windows\//i.test(n);
    });
    list.sort(function (a, b) {
      var ba = BAD.test(a) ? 1 : 0, bb = BAD.test(b) ? 1 : 0;
      if (ba !== bb) return ba - bb;
      var da = a.split('/').length, db = b.split('/').length;
      if (da !== db) return da - db;
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    });
    return list;
  }

  function hasBundleConf(names) {
    return names.some(function (n) { return /^\.jsdos\/dosbox\.conf$/i.test(norm(n)); });
  }

  /* 윈도우 3.1(WIN.COM 이 든 폴더) 찾기. 없으면 null */
  function findWin31(names) {
    for (var i = 0; i < names.length; i++) {
      var m = /^(?:(.*)\/)?([^\/]+)\/win\.com$/i.exec(norm(names[i]));
      if (m && /^(windows|win|win31|win3)$/i.test(m[2])) return { parent: m[1] || '', dir: m[2] };
    }
    return null;
  }

  function dosConf(exe) {
    exe = norm(exe);
    var d = exe.lastIndexOf('/') >= 0 ? exe.slice(0, exe.lastIndexOf('/')) : '', n = exe.slice(exe.lastIndexOf('/') + 1);
    var a = ['@echo off', 'mount c .', 'c:'];
    if (d) a.push('cd ' + d.replace(/\//g, '\\'));
    a.push(n);
    return '[sdl]\nautolock=true\n\n[dosbox]\nmachine=svga_s3\nmemsize=16\n\n[cpu]\ncore=auto\ncycles=auto\n\n[autoexec]\n' + a.join('\n') + '\n';
  }

  function win31Conf(w, exe) {
    var cd = 'cd \\' + (w.parent ? w.parent.replace(/\//g, '\\') + '\\' : '') + w.dir;
    var a = ['@echo off', 'mount c .', 'c:', cd, exe ? 'win C:\\' + norm(exe).replace(/\//g, '\\') : 'win'];
    return '[sdl]\nautolock=true\n\n[dosbox]\nmachine=svga_s3\nmemsize=32\n\n[video]\nvmemsize=4\n\n[cpu]\ncore=auto\ncycles=auto\n\n[autoexec]\n' + a.join('\n') + '\n';
  }

  /* 윈도우 이미지 zip 안에서 디스크 이미지 하나 고르기 (가장 큰 .img/.ima/.vhd) */
  function pickImage(entries) {
    var best = null;
    entries.forEach(function (e) {
      if (/\.(img|ima|vhd)$/i.test(e.name) && (!best || e.size > best.size)) best = e;
    });
    return best;
  }

  /* 사이트의 공용 윈도우 이미지 위치: os/win95/win95.zip */
  function baseUrl(base) {
    if (!/^[a-z0-9_-]+$/i.test(base)) throw new Error('잘못된 base 이름: ' + base);
    return 'os/' + base + '/' + base + '.zip';
  }

  /* 사용할 엔진 옵션 */
  function jsdosOptions(meta, isShared) {
    var o = { autoStart: true, kiosk: false };
    var kind = (meta && meta.kind) || 'dos';
    if (kind !== 'dos' || (meta && meta.backend === 'dosboxX')) { o.backend = 'dosboxX'; }
    if (kind === 'win95') { o.autoSave = false; }
    return o;
  }

  var api = { ext: ext, norm: norm, pickExes: pickExes, hasBundleConf: hasBundleConf, findWin31: findWin31,
              dosConf: dosConf, win31Conf: win31Conf, pickImage: pickImage, baseUrl: baseUrl, jsdosOptions: jsdosOptions };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.GWJ = api;
})(typeof window !== 'undefined' ? window : this);
