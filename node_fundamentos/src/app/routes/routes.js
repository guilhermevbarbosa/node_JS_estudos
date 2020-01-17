const { check } = require('express-validator');

// Controller de livros
const LivroController = require('../controllers/livros-controller');
const livroController = new LivroController();
// Controller de livros

const UrlPaths = require('../../config/urlPaths');

module.exports = (app) => {

    const rotas = UrlPaths.rotas();

    // Busca todos
    app.get(rotas.padraoLivros, livroController.lista());
    // Busca Todos

    // Busca Por ID
    app.get(rotas.padraoIdLivros, livroController.buscaId());
    // Busca Por ID

    // Adiciona
    app.post(rotas.padraoLivros, [
        check('titulo').isLength({ min: 5 }).withMessage('O campo título deve ter no mínimo 5 letras'),
        check('preco').isCurrency().withMessage('O campo preço deve estar na formatação correta')],
        livroController.add());
    // Adiciona

    // Deleta
    app.delete(rotas.padraoIdLivros, livroController.delete());
    // Deleta

    // Atualiza
    app.put(rotas.padraoLivros, livroController.update());
    // Atualiza

}