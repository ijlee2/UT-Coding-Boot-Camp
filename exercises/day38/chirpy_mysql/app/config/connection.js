// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Require mysql
const mysql = require("mysql");

// Set up our connection information
const connection = mysql.createConnection({
    "port"    : 3306,
    "host"    : "localhost",
    "user"    : "root",
    "password": "",
    "database": "chirpy"
});

// Connect to the database
connection.connect(error => {
    if (error) {
        return console.error("error connecting: " + error.stack);
    }
    
    console.log("connected as id " + connection.threadId);
});

// Export connection
module.exports = connection;