module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Raiz');
    });

    app.get('/livros', (req, res) => {
        res.marko(
            require('../views/livros/lista/lista.marko'),
            {
                livros: [
                    {
                        id: 1,
                        titulo: 'Fundamentos do Node'
                    },
                    {
                        id: 2,
                        titulo: 'Node avançado'
                    }
                ]
            }
        );
    });
}