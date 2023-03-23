const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join('backend', '.env.local') });

const sequelize = new Sequelize(process.env.DATABASE_DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_LOCALHOST,
  port: process.env.DATABASE_PORT,
  dialect: process.env.DATABASE_ENGINE,
  logging: false,
});

module.exports = sequelize;