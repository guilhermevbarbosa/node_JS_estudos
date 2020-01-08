var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function () {
    // Faz a ligação com o express na variável app
    var app = express();

    // Tipos de requisições aceitas
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Módulo de validação do express
    app.use(expressValidator());

    // Insere na variável app as rotas, deixa disponível para ser utilizada no ambiente todo utilizado pelo express
    consign().include('routes').then('bd_files').into(app);

    return app;
}