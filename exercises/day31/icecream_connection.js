const mysql = require("mysql");

const connection = mysql.createConnection({
    "host": "localhost",
    "port": 3306,

    // User name
    "user": "root",

    // Password
    "password": "",
    "database": "icecream_db"
});

connection.connect(function(error) {
    if (error) throw error;

    console.log("connected as id " + connection.threadId);

    connection.query("SELECT * FROM products", function(error, result) {
        if (error) throw error;

        console.log(result);
        console.log(result[0].id, result[0].flavor, result[0].price, result[0].quantity);
        
        connection.end();
    });
});