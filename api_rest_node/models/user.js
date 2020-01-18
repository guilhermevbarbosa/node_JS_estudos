const moment = require('moment');
const conn = require('../infra/conexao');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

// MÉTODOS
class Usuario {
    adiciona(userData, res) {
        const data_criacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const senha = bcrypt.hashSync(userData.senha, salt);

        const userObj = { ...userData, senha, data_criacao };
        const sql = 'INSERT INTO usuarios SET ?';

        conn.query(sql, userObj, (err, results) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(results);
            }
        })
    }

    login(email, pass, res) {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';

        conn.query(sql, [email], (err, results) => {
            console.log(results[0].senha);
            console.log(bcrypt.hashSync(pass, salt));

            const passBd = results[0].senha;
            const inputPass = bcrypt.hashSync(pass, salt);

            console.log(inputPass == passBd)

            if (err) {
                res.status(404).json(err);
            } else {
                if (bcrypt.compareSync(inputPass, passBd)) {
                    res.status(200).json(results);
                }
                res.status(404).json({
                    message: 'Senha incorreta'
                });
            }

        })
    }
}

module.exports = new Usuario;