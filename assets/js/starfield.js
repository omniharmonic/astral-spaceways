/* starfield.js — ambient twinkle. Decorative, aria-hidden, reduced-motion aware.
   Progressive enhancement: if this never runs, the CSS gradient stars remain. */
(function () {
  var host = document.querySelector('.starfield');
  if (!host) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce && reduce.matches) return; // respect the setting — CSS static stars stand in

  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  var stars = [], w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    w = host.clientWidth; h = host.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // density scales with area, capped so phones stay light
    var count = Math.min(220, Math.round((w * h) / 6000));
    stars = [];
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.1 + 0.2,
        base: Math.random() * 0.5 + 0.2,
        amp: Math.random() * 0.5,
        spd: Math.random() * 0.8 + 0.2,
        ph: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.22
      });
    }
  }

  var t0 = null;
  function frame(ts) {
    if (t0 === null) t0 = ts;
    var t = (ts - t0) / 1000;
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var a = s.base + s.amp * (0.5 + 0.5 * Math.sin(t * s.spd + s.ph));
      ctx.globalAlpha = Math.max(0, Math.min(1, a));
      ctx.fillStyle = s.gold ? '#E7C766' : '#EDE6D3';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(resize, 200);
  });
  resize();
  requestAnimationFrame(frame);
})();
