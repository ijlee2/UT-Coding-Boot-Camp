const inquirer = require("inquirer");
const mysql    = require("mysql");

const connection = mysql.createConnection({
    "host"    : "localhost",
    "port"    : 3306,
    "user"    : "root",
    "password": "",
    "database": "ebay_db"
});

connection.connect(error => {
    if (error) throw error;

    createItem();
});

function createItem() {
    inquirer.prompt(
    [
        {
            "type"    : "input",
            "name"    : "name",
            "message" : "Enter the name of the item:",
            "validate": value => (value !== "")
        },
        {
            "type"    : "input",
            "name"    : "bid_start",
            "message" : "Enter the starting bid:",
            "validate": value => (value !== "")
        }

    ]).then(response => {
        connection.query(`INSERT INTO items (name, current_bid) VALUES ("${response.name}", ${response.bid_start})`, (error, result) => {
            if (error) throw error;

            console.log(result);
        });

    });
}