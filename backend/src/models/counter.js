const { DataTypes } = require('sequelize');

const incrementValue  = 1;
const decrementValue = 1;

function defineCounter(sequelize) {
  const Counter = sequelize.define('contador', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'contador',
    timestamps: false
  });

  return Counter;
}

// Lógica de negocio: funciones puras que operan sobre la instancia y la persisten
async function incrementCounter(counter, amount = 1) {
  counter.valor += amount;
  await counter.save();
  return counter;
}

async function decrementCounter(counter, amount = 1) {
  counter.valor -= amount;
  await counter.save();
  return counter;
}

async function resetCounter(counter) {
  counter.valor = 0;
  await counter.save();
  return counter;
}

module.exports = {
  defineCounter,
  incrementCounter,
  decrementCounter,
  resetCounter,
  incrementValue,
  decrementValue
};
