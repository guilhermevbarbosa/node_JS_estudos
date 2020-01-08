var mysql = require('mysql');

function DBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'api_pag'
    });
}

module.exports = function () {
    return DBConnection;
}