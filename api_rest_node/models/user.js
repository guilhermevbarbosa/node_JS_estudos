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

            const passBd = results[0].senha;

            if (err) {
                res.status(404).json(err);
            } else {
                console.log('ok')
                res.status(404).json({
                    message: 'Senha incorreta'
                });
            }

        })
    }
}

module.exports = new Usuario;