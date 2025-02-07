const express = require('express');
const funcionarioController = require('../controllers/funcionarioController');

const router = express.Router();

router.post('/funcionarios', funcionarioController.criarFuncionario);
router.get('/funcionarios', funcionarioController.listarFuncionarios);
router.get('/funcionarios/:id', funcionarioController.visualizarFuncionario);
router.put('/funcionarios/:id', funcionarioController.atualizarFuncionario);
router.delete('/funcionarios/:id', funcionarioController.deletarFuncionario);

module.exports = router;