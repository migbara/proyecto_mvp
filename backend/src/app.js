const express = require('express');
const cors = require('cors');
const { Counter, incrementCounter, decrementCounter, resetCounter, incrementValue, decrementValue } = require('./models');
const createCounterRouter = require('./routes/counter');

// In test environment we allow missing CORS_ORIGIN and use a permissive default
const corsOrigin = process.env.CORS_ORIGIN || (process.env.NODE_ENV === 'test' ? '*' : null);
if (!corsOrigin) {
  throw new Error('CORS_ORIGIN environment variable is required');
}

const app = express();
app.use(cors({ origin: corsOrigin }));
app.use(express.json());


// Montar el router centralizado para /api/counter
app.use('/api/counter', createCounterRouter({ Counter, incrementCounter, decrementCounter, resetCounter }, { incrementAmount: incrementValue, decrementAmount: decrementValue }));

module.exports = app;
