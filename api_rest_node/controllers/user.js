const User = require('../models/user');
const Auth = require('./auth');

// ROTAS
module.exports = app => {

    app.post('/usuario', Auth.verifyJWT, (req, res) => {
        const usuario = req.body;

        User.adiciona(usuario, res);
    })

    app.post('/usuario/login', (req, res) => {
        const email = req.body.email;
        const senha = req.body.senha;

        User.login(email, senha, res);
    })

    app.post('/usuario/logout', (req, res) => {
        User.logout(res);
    })

}