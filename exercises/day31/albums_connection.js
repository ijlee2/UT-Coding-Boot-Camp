const mysql = require("mysql");

const connection = mysql.createConnection({
    "host": "localhost",
    "port": 3306,

    // User name
    "user": "root",

    // Password
    "password": "",
    "database": "albums_db"
});

connection.connect(function(error) {
    if (error) throw error;

    console.log("connected as id " + connection.threadId);

    connection.query("SELECT * FROM albums", function(error, result) {
        if (error) throw error;

        console.log(result);

        connection.end();
    });
});