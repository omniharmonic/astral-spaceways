/* form.js — Inquiries transmission (§10.9 / F1–F3).
   Progressive: without JS the <form> POSTs normally and Web3Forms redirects to
   thanks.html (via the hidden "redirect" field). With JS we submit over fetch and
   show an in-character status without leaving the page.
   The form only actually transmits once a real Web3Forms access key is pasted in
   (placeholder is inert); the mailto: fallback under the form always works. */
(function () {
  var form = document.getElementById('inquiry-form');
  if (!form) return;
  var statusEl = document.getElementById('form-status');
  var submitBtn = form.querySelector('[type="submit"]');
  var keyField = form.querySelector('input[name="access_key"]');
  var key = keyField ? keyField.value.trim() : '';
  var PLACEHOLDER = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';

  function show(kind, msg) {
    if (!statusEl) return;
    statusEl.className = 'form-status show ' + kind;
    statusEl.textContent = msg;
    statusEl.setAttribute('role', kind === 'err' ? 'alert' : 'status');
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', function (e) {
    // honeypot: if the hidden field is filled, a bot did it — silently succeed.
    var hp = form.querySelector('input[name="botcheck"]');
    if (hp && hp.checked) { e.preventDefault(); show('ok', 'Received. Your message is en route.'); return; }

    // If the access key is still the placeholder, don't fire a doomed request.
    // Let the crew be reachable by mail instead of failing silently.
    if (!key || key === PLACEHOLDER) {
      e.preventDefault();
      show('err', 'The booking line is not yet wired to the veil. Please write us directly using the transmission link below the form, and the crew will answer.');
      return;
    }

    e.preventDefault();
    var data = new FormData(form);
    submitBtn.disabled = true;
    var label = submitBtn.value || submitBtn.textContent;
    if ('value' in submitBtn) submitBtn.value = 'Transmitting…'; else submitBtn.textContent = 'Transmitting…';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (res.ok && res.j.success) {
          form.reset();
          show('ok', 'Received. Your message is en route. The crew answers between departures, so allow a terrestrial day or two. Safe travels until then.');
        } else {
          show('err', 'The transmission didn’t clear the veil. Check your email address and try again — or write us directly at the link below.');
        }
      })
      .catch(function () {
        show('err', 'The transmission didn’t clear the veil. Check your connection and try again — or write us directly at the link below.');
      })
      .finally(function () {
        submitBtn.disabled = false;
        if ('value' in submitBtn) submitBtn.value = label; else submitBtn.textContent = label;
      });
  });
})();
