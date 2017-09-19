const mysql = require("mysql");

const connection = mysql.createConnection({
    "host"    : "localhost",
    "user"    : "root",
    "password": "",
    "database": "parties_db"
});

connection.connect(error => {
    if (error) {
        return console.error("error connecting: " + error.stack);
    }
    
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;