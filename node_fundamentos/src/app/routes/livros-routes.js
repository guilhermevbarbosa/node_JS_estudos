// Controller de livros
const LivroController = require('../controllers/livros-controller');
const livroController = new LivroController();
// Controller de livros

// Variáveis das urls de caminho
const UrlPaths = require('../../config/urlPaths');
// Variáveis das urls de caminho

const Livro = require('../models/livros');

module.exports = (app) => {

    const rotas = UrlPaths.rotas();

    app.route(rotas.padraoLivros)
        .get(livroController.lista())
        .post(Livro.validacoes(), livroController.add())
        .put(livroController.update());

    app.route(rotas.padraoIdLivros)
        .get(livroController.buscaId())
        .delete(livroController.delete());
}