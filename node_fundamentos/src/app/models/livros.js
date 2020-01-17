const { check } = require('express-validator');

class Livro{
    static validacoes(){
        return [
                check('titulo').isLength({ min: 5 }).withMessage('O campo título deve ter no mínimo 5 letras'),
                check('preco').isCurrency().withMessage('O campo preço deve estar na formatação correta'),
        ]
    }
}

module.exports = Livro;