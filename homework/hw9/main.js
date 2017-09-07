const Card     = require("./card.js");
const fs       = require("fs");
const inquirer = require("inquirer");

// Create a bank file if it does not exist
const file_bank = "bank.txt";

if (!fs.existsSync(file_bank)) {
    fs.writeFile(file_bank, "", error => {
        if (error) {
            return console.log(`Error in creating the file "${file_log}"\n${error}\n\n`);
        }
    });
}

let cards;


// Start the program
mainMenu();

function mainMenu() {
    clearScreen();
    cards = [];

    inquirer.prompt([
        {
            "type"   : "list",
            "name"   : "menuItem",
            "message": "Select an action:",
            "choices": ["Create cards", "Practice", "Exit program"]
        }

    ]).then(response => {
        switch (response.menuItem) {
            case "Create cards":
                createCards();
                break;

            case "Practice":
                practice();
                break;

            case "Exit program":
                console.log("Goodbye!\n");
                return;

        }

    });
}

function createCards() {
    inquirer.prompt([
        {
            "type"   : "list",
            "name"   : "type",
            "message": "What type of card do you want to create?",
            "choices": ["Basic", "Cloze"]
        },
        {
            "type"    : "input",
            "name"    : "question",
            "message" : "Enter the question:",
            "validate": value => (value !== "")
        },
        {
            "type"    : "input",
            "name"    : "answer",
            "message" : "Enter the answer:",
            "validate": value => (value !== "")
        },
        {
            "type"   : "confirm",
            "name"   : "continue",
            "message": "Create another card?",
            "default": true
        }

    ]).then(response => {
        // Try to create a Card instance (check if type is Cloze and answer appears in question)
        try {
            cards.push(new Card(response.type, response.question, response.answer).jsonify());

        } catch (error) {
            console.log(error);

        }

        if (response.continue) {
            console.log();
            createCards();

        } else {
            // Get existing cards
            fs.readFile(file_bank, "UTF8", (error, data) => {
                if (error) {
                    return console.log(`Error in reading cards from "${file_bank}"\n${error}\n\n`);
                }

                // Add cards that have been created
                const cards_new = (data !== "") ? JSON.parse(data).concat(cards) : cards;

                // Save the new deck
                fs.writeFile(file_bank, JSON.stringify(cards_new, null, 4), error => {
                    if (error) {
                        return console.log(`Error in writing cards to "${file_bank}"\n${error}\n\n`);
                    }

                });

            });

            mainMenu();

        }

    });
}

function clearScreen() {
    process.stdout.write("\033c");
}