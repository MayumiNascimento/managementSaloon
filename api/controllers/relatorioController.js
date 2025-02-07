const { Op } = require('sequelize'); 
const Funcionario = require('../models/funcionario');

const Agendamento = require('../models/agendamento');

// Gerar relatório
exports.gerarRelatorio = async (req, res) => {
  const { data_inicial, data_final } = req.query;

  try {
    // Verifica se as datas foram fornecidas
    if (!data_inicial || !data_final) {
      return res.status(400).json({ error: 'Datas inicial e final são obrigatórias.' });
    }

    // Converte as datas para o formato ISO
    const dataInicial = new Date(data_inicial);
    const dataFinal = new Date(data_final);

    // Busca os agendamentos no intervalo de datas
    const agendamentos = await Agendamento.findAll({
      where: {
        data_hora: {
          [Op.between]: [dataInicial, dataFinal], // Filtra por intervalo de datas
        },
        status: 'concluido', // Considera apenas agendamentos concluídos
      },
    });

    // Calcula o total de serviços e o valor total
    const total_servicos = agendamentos.length;
    const total_valor = agendamentos.reduce((total, agendamento) => total + parseFloat(agendamento.valor), 0);

    // Retorna o relatório
    res.status(200).json({
      data_inicial: dataInicial.toISOString().split('T')[0], // Formata a data para YYYY-MM-DD
      data_final: dataFinal.toISOString().split('T')[0],
      total_servicos,
      total_valor
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};