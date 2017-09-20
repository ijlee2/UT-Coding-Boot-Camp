// Import packages
const mysql = require("mysql");

// For testing on localhost
const config_localhost = {
    "host"    : "localhost",
    "port"    : 3306,
    "user"    : "root",
    "password": "",
    "database": "burgers_db"
};

// Connect to database
const pool = mysql.createPool(process.env.JAWSDB_URL || config_localhost);

module.exports = pool;