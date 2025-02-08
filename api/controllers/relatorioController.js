const { Op } = require('sequelize');
const Agendamento = require('../models/agendamento');
const Funcionario = require('../models/funcionario');

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
        data: {
          [Op.between]: [dataInicial, dataFinal], //intervalo de datas
        },
        status: 'concluido', //apenas agendamentos concluídos
      },
      include: [
        {
          model: Funcionario,
          as: 'funcionario', 
          attributes: ['nome']
        },
      ],
    });

    // Calcula o total de serviços e o valor total
    const total_servicos = agendamentos.length;
    const total_valor = agendamentos.reduce((total, agendamento) => total + parseFloat(agendamento.valor), 0);

    // Formata os agendamentos para o relatório
    const agendamentosFormatados = agendamentos.map((agendamento) => ({
      servico: agendamento.servico,
      data: agendamento.data,
      hora: agendamento.hora,
      valor: agendamento.valor,
      cliente_nome: agendamento.cliente_nome,
      funcionario_id: agendamento.funcionario_id,
      funcionario_nome: agendamento.funcionario_nome
    }));

    // Retorna o relatório
    res.status(200).json({
      data_inicial: dataInicial.toISOString().split('T')[0], // Formata a data para YYYY-MM-DD
      data_final: dataFinal.toISOString().split('T')[0],
      agendamentos: agendamentosFormatados,
      total_servicos,
      total_valor,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};