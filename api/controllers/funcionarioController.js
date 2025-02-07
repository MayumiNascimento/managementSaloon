const Funcionario = require('../models/funcionario');

// Criar um funcionário
exports.criarFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.create(req.body);
    res.status(201).json(funcionario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos os funcionários
exports.listarFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Visualizar um funcionario específico
exports.visualizarFuncionario = async (req, res) => {
    try {
      const { id } = req.params;
      const funcionario = await Funcionario.findByPk(id);
      if (funcionario) {
        res.status(200).json(funcionario);
      } else {
        res.status(404).json({ error: 'Funcionario não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Atualizar um funcionário
exports.atualizarFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Funcionario.update(req.body, {
      where: { id },
    });
    if (updated) {
      const funcionario = await Funcionario.findByPk(id);
      res.status(200).json(funcionario);
    } else {
      res.status(404).json({ error: 'Funcionário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar um funcionário
exports.deletarFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Funcionario.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Funcionário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};