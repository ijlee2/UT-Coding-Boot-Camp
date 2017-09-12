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

        menu_manager();

    } catch(error) {
        displayError(error);

    }
});



/****************************************************************************
 ****************************************************************************
    
    Methods for managers
    
*****************************************************************************
*****************************************************************************/
const menuItems = {
    "Add a new product"     : addProduct,
    "View products for sale": viewProducts,
    "Add to inventory"      : addToInventory,
    "View low inventory"    : viewLowInventory,
    "Exit program"          : exitProgram
};

function menu_manager() {
    clearScreen();

    inquirer.prompt([
        {
            "type"   : "list",
            "name"   : "menuItem",
            "message": "Select an action:",
            "choices": Object.keys(menuItems)
        }

    ]).then(response => {
        menuItems[response.menuItem]();

    });
}

function addProduct() {
    clearScreen();

    inquirer.prompt([
        {
            "type"    : "input",
            "name"    : "product_name",
            "message" : "Enter the product name:",
            "validate": value => (value !== "")
        },
        {
            "type"    : "input",
            "name"    : "department_name",
            "message" : "Enter the department name:",
            "validate": value => (value !== "")
        },
        {
            "type"    : "input",
            "name"    : "price",
            "message" : "Enter the price of the product:",
            "validate": value => (value !== "")
        },
        {
            "type"    : "input",
            "name"    : "stock_quantity",
            "message" : "Enter the stock quantity:",
            "validate": value => (value !== "" && !isNaN(value))
        },
        {
            "type"   : "confirm",
            "name"   : "continue",
            "message": "Add another product?",
            "default": true
        }

    ]).then(response => {
        const item_id      = parseInt(response.item_id);
        const buy_quantity = parseInt(response.buy_quantity);

        const sql_command =
            `INSERT INTO products (product_name, department_name, price, stock_quantity)
             VALUES ("${response.product_name}", "${response.department_name}", ${response.price}, ${response.stock_quantity})`;

        connection.query(sql_command, (error, results) => {
            try {
                if (error) {
                    throw `Error: Adding ${response.product_name} failed.\n`;
                }

                console.log(`${response.product_name} was successfully added.\n`);

            } catch(error) {
                displayError(error);

            } finally {
                if (response.continue) {
                    setTimeout(addProduct, 2000);

                } else {
                    setTimeout(menu_manager, 2000);

                }

            }

        });

    });
}

function viewProducts() {

}

function addToInventory() {

}

function viewLowInventory() {

}

function exitProgram() {
    console.log("Goodbye!");

    connection.end();
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

        if (count % numRowsPerGroup === numRowsPerGroup - 1) {
            console.log();
        }

        count++;

    });
}