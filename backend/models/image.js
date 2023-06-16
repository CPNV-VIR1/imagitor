const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');


const Image = sequelize.define('image', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Image };