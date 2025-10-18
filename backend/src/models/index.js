const { Sequelize } = require('sequelize');

// Already loaded by index.js, but keep it here for module independence
require('dotenv').config();

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

const Counter = require('./counter')(sequelize);

module.exports = {
  sequelize,
  Counter
};
