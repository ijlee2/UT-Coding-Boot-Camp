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

const database          = firebase.database();
const database_players  = database.ref("players");
const database_turn     = database.ref("turn");
const database_messages = database.ref("messages");



/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
// Global variables
const numPlayersAllowed = 2;
let players, numPlayers, myID;
let turn;
let messages;

// Find out who are playing the game
database_players.on("value", (snapshot) => {
    players = snapshot.val();
    
    if (players) {
        numPlayers = players.filter(p => p !== -1).length;

        database_turn.set((numPlayers === numPlayersAllowed) ? 0 : null);
        
    // Initialize the database
    } else {
        for (let i = 0; i < numPlayersAllowed; i++) {
            database_players.child(i).set(-1);
        }

    }

    // Refresh the game page if the user is in the game
    if (typeof myID !== "undefined") {
        refreshDisplay();
    }
});

// Find out whose turn it is
database_turn.on("value", (snapshot) => {turn = snapshot.val(); console.log("It is Player " + turn + "'s now.");});

// Display chat messages
database_messages.on("child_added", (snapshot) => $("#messages").append(snapshot.val()));



/****************************************************************************
 ****************************************************************************
    
    Game mechanics
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    displayPage(0);

    // Allow the user to hit Enter key to enter name
    $("#playerName").on("keyup", event => {
        const playerName = $("#playerName").val().trim();

        if (event.keyCode === 13 && checkName(playerName)) {
            addPlayer(playerName);
        }
    });

    $("#button_submit").on("click", () => {
        const playerName = $("#playerName").val().trim();

        if (checkName(playerName)) {
            addPlayer(playerName);
        }
    });
});

// Name can consist of letters and numbers only
function checkName(name) {
    return name.match(/^[a-z0-9]+$/i);
}

function addPlayer(name) {
    if (numPlayers < numPlayersAllowed) {
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
}



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
    let element;
    
    if (turn === null) {
        for (let i = 0; i < numPlayersAllowed; i++) {
            element = `#player${i} > `;

            if (players[i] !== -1) {
                $(`${element}.name`).html(`<h2>${players[i].name}</h2>`);

            } else {
                $(`${element}.name`).html(`<h2>Waiting for Player ${i + 1}</h2>`);

            }
        }

    } else {
        for (let i = 0; i < numPlayersAllowed; i++) {
            $(`#player${i} > .name`).html(`<h2>${players[i].name}</h2>`);
        }

        if (turn === myID) {
            $(`#player${myID} > .display`).html("<div>Rock</div><div>Paper</div><div>Scissors</div>");

        } else {
            $(`#player${myID} > .display`).html(`<p>Waiting for ${players[turn].name} to make a move.<p>`);

        }
    }
}