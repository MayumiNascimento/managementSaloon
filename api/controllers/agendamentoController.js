const Agendamento = require('../models/agendamento');

// Criar um agendamento
exports.criarAgendamento = async (req, res) => {
  try {
    const agendamento = await Agendamento.create(req.body);
    res.status(201).json(agendamento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos os agendamentos
exports.listarAgendamentos = async (req, res) => {
  try {
    const agendamentos = await Agendamento.findAll();
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Visualizar um agendamento específico
exports.visualizarAgendamento = async (req, res) => {
    try {
      const { id } = req.params;
      const agendamento = await Agendamento.findByPk(id);
      if (agendamento) {
        res.status(200).json(agendamento);
      } else {
        res.status(404).json({ error: 'Agendamento não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Atualizar um agendamento
exports.atualizarAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Agendamento.update(req.body, {
      where: { id },
    });
    if (updated) {
      const agendamento = await Agendamento.findByPk(id);
      res.status(200).json(agendamento);
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar um agendamento
exports.deletarAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Agendamento.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};