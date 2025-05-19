const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

const PestPredictions = sequelize.define('PestPrediction', {
  prediction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = PestPredictions;