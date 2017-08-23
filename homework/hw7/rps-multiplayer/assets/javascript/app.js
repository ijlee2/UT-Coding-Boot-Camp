/****************************************************************************
 ****************************************************************************
    
    Configure Firebase
    
*****************************************************************************
*****************************************************************************/
const config = {
    apiKey           : "AIzaSyDXvqGhdA0Ub2OVaR2uAYRw4qMWxAJXLSg",
    authDomain       : "rps-multiplayer-53644.firebaseapp.com",
    databaseURL      : "https://rps-multiplayer-53644.firebaseio.com",
    projectId        : "rps-multiplayer-53644",
    storageBucket    : "rps-multiplayer-53644.appspot.com",
    messagingSenderId: "931155377111"
};

firebase.initializeApp(config);

const database       = firebase.database();
const connectedRef   = database.ref(".info/connected");
const connectionsRef = database.ref("connections");
const playersRef     = database.ref("players");

// Define a test case
const testMessages = ["John: Hi, there!",
                      "Emily: Hello.",
                      "John: How are you?",
                      "Emily: Doing well, thanks."];



/****************************************************************************
 ****************************************************************************
    
    Rock, Paper, Scissors Game
    
*****************************************************************************
*****************************************************************************/
// Global variables
const numPlayersAllowed = 2;
let players = new Array(numPlayersAllowed), numPlayersInMatch, turn;
let messages;


/****************************************************************************
    
    Set the database behavior
    
*****************************************************************************/
function loadDatabase() {
    playersRef.on("child_added", function(snapshot) {
        // Update the array
        players[snapshot.key] = snapshot.val();
        
        refreshDisplay();
    });

    // When a player exists the game
    playersRef.on("child_removed", function(snapshot) {
        // Get the player
        players[snapshot.key] = undefined;
        numPlayersInMatch--;

        refreshDisplay();
        
    });

    database.ref("numPlayersInMatch").on("value", function(snapshot) {
        numPlayersInMatch = (snapshot.val()) ? snapshot.val() : 0;
    });

    database.ref("turn").on("value", function(snapshot) {
        turn = (snapshot.val()) ? snapshot.val() : undefined;
    });
    
    // Track visitors
    connectedRef.on("value", function(snapshot) {
        // When a user is online
        if (snapshot.val()) {
            // Add the user to the connections list
            const connection = connectionsRef.push(true);

            // Remove the user from the list when they disconnect
            connection.onDisconnect().remove();
        }
    });

    connectionsRef.on("value", function(snapshot) {
        $("#numActiveVisitors").text(snapshot.numChildren() - 1);
    });
}


/****************************************************************************
    
    Display functions
    
*****************************************************************************/
function displayPage(page) {
    $(".page").css({"display": "none"});
    $(`.page:nth-of-type(${page + 1})`).css({"display": "block"});
}

function refreshDisplay() {
    let element;

    console.log(players);

    // If the game hasn't started yet
    if (numPlayersInMatch < numPlayersAllowed) {
        for (let i = 0; i < numPlayersAllowed; i++) {
            element = `#player${i} > `;

            if (!$.isEmptyObject(players[i])) {
                $(element + ".name").html(`<h2>${players[i].name}</h2>`);
                $(element + ".display").html("<p>Welcome to RPS Multiplayer!</p>");

            } else {
                $(element + ".name").html("<h2>???</h2>");
                $(element + ".display").html("<p>Waiting for the player to join...<p>");

            }
        }

    // Play RPS
    } else {
        for (let i = 0; i < numPlayersAllowed; i++) {
            element = `#player${i} > `;

            // Selection menu
            if (players[i].choice === -1) {
                $(element + ".display").html(`<div class="choices">Rock</div>
                                              <div class="choices">Paper</div>
                                              <div class="choices">Scissors</div>`);

            // Display the user's choice
            } else {

            }
        }

    }
}


/****************************************************************************
    
    Add or delete a player
    
*****************************************************************************/
function addPlayer() {
    const player = {"name"     : $("#input_name").val().trim(),
                    "choice"   : -1,
                    "numWins"  : 0,
                    "numLosses": 0};

    // Add the player
    if (numPlayersInMatch < numPlayersAllowed) {
        // TODO: Change numPlayersInMatch to the available ID
        const playerRef = database.ref("players").push(player);
        playerRef.onDisconnect().remove();

        database.ref("numPlayersInMatch").set(numPlayersInMatch + 1);
        database.ref("turn").set(0);
        
        displayPage(1);

    } else {
        console.log("Please wait for the next available match.");

    }
}


/****************************************************************************
    
    Wait for user actions
    
*****************************************************************************/
$(document).ready(function() {
    loadDatabase();

    displayPage(0);

    $("#input_name").on("keyup", function(e) {
        // Allow the user to hit Enter key to enter name
        if (e.keyCode === 13) {
            addPlayer();
        }
    });

    $("#button_submit").on("click", addPlayer);
});