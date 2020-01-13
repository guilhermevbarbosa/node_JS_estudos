const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const routes = require('../app/routes/routes');
routes(app);

app.use(function (req, res, next) {
    return res.status(404).json({ message: 'Erro! A url não existe.' })
})

app.use(function (err, req, res, next) {
    return res.status(500).json({ message: 'Erro! Erro encontrado no servidor, tente novamente mais tarde.' })
})

module.exports = app;