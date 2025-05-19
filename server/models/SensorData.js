const { DataTypes } = require('sequelize');
const sequelize = require('../models/index').sequelize;

const SensorData = sequelize.define('SensorData', {
  temperature: { type: DataTypes.FLOAT, allowNull: false },
  humidity: { type: DataTypes.FLOAT, allowNull: false },
  soilMoisture: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = SensorData;