const base = window.__API_BASE__ || (location.hostname === 'localhost' ? 'http://localhost:3000' : 'http://' + location.hostname + ':17061');
// const base = window.__API_BASE__ || (location.hostname === 'localhost' ? 'http://hp-pavilion-1:3000' : 'http://hp-pavilion-1:3000');

// --- Socket.io: actualización en tiempo real ---
const socket = io(base, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  },
  transports: ["websocket"]
});
socket.on('counter:update', (data) => {
  if (data && typeof data.valor === 'number') {
    document.getElementById('value').textContent = data.valor;
  }
});

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
