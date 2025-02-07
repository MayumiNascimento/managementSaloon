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
  data_hora: {
    type: DataTypes.DATE,
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
  Agendamento.belongsTo(models.Funcionario, { foreignKey: 'funcionario_id' });
};

module.exports = Agendamento;