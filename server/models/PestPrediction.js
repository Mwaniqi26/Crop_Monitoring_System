const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

const PestPrediction = sequelize.define('PestPrediction', {
  prediction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = PestPrediction;