const mysql = require('mysql');
const { promisify } = require('util');

function createDBPool(options) {
    const pool = mysql.createPool(options);
    pool.query = promisify(pool.query);
    return pool;
}

module.exports = createDBPool;
