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
const testPlayer1 = {"name"     : "John",
                     "move"     : -1,
                     "numWins"  : 0,
                     "numLosses": 0};

const testPlayer2 = {"name"     : "Emily",
                     "move"     : -1,
                     "numWins"  : 0,
                     "numLosses": 0};

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
let player1, player2, playerID;
let messages;


/****************************************************************************
    
    Set the database behavior
    
*****************************************************************************/
function loadDatabase() {
    // When the page loads, or when a player starts the game
    database.ref("player1").on("child_added", function(snapshot) {
        // Get player information
        player1 = snapshot.val();

        // TODO: Display player information

    });

    database.ref("player2").on("child_added", function(snapshot) {
        // Get player information
        player2 = snapshot.val();

        // TODO: Display player information
        
    });

    // When a player exists the game
    database.ref("player1").on("child_removed", function(snapshot) {
        // Get player information
        player1 = {};

        // TODO: Display player information
        
    });

    // When a player exists the game
    database.ref("player2").on("child_removed", function(snapshot) {
        // Get player information
        player2 = {};

        // TODO: Display player information
        
    });

    // Track visitors
    connectedRef.on("value", function(snapshot) {
        // When a player is online
        if (snapshot.val()) {
            // Add the player to the connections list
            const connection = connectionsRef.push(true);

            // Remove the player from the list when they disconnect
            connection.onDisconnect().remove();
        }
    });

    connectionsRef.on("value", function(snapshot) {
        $("#numPlayersOnline").text(snapshot.numChildren() - 1);
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
    
    Wait for user actions
    
*****************************************************************************/
$(document).ready(function() {
    loadDatabase();

    displayPage(0);

    $("#name").on("keyup", function(e) {
        // Allow the user to hit Enter key to enter name
        if (e.keyCode === 13) {
            const name = $("#name").val().trim();

            displayPage(1);
        }
    });

    $("#button_submit").on("click", function() {
        displayPage(1);
    })

    /*
    database = firebase.database();

    database.ref().once("value", function(snapshot) {

        if (numPlayers === 0) {
            $("#player1_display").text("Waiting for Player 1...");
            $("#player2_display").text("Waiting for Player 2...");

        } else {
            if (numPlayers >= 1) {
                $("#player1_display").text("Player 1 is ready.");
            }
            if (numPlayers >= 2) {
                $("#player2_display").text("Player 2 is ready.");
            }

        }
    });
    */
});