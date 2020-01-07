class LivroDao {

    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                function (err, results) {
                    if (err) return reject('Erro na listagem');

                    return resolve(results);
                }
            )
        })
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`INSERT INTO livros ( titulo, preco, descricao ) values ( ?, ?, ? )`, [ livro.titulo, livro.preco, livro.descricao ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Erro ao adicionar');
                    }

                    resolve();
                })
        })
    }

}

module.exports = LivroDao;