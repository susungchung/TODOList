const mysql = require('mysql');
const db_config = require('../config/db_config')

var connection = mysql.createConnection({
    host:db_config.host,
    user:db_config.user,
    password:db_config.password,
    database:db_config.database
})
connection.connect();

module.exports = connection;