const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join('.env.local') });

console.log("test", process.env.DATABASE_HOST, process.env.DATABASE_PORT, process.env.DATABASE_ENGINE, process.env.DATABASE_DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD)

const sequelize = new Sequelize(process.env.DATABASE_DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: process.env.DATABASE_ENGINE,
  logging: false,
});

const createDatabaseIfNotExist = async () => {
  const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_DATABASE};`;

  try {
    const createDbSequelize = new Sequelize('', process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dialect: process.env.DATABASE_ENGINE,
      logging: false,
    });

    await createDbSequelize.query(createDbQuery);
    console.log('Base de données vérifiée et créée si elle n\'existait pas.');
  } catch (error) {
    console.error('Erreur lors de la création de la base de données:', error);
  }
}

const initDatabase = async () => {
  while(true) {
    try {
      await sequelize.authenticate();
      console.log('Connexion à la base de données établie avec succès.');
      await sequelize.sync({ alter: true });
      console.log('Le modèle a été synchronisé avec la base de données.');
      break;  // Si la connexion est réussie, sortez de la boucle
    } catch (error) {
      console.error('Impossible de se connecter à la base de données:', error);
      console.log('Réessayer de se connecter dans 5 secondes...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}


module.exports = {
  sequelize,
  createDatabaseIfNotExist,
  initDatabase,
};