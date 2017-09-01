// INSTRUCTIONS: Build a command-line based zombie fighting game. 
// =========================================================================================================

// In this game, you and a zombie will each be given a certain amount of health. (Perhaps: You 70, Zombie 15).

// For each round, you will be asked to guess a random number between 1 and 5.
// If your guess matches the random number of the Zombie -- you inflict a random amount of damage between 1 and 5. 
// If you guess does not match the random number of the Zombie -- the Zombie inflicts a random amount of damage to you between 1 and 5.
// Each round the zombie is given a new random number and you must guess again. 

// The game ends when you or the zombie gets to 0 health. 

// Note: You should use the inquirer package to take in user commands.
// Major Warning: inquirer's prompt function is "asynchronous", which means that the majority of your game logic will need to be inside the .then() function for your propmt. 

// ===========================================================================================================
let inquirer = require("inquirer");

let userHP   = 70, userDamage   = 5;
let zombieHP = 15, zombieDamage = 3;

let hitLocations = ["Head", "Chest", "Legs", "Arms"];

function checkHealth() {
    if (zombieHP <= 0) {
        console.log("You won.");
        process.exit();

    } else if (userHP <= 0) {
        console.log("You lost.");
        process.exit();

    } else {
        playRound();

    }
}

function displayHealth() {
    console.log(`You have ${userHP} HP. The zombie has ${zombieHP} HP.`)
}


function playRound() {
    // Allow the user to select a number
    inquirer.prompt([
        {
            "type"   : "list",
            "name"   : "targetArea",
            "message": "Where do you want to strike?",
            "choices": hitLocations
        }

    ]).then((results) => {
        let index = Math.floor(hitLocations.length * Math.random());

        if (results.targetArea === hitLocations[index]) {
            console.log("You got it!");
            displayHealth();

            zombieHP -= Math.floor(userDamage * Math.random()) + 1;

        } else {
            console.log(`You missed!`);
            displayHealth();

            userHP -= Math.floor(zombieDamage * Math.random()) + 1;

        }

        checkHealth();

    });
}

playRound();