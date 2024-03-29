function PagamentoDao(connection) {
    this._connection = connection;
}

// O prototype serve para não ocorrer colisões entre threads, uma não interferir em outra dao
PagamentoDao.prototype.salva = function (pagamento, callback) {
    this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
}

PagamentoDao.prototype.atualizaStatus = function (pagamento, callback) {
    this._connection.query('UPDATE pagamentos SET status = ? WHERE id = ?', [pagamento.status, pagamento.id], callback);
}

PagamentoDao.prototype.deletaPagamento = function (id, callback) {
    this._connection.query('DELETE FROM pagamentos WHERE id = ?', id, callback);
}

PagamentoDao.prototype.lista = function (callback) {
    this._connection.query('SELECT * FROM pagamentos', callback);
}

PagamentoDao.prototype.buscaId = function (id, callback) {
    this._connection.query('SELECT * FROM pagamentos WHERE id = ?', [id], callback);
}

module.exports = function (connection) {
    return PagamentoDao;
}