const {Client} = require('pg');
//const db_config = require('../config/db_config');
const db_config = require('../db_config');

var connection = new Client({
    host:db_config.host,
    user:db_config.user,
    port:db_config.port,
    password:db_config.password,
    database:db_config.database,
    ssl:db_config.ssl
})
connection.connect();

module.exports = connection;