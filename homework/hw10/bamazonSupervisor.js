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

        menu_supervisor();

    } catch(error) {
        displayError(error);

    }
});



/****************************************************************************
 ****************************************************************************
    
    Methods for supervisors
    
*****************************************************************************
*****************************************************************************/
const menuItems = {
    "Add a New Department" : addDepartment,
    "View Department Sales": viewDepartmentSales,
    "Exit Program"         : exitProgram
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

function addDepartment() {
    clearScreen();

    console.log("--- Add a New Department ---\n");

    inquirer.prompt([
        {
            "type"    : "input",
            "name"    : "department_name",
            "message" : "Enter the department name:",
            "validate": validateInput.isNotEmpty
        },
        {
            "type"    : "input",
            "name"    : "overhead_costs",
            "message" : "Enter the overhead costs:",
            "validate": validateInput.isNonnegativeReal
        },
        {
            "type"   : "confirm",
            "name"   : "continue",
            "message": "Add another department?",
            "default": true
        }

    ]).then(response => {
        const department_name = response.department_name;
        const overhead_costs  = Math.round(100 * response.overhead_costs) / 100;

        const sql_command = `INSERT INTO departments (department_name, overhead_costs) VALUES ("${department_name}", ${overhead_costs})`;

        connection.query(sql_command, (error, results) => {
            try {
                if (error) throw `Error: Adding ${department_name} failed.\n`;

                console.log("\n" + department_name.yellow.bold + " was successfully added.\n".white);

            } catch(error) {
                displayError(error);

            } finally {
                setTimeout((response.continue) ? addDepartment : menu_supervisor, 2000);

            }
            
        });

    });
}

function viewDepartmentSales() {
    clearScreen();

    console.log("--- View Department Sales ---\n");

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

    connection.end();
}