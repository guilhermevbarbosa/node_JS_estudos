const LivroDao = require('../dao/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {

    // Busca todos
    app.get('/livros', (req, res) => {
        const livroDao = new LivroDao(db);

        livroDao.lista()
            .then(livros => {
                res.status(200).json({ message: 'Busca realizada', objeto: livros });
            })
            .catch(err => {
                res.status(500).json({ message: 'Erro na busca' });
            })
    });
    // Busca Todos

    // Busca Por ID
    app.get('/livros/:id', (req, res) => {
        const reqId = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(reqId)
            .then(livro => {
                res.status(200).json({ message: 'Busca realizada', objeto: livro });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Erro na busca' });
            })
    });
    // Busca Por ID

    // Adiciona
    app.post('/livros', function (req, res) {
        const livroDao = new LivroDao(db);

        livroDao.adiciona(req.body)
            .then(() => {
                res.status(201).json({ message: 'Adicionado com sucesso', objeto: req.body });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Erro ao adicionar' });
            });
    });
    // Adiciona

    // Deleta
    app.delete('/livros/:id', (req, res) => {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.remove(id)
            .then(() => {
                res.status(200).json({ message: 'Excluido com sucesso o ' + id });
            })
            .catch(err => {
                res.status(500).json({ message: 'Erro ao excluir ' + err });;
            })
    })
    // Deleta

    // Atualiza
    app.put('/livros', (req, res) => {
        const livroDao = new LivroDao(db);

        res.body = "";

        livroDao.atualiza(req.body)
            .then(livro => {
                res.status(200).json({ message: 'Atualizado com sucesso', objeto: req.body });
            })
            .catch(err => {
                console.log(err)
                res.status(500).send({ message: 'Erro ao atualizar' });
            })
    })
    // Atualiza

}