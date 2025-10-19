const { Sequelize } = require('sequelize');

// Load environment variables (safe to call in any env)
require('dotenv').config();

// If we're running tests, don't require DB env vars or instantiate a real DB connection.
// Tests should create their own in-memory Sequelize instances instead.
if (process.env.NODE_ENV === 'test') {
  const counterModule = require('./counter');
  module.exports = {
    sequelize: null,
    Counter: null,
    incrementCounter: counterModule.incrementCounter,
    decrementCounter: counterModule.decrementCounter,
    resetCounter: counterModule.resetCounter,
    incrementValue: counterModule.incrementValue,
    decrementValue: counterModule.decrementValue
  };
} else {
  // Ensure all required database environment variables are set
  const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT'];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`${envVar} environment variable is required`);
    }
  }

  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: 'mysql',
    logging: false
  });

  const counterModule = require('./counter');
  const Counter = counterModule.defineCounter(sequelize);

  module.exports = {
    sequelize,
    Counter,
    incrementCounter: counterModule.incrementCounter,
    decrementCounter: counterModule.decrementCounter,
    resetCounter: counterModule.resetCounter,
    incrementValue: counterModule.incrementValue,
    decrementValue: counterModule.decrementValue
  };
}
