var fs = require('fs');

module.exports = function (app) {

    app.post('/upload/imagem', function (req, res) {
        console.log('Recebendo imagem');

        var date = new Date;
        req.pipe(fs.createWriteStream('files/' + date)).on('finish', function () {
            console.log('OK');
            res.status(201).send('Tudo certo')
        })


    })

}