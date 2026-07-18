/* splitflap.js — the Astral Departures Board (§8.4).
   Enhancement only: without JS the board renders as a static gold-on-void table.
   Any element with [data-flap] has its text shuffled through a split-flap reveal
   on load and on hover. Respects prefers-reduced-motion. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce && reduce.matches) return;

  var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·:∞βΙΙΙ ';
  var cells = [].slice.call(document.querySelectorAll('[data-flap]'));
  if (!cells.length) return;

  function flap(cell, delayBase) {
    var target = cell.getAttribute('data-flap');
    var chars = target.split('');
    // build per-character boxes
    cell.textContent = '';
    cell.classList.add('flap');
    var boxes = chars.map(function (ch) {
      var b = document.createElement('b');
      b.textContent = ch === ' ' ? ' ' : ch;
      cell.appendChild(b);
      return b;
    });
    boxes.forEach(function (b, i) {
      var final = chars[i];
      if (final === ' ') return;
      var ticks = 6 + Math.floor(Math.random() * 8);
      var n = 0;
      var iv = setInterval(function () {
        n++;
        if (n >= ticks) {
          clearInterval(iv);
          b.textContent = final;
        } else {
          b.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }, 40 + i * 6 + delayBase);
    });
  }

  function runAll() {
    cells.forEach(function (cell, i) {
      if (!cell.getAttribute('data-flap')) cell.setAttribute('data-flap', cell.textContent.trim());
      flap(cell, i * 30);
    });
  }

  // reveal on first load
  runAll();

  // re-flip a row on hover
  var rows = [].slice.call(document.querySelectorAll('.board tbody tr'));
  rows.forEach(function (row) {
    var busy = false;
    row.addEventListener('mouseenter', function () {
      if (busy) return; busy = true;
      [].slice.call(row.querySelectorAll('[data-flap]')).forEach(function (c, i) { flap(c, i * 20); });
      setTimeout(function () { busy = false; }, 900);
    });
  });
})();
