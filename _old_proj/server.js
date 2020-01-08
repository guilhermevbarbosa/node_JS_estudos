const app = require('./src/config/express-init');

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
});