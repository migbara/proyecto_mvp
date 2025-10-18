const request = require('supertest');
const express = require('express');
const { Sequelize } = require('sequelize');

// Create a temporary in-memory sequelize for tests
const sequelize = new Sequelize('sqlite::memory:', { logging: false });
const CounterModel = require('../models/counter')(sequelize);

const app = express();
app.use(express.json());

app.get('/api/counter', async (req, res) => {
  const c = await CounterModel.findByPk(1);
  if (!c) return res.status(404).json({ error: 'not found' });
  res.json({ id: c.id, valor: c.valor });
});

app.post('/api/counter/increment', async (req, res) => {
  const c = await CounterModel.findByPk(1);
  if (!c) return res.status(404).json({ error: 'not found' });
  c.valor = c.valor + 1;
  await c.save();
  res.json({ id: c.id, valor: c.valor });
});

app.post('/api/counter/decrement', async (req, res) => {
  const c = await CounterModel.findByPk(1);
  if (!c) return res.status(404).json({ error: 'not found' });
  c.valor = c.valor - 1;
  await c.save();
  res.json({ id: c.id, valor: c.valor });
});

app.post('/api/counter/reset', async (req, res) => {
  const c = await CounterModel.findByPk(1);
  if (!c) return res.status(404).json({ error: 'not found' });
  c.valor = 0;
  await c.save();
  res.json({ id: c.id, valor: c.valor });
});

beforeAll(async () => {
  await sequelize.sync();
  await CounterModel.create({ id: 1, valor: 0 });
});

afterAll(async () => {
  await sequelize.close();
});

test('counter workflow', async () => {
  const agent = request(app);

  let res = await agent.get('/api/counter');
  expect(res.status).toBe(200);
  expect(res.body.valor).toBe(0);

  res = await agent.post('/api/counter/increment');
  expect(res.status).toBe(200);
  expect(res.body.valor).toBe(1);

  res = await agent.post('/api/counter/increment');
  expect(res.body.valor).toBe(2);

  res = await agent.post('/api/counter/decrement');
  expect(res.body.valor).toBe(1);

  res = await agent.post('/api/counter/reset');
  expect(res.body.valor).toBe(0);
});
