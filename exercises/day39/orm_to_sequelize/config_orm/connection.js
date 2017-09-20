// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************
const mysql = require("mysql");

// we placed the connections in this source object
const source = {
    "localhost": {
        "host"    : "localhost",
        "port"    : 3306,
        "user"    : "root",
        "password": "",
        "database": "todolist"
    },
    
    "jawsDB": {
        "host"    : "<host name>",
        "port"    : 3306,
        "user"    : "<name of user>",
        "password": "<password>",
        "database": "<name of database>"
    }
};

// we use source.[name of connection] to hook into mysql
const connection = mysql.createConnection(source.localhost);

connection.connect(function(error) {
    if (error) {
        return console.error("error connecting: " + error.stack);
    }

    console.log("connected as id " + connection.threadId);
});

module.exports = connection;