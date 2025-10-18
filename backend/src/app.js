const express = require('express');
const cors = require('cors');
const { Counter } = require('./models');

// Ensure required environment variables are set
if (!process.env.CORS_ORIGIN) {
  throw new Error('CORS_ORIGIN environment variable is required');
}

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.get('/api/counter', async (req, res) => {
  const c = await Counter.findByPk(1);
  if (!c) return res.status(404).json({ error: 'not found' });
  res.json({ id: c.id, valor: c.valor });
});

app.post('/api/counter/increment', async (req, res) => {
  const c = await Counter.findByPk(1);
  if (!c) return res.status(404).json({ error: 'not found' });
  c.valor = c.valor + 1;
  await c.save();
  res.json({ id: c.id, valor: c.valor });
});

app.post('/api/counter/decrement', async (req, res) => {
  const c = await Counter.findByPk(1);
  if (!c) return res.status(404).json({ error: 'not found' });
  c.valor = c.valor - 1;
  await c.save();
  res.json({ id: c.id, valor: c.valor });
});

app.post('/api/counter/reset', async (req, res) => {
  const c = await Counter.findByPk(1);
  if (!c) return res.status(404).json({ error: 'not found' });
  c.valor = 0;
  await c.save();
  res.json({ id: c.id, valor: c.valor });
});

module.exports = app;
