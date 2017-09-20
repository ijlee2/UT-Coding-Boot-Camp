// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Requiring mysql package
const mysql = require("mysql");

// Setting up our connection information
const source = {
    "localhost": {
        "host"    : "localhost",
        "port"    : 3306,
        "user"    : "root",
        "password": "",
        "database": "starwars"
    }
};

// Creating our connection
const connection = mysql.createConnection(source.localhost);

// Connecting to the database.
connection.connect(function(err) {
    if (err) {
        return console.error("error connecting: " + err.stack);
    }
    console.log("connected as id " + connection.threadId);
});

// Exporting our connection
module.exports = connection;