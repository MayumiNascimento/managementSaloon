const Usuario = require('../models/usuario');

// Criar um usuário
exports.criarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Visualizar um usuario específico
exports.visualizarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Atualizar um usuário
exports.atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Usuario.update(req.body, {
      where: { id },
    });
    if (updated) {
      const usuario = await Usuario.findByPk(id);
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar um usuário
exports.deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Usuario.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};