const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '107.180.11.206:3306',
    user: 'RH',
    password: '123456781',
    database: 'NodeJS_RH'
});

pool.query = util.promisify(pool.query);
module.exports = pool;
