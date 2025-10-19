const request = require('supertest');
const express = require('express');
const { Sequelize } = require('sequelize');

// Create a temporary in-memory sequelize for tests
const sequelize = new Sequelize('sqlite::memory:', { logging: false });


const counterModule = require('../models/counter');
const CounterModel = counterModule.defineCounter(sequelize);
const createCounterRouter = require('../routes/counter');
const { init } = require('../app');


const app = express();
app.use(express.json());
// Montar el router centralizado con opciones específicas para el test
app.use('/api/counter', createCounterRouter({
  Counter: CounterModel,
  incrementCounter: counterModule.incrementCounter,
  decrementCounter: counterModule.decrementCounter,
  resetCounter: counterModule.resetCounter
}, { incrementAmount: counterModule.incrementValue, decrementAmount: counterModule.decrementValue }));

beforeAll(async () => {
  await sequelize.sync();
  await CounterModel.create({ id: 1, valor: 0 });
});

afterAll(async () => {
  await sequelize.close();
});

test('counter workflow', async () => {
  const agent = request(app);

  let value = 0;
  let initValue = 0;

  let res = await agent.get('/api/counter');
  expect(res.status).toBe(200);
  expect(res.body.valor).toBe(value);

  res = await agent.post('/api/counter/increment');
  expect(res.status).toBe(200);
  value += counterModule.incrementValue;
  expect(res.body.valor).toBe(value);

  res = await agent.post('/api/counter/increment');
  expect(res.status).toBe(200);
  value += counterModule.incrementValue;
  expect(res.body.valor).toBe(value);

  res = await agent.post('/api/counter/decrement');
  expect(res.status).toBe(200);
  value -= counterModule.decrementValue;
  expect(res.body.valor).toBe(value);

  res = await agent.post('/api/counter/reset');
  expect(res.status).toBe(200);
  expect(res.body.valor).toBe(initValue);
});
