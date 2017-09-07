process.stdout.write("\033c");

const inquirer = require("inquirer");

const numPlayers = 8, numStarters = 5;
const players = [], stats = {"offense": 0, "defense": 0};


/****************************************************************************
    
    Helper functions
    
*****************************************************************************/
function randomNumber(a, b) {
    return Math.floor((b - a + 1) * Math.random() + a);
}

function displayTeamStats() {
    findTeamStats();

    // Display starters
    console.log("Starters:");
    players.filter(p => p.starter).forEach(p => p.printStats());

    // Display substitutes
    console.log("\nSubstitutes:");
    players.filter(p => !p.starter).forEach(p => p.printStats());
    
    console.log(`\nTeam offense: ${stats.offense}`);
    console.log(`Team defense: ${stats.defense}`);
}

function findTeamStats() {
    stats.offense = 0;
    stats.defense = 0;

    players.forEach(p => {
        if (p.starter) {
            stats.offense += p.offense;
            stats.defense += p.defense;
        }
    });
}


/****************************************************************************
    
    Create basketball players
    
*****************************************************************************/
let count = 0;

function Player(parameters) {
    for (let key in parameters) {
        this[key] = parameters[key];
    }
    
    this.goodGame = function() {
        if (randomNumber(0, 1)) {
            (randomNumber(0, 1)) ? this.offense++ : this.defense++;

            this.offense = Math.min(this.offense, 10);
            this.defense = Math.min(this.defense, 10);
        }
    }
    
    this.badGame = function() {
        if (randomNumber(0, 1)) {
            (randomNumber(0, 1)) ? this.offense-- : this.defense--;

            this.offense = Math.max(this.offense, 0);
            this.defense = Math.max(this.defense, 0);
        }
    }

    this.printStats = function() {
        console.log(`${this.name} - ${this.position}, ${this.offense}, ${this.defense}`);
    }
}

function enterPlayer() {
    console.log(`\nEnter Player #${count + 1}'s information (${(count < numStarters) ? "Starter" : "Substitute"})\n`);

    inquirer.prompt([
        {
            "type"   : "input",
            "name"   : "name",
            "message": "Name:",
            "default": `Player ${count + 1}`
        },
        {
            "type"   : "input",
            "name"   : "position",
            "message": "Position:"
        },
        {
            "type"    : "input",
            "name"    : "offense",
            "message" : "Offense skill (1 - 10):",
            "validate": function (value) {
                return (!isNaN(value) && parseFloat(value) === Math.trunc(value) && 1 <= parseInt(value) && parseInt(value) <= 10);
            },
            "default" : 6
        },
        {
            "type"    : "input",
            "name"    : "defense",
            "message" : "Defense skill (1 - 10):",
            "validate": function (value) {
                return (!isNaN(value) && parseFloat(value) === Math.trunc(value) && 1 <= parseInt(value) && parseInt(value) <= 10);
            },
            "default" : 6
        }

    ]).then(response => {
        players.push(new Player({
            "name"    : response.name,
            "position": response.position,
            "offense" : parseInt(response.offense),
            "defense" : parseInt(response.defense),
            "starter" : (count < numStarters),
        }));

        count++;

        if (count < numPlayers) {
            enterPlayer();

        } else {
            process.stdout.write("\033c");
            
            playGame();

        }
    });
}

enterPlayer();


/****************************************************************************
    
    Play a game of basketball
    
*****************************************************************************/
let score = 0, round = 0;

function playGame() {
    console.log(`\n\n--- Round ${round + 1} ---\n`);

    // Find the team's offensive and defensive stats
    displayTeamStats();

    // Opponents make a move
    const number1 = randomNumber(1, 50), number2 = randomNumber(1, 50);

    if (number1 < stats.offense) {
        score++;
    }

    if (number2 > stats.defense) {
        score--;
    }

    console.log(`Team score: ${score}\n`);

    // Allow a substitution after the round
    round++;

    if (round < 10) {
        inquirer.prompt([
            {
                "type"   : "list",
                "name"   : "playerOut",
                "message": "Player to sub out: ",
                "choices": players.filter(p => p.starter)
                                  .map(p => p.name)
                                  .concat("Skip")
            },
            {
                "type"   : "list",
                "name"   : "playerIn",
                "message": "Player to sub in: ",
                "choices": players.filter(p => !p.starter)
                                  .map(p => p.name),
                "when"   : function(response) {
                               return response.playerOut !== "Skip";
                           }
            }

        ]).then(response => {
            if (response.playerOut !== "Skip") {
                for (let i = 0; i < players.length; i++) {
                    // Sub out
                    if (players[i].name === response.playerOut) {
                        players[i].starter = false;
                        continue;
                    }

                    // Sub in
                    if (players[i].name === response.playerIn) {
                        players[i].starter = true;
                        continue;
                    }
                }
            }
            
            playGame();

        });

    // Ask the user if they want to restart the game
    } else {
        // Update the stats
        if (score > 0) {
            players.forEach(p => p.goodGame());

        } else if (score < 0) {
            players.forEach(p => p.badGame());

        }

        console.log("\n--- Stats Update ---\n");
        displayTeamStats();
        console.log();

        inquirer.prompt([
            {
                "type"   : "confirm",
                "name"   : "continue",
                "message": "Play again?",
                "default": true
            }

        ]).then(response => {
            if (response.continue) {
                process.stdout.write("\033c");

                score = 0;
                round = 0;
                playGame();

            }

        });

    }
}