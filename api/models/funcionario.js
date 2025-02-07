const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Funcionario = sequelize.define('Funcionario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('funcionario', 'admin'),
    allowNull: false,
  },
  especialidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relacionamento: Um funcionário pode ter vários agendamentos
Funcionario.associate = (models) => {
  Funcionario.hasMany(models.Agendamento, { foreignKey: 'funcionario_id' });
};

module.exports = Funcionario;