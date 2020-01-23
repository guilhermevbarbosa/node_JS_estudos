const moment = require('moment');
const conn = require('../infra/conexao');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

// MÉTODOS
class Usuario {
    adiciona(userData, res) {
        const data_criacao = moment().format('YYYY-MM-DD HH:MM:SS');

        var senha = userData.senha;

        bcrypt.hash(senha, saltRounds, function (err, hash) {
            const userObj = { ...userData, senha: hash, data_criacao };
            const sql = 'INSERT INTO usuarios SET ?';

            if (err) {
                res.status(400).json(err);
                return false;
            }

            conn.query(sql, userObj, (err, results) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(201).json(results);
                }
            })
        });

    }

    login(email, pass, res) {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';

        conn.query(sql, [email], (err, results) => {


            if (err || results.length == 0) {
                res.status(404).json({ error: err, message: 'Erro na busca' });
            } else {
                const passBd = results[0].senha;

                bcrypt.compare(pass, passBd, function (err, result) {
                    if (result) {
                        res.status(200).json({ message: 'Logado com sucesso!', status: result })
                    } else {
                        res.status(400).json({ message: 'Erro na senha', err: err })
                    }
                })
            }

        })
    }
}

module.exports = new Usuario;