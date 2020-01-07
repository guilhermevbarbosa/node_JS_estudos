const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Raiz');
    });

    app.get('/livros', (req, res) => {

        const livroDao = new LivroDao(db);
        livroDao.lista(function (err, results) {
            res.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: results
                }
            );
        })

    });
}