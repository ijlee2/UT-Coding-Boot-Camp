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

connection.connect(error => {
    if (error) throw error;

    createProduct();
});

function createProduct() {
    console.log("Adding a product...\n");

    const query = connection.query("INSERT INTO products SET ?", {
        "flavor"  : "rocky road",
        "price"   : 3.00,
        "quantity": 50

    }, (error, result) => {
        console.log(result.affectedRows + " product inserted!\n");
        updateProduct();

    });

    console.log(query.sql);
}

function updateProduct() {
    console.log("Updating the Rocky Road product...\n");

    const query = connection.query("UPDATE products SET ? WHERE ?",
    [
        {
            "quantity": 100
        },
        {
            "flavor": "Rocky Road"
        }
    ], (error, result) => {
        console.log(result.affectedRows + " products updated!\n");

        deleteProduct();

    });
}

function deleteProduct() {
    console.log("Deleting all strawberry ice creams...\n");

    connection.query("DELETE FROM products WHERE ?", {
        "flavor": "strawberry"

    }, (error, result) => {
        console.log(result.affectedRows + " products deleted!\n");

        readProducts();

    });
}

function readProducts() {
    console.log("Selecting all products...\n");

    connection.query("SELECT * FROM products", (error, result) => {
        if (error) throw error;

        console.log(result);
        
        connection.end();
    });
}