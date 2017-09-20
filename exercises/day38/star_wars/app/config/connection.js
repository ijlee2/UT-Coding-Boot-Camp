// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************
/*
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
*/

const Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize
const sequelize = new Sequelize("starwars", "root", "", {
    "host"   : "localhost",
    "dialect": "mysql",
    "pool"   : {
        "max" : 5,
        "min" : 0,
        "idle": 10000
    }
});

// Exports the connection for other files to use
module.exports = sequelize;