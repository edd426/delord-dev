/* Arcane v2 — roaming eyes and the corner miasma. Loaded only at candle stage 3. */
(function () {
  if (window.arcaneV2) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = window.matchMedia('(max-width: 700px)').matches;
  var timers = [];
  var nodes = [];
  var active = false;
  var cssLoaded = false;

  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
  function rand(min, max) { return min + Math.random() * (max - min); }

  function ensureCss(cb) {
    if (cssLoaded) return cb();
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/arcane-v2.css';
    link.onload = function () { cssLoaded = true; cb(); };
    document.head.appendChild(link);
  }

  /* Quiet zones the eyes may occupy: viewport margins and gutters outside the
     text column, plus two spots computed from page landmarks. The bottom-right
     is left to the tentacles. */
  var zones = [
    { name: 'left-upper', desktop: true, mobile: false, place: { left: '2vw', top: '13vh' } },
    { name: 'left-mid', desktop: true, mobile: false, place: { left: '2.5vw', top: '46vh' } },
    { name: 'left-lower', desktop: true, mobile: false, place: { left: '3vw', bottom: '16vh' } },
    { name: 'right-upper', desktop: true, mobile: true, place: { right: '3vw', top: '8vh' } },
    { name: 'right-mid', desktop: true, mobile: false, place: { right: '2.5vw', top: '42vh' } },
    { name: 'top-gutter', desktop: true, mobile: true, place: { left: '7vw', top: '3vh' } },
    { name: 'near-separator', desktop: true, mobile: false, anchor: '.separator', side: 'east' },
    { name: 'below-marginalia', desktop: true, mobile: false, anchor: '.marginalia', side: 'south' }
  ];
  var occupied = {};

  function zonePosition(zone) {
    if (!zone.anchor) return zone.place;
    var el = document.querySelector(zone.anchor);
    if (!el) return null;
    var r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return null;
    if (zone.side === 'east') {
      if (r.right + 50 > window.innerWidth) return null;
      return { left: (r.right + 14) + 'px', top: (r.top + r.height / 2 - 10) + 'px' };
    }
    if (r.bottom + 60 > window.innerHeight) return null;
    return { left: (r.left + 4) + 'px', top: (r.bottom + 18) + 'px' };
  }

  function pickZone() {
    var candidates = zones.filter(function (z) {
      return (narrow ? z.mobile : z.desktop) && !occupied[z.name] && zonePosition(z);
    });
    if (!candidates.length) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function eyeEl(size) {
    var d = document.createElement('div');
    d.className = 'av2-eye';
    var w = size;
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
    later(function () {
      if (!active) return;
      el.classList.add('av2-blink');
      later(function () { el.classList.remove('av2-blink'); }, 190);
      scheduleBlink(el);
    }, rand(3500, 13000));
  }

  function moveTo(el, zone) {
    var pos = zonePosition(zone);
    if (!pos) return false;
    el.style.left = el.style.right = el.style.top = el.style.bottom = '';
    for (var k in pos) el.style[k] = pos[k];
    occupied[zone.name] = true;
    el._zone = zone.name;
    return true;
  }

  /* Roam cycle: visible 8-20s, fade out ~1s, gone 2-6s, fade in elsewhere. */
  function roam(el) {
    if (!active) return;
    later(function () {
      if (!active) return;
      el.classList.remove('av2-in'); // 1s fade-out via CSS transition
      later(function () {
        if (el._zone) { delete occupied[el._zone]; el._zone = null; }
        later(function () {
          if (!active) return;
          var z = pickZone();
          if (z && moveTo(el, z)) el.classList.add('av2-in');
          roam(el);
        }, rand(2000, 6000));
      }, 1000);
    }, rand(8000, 20000));
  }

  function addEye() {
    var el = eyeEl(Math.round(rand(28, 36)));
    var z = pickZone();
    if (!z) return;
    moveTo(el, z);
    document.body.appendChild(el);
    nodes.push(el);
    later(function () { el.classList.add('av2-in'); }, 300 + Math.random() * 2200);
    scheduleBlink(el);
    if (!reducedMotion) roam(el);
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
      active = true;
      narrow = window.matchMedia('(max-width: 700px)').matches;
      var count = narrow ? 2 : 4;
      for (var i = 0; i < count; i++) addEye();
      buildCorner();
    });
  }

  function disable() {
    active = false;
    timers.forEach(clearTimeout);
    timers = [];
    nodes.forEach(function (n) { n.remove(); });
    nodes = [];
    occupied = {};
  }

  window.arcaneV2 = { enable: enable, disable: disable };
})();
