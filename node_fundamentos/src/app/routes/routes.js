const LivroDao = require('../dao/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {

    //#region Listagem
    app.get('/livros', (req, res) => {
        const livroDao = new LivroDao(db);
        
        livroDao.lista()
        .then(livros => {
            res.status(200).send(livros).end();
        })
        .catch(err => {
            res.status(500).send(err).end();
        })
    });
    //#endregion Listagem
    
    app.get('/livros/form', (req, res) => {
        res.marko(
            require('../views/livros/form/form.marko')
        )
    });

    // app.get('/livros/:id', (req, res) => {
    //     var reqId = req.params.id;

    //     const livroDao = new LivroDao(db);

    //     livroDao.buscaPorId(reqId).then(function (err) {
    //         if (err) {
    //             return console.log(err);
    //         }

    //         res.status(200).json(res);
    //     })
    // });

    app.post('/livros', function (req, res) {
        console.log(req.body);

        const livroDao = new LivroDao(db);

        livroDao.adiciona(req.body)
            .then(res.redirect('/livros'))
            .catch(err => console.log(err));
    });

    app.delete('/livros/:id', (req, res) => {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.remove(id)
            .then(() => res.status(200).end())
            .catch(erro => console.log(erro))
    })
}