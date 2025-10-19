const express = require('express');
const cors = require('cors');
const { Counter, incrementCounter, decrementCounter, resetCounter, incrementValue, decrementValue } = require('./models');
const createCounterRouter = require('./routes/counter');

// Ensure required environment variables are set
if (!process.env.CORS_ORIGIN) {
  throw new Error('CORS_ORIGIN environment variable is required');
}

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());


// Montar el router centralizado para /api/counter
app.use('/api/counter', createCounterRouter({ Counter, incrementCounter, decrementCounter, resetCounter }, { incrementAmount: incrementValue, decrementAmount: decrementValue }));

module.exports = app;
