const app = require('./src/config/express-init');

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor rodando na porta 3000')
});