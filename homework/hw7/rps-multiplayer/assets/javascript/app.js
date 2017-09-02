/****************************************************************************
 ****************************************************************************
    
    Configure Firebase
    
*****************************************************************************
*****************************************************************************/
const config = {
    "apiKey"           : "AIzaSyDXvqGhdA0Ub2OVaR2uAYRw4qMWxAJXLSg",
    "authDomain"       : "rps-multiplayer-53644.firebaseapp.com",
    "databaseURL"      : "https://rps-multiplayer-53644.firebaseio.com",
    "projectId"        : "rps-multiplayer-53644",
    "storageBucket"    : "rps-multiplayer-53644.appspot.com",
    "messagingSenderId": "931155377111"
};

firebase.initializeApp(config);

const database         = firebase.database();
const database_players = database.ref("players");
const database_turn    = database.ref("turn");
const database_chat    = database.ref("chat");



/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
// Global variables
const numPlayersAllowed = 2;
let players, numPlayers, myID;
let turn;
let chat;

// Find out who are playing the game
database_players.on("value", (snapshot) => {
    players = snapshot.val();
    
    if (players) {
        numPlayers = players.filter(p => p !== -1).length;

        // For simplicity, Player 1 always makes the first move
        if (turn === null && numPlayers === numPlayersAllowed) {
            database_turn.set(0);

        // If a player drops out, set turn to null
        } else if (numPlayers < numPlayersAllowed) {
            database_turn.set(null);

        }
        
    // Initialize the database
    } else {
        for (let i = 0; i < numPlayersAllowed; i++) {
            database_players.child(i).set(-1);
        }

    }

    refreshDisplay();
});

// Find out whose turn it is
database_turn.on("value", (snapshot) => {
    turn = snapshot.val();

    refreshDisplay();
});

// Display chat messages
database_chat.on("child_added", (snapshot) => $("#chat").append(snapshot.val()));



/****************************************************************************
 ****************************************************************************
    
    Game mechanics
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    displayPage(0);
    $("#playerName").focus();

    // Allow the user to hit Enter key to enter name
    $("#playerName").on("keyup", event => {
        if (event.keyCode === 13) {
            addPlayer($("#playerName").val().trim());
        }
    });

    $("#button_submit").on("click", () => {
        addPlayer($("#playerName").val().trim());
    });
});

// Name can consist of letters and numbers only
function checkName(name) {
    return name.match(/^[a-z0-9]+$/i);
}

function addPlayer(name) {
    // TODO: Implement a wait list
    if (numPlayers >= numPlayersAllowed) {
        $("#playerName").focus();
        $("#errorMessage").html("<p>Sorry, 2 people are already playing the game. Please wait for the next round.</p>");

        return;
    }

    // Input validation
    if (!checkName(name)) {
        $("#playerName").focus();
        $("#errorMessage").html("<p>Please enter your name (letters, numbers only).</p>");

        setInterval(() => $("#errorMessage").empty(), 3000);

        return;
    }

    // Success
    const player = {
        "name"     : name,
        "choice"   : -1,
        "numWins"  : 0,
        "numLosses": 0
    };

    // Add the player to the next available spot
    for (let i = 0; i < numPlayersAllowed; i++) {
        if (players[i] === -1) {
            myID = i;

            database_players.child(myID).set(player);
            database_players.child(myID).onDisconnect().set(-1);

            break;
        }
    }

    displayPage(1);
}

// Respond to clicks on dynamically generated divs
$("body").on("click", ".attacks", function() {
    // Record whether the player chose Rock, Paper, or Scissors
    database_players.child(`${turn}/choice`).set($(".attacks").index(this));

    if (turn === numPlayersAllowed - 1) {
        let p1 = players[0], p2 = players[1];

        if (p1.choice !== p2.choice) {
            // Win condition for Player 1
            if ((p1.choice + 2) % 3 === p2.choice) {
                database_players.child(`0/numWins`).set(p1.numWins + 1);
                database_players.child(`1/numLosses`).set(p2.numLosses + 1);

            } else {
                database_players.child(`0/numLosses`).set(p1.numLosses + 1);
                database_players.child(`1/numWins`).set(p2.numWins + 1);

            }
        }
    }

    // Pass the turn
    database_turn.set((turn + 1) % numPlayersAllowed);
});



/****************************************************************************
 ****************************************************************************
    
    Display methods
    
*****************************************************************************
*****************************************************************************/
function displayPage(page) {
    $(".page").css({"display": "none"});
    $(`.page:nth-of-type(${page + 1})`).css({"display": "block"});
}

function refreshDisplay() {
    // Only refresh the display if the user is in the game
    if (typeof myID !== "number") {
        return;
    }

    if (turn === null) {
        for (let i = 0; i < numPlayersAllowed; i++) {
            $(`#player${i} > .name`).html((players[i] !== -1) ? `<h2>${players[i].name}</h2>` : `<h2>Searching for Player ${i + 1}</h2>`);
            $(`#player${i} > .stats`).html((players[i] !== -1) ? `<p>Wins: ${players[i].numWins}, Losses: ${players[i].numLosses}</p>` : "");
            $(`#player${i} > .display`).empty();
        }

    } else {
        for (let i = 0; i < numPlayersAllowed; i++) {
            $(`#player${i} > .name`).html(`<h2>${players[i].name}</h2>`);
            $(`#player${i} > .stats`).html(`<p>Wins: ${players[i].numWins}, Losses: ${players[i].numLosses}</p>`);
        }

        $(`#player${myID} > .display`).html((turn === myID) ? 
                                            `<div class="attacks">Rock</div><div class="attacks">Paper</div><div class="attacks">Scissors</div>` :
                                            `<p>Searching for ${players[turn].name} to make a move.<p>`);
    }
}