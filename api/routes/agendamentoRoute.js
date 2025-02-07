const express = require('express');
const agendamentoController = require('../controllers/agendamentoController');

const router = express.Router();

router.post('/agendamentos', agendamentoController.criarAgendamento);
router.get('/agendamentos', agendamentoController.listarAgendamentos);
router.get('/agendamentos/:id', agendamentoController.visualizarAgendamento);
router.put('/agendamentos/:id', agendamentoController.atualizarAgendamento);
router.delete('/agendamentos/:id', agendamentoController.deletarAgendamento);

module.exports = router;