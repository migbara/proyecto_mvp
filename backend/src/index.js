require('dotenv').config();
const app = require('./app');
const { sequelize, Counter } = require('./models');

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.authenticate();
  // Ensure the table exists and initial record
  await sequelize.sync();
  const found = await Counter.findByPk(1);
  if (!found) {
    await Counter.create({ id: 1, valor: 0 });
  }
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
