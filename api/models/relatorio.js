const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// os relatorios serão gerados dinamicamente.
// Este modelo é apenas para referência.
const Relatorio = sequelize.define('Relatorio', {
  data_inicial: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_final: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_servicos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Relatorio;