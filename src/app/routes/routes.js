module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Raiz');
    });

    app.get('/livros', (req, res) => {
        res.marko(
            require('../views/livros/lista/lista.marko')
        )
    });
}