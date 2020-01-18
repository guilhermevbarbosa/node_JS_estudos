const Atendimento = require('../models/atendimento');

// ROTAS
module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res);
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        Atendimento.adiciona(atendimento, res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.buscaPorId(id, res);
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const body = req.body;

        Atendimento.alterar(id, body, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.delete(id, res);
    });
}