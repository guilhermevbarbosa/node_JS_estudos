module.exports = function (app) {

    app.get('/pagamentos', function (req, res) {
        console.log('Req OK');
        res.send('OK');
    });

    app.post('/pagamentos/pagamento', function (req, res) {
        var pagamento = req.body;
        console.log("Entrou pagamento");

        pagamento.status = 'CRIADO';
        pagamento.data = new Date;

        var connection = app.bd_files.connection();
        var pagamentoDao = new app.bd_files.PagamentosDao(connection);

        pagamentoDao.salva(pagamento, function (err, result) {

            if (err) {
                res.send(err);
            } else {
                console.log('pagamento criado');
                res.json(pagamento);
            }

        });
    });

}