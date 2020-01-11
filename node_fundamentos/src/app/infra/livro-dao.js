class LivroDao {

    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                function (err, results) {
                    if (err) {
                        return reject('Erro na listagem');
                    }

                    return resolve(results);
                }
            )
        })
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get('SELECT * FROM livros WHERE id = ?', [id], (err, result) => {
                if (err) {
                    return reject('Erro na busca');
                }

                return resolve(result);
            })
        })
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`INSERT INTO livros ( titulo, preco, descricao ) values ( ?, ?, ? )`, [livro.titulo, livro.preco, livro.descricao],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Erro ao adicionar');
                    }

                    resolve();
                })
        })
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?`, [livro.titulo, livro.preco, livro.descricao, livro.id],
                err => {
                    console.log(err);
                    return reject('Erro ao atualizar');
                })

            resolve();
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`DELETE FROM livros WHERE id = ?`, [id], (err) => {
                if (err) {
                    return reject('Erro ao deletar');
                }

                return resolve();
            })

        })
    }

}

module.exports = LivroDao;