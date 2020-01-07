module.exports = function (app) {
    app.get('/pagamentos', function (req, res) {
        console.log('Req OK');
        res.send('OK');
    });
}