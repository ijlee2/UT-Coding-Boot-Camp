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
let players = new Array(2);
let numPlayers, turn;
let messages;


/****************************************************************************
    
    Set the database behavior
    
*****************************************************************************/
function loadDatabase() {
    database.ref("players").on("child_added", function(snapshot) {
        // Update the array
        players[snapshot.key] = snapshot.val();
        console.log(players);
    });

    // When a player exists the game
    database.ref("players").on("child_removed", function(snapshot) {
        // Get the player
        player = snapshot.val();

        // Update the array (FIFO)
        /*
        players.shift();
        numPlayers--;
        */

        // TODO: Display player information
        
    });

    database.ref("numPlayers").on("value", function(snapshot) {
        numPlayers = (snapshot.val()) ? snapshot.val() : 0;
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

function displayPlayers() {
    $("#player1_display").text(player1.name);
    $("#player2_display").text(player2.name);
}


/****************************************************************************
    
    Add or delete a player
    
*****************************************************************************/
function addPlayer() {
    const player = {"name"     : $("#name").val().trim(),
                    "move"     : -1,
                    "numWins"  : 0,
                    "numLosses": 0};

    // Add the player
    if (numPlayers < 2) {
        database.ref("players").child(numPlayers).set(player);
        database.ref("numPlayers").set(numPlayers + 1);
        
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

    $("#name").on("keyup", function(e) {
        // Allow the user to hit Enter key to enter name
        if (e.keyCode === 13) {
            addPlayer();
        }
    });

    $("#button_submit").on("click", addPlayer);
});