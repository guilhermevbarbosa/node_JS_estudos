function PagamentoDao(connection) {
    this._connection = connection;
}

// O prototype serve para não ocorrer colisões entre threads, uma não interferir em outra dao
PagamentoDao.prototype.salva = function (pagamento, callback) {
    this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
}

PagamentoDao.prototype.lista = function (callback) {
    this._connection.query('SELECT * FROM pagamentos', callback);
}

PagamentoDao.prototype.buscaId = function (callback) {
    this._connection.query('SELECT * FROM pagamentos WHERE id = ?', [id], callback);
}

module.exports = function (connection) {
    return PagamentoDao;
}