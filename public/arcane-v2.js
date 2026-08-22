/* Arcane chunk — roaming eyes, gaze, escalation, and the corner miasma.
   Loaded only at candle stage 3. */
(function () {
  if (window.arcaneV2) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var noHover = window.matchMedia('(hover: none)').matches;
  var narrow = window.matchMedia('(max-width: 700px)').matches;

  var timers = [];
  var listeners = [];
  var nodes = [];
  var eyes = [];
  var active = false;
  var cssLoaded = false;
  var grimSpawned = false;
  var corner = null;
  var idleTimer = null;

  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
  function rand(min, max) { return min + Math.random() * (max - min); }
  function listen(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    listeners.push(function () { target.removeEventListener(type, fn, opts); });
  }

  function ensureCss(cb) {
    if (cssLoaded) return cb();
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/arcane-v2.css';
    link.onload = function () { cssLoaded = true; cb(); };
    document.head.appendChild(link);
  }

  /* ---------- zones ---------- */
  /* Quiet spots only: viewport margins and gutters outside the text column,
     plus spots computed from page landmarks. Bottom-right belongs to the
     tentacles. */
  var zones = [
    { name: 'left-upper', mobile: false, place: { left: '2vw', top: '13vh' } },
    { name: 'left-high', mobile: false, place: { left: '5vw', top: '26vh' } },
    { name: 'left-mid', mobile: false, place: { left: '2.5vw', top: '46vh' } },
    { name: 'left-lower', mobile: false, place: { left: '3vw', bottom: '16vh' } },
    { name: 'bottom-left', mobile: true, place: { left: '2vw', bottom: '5vh' } },
    { name: 'right-upper', mobile: true, place: { right: '3vw', top: '8vh' } },
    { name: 'right-below-header', mobile: false, place: { right: '6vw', top: '17vh' } },
    { name: 'right-mid', mobile: false, place: { right: '2.5vw', top: '42vh' } },
    { name: 'right-lower', mobile: false, place: { right: '2.5vw', bottom: '36vh' } },
    { name: 'top-gutter', mobile: true, place: { left: '7vw', top: '3vh' } },
    { name: 'top-right-far', mobile: false, place: { right: '9vw', top: '2vh' } },
    { name: 'near-separator', mobile: false, anchor: '.separator', side: 'east' },
    { name: 'below-marginalia', mobile: false, anchor: '.marginalia', side: 'south' },
    { name: 'label-gutter', mobile: false, anchor: '.section-row:nth-of-type(2)', side: 'west' }
  ];
  var occupied = {};

  function zonePosition(zone) {
    if (!zone.anchor) return zone.place;
    var el = document.querySelector(zone.anchor);
    if (!el) return null;
    var r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return null;
    if (zone.side === 'east') {
      if (r.right + 60 > window.innerWidth) return null;
      return { left: (r.right + 14) + 'px', top: (r.top + r.height / 2 - 10) + 'px' };
    }
    if (zone.side === 'west') {
      if (r.left < 60) return null;
      return { left: (r.left - 48) + 'px', top: (r.top + 8) + 'px' };
    }
    if (r.bottom + 70 > window.innerHeight) return null;
    return { left: (r.left + 4) + 'px', top: (r.bottom + 18) + 'px' };
  }

  function pickZone() {
    var candidates = zones.filter(function (z) {
      return (!narrow || z.mobile) && !occupied[z.name] && zonePosition(z);
    });
    if (!candidates.length) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  /* ---------- eyes ---------- */
  function eyeMarkup(size, grim) {
    var w = size;
    var iris = grim
      ? '<circle cx="12" cy="7" r="3" fill="none" stroke="#6e2434" stroke-width="1.2" opacity="0.8"/>' +
        '<circle cx="12" cy="7" r="2.2" fill="#c9a85c" opacity="0.6"/>'
      : '<circle cx="12" cy="7" r="2.6" fill="#c9a85c" opacity="0.55"/>';
    return '<svg viewBox="0 0 24 14" width="' + w + '" height="' + Math.round(w * 14 / 24) + '" aria-hidden="true">' +
      '<g class="av2-lid">' +
      '<path d="M2 7 Q12 -1.5 22 7 Q12 15.5 2 7 Z" fill="rgba(16,22,19,0.6)" stroke="#c9a85c" stroke-width="1" opacity="0.7"/>' +
      '<g class="av2-pupil">' + iris + '<circle cx="12" cy="7" r="1.1" fill="#101613"/></g>' +
      '</g></svg>';
  }

  function eyeEl(grim) {
    var el;
    if (grim) {
      el = document.createElement('a');
      el.href = '/grimoire';
      el.className = 'av2-eye av2-eye--grim';
      el.setAttribute('aria-label', 'an eye that does not blink');
      el.innerHTML = eyeMarkup(Math.round(rand(38, 44)), true);
    } else {
      el = document.createElement('div');
      el.className = 'av2-eye';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = eyeMarkup(Math.round(rand(28, 36)), false);
    }
    el._grim = !!grim;
    el._pupil = el.querySelector('.av2-pupil');
    return el;
  }

  function scheduleBlink(el) {
    if (reducedMotion || el._grim) return; // the grimoire eye never blinks
    later(function () {
      if (!active) return;
      if (!el.classList.contains('av2-shut')) {
        el.classList.add('av2-blink');
        later(function () { el.classList.remove('av2-blink'); }, 190);
      }
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
      el.classList.remove('av2-in');
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

  function addEye(grim) {
    var cap = narrow ? 3 : 6;
    if (!grim && eyes.length >= cap) return;
    var el = eyeEl(grim);
    var z = pickZone();
    if (!z) return;
    moveTo(el, z);
    document.body.appendChild(el);
    nodes.push(el);
    eyes.push(el);
    later(function () { el.classList.add('av2-in'); }, 300 + Math.random() * 2200);
    scheduleBlink(el);
    if (!reducedMotion) roam(el);
  }

  /* Escalation: 1 eye at first, +1 every ~45s up to the cap. The grimoire
     eye joins once after ~60s and counts toward the cap. */
  function startEscalation() {
    var cap = narrow ? 3 : 6;
    addEye(false);
    (function tick() {
      later(function () {
        if (!active) return;
        if (eyes.length < cap) addEye(false);
        tick();
      }, rand(40000, 50000));
    })();
    later(function () {
      if (!active || grimSpawned) return;
      grimSpawned = true;
      addEye(true);
    }, 60000);
  }

  /* ---------- gaze + shyness ---------- */
  function startGaze() {
    if (noHover || reducedMotion) return; // touch devices: eyes behave as v2
    var mx = -1, my = -1, raf = null;
    function update() {
      raf = null;
      for (var i = 0; i < eyes.length; i++) {
        var el = eyes[i];
        if (!el.classList.contains('av2-in')) continue;
        var r = el.getBoundingClientRect();
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var dx = mx - cx, dy = my - cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        // shyness: normal eyes shut when approached, reopen only once left alone
        if (!el._grim) {
          if (dist < 80) el.classList.add('av2-shut');
          else if (dist > 120) el.classList.remove('av2-shut');
        }
        // pupil tracks the cursor, clamped inside the eye (viewBox units)
        var scale = r.width / 24;
        var max = 2.4;
        var len = Math.max(dist, 1);
        var px = (dx / len) * Math.min(max, dist / (scale * 20));
        var py = (dy / len) * Math.min(max, dist / (scale * 20)) * 0.6;
        if (el._pupil) el._pupil.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ')');
      }
    }
    listen(document, 'mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
  }

  /* ---------- candlelight glow ---------- */
  /* A warm halo follows the cursor — reading by candlelight. */
  function startCandleGlow() {
    if (noHover) return; // touch devices: no cursor, no glow
    var glow = document.createElement('div');
    glow.className = 'av2-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
    nodes.push(glow);
    if (reducedMotion) {
      // static centered vignette-glow instead of a tracked halo
      glow.classList.add('av2-glow--static');
      return;
    }
    var tx = window.innerWidth / 2, ty = window.innerHeight / 3;
    var gx = tx, gy = ty, raf = null, seen = false;
    function step() {
      raf = null;
      if (!active) return;
      // ease toward the cursor: the candle is carried, not teleported
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = 'translate(' + gx.toFixed(1) + 'px, ' + gy.toFixed(1) + 'px)';
      if (Math.abs(tx - gx) > 0.5 || Math.abs(ty - gy) > 0.5) raf = requestAnimationFrame(step);
    }
    listen(document, 'mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!seen) { seen = true; glow.classList.add('av2-glow--lit'); }
      if (!raf) raf = requestAnimationFrame(step);
    }, { passive: true });
  }

  /* ---------- tentacles ---------- */
  var tentPaths = [
    '<path d="M300 305 C 255 265, 275 210, 232 168 C 210 146, 218 118, 236 100 C 246 90, 244 76, 236 68" fill="none" stroke="#1d2c22" stroke-width="11" stroke-linecap="round"/>',
    '<path d="M305 260 C 260 250, 232 220, 226 185 C 221 156, 200 148, 184 152 C 172 155, 162 148, 158 138" fill="none" stroke="#182419" stroke-width="8" stroke-linecap="round"/>',
    '<path d="M260 305 C 250 258, 218 248, 205 215 C 196 191, 172 188, 158 198" fill="none" stroke="#213329" stroke-width="6" stroke-linecap="round"/>'
  ];
  var idlePath =
    '<path d="M310 290 C 262 282, 248 246, 246 210 C 244 180, 224 168, 206 170 C 192 172, 182 162, 180 150" fill="none" stroke="#25382c" stroke-width="4" stroke-linecap="round"/>';

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
      '<g class="av2-tent av2-tent--idle t4">' + idlePath + '</g>' +
      '</svg>';
    document.body.appendChild(c);
    nodes.push(c);
    corner = c;
    startScrollHunger(c);
    startIdleCreep(c);
  }

  /* Extension follows scroll depth; short pages get full extension. */
  function startScrollHunger(c) {
    var svg = c.querySelector('.av2-tentacles');
    function depth() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max < 200) return 1; // short page: current behavior
      return Math.min(1, Math.max(0, window.scrollY / max));
    }
    function apply() {
      var hidden = (1 - depth()) * 30 + 5; // 35% buried at top, 5% at full depth
      svg.style.transform = 'translate(' + hidden + '%, ' + hidden + '%)';
    }
    svg.style.transform = 'translate(35%, 35%)';
    later(apply, 50); // transition from buried to current depth
    listen(window, 'scroll', apply, { passive: true });
    listen(window, 'resize', apply, { passive: true });
  }

  /* Idle creep: after 120s without activity the miasma swells and a fourth,
     thinner tentacle emerges; any activity retracts it. */
  function startIdleCreep(c) {
    function goIdle() { c.classList.add('av2-idle'); }
    function wake() {
      c.classList.remove('av2-idle');
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = later(goIdle, 120000);
    }
    ['pointermove', 'pointerdown', 'scroll', 'keydown'].forEach(function (t) {
      listen(window, t, wake, { passive: true });
    });
    wake();
  }

  /* ---------- lifecycle ---------- */
  var session = 0;

  function enable() {
    var s = ++session;
    ensureCss(function () {
      if (s !== session || active) return; // disabled while CSS was loading
      active = true;
      narrow = window.matchMedia('(max-width: 700px)').matches;
      startEscalation();
      startGaze();
      startCandleGlow();
      buildCorner();
    });
  }

  function disable() {
    session++;
    active = false;
    timers.forEach(clearTimeout);
    timers = [];
    if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; }
    listeners.forEach(function (off) { off(); });
    listeners = [];
    nodes.forEach(function (n) { n.remove(); });
    nodes = [];
    eyes = [];
    occupied = {};
    grimSpawned = false;
    corner = null;
  }

  window.arcaneV2 = { enable: enable, disable: disable };
})();
