const express = require('express');
const cors = require('cors');
const { Counter, incrementCounter, decrementCounter, resetCounter, incrementValue, decrementValue } = require('./models');
const createCounterRouter = require('./routes/counter');

// Parse CORS origins from env var (comma-separated list) or use defaults
function parseOrigins(originsStr) {
  if (!originsStr) return null;
  // Trim whitespace from each origin
  return originsStr.split(',').map(origin => origin.trim());
}

// Define allowed origins
const allowedOrigins = ['http://hp-pavilion-1:8000', 'http://localhost:8000', 'http://127.0.0.1:8000'];
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'));
    }
    return callback(null, true);
  },
  credentials: true
};

console.log('CORS Origins:', allowedOrigins);

const app = express();
app.use(cors(corsOptions));
app.use(express.json());


// Montar el router centralizado para /api/counter
app.use('/api/counter', createCounterRouter({ Counter, incrementCounter, decrementCounter, resetCounter }, { incrementAmount: incrementValue, decrementAmount: decrementValue }));

module.exports = app;
