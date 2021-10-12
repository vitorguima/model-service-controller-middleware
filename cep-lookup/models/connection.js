const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'vitor',
    password: '25373535',
    database: 'model_example' });

module.exports = connection;
