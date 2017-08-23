// Configure Firebase
const config = {
    apiKey           : "AIzaSyDXvqGhdA0Ub2OVaR2uAYRw4qMWxAJXLSg",
    authDomain       : "rps-multiplayer-53644.firebaseapp.com",
    databaseURL      : "https://rps-multiplayer-53644.firebaseio.com",
    projectId        : "rps-multiplayer-53644",
    storageBucket    : "rps-multiplayer-53644.appspot.com",
    messagingSenderId: "931155377111"
};

firebase.initializeApp(config);

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
let database, connectedRef, connectionsRef;

let player1, player2, playerID;
let messages;

function loadDatabase() {
    database = firebase.database();
    
    database.ref().once("value", function(snapshot) {
        // Create a database if it doesn't exist
        if (snapshot.val() === null) {
            console.log("create database");

            player1  = testPlayer1;
            player2  = testPlayer2;
            playerID = 1;
            messages = testMessages;

            database.ref().set({"player1" : player1,
                                "player2" : player2,
                                "playerID": 1,
                                "messages": messages});

        // Otherwise, load the database
        } else {
            console.log("load database");
            
            player1  = snapshot.val().player1;
            player2  = snapshot.val().player2;
            playerID = snapshot.val().playerID;
            messages = snapshot.val().messages;

        }

        displayPlayers();
    });
    console.log(player1);
    console.log(player2);

    // Track visitors
    connectedRef   = database.ref(".info/connected");
    connectionsRef = database.ref("connections");

    connectedRef.on("value", function(snap) {
        // When the user is online
        if (snap.val()) {
            // Add the user to the connections list
            const connection = connectionsRef.push(true);

            // Remove the user from the connections list when they disconnect
            connection.onDisconnect().remove();
        }
    });

    connectionsRef.on("value", function(snap) {
        $("#numPlayersOnline").text(snap.numChildren() - 1);
    });
}



/****************************************************************************
 ****************************************************************************
    
    Display functions
    
*****************************************************************************
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
 ****************************************************************************
    
    Wait for user actions
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    loadDatabase();

    displayPage(0);

    $("#name").on("keyup", function(e) {
        // Allow the user to hit Enter key to enter name
        if (e.keyCode === 13) {
            var name = $("#name").val().trim();

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

/*
database.ref("player1").on("value", function(snapshot) {
    // Get the most recent value from Firebase

    // Update the local values

}, function(error) {
    console.log("The read failed: " + error.code);

});

database.ref("player2").on("value", function(snapshot) {
    // Get the most recent value from Firebase

    // Update the local values

}, function(error) {
    console.log("The read failed: " + error.code);

});
*/