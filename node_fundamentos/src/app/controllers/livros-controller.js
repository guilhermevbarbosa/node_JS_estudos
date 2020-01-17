const LivroDao = require('../dao/livro-dao');
const db = require('../../config/database');
const { validationResult } = require('express-validator');

class LivroControlador {

    static rotas() {
        return {
            padrao: '/livros',
            padraoId: '/livros/:id'
        }
    }

    // Busca todos
    lista() {
        return function (req, res) {
            const livroDao = new LivroDao(db);
            livroDao.lista()
                .then(livros => {
                    res.status(200).json({ message: 'Busca realizada', objeto: livros });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: 'Erro na busca' });
                })
        }
    }
    // Busca todos

    // Busca Por ID
    buscaId() {
        return (req, res) => {
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
        }
    }
    // Busca Por ID

    // Adiciona
    add() {
        return function (req, res) {
            const livroDao = new LivroDao(db);

            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                res.status(400).json({ message: 'Campos incorretos, verifique os campos novamente', erros: erros.array() });
            } else {
                livroDao.adiciona(req.body)
                    .then(() => {
                        res.status(201).json({ message: 'Adicionado com sucesso', objeto: req.body });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: 'Erro ao adicionar' });
                    });
            }
        }
    }
    // Adiciona

    // Deleta
    delete() {
        return (req, res) => {
            const id = req.params.id;
            const livroDao = new LivroDao(db);

            livroDao.remove(id)
                .then(() => {
                    res.status(200).json({ message: 'Excluido com sucesso o ' + id });
                })
                .catch(err => {
                    res.status(500).json({ message: 'Erro ao excluir ' + err });;
                })
        }
    }
    // Deleta

    // Atualiza
    update() {
        return (req, res) => {
            const livroDao = new LivroDao(db);

            livroDao.atualiza(req.body)
                .then(livro => {
                    res.status(200).json({ message: 'Atualizado com sucesso', objeto: req.body });
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).send({ message: 'Erro ao atualizar' });
                })
        }
    }
    // Atualiza

}

module.exports = LivroControlador;