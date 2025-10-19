const express = require('express');

// Recibe un objeto con { Counter, incrementCounter, decrementCounter, resetCounter } y un options para customizar (por ejemplo, incremento)
function createCounterRouter({ Counter, incrementCounter, decrementCounter, resetCounter }, options = {}) {
  const router = express.Router();
  const INCREMENT_AMOUNT = options.incrementAmount;// || 1;
  const DECREMENT_AMOUNT = options.decrementAmount;// || 1;

  router.get('/', async (req, res) => {
    const c = await Counter.findByPk(1);
    if (!c) return res.status(404).json({ error: 'not found' });
    res.json({ id: c.id, valor: c.valor });
  });

  router.post('/increment', async (req, res) => {
    const c = await Counter.findByPk(1);
    if (!c) return res.status(404).json({ error: 'not found' });
    await incrementCounter(c, INCREMENT_AMOUNT);
    res.json({ id: c.id, valor: c.valor });
  });

  router.post('/decrement', async (req, res) => {
    const c = await Counter.findByPk(1);
    if (!c) return res.status(404).json({ error: 'not found' });
    await decrementCounter(c, DECREMENT_AMOUNT);
    res.json({ id: c.id, valor: c.valor });
  });

  router.post('/reset', async (req, res) => {
    const c = await Counter.findByPk(1);
    if (!c) return res.status(404).json({ error: 'not found' });
    await resetCounter(c);
    res.json({ id: c.id, valor: c.valor });
  });

  return router;
}

module.exports = createCounterRouter;
