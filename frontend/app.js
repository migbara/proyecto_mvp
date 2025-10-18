const base = window.__API_BASE__ || (location.hostname === 'localhost' ? 'http://localhost:3000' : 'http://' + location.hostname + ':3000');

async function fetchValue() {
  const res = await fetch(base + '/api/counter');
  if (!res.ok) return;
  const data = await res.json();
  document.getElementById('value').textContent = data.valor;
}

async function postAction(path) {
  const res = await fetch(base + path, { method: 'POST' });
  if (!res.ok) return;
  const data = await res.json();
  document.getElementById('value').textContent = data.valor;
}

document.getElementById('inc').addEventListener('click', () => postAction('/api/counter/increment'));
document.getElementById('dec').addEventListener('click', () => postAction('/api/counter/decrement'));
document.getElementById('reset').addEventListener('click', () => postAction('/api/counter/reset'));

fetchValue();
