const form = document.getElementById('notify-form');

async function handleSubmit(e) {
  e.preventDefault();
  const input = form.querySelector('input[type="email"]');
  const btn = form.querySelector('button');
  const email = input.value.trim();

  btn.textContent = 'Subscribing...';
  btn.disabled = true;
  input.disabled = true;

  try {
    const response = await fetch('https://listmonk-subscribe.mitchell-gould.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        email: email,
        name: '',
        l: '9536ca76-9938-4c0f-919c-83ea72780d8f',
        nonce: ''
      })
    });

    if (response.ok) {
      btn.innerHTML = '✓ You\'re on the list!';
      btn.style.background = '#16a34a';
      input.value = '';
      input.placeholder = 'Thanks! Check your email to confirm.';
      setTimeout(() => {
        btn.innerHTML = 'Notify Me <span style="color:#f59e0b">★</span>';
        btn.style.background = '';
        input.placeholder = 'Enter your email';
        input.disabled = false;
        btn.disabled = false;
      }, 5000);
    } else {
      throw new Error('Failed');
    }
  } catch (error) {
    btn.innerHTML = 'Try again';
    btn.style.background = '#dc2626';
    input.disabled = false;
    btn.disabled = false;
    setTimeout(() => {
      btn.innerHTML = 'Notify Me <span style="color:#f59e0b">★</span>';
      btn.style.background = '';
    }, 3000);
  }
}

form.addEventListener('submit', handleSubmit);
