const express = require('express');
const sequelize = require('./api/config/database');
const agendamentoRoutes = require('./api/routes/agendamentoRoute');
const funcionarioRoutes = require('./api/routes/funcionarioRoute');
const relatorioRoutes = require('./api/routes/relatorioRoute');

const app = express();
app.use(express.json());

// Rotas
app.use('/api', agendamentoRoutes);
app.use('/api', funcionarioRoutes);
app.use('/api', relatorioRoutes);

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync({ force: true }).then(() => {
    console.log('Banco de dados sincronizado.');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  });