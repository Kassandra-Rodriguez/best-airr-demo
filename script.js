/* ═══════════════════════════════════════════════════════
   Best AirR — concept site behaviour
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─── Financing assumptions ───────────────────────────
     PLACEHOLDER VALUES. Confirm the real APR and terms with
     Best AirR's lender before this site goes live.
     ─────────────────────────────────────────────────── */
  var APR = 0.0999;          // 9.99% annual percentage rate
  var TERMS = [60, 120, 180]; // months offered

  /* ── language toggle ── */
  var body = document.body;
  var toggle = document.getElementById('langToggle');

  function applyLang(lang) {
    var attr = lang === 'es' ? 'data-es' : 'data-en';
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute(attr);
      if (val === null) return;
      // Only replace the element's own text, preserving child elements
      // when the node has element children (e.g. nested <span>).
      if (el.children.length === 0) {
        el.textContent = val;
      } else {
        for (var i = 0; i < el.childNodes.length; i++) {
          var n = el.childNodes[i];
          if (n.nodeType === 3 && n.textContent.trim()) { n.textContent = val; return; }
        }
      }
    });
    body.classList.toggle('es', lang === 'es');
    document.documentElement.lang = lang;
    if (toggle) {
      toggle.setAttribute('aria-label',
        lang === 'es' ? 'Switch to English' : 'Cambiar a español');
    }
    try { localStorage.setItem('bestairr-lang', lang); } catch (e) {}
    // The calculator writes its own strings, so re-render it in the new language.
    if (typeof render === 'function') render();
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyLang(body.classList.contains('es') ? 'en' : 'es');
    });
  }

  // restore preference (falls back silently in private mode)
  var saved = null;
  try { saved = localStorage.getItem('bestairr-lang'); } catch (e) {}
  if (saved === 'es') applyLang('es');

  /* ── financing calculator ── */
  var amount = document.getElementById('calcAmount');
  var amountOut = document.getElementById('calcAmount-out');
  var monthlyEl = document.getElementById('calcMonthly');
  var aprEl = document.getElementById('calcApr');
  var termLabel = document.getElementById('calcTermLabel');
  var termBtns = Array.prototype.slice.call(document.querySelectorAll('.term-opt'));
  var months = 120;

  function money(n) {
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  // Standard amortized payment: P·r / (1 − (1+r)^−n)
  function payment(principal, annualRate, n) {
    var r = annualRate / 12;
    if (r === 0) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  }

  function render() {
    if (!amount) return;
    var p = parseFloat(amount.value);
    if (amountOut) amountOut.textContent = money(p);
    if (monthlyEl) monthlyEl.textContent = Math.round(payment(p, APR, months)).toLocaleString('en-US');
    if (aprEl) aprEl.textContent = (APR * 100).toFixed(2) + '% APR';
    if (termLabel) {
      var unit = body.classList.contains('es') ? 'meses' : 'months';
      termLabel.textContent = months + ' ' + unit;
    }
    // paint the filled portion of the track
    var pct = ((p - amount.min) / (amount.max - amount.min)) * 100;
    amount.style.background =
      'linear-gradient(90deg, var(--blue) ' + pct + '%, rgba(255,255,255,.2) ' + pct + '%)';
  }

  if (amount) {
    amount.addEventListener('input', render);
    termBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        months = parseInt(btn.dataset.months, 10);
        termBtns.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-on', on);
          b.setAttribute('aria-checked', String(on));
        });
        render();
      });
    });
    render();
  }

  /* ── quote form ── */
  var form = document.getElementById('quoteForm');
  var success = document.getElementById('quoteSuccess');

  function setInvalid(input, bad) {
    var field = input.closest('.field');
    if (field) field.classList.toggle('invalid', bad);
  }

  function validPhone(v) {
    return (v.replace(/\D/g, '').length >= 10);
  }

  if (form) {
    // clear the error state as soon as the visitor starts fixing it
    form.querySelectorAll('input, select').forEach(function (el) {
      el.addEventListener('input', function () { setInvalid(el, false); });
      el.addEventListener('change', function () { setInvalid(el, false); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('qName');
      var phone = document.getElementById('qPhone');
      var system = document.getElementById('qSystem');
      var ok = true;

      if (!name.value.trim()) { setInvalid(name, true); ok = false; }
      if (!validPhone(phone.value)) { setInvalid(phone, true); ok = false; }
      if (!system.value) { setInvalid(system, true); ok = false; }

      if (!ok) {
        var firstBad = form.querySelector('.field.invalid input, .field.invalid select');
        if (firstBad) firstBad.focus();
        return;
      }

      // DEMO ONLY — no backend. Wire this to email/CRM before launch.
      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    });
  }

  /* ── footer year ── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
