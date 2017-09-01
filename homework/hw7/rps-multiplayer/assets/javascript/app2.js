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

const database_players = firebase.database().ref("players");



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
        
        console.log("Number of spots taken: " + numPlayers);
        console.log(players);
        
    // Initialize the database
    } else {
        for (let i = 0; i < numPlayersAllowed; i++) {
            database_players.child(i).set(-1);
        }

    }
});



/****************************************************************************
    
    Display functions
    
*****************************************************************************/
function displayPage(page) {
    $(".page").css({"display": "none"});
    $(`.page:nth-of-type(${page + 1})`).css({"display": "block"});
}

function refreshDisplay() {
    let element;

    if (numPlayersInMatch < numPlayersAllowed) {
        for (let i = 0; i < numPlayersAllowed; i++) {
            element = `#player${i} > `;

            if (!$.isEmptyObject(players[i])) {
                $(element + ".name").html(`<h2>${players[i].name}</h2>`);
                $(element + ".display").html("<p>Welcome to RPS Multiplayer!</p>");

            } else {
                $(element + ".name").html("<h2>Player 2</h2>");
                $(element + ".display").html("<p>Waiting for the player to join...<p>");

            }
        }
    }
}


/****************************************************************************
    
    Add a player
    
*****************************************************************************/
function addPlayer() {
    if (numPlayers < numPlayersAllowed) {
        const player = {"name"     : $("#input_name").val().trim(),
                        "choice"   : -1,
                        "numWins"  : 0,
                        "numLosses": 0};

        // Add the player to the next available spot
        for (let i = 0; i < numPlayersAllowed; i++) {
            if (players[i] === -1) {
                myID = i;

                database_players.child(i).set(player);
                database_players.child(i).onDisconnect().set(-1);

                break;
            }
        }

        displayPage(1);
    }
}


/****************************************************************************
    
    Wait for user actions
    
*****************************************************************************/
$(document).ready(function() {
    displayPage(0);

    $("#input_name").on("keyup", function(e) {
        // Allow the user to hit Enter key to enter name
        if (e.keyCode === 13) {
            addPlayer();
        }
    });

    $("#button_submit").on("click", addPlayer);
});