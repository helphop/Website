/* ===================== MOBILE NAV ===================== */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.getElementById('primary-nav');

function setNavOpen(open) {
  navToggle.setAttribute('aria-expanded', String(open));
}

navToggle.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  setNavOpen(!open);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setNavOpen(false);
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar')) setNavOpen(false);
});

navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') setNavOpen(false);
});

/* ===================== EMAIL FORM ===================== */
const form     = document.getElementById('notify-form');
const input    = form.querySelector('input[type="email"]');
const honeypot = form.querySelector('.hp-field');
const btn      = form.querySelector('button');
const btnLabel = btn.querySelector('.btn-label');
const status   = document.querySelector('.form-status');

const ENDPOINT = form.dataset.endpoint;
const LIST_ID  = form.dataset.listId;
const DEFAULT_LABEL       = btnLabel.textContent;
const DEFAULT_PLACEHOLDER = input.placeholder;
const SUCCESS_RESET_MS = 5000;
const ERROR_RESET_MS   = 3000;

let resetTimer = null;
let inFlight   = false;

function setState(state, { label, placeholder, message } = {}) {
  form.classList.remove('is-loading', 'is-success', 'is-error');
  if (state !== 'idle') form.classList.add(`is-${state}`);
  if (label       !== undefined) btnLabel.textContent  = label;
  if (placeholder !== undefined) input.placeholder     = placeholder;
  if (message     !== undefined) status.textContent    = message;
}

function resetToIdle() {
  setState('idle', { label: DEFAULT_LABEL, placeholder: DEFAULT_PLACEHOLDER, message: '' });
  input.disabled = false;
  btn.disabled   = false;
  inFlight = false;
}

async function handleSubmit(e) {
  e.preventDefault();
  if (inFlight) return;
  if (honeypot.value) return;

  clearTimeout(resetTimer);
  inFlight = true;
  setState('loading', { label: 'Subscribing…', message: '' });
  input.disabled = true;
  btn.disabled   = true;

  try {
    const response = await fetch(ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    new URLSearchParams({
        email: input.value.trim(),
        name:  '',
        l:     LIST_ID,
        nonce: ''
      })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    setState('success', {
      label:       "✓ You're on the list!",
      placeholder: 'Thanks! Check your email to confirm.',
      message:     ''
    });
    input.value = '';
    resetTimer = setTimeout(resetToIdle, SUCCESS_RESET_MS);
  } catch (error) {
    console.error('Subscription failed:', error);
    const message = navigator.onLine
      ? "Something went wrong. Please try again in a moment."
      : "You appear to be offline. Check your connection and retry.";
    setState('error', { label: 'Try again', message });
    input.disabled = false;
    btn.disabled   = false;
    resetTimer = setTimeout(() => {
      setState('idle', { label: DEFAULT_LABEL, message: '' });
      inFlight = false;
    }, ERROR_RESET_MS);
  }
}

form.addEventListener('submit', handleSubmit);
