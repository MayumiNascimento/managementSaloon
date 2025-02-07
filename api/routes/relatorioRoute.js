const express = require('express');
const relatorioController = require('../controllers/relatorioController');

const router = express.Router();

router.get('/relatorios', relatorioController.gerarRelatorio);

module.exports = router;