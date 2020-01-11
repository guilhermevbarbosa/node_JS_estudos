class LivroDao {

    constructor(db) {
        this._db = db;
    }

    // Busca todos
    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                function (err, results) {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(results);
                }
            )
        })
    }
    // Busca todos

    // Busca Por ID
    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get('SELECT * FROM livros WHERE id = ?', [id],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(result);
                })
        })
    }
    // Busca Por ID

    // Adiciona
    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`INSERT INTO livros ( titulo, preco, descricao ) values ( ?, ?, ? )`, [livro.titulo, livro.preco, livro.descricao],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(result);
                })
        })
    }
    // Adiciona

    // Deleta
    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`DELETE FROM livros WHERE id = ?`, [id],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(result);
                })
        })
    }
    // Deleta

    // Atualiza
    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?`, [livro.titulo, livro.preco, livro.descricao, livro.id],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(result);
                })
        })
    }
    // Atualiza

}

module.exports = LivroDao;