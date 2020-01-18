const moment = require('moment');
const conn = require('../infra/conexao');

// MÉTODOS
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

    lista(res) {
        const sql = 'SELECT * FROM atendimentos';

        conn.query(sql, (err, results) => {
            if (err) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(results);
            }
        })
    }

    buscaPorId(id, res) {
        const sql = 'SELECT * FROM atendimentos WHERE id = ?';

        conn.query(sql, id, (err, results) => {
            const resultado = results[0];

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(resultado);
            }
        })
    }

    alterar(id, body, res) {
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?';

        conn.query(sql, [body, id], (err, results) => {
            if (body.data) {
                body.data = moment(body.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
            }

            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(results);
            }
        })
    }

    delete(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?';

        conn.query(sql, id, (err, results) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(results);
            }
        })
    }

}

module.exports = new Atendimento;