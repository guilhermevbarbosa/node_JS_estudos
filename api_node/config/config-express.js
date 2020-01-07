var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

module.exports = function () {
    // Faz a ligação com o express na variável app
    var app = express();

    // Tipos de requisições aceitas
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Insere na variável app as rotas
    consign().include('routes').into(app);

    return app;
}