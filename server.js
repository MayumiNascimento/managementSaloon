const express = require('express');
const sequelize = require('./api/config/database');

const agendamentoRoutes = require('./api/routes/agendamentoRoute');
const funcionarioRoutes = require('./api/routes/funcionarioRoute');
const relatorioRoutes = require('./api/routes/relatorioRoute');

const Agendamento = require('./api/models/agendamento');
const Funcionario = require('./api/models/funcionario');

const app = express();
app.use(express.json());

const models = {
  Agendamento,
  Funcionario,
};

// Associa os modelos
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Rotas
app.use('/api', agendamentoRoutes);
app.use('/api', funcionarioRoutes);
app.use('/api', relatorioRoutes);

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  });