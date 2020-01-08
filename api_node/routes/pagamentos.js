module.exports = function (app) {

    app.get('/pagamentos', function (req, res) {
        console.log('Req OK');
        res.send('OK');
    });

    app.post('/pagamentos/pagamento', function (req, res) {

        // Validando os campos, funciona pelo módulo express validator
        req.assert("forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        req.assert("valor", "Valor é obrigatório e deve ser um decimal").notEmpty().isFloat();

        var errors = req.validationErrors();

        if (errors) {
            console.log("Erros no form");
            res.status(400).send(errors);
            return;
        }

        var pagamento = req.body;
        console.log("Entrou pagamento");

        pagamento.status = 'CRIADO';
        pagamento.data = new Date;

        var connection = app.bd_files.connection();
        var pagamentoDao = new app.bd_files.PagamentosDao(connection);

        pagamentoDao.salva(pagamento, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log('pagamento criado');
                res.location('/pagamentos/pagamento/' + result.insertId);
                res.status(201).json(pagamento);
            }
        });

    });

}