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

  /* 사이트 윈도우 이미지(FAT16)의 C:\GAME.TXT 를 메모리 상에서 바꿔 쓴다.
     이미지의 AUTORUN.EXE 가 부팅할 때 GAME.TXT 에 적힌 게임을 실행한다. (v86 런처와 같은 방식)
     성공하면 true. 이미지 모양이 다르거나 GAME.TXT 가 없으면 false (이미지는 건드리지 않음) */
  function patchGameTxt(img, text) {
    if (/[^\x00-\x7f]/.test(text)) return false;       /* 한글 경로는 쓸 수 없음 */
    if (img.length < 1024) return false;
    var dv = new DataView(img.buffer, img.byteOffset, img.byteLength);
    if (dv.getUint16(510, true) !== 0xAA55) return false;
    var pt = img[446 + 4]; if (pt !== 4 && pt !== 6 && pt !== 0x0E) return false;
    var base = dv.getUint32(446 + 8, true) * 512;
    if (base + 512 > img.length) return false;
    var bps = dv.getUint16(base + 11, true), spc = img[base + 13], rsv = dv.getUint16(base + 14, true),
        nf = img[base + 16], rootn = dv.getUint16(base + 17, true), spf = dv.getUint16(base + 22, true);
    if (!bps || !spc || !spf || !rootn || !nf) return false;
    var root = base + (rsv + nf * spf) * bps, data0 = root + rootn * 32, csz = bps * spc;
    if (text.length > csz) return false;
    var name = 'GAME    TXT';
    for (var i = 0; i < rootn; i++) {
      var e = root + i * 32;
      if (e + 32 > img.length || img[e] === 0) break;
      if (img[e] === 0xE5) continue;
      var attr = img[e + 11]; if (attr === 0x0F || (attr & 0x18)) continue;
      var ok = true;
      for (var k = 0; k < 11; k++) if (img[e + k] !== name.charCodeAt(k)) { ok = false; break; }
      if (!ok) continue;
      var cl = dv.getUint16(e + 26, true); if (cl < 2) return false;
      var off = data0 + (cl - 2) * csz; if (off + csz > img.length) return false;
      for (var j = 0; j < csz; j++) img[off + j] = j < text.length ? text.charCodeAt(j) : 0;
      dv.setUint32(e + 28, text.length, true);
      return true;
    }
    return false;
  }

  /* meta.exe(상대 경로) -> GAME.TXT 내용: 1줄 실행파일, 빈 줄, 작업 폴더 (이미지의 기존 형식과 같음) */
  function gameTxtFor(exe, drive) {
    drive = (drive || 'D').toUpperCase();
    var p = norm(exe).replace(/\//g, '\\'), i = p.lastIndexOf('\\');
    var dir = i >= 0 ? p.slice(0, i + 1) : '';
    return drive + ':\\' + p + '\r\n\r\n' + drive + ':\\' + dir;
  }

  var api = { ext: ext, norm: norm, pickExes: pickExes, hasBundleConf: hasBundleConf, findWin31: findWin31,
              dosConf: dosConf, win31Conf: win31Conf, pickImage: pickImage, baseUrl: baseUrl, jsdosOptions: jsdosOptions, patchGameTxt: patchGameTxt, gameTxtFor: gameTxtFor };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.GWJ = api;
})(typeof window !== 'undefined' ? window : this);
