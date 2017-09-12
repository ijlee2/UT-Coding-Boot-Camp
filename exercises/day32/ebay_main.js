const inquirer = require("inquirer");
const mysql    = require("mysql");

// A local copy of items available
let items;

const connection = mysql.createConnection({
    "host"    : "localhost",
    "port"    : 3306,
    "user"    : "root",
    "password": "",
    "database": "ebay_db"
});

connection.connect(error => {
    if (error) throw error;

    // Save a local copy of items
    displayItems(false);

    // Log in
    logIn();
});

// Login
function logIn() {
    clearScreen();

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
                    console.log(`Welcome, ${response.name}!`);

                    setTimeout(mainMenu, 1000);

                } else {
                    validated = false;

                }

            } else {
                validated = false;

            }

            if (!validated) {
                console.log("User name or password is incorrect.");

                setTimeout(logIn, 1000);
            }
            
        });
    });
}

// Main menu
function mainMenu() {
    clearScreen();

    inquirer.prompt([
        {
            "type"   : "list",
            "message": "Choose One Please",
            "choices": ["Create an item", "Bid on an item", "See all items", "Exit program"],
            "name"   : "menuItem"
        }

    ]).then(response => {
        clearScreen();

        switch (response.menuItem) {
            case "Create an item":
                createItem();
                break;

            case "Bid on an item":
                bid();
                break;

            case "See all items":
                displayItems(true);
                break;

            case "Exit program":
                console.log("Goodbye!");
                connection.end();
                break;

        }

    });
}


// Create
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

            console.log("Item successfully created!");

            setTimeout(mainMenu, 1000);
        });

    });
}

// Bid
function bid() {
    inquirer.prompt([
        {
            "type"   : "list",
            "name"   : "item",
            "message": "What item would you like to bid on?",
            "choices": items
        },
        {
            "type"    : "input",
            "name"    : "bid",
            "message" : "How much do you bid?",
            "validate": value => (value !== "")
        }

    ]).then(response => {
        const item = response.item;

        connection.query(`SELECT * FROM items WHERE name="${item}"`, (error, result) => {
            if (error) throw error;

            const bid = response.bid;
            const currentBid = result[0].current_bid;

            if (bid <= currentBid) {
                console.log(`That's not enough to beat the current high bid of $${currentBid}. Try again!`);

                setTimeout(mainMenu, 1000);

            } else {
                // Update the database
                connection.query(`UPDATE items SET current_bid=${bid} WHERE name="${item}"`, (error, result) => {
                    if (error) throw error;

                    console.log("Congratulations, you're the high bidder!");

                    setTimeout(mainMenu, 1000);
                });
            }    
        });
    });
}

// Read
function displayItems(show) {
    const sql_command = "SELECT name FROM items";
    
    connection.query(sql_command, (error, result) => {
        if (error) throw error;

        items = result.map(r => r.name);

        if (show) {
            console.log(`Items available for bid are:\n${items.map(i => `- ${i}`).join("\n")}`);

            setTimeout(mainMenu, 3000);
        }
    });
};

function clearScreen() {
    process.stdout.write("\033c");
}