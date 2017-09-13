/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const colors   = require("colors");
const inquirer = require("inquirer");
const mysql    = require("mysql");

const connection = mysql.createConnection({
    "host"              : "localhost",
    "port"              : 3306,
    "user"              : "root",
    "password"          : "",
    "database"          : "bamazon_db",
    "multipleStatements": true
});

connection.connect(error => {
    try {
        if (error) {
            throw "Error: Connection to bamazon_db failed.\n";
        }

        menu_customer();

    } catch(error) {
        displayError(error);

    }
});



/****************************************************************************
 ****************************************************************************
    
    Methods for customers
    
*****************************************************************************
*****************************************************************************/
function menu_customer() {
    clearScreen();

    console.log("--- Available Items ---\n");

    const sql_command = "SELECT * FROM products";

    connection.query(sql_command, (error, results) => {
        try {
            if (error) {
                throw `Error: SQL query "${sql_command}" failed.\n`;

            } else if (results.length === 0) {
                throw "Error: products table is empty.\n";

            }

            displayTable(results, 10);

            buyItem();

        } catch(error) {
            displayError(error);

        }

    });
}

function buyItem() {
    inquirer.prompt([
        {
            "type"    : "input",
            "name"    : "item_id",
            "message" : "Enter the ID of the item that you want to buy:",
            "validate": value => (value !== "" && !isNaN(value))
        },
        {
            "type"    : "input",
            "name"    : "buy_quantity",
            "message" : "Enter the quantity that you want to buy:",
            "validate": value => (value !== "" && !isNaN(value))
        },
        {
            "type"   : "confirm",
            "name"   : "continue",
            "message": "Buy another item?",
            "default": true
        }

    ]).then(response => {
        const item_id      = parseInt(response.item_id);
        const buy_quantity = parseInt(response.buy_quantity);

        const sql_command =
            `UPDATE products
             SET stock_quantity = IF(stock_quantity >= ${buy_quantity}, stock_quantity - ${buy_quantity}, stock_quantity)
             WHERE item_id = ${item_id};

             SELECT product_name, price FROM products WHERE item_id = ${item_id};`;

        connection.query(sql_command, (error, results) => {
            try {
                if (error) {
                    throw `Error: Updating item #${item_id} failed.\n`;
                }

                if (results[0].changedRows === 1) {
                    console.log("\nCongratulations, you bought ".white + `${buy_quantity} ${results[1][0].product_name}'s`.yellow.bold + "!".white);
                    console.log(`Subtotal: $${(buy_quantity * results[1][0].price).toFixed(2)}\n`.white);

                } else if (buy_quantity > 0) {
                    console.log("\nSorry, we do not have ".white + `${buy_quantity} ${results[1][0].product_name}'s`.yellow.bold + " in stock.".white);

                } else {
                    console.log("\nThat's all right. No pressure to buy ".white + `${results[1][0].product_name}'s`.yellow.bold + " right now.".white);

                }

            } catch(error) {
                displayError(error);

            } finally {
                if (response.continue) {
                    setTimeout(menu_customer, 2000);

                } else {
                    console.log("\nThank you for shopping with Bamazon!\n");

                    connection.end();

                }

            }

        });

    });
}



/****************************************************************************
 ****************************************************************************
    
    Helper functions
    
*****************************************************************************
*****************************************************************************/
function clearScreen() {
    process.stdout.write("\033c");
}

function displayError(error) {
    console.log(error.red.bold);

    setTimeout(() => connection.end(), 1000);
}

function displayTable(array, numRowsPerGroup) {
    /************************************************************************
    
        Find out how much space the longest word in each column takes
    
    *************************************************************************/
    const columnWidths = {};

    // Account for the header name
    const headers = Object.keys(array[0]);
    headers.forEach(h => columnWidths[h] = h.length);

    // Account for the values
    array.forEach(row => {
        for (let key in row) {
            columnWidths[key] = Math.max(columnWidths[key], row[key].toString().length);
        }
    });

    
    /************************************************************************
    
        Display the array of objects in a table
    
    *************************************************************************/
    // Create the header
    const output_header = headers.reduce((sum, value) => 
        sum + value + " ".repeat(columnWidths[value] - value.length + 2)

    , "").toUpperCase();

    let count = 0;

    array.forEach(row => {
        // Display the header
        if (count % numRowsPerGroup === 0) {
            console.log(`${output_header}`.yellow.bold);
        }

        // TODO: Use Object.values() once it's fully implemented in ES2017
        const output_row = headers.reduce((sum, value) => {
            const item = row[value].toString();

            return sum + item + " ".repeat(columnWidths[value] - item.length + 2);

        }, "");

        // Display the row
        console.log(output_row.white);

        // Add a separator
        count++;

        if (count % numRowsPerGroup === 0 || count === array.length) {
            console.log();
        }

    });
}