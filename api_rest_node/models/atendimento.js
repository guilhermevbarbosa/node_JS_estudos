const moment = require('moment');
const conn = require('../infra/conexao');

class Atendimento {

    adiciona(atendimento, res) {
        // FORMATANDO DATAS
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        // FORMATANDO DATAS

        // VALIDAÇÕES
        const dataEValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;
        // VALIDAÇÕES

        if (existemErros) {
            res.status(400).json(erros);
        } else {
            // CRIANDO O NOVO OBJETO
            const atendimentoDatado = { ...atendimento, dataCriacao, data };
            const sql = 'INSERT INTO atendimentos SET ?'
            // CRIANDO O NOVO OBJETO

            conn.query(sql, atendimentoDatado, (err, results) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(201).json(results)
                }
            })
        }

    }

}

module.exports = new Atendimento;