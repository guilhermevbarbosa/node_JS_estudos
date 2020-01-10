var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var logger = require('../services/logger');

module.exports = function () {
    // Faz a ligação com o express na variável app
    var app = express();

    // Tipos de requisições aceitas
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Módulo de validação do express
    app.use(expressValidator());
    // Logs com o express, intercepta requisições do express
    app.use(morgan("common", {
        stream: {
            write: function (message) {
                logger.info(message);
            }
        }
    }));

    // Insere na variável app as rotas, deixa disponível para ser utilizada no ambiente todo utilizado pelo express
    consign().include('routes').then('bd_files').then('services').into(app);

    return app;
}