/* Arcane v2 — scattered eyes and the corner miasma. Loaded only at candle stage 3. */
(function () {
  if (window.arcaneV2) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var timers = [];
  var nodes = [];
  var cssLoaded = false;

  function ensureCss(cb) {
    if (cssLoaded) return cb();
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/arcane-v2.css';
    link.onload = function () { cssLoaded = true; cb(); };
    document.head.appendChild(link);
  }

  function eyeEl(extraClass, style, size) {
    var d = document.createElement('div');
    d.className = 'av2-eye ' + extraClass;
    if (style) for (var k in style) d.style[k] = style[k];
    var w = size || 20;
    d.innerHTML =
      '<svg viewBox="0 0 24 14" width="' + w + '" height="' + Math.round(w * 14 / 24) + '" aria-hidden="true">' +
      '<g class="av2-lid">' +
      '<path d="M2 7 Q12 -1.5 22 7 Q12 15.5 2 7 Z" fill="rgba(16,22,19,0.6)" stroke="#c9a85c" stroke-width="1" opacity="0.7"/>' +
      '<circle cx="12" cy="7" r="2.6" fill="#c9a85c" opacity="0.55"/>' +
      '<circle cx="12" cy="7" r="1.1" fill="#101613"/>' +
      '</g></svg>';
    return d;
  }

  function scheduleBlink(el) {
    if (reducedMotion) return;
    var t = setTimeout(function () {
      el.classList.add('av2-blink');
      timers.push(setTimeout(function () { el.classList.remove('av2-blink'); }, 190));
      scheduleBlink(el);
    }, 3500 + Math.random() * 9500);
    timers.push(t);
  }

  function addEye(el, parent) {
    (parent || document.body).appendChild(el);
    nodes.push(el);
    timers.push(setTimeout(function () { el.classList.add('av2-in'); }, 300 + Math.random() * 2200));
    scheduleBlink(el);
  }

  var tentPaths = [
    '<path d="M300 305 C 255 265, 275 210, 232 168 C 210 146, 218 118, 236 100 C 246 90, 244 76, 236 68" fill="none" stroke="#1d2c22" stroke-width="11" stroke-linecap="round"/>',
    '<path d="M305 260 C 260 250, 232 220, 226 185 C 221 156, 200 148, 184 152 C 172 155, 162 148, 158 138" fill="none" stroke="#182419" stroke-width="8" stroke-linecap="round"/>',
    '<path d="M260 305 C 250 258, 218 248, 205 215 C 196 191, 172 188, 158 198" fill="none" stroke="#213329" stroke-width="6" stroke-linecap="round"/>'
  ];

  function buildCorner() {
    var c = document.createElement('div');
    c.className = 'av2-corner';
    c.setAttribute('aria-hidden', 'true');
    c.innerHTML =
      '<div class="av2-miasma m1"></div>' +
      '<div class="av2-miasma m2"></div>' +
      '<div class="av2-miasma m3"></div>' +
      '<svg class="av2-tentacles" viewBox="0 0 300 300" preserveAspectRatio="xMaxYMax meet">' +
      '<g class="av2-tent t1">' + tentPaths[0] + '</g>' +
      '<g class="av2-tent t2">' + tentPaths[1] + '</g>' +
      '<g class="av2-tent t3">' + tentPaths[2] + '</g>' +
      '</svg>';
    document.body.appendChild(c);
    nodes.push(c);
  }

  function enable() {
    ensureCss(function () {
      if (nodes.length) return; // already active

      // Anchored eyes: beside the fleur-de-lis, and at the foot of the marginalia.
      var sep = document.querySelector('.separator');
      if (sep) addEye(eyeEl('av2-eye--separator', null, 18), sep);
      var marg = document.querySelector('.marginalia');
      if (marg) addEye(eyeEl('av2-eye--marginalia', null, 18), marg);

      // Quiet viewport margins (hidden on narrow screens by CSS).
      addEye(eyeEl('av2-eye--fixed', { left: '2vw', top: '18vh' }, 20));
      addEye(eyeEl('av2-eye--fixed', { right: '2.5vw', top: '38vh' }, 16));
      addEye(eyeEl('av2-eye--fixed', { left: '3vw', bottom: '24vh' }, 17));
      addEye(eyeEl('av2-eye--fixed', { right: '4vw', top: '9vh' }, 15));

      buildCorner();
    });
  }

  function disable() {
    timers.forEach(clearTimeout);
    timers = [];
    nodes.forEach(function (n) { n.remove(); });
    nodes = [];
  }

  window.arcaneV2 = { enable: enable, disable: disable };
})();
