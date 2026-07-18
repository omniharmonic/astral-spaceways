/* nav.js — small-screen navigation.
   A 90s site just wrapped its links, so the nav is fully usable with no JS.
   This only adds an optional collapse toggle at the very smallest widths so the
   masthead stays compact on a 320px phone. Enhancement only. */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var list = nav.querySelector('ul');
  if (!list) return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nav-toggle btn';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'primary-nav');
  btn.textContent = 'Navigate ✦';
  btn.style.display = 'none';
  btn.style.margin = '0 auto .6rem';
  list.id = list.id || 'primary-nav';
  nav.insertBefore(btn, list);

  var mq = window.matchMedia('(max-width: 420px)');
  function apply() {
    if (mq.matches) {
      btn.style.display = 'inline-block';
      if (btn.getAttribute('aria-expanded') !== 'true') list.hidden = true;
    } else {
      btn.style.display = 'none';
      list.hidden = false;
    }
  }
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    list.hidden = open;
  });
  (mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply));
  apply();
})();
