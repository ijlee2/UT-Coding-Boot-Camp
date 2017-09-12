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
    inquirer.prompt([
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
        const sql_command = `INSERT INTO items (name, current_bid) VALUES ("${response.name}", ${response.bid_start})`;

        connection.query(sql_command, (error, result) => {
            if (error) throw error;

            console.log(result);
        });

    });
}

function userValidation() {
    inquirer.prompt([
        {
            "type"    : "input",
            "name"    : "name",
            "message" : "Enter the user name:",
            "validate": value => (value !== "")
        },
        {
            "type"    : "input",
            "name"    : "password",
            "message" : "Enter password:",
            "validate": value => (value !== "")
        }
    ])    
    .then(response => {
        const sql_command = `SELECT * FROM users WHERE name = "${response.name}"`;

        connection.query(sql_command, (error, result) => {
            if (error) throw error;

            let validated = (result.length > 0);

            if (validated) {
                if (response.password === result[0].password) {
                    console.log("Welcome");

                } else {
                    validated = false;
                }

            } else {
                validated = false;

            }

            if (!validated) {
                console.log("User name or password is incorrect.");
            }
            
        });
    });
}