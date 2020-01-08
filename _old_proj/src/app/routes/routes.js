const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Raiz');
    });

    app.get('/livros', (req, res) => {

        const livroDao = new LivroDao(db);

        livroDao.lista().then(livros => res.marko(
            require('../views/livros/lista/lista.marko'),
            {
                livros: livros
            }
        )).catch(err => console.log(err));

    });

    app.get('/livros/form', (req, res) => {
        res.marko(
            require('../views/livros/form/form.marko')
        )
    });

    app.post('/livros', function (req, res) {
        console.log(req.body);

        const livroDao = new LivroDao(db);

        livroDao.adiciona(req.body)
            .then(res.redirect('/livros'))
            .catch(err => console.log(err));
    });
}