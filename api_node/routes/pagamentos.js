module.exports = function (app) {

    app.get('/pagamentos', function (req, res) {
        var connection = app.bd_files.connection();
        var pagamentoDao = new app.bd_files.PagamentosDao(connection);

        pagamentoDao.lista(function (err, result) {
            if (err) {
                res.status(500).send(err);
            }

            res.status(200).json(result);
        })
    });

    app.get('/pagamentos/pagamento/:id', function (req, res) {
        var id = req.params.id;

        var connection = app.bd_files.connection();
        var pagamentoDao = new app.bd_files.PagamentosDao(connection);

        pagamentoDao.buscaId(id, function (err, result) {
            if (err) {
                res.status(500).send(err);
            }

            res.status(200).json(result);
        })
    });

    // Cria novo registro
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
                pagamento.id = result.insertId;
                console.log('pagamento criado');
                res.location('/pagamentos/pagamento/' + pagamento.id);

                var response = {
                    dados_do_pagamento: pagamento,
                    links: [
                        {
                            href: "http://localhost:3000/pagamentos/pagamento/status/" + pagamento.id,
                            rel: "confirmar",
                            method: "PUT"
                        },
                        {
                            href: "http://localhost:3000/pagamentos/pagamento/status/" + pagamento.id,
                            rel: "cancelar",
                            method: "DELETE"
                        }
                    ]
                }

                res.status(201).json(response);
            }
        });
    });

    // Atualiza status de registro existente
    app.put('/pagamentos/pagamento/status/:id', function (req, res) {
        var id = req.params.id;
        var pagamento = {};

        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        var connection = app.bd_files.connection();
        var pagamentoDao = new app.bd_files.PagamentosDao(connection);

        pagamentoDao.atualizaStatus(pagamento, function (err) {
            if (err) {
                res.status(500).send(err);
                return;
            }

            res.send(pagamento);
        })
    });

    // Altera status para cancelado registro existente
    app.delete('/pagamentos/pagamento/status/:id', function (req, res) {
        var id = req.params.id;
        var pagamento = {};

        pagamento.id = id;
        pagamento.status = 'CANCELADO';

        var connection = app.bd_files.connection();
        var pagamentoDao = new app.bd_files.PagamentosDao(connection);

        pagamentoDao.atualizaStatus(pagamento, function (err) {
            if (err) {
                res.status(500).send(err);
                return;
            }

            res.status(200).send(pagamento);
        })
    });

    // Deleta registro existente
    app.delete('/pagamentos/pagamento/:id', function (req, res) {
        var id = req.params.id;

        var connection = app.bd_files.connection();
        var pagamentoDao = new app.bd_files.PagamentosDao(connection);

        pagamentoDao.deletaPagamento(id, function (err) {
            if (err) {
                res.status(500).send(err);
                return;
            }

            res.status(200).send("Deletado com sucesso");
        })
    });

}