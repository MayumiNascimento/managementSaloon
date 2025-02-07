const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Funcionario = sequelize.define('Funcionario', {
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