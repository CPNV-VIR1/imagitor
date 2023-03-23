const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/database');


const Image = sequelize.define('image', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Image };