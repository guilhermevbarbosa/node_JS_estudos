// Coloca o server no ar
const expressConfig = require('./config/customExpress');
const connection = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');

connection.connect((err) => {

    if (err) {
        console.log(err);
    } else {
        console.log('bd OK');

        Tabelas.init(connection);

        const app = expressConfig();
        app.listen(3000, () => {
            console.log('Rodando na porta 3000')
        });
    }

});
