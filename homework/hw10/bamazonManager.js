/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const colors       = require("colors");
const displayTable = require("./displayTable.js");
const inquirer     = require("inquirer");
const mysql        = require("mysql");

// Create a local copy of items (product name -> id)
let items = {};

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
        if (error) throw "Error: Connection to bamazon_db failed.\n";

    } catch(error) {
        displayError(error);

    }

    connection.query("SELECT item_id, product_name FROM products", (error, results) => {
        try {
            if (error) throw "Error: Creating a local copy of products failed.\n";

            results.forEach(r => items[r.product_name] = r.item_id);

            menu_manager();
            
        } catch(error) {
            displayError(error);

        }

    });
});



/****************************************************************************
 ****************************************************************************
    
    Methods for managers
    
*****************************************************************************
*****************************************************************************/
const menuItems = {
    "Add a New Product"     : addProduct,
    "View Products for Sale": viewProducts,
    "Add to Inventory"      : addToInventory,
    "View Low Inventory"    : viewLowInventory,
    "Exit Program"          : exitProgram
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

    console.log("--- Add a New Product ---\n");

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
        const sql_command =
            `INSERT INTO products (product_name, department_name, price, stock_quantity)
             VALUES ("${response.product_name}", "${response.department_name}", ${response.price}, ${response.stock_quantity});

             SELECT item_id FROM products ORDER BY item_id DESC LIMIT 1;`;

        connection.query(sql_command, (error, results) => {
            try {
                if (error) throw `Error: Adding ${response.product_name} failed.\n`;

                // Update the local copy
                items[response.product_name] = results[1][0].item_id;

                console.log("\n" + response.product_name.yellow.bold + " was successfully added.\n".white);

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
    clearScreen();

    console.log("--- View Products for Sale ---\n");

    connection.query("SELECT * FROM products", (error, results) => {
        try {
            if (error) {
                throw `Error: Displaying products table failed.\n`;

            } else if (results.length === 0) {
                throw "Error: products table is empty.\n";

            }

            displayTable(results, 10);

            setTimeout(menu_manager, 5000);

        } catch(error) {
            displayError(error);

        }

    });

}

function addToInventory() {
    clearScreen();

    console.log("--- Add to Inventory ---\n");

    inquirer.prompt([
        {
            "type"   : "list",
            "name"   : "product_name",
            "message": "Select the item to update:",
            "choices": Object.keys(items)
        },
        {
            "type"    : "input",
            "name"    : "add_quantity",
            "message" : "Update the inventory by:",
            "validate": value => (value !== "" && !isNaN(value))
        },
        {
            "type"   : "confirm",
            "name"   : "continue",
            "message": "Add another item?",
            "default": true
        }

    ]).then(response => {
        const item_id = items[response.product_name];

        const sql_command =
            `UPDATE products
             SET stock_quantity = stock_quantity + ${response.add_quantity}
             WHERE item_id = ${item_id};

             SELECT product_name, stock_quantity FROM products WHERE item_id = ${item_id};`;

        connection.query(sql_command, (error, results) => {
            try {
                if (error) throw `Error: Updating item #${item_id} failed.\n`;

                console.log("\nThere are now ".white + `${results[1][0].stock_quantity} ${results[1][0].product_name}'s`.yellow.bold + " in stock.".white);

            } catch(error) {
                displayError(error);

            } finally {
                if (response.continue) {
                    setTimeout(addToInventory, 2000);

                } else {
                    setTimeout(menu_manager, 2000);

                }

            }

        });

    });

}

function viewLowInventory() {
    clearScreen();

    console.log("--- View Low Inventory ---\n");
    
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", (error, results) => {
        try {
            if (error) throw `Error: Displaying products table failed.\n`;

            displayTable(results, 10);

            setTimeout(menu_manager, 5000);

        } catch(error) {
            displayError(error);

        }

    });
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