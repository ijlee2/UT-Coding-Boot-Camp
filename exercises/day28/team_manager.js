process.stdout.write("\033c");

const inquirer = require("inquirer");

const numPlayers = 8;
const players = [], stats = {"offense": 0, "defense": 0};


/****************************************************************************
    
    Helper functions
    
*****************************************************************************/
function randomNumber(a, b) {
    return Math.floor((b - a + 1) * Math.random() + a);
}

function displayTeamStats() {
    findTeamStats();

    console.log("\nTeam Stats");

    players.forEach(p => p.printStats());
    
    console.log(`\nTeam offense: ${stats.offense}`);
    console.log(`Team defense: ${stats.defense}\n`);
}

function findTeamStats() {
    stats.offense = 0;
    stats.defense = 0;

    players.forEach(p => {
        if (p.position === "Starter") {
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
        }
    }
    
    this.badGame = function() {
        if (randomNumber(0, 1)) {
            (randomNumber(0, 1)) ? this.offense-- : this.defense--;
        }
    }

    this.printStats = function() {
        console.log(`${this.name} - ${this.position}, ${this.offense}, ${this.defense}`);
    }
}

function enterPlayer() {
    console.log(`\nEnter Player #${count + 1}'s information`);

    inquirer.prompt([
        {
            "type"   : "input",
            "name"   : "name",
            "message": "Name:"
        },
        {
            "type"   : "list",
            "name"   : "position",
            "message": "Position:",
            "choices": ["Starter", "Substitute"]
        },
        {
            "type"   : "input",
            "name"   : "offense",
            "message": "Offense skill (1 - 10):"
        },
        {
            "type"   : "input",
            "name"   : "defense",
            "message": "Defense skill (1 - 10):"
        }

    ]).then(response => {
        players.push(new Player({
            "name"    : response.name,
            "position": response.position,
            "offense" : parseInt(response.offense),
            "defense" : parseInt(response.defense)
        }));

        count++;

        if (count < numPlayers) {
            enterPlayer();

        } else {
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
    console.log(`\nRound ${round + 1}!`);

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

    console.log(`Score: ${score}\n`);

    // Allow a substitution after the round
    round++;

    if (round < 10) {
        inquirer.prompt([
            {
                "type"   : "list",
                "name"   : "playerOut",
                "message": "Player to sub out: ",
                "choices": players.filter(p => p.position === "Starter")
                                  .map(p => p.name)
                                  .concat("Skip")
            },
            {
                "type"   : "list",
                "name"   : "playerIn",
                "message": "Player to sub in: ",
                "choices": players.filter(p => p.position === "Substitute")
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
                        players[i].position = "Substitute";
                        continue;
                    }

                    // Sub in
                    if (players[i].name === response.playerIn) {
                        players[i].position = "Starter";
                        continue;
                    }

                    players[i].printStats();
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

        displayTeamStats();

        inquirer.prompt([
            {
                "type"   : "confirm",
                "name"   : "continue",
                "message": "Play again?",
                "default": true
            }

        ]).then(response => {
            if (response.continue) {
                round = 0;
                playGame();

            }

        });

    }
}