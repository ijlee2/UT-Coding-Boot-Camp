/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const colors   = require("colors");
const inquirer = require("inquirer");
const mysql    = require("mysql");

const connection = mysql.createConnection({
    "host"    : "localhost",
    "port"    : 3306,
    "user"    : "root",
    "password": "",
    "database": "bamazon_db"
});

connection.connect(error => {
    try {
        if (error) {
            throw "Error: Connection to bamazon_db failed.\n";
        }

        displayAvailableItems();

    } catch(error) {
        displayError(error);

    }
});


function displayAvailableItems() {
    clearScreen();

    const sql_command = "SELECT * FROM products";

    connection.query(sql_command, (error, results) => {
        try {
            if (error) {
                throw `Error: SQL query "${sql_command}" failed.\n`;

            } else if (results.length === 0) {
                throw "Error: products table is empty.\n";

            }

            displayTable(results);

        } catch(error) {
            displayError(error);

        }

    });
}




function clearScreen() {
    process.stdout.write("\033c");
}

function displayError(error) {
    console.log(error.red.bold);

    setTimeout(() => connection.end(), 1000);
}

function displayTable(array) {
    // Find out how much space the longest word in each column takes
    const columnWidths = {};

    // Account for the header name
    const headers = Object.keys(array[0]);

    headers.forEach(h => columnWidths[h] = h.length);

    // Account for the values
    array.forEach(row => {
        for (let key in row) {
            // Convert numbers to String
            const column = row[key].toString();

            columnWidths[key] = Math.max(columnWidths[key], column.length);
        }
    });

    // Display headers
    let line = headers.reduce((sum, value) => sum + value + " ".repeat(columnWidths[value] - value.length + 2), "");

    console.log(line.toUpperCase().green.bold);

    // Display rows
    let count = 0;

    array.forEach(row => {
        // TODO: Use Object.values() once it's fully implemented in ES2017
        line = headers.reduce((sum, value) => {
            const item = row[value].toString();

            return sum + item + " ".repeat(columnWidths[value] - item.length + 2);

        }, "");

        console.log(line.white);

        // Insert a new line every 10 items
        count++;

        if (count % 10 === 0 || count === array.length) {
            console.log();
            count = 0;
        }
    });
}