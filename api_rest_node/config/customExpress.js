// Configurações de dentro do express
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
require('dotenv-safe').config();

module.exports = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    consign().include('controllers').into(app);

    return app;
}