const { Sequelize } = require('sequelize');

// Configuração do SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Arquivo do banco de dados, alterar
});

module.exports = sequelize;