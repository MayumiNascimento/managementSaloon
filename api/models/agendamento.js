const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Agendamento = sequelize.define('Agendamento', {
  cliente_nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  funcionario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  data: {
    type: DataTypes.DATEONLY, // Armazena apenas a data (YYYY-MM-DD)
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME, // Armazena apenas a hora (HH:MM:SS)
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('agendado', 'concluido', 'cancelado'),
    allowNull: false,
    defaultValue: 'agendado',
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// Relacionamento: Um agendamento pertence a um funcionário
Agendamento.associate = (models) => {
  Agendamento.belongsTo(models.Funcionario, { foreignKey: 'funcionario_id',
    as: 'funcionario'
   });
};

module.exports = Agendamento;