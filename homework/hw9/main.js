/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const Card     = require("./card.js");
const fs       = require("fs");
const inquirer = require("inquirer");

// Create a bank file if it does not exist
const file_bank = "bank.txt";

if (!fs.existsSync(file_bank)) {
    fs.writeFile(file_bank, "", error => {
        if (error) {
            return console.log(`Error in creating the file "${file_bank}"\n${error}\n\n`);
        }
    });
}

// Load existing cards
let cards;

fs.readFile(file_bank, "UTF8", (error, data) => {
    if (error) {
        return console.log(`Error in reading cards from "${file_bank}"\n${error}\n\n`);
    }

    cards = (data !== "") ? JSON.parse(data) : [];
});


/****************************************************************************
 ****************************************************************************
    
    Start the program
    
*****************************************************************************
*****************************************************************************/
mainMenu();

function mainMenu() {
    clearScreen();

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
        // Try to create a card (check if type is Cloze and answer appears in question)
        try {
            cards.push(new Card(response.type, response.question, response.answer).jsonify());

        } catch (error) {
            console.log(error);

        }

        if (response.continue) {
            console.log();
            createCards();

        } else {
            // Save the new deck
            fs.writeFile(file_bank, JSON.stringify(cards, null, 4), error => {
                if (error) {
                    return console.log(`Error in writing cards to "${file_bank}"\n${error}\n\n`);
                }

            });

            mainMenu();

        }

    });
}

function practice() {
    if (cards.length === 0) {
        console.log("Please create a bank of questions first!\n\n");

        mainMenu();

    } else {
        inquirer.prompt([
            {
                "type"   : "list",
                "name"   : "type",
                "message": "What type of cards do you want to use?",
                "choices": ["Basic", "Cloze"]
            }

        ]).then(response => {
            const cardsFiltered = cards.filter(c => c.type === response.type);

            if (cardsFiltered.length === 0) {
                console.log(`Please create a bank of ${response.type} questions first!\n\n`);

                mainMenu();

            } else {
                // Ask questions
                const numQuestions = cardsFiltered.length;
                let   index = 0, numCorrectAnswers = 0;

                clearScreen();
                askQuestion();

                function askQuestion() {
                    inquirer.prompt([
                        {
                            "type"    : "input",
                            "name"    : `question`,
                            "message" : `${cardsFiltered[index].front}\nYour answer:`
                        }

                    ]).then(response => {
                        const regex = new RegExp(cardsFiltered[index].back, "i");

                        if (response.question.match(regex)) {
                            numCorrectAnswers++;

                            console.log("Correct!\n");

                        } else {
                            console.log(`Incorrect! The answer was ${cardsFiltered[index].back}.\n`);

                        }

                        index++;

                        if (index < numQuestions) {
                            askQuestion();

                        } else {
                            console.log(`Grade: ${Math.round(100 * numCorrectAnswers / numQuestions)}%\n`);

                        }

                    });
                }
            }
        });
    }
}

function clearScreen() {
    process.stdout.write("\033c");
}