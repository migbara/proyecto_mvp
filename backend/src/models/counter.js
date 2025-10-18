module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
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
};
