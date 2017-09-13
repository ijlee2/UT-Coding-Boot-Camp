/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const displayTable  = require("./displayTable.js");
const validateInput = require("./validateInput.js");

const colors   = require("colors");
const inquirer = require("inquirer");
const mysql    = require("mysql");

// Create a local copy of departments and items (name -> id)
let departments = {}, items = {};

clearScreen();

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

    const sql_command =
        `SELECT department_id, department_name FROM departments;
         SELECT item_id, product_name FROM products;`;

    connection.query(sql_command, (error, results) => {
        try {
            if (error) {
                throw "Error: Creating a local copy failed.\n";

            } else if (results[0].length === 0) {
                throw "Error: departments table is empty.\n";

            } else if (results[1].length === 0) {
                throw "Error: products table is empty.\n";
                
            }

            results[0].forEach(r => departments[r.department_name] = r.department_id);
            results[1].forEach(r => items[r.product_name] = r.item_id);
            
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
            "type"   : "list",
            "name"   : "department_name",
            "message": "Select the department name:",
            "choices": Object.keys(departments)
        },
        {
            "type"    : "input",
            "name"    : "product_name",
            "message" : "Enter the product name:",
            "validate": validateInput.isNotEmpty
        },
        {
            "type"    : "input",
            "name"    : "price",
            "message" : "Enter the price of the product:",
            "validate": validateInput.isNonnegativeReal
        },
        {
            "type"    : "input",
            "name"    : "stock_quantity",
            "message" : "Enter the stock quantity:",
            "validate": validateInput.isWholeNumber
        },
        {
            "type"   : "confirm",
            "name"   : "continue",
            "message": "Add another product?",
            "default": true
        }

    ]).then(response => {
        const department_id = departments[response.department_name];
        const product_name  = response.product_name;
        const price         = Math.round(100 * response.price) / 100;

        const sql_command =
            `INSERT INTO products (department_id, product_name, price, stock_quantity)
             VALUES (${department_id}, "${product_name}", ${price}, ${response.stock_quantity});

             SELECT item_id FROM products ORDER BY item_id DESC LIMIT 1;`;

        connection.query(sql_command, (error, results) => {
            try {
                if (error) throw `Error: Adding ${product_name} failed.\n`;

                // Update the local copy
                items[product_name] = results[1][0].item_id;

                console.log("\n" + product_name.yellow.bold + " was successfully added.\n".white);

            } catch(error) {
                displayError(error);

            } finally {
                setTimeout((response.continue) ? addProduct : menu_manager, 2000);

            }

        });

    });
}

function viewProducts() {
    clearScreen();

    console.log("--- View Products for Sale ---\n");

    const sql_command =
        `SELECT p.item_id, d.department_name, p.product_name, p.price, p.stock_quantity, p.product_sales
         FROM products AS p
         INNER JOIN departments AS d
         ON p.department_id = d.department_id
         ORDER BY d.department_name, p.product_name`;

    connection.query(sql_command, (error, results) => {
        try {
            if (error) throw `Error: Displaying products for sale failed.\n`;

            displayTable(results, 10, {
                "item_id"        : 0,
                "department_name": undefined,
                "product_name"   : undefined,
                "price"          : 2,
                "stock_quantity" : 0,
                "product_sales"  : 2
            });

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
            "validate": validateInput.isWholeNumber
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
                if (error) throw `Error: Updating inventory of item #${item_id} failed.\n`;

                console.log("\nThere are now ".white + `${results[1][0].stock_quantity} ${results[1][0].product_name}'s`.yellow.bold + " in stock.".white);

            } catch(error) {
                displayError(error);

            } finally {
                setTimeout((response.continue) ? addToInventory : menu_manager, 2000);

            }

        });

    });

}

function viewLowInventory() {
    clearScreen();

    console.log("--- View Low Inventory ---\n");

    const sql_command =
        `SELECT p.item_id, d.department_name, p.product_name, p.price, p.stock_quantity, p.product_sales
         FROM products AS p
         INNER JOIN departments AS d
         ON p.department_id = d.department_id
         WHERE p.stock_quantity < 5
         ORDER BY d.department_name, p.product_name`;
    
    connection.query(sql_command, (error, results) => {
        try {
            if (error) throw `Error: Displaying low inventory failed.\n`;

            displayTable(results, 10, {
                "item_id"        : 0,
                "department_name": undefined,
                "product_name"   : undefined,
                "price"          : 2,
                "stock_quantity" : 0,
                "product_sales"  : 2
            });

            setTimeout(menu_manager, 5000);

        } catch(error) {
            displayError(error);

        }

    });
}

function exitProgram() {
    clearScreen();

    console.log("Goodbye!\n".white);

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

    connection.end();
}