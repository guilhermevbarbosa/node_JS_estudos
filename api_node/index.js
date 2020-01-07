var app = require('./config/config-express');

app().listen(3000, function () {
    console.log('Servidor na porta 3000')
});