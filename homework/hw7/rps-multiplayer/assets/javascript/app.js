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



/****************************************************************************
 ****************************************************************************
    
    Rock, Paper, Scissors Game
    
*****************************************************************************
*****************************************************************************/
// Global variables
let database;
let player1, player2, playerID;

function loadDatabase() {

}



/****************************************************************************
 ****************************************************************************
    
    Display functions
    
*****************************************************************************
*****************************************************************************/
var displayPage = function(page) {
    $(".page").css({"display": "none"});
    $(`.page:nth-of-type(${page + 1})`).css({"display": "block"});
}



/****************************************************************************
 ****************************************************************************
    
    Wait for user actions
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    displayPage(0);

    $("#button_submit").on("click", function() {
        displayPage(1);
    })

    /*
    database = firebase.database();

    database.ref().once("value", function(snapshot) {
        // Create database if it doesn't exist
        if (snapshot.val() == null) {
            // Create game mechanics
            numPlayers = 0;
            playerTurn = 0;
            database.ref().set({"numPlayers": numPlayers,
                                "playerTurn": playerTurn});

            // Create Player 1 object
            player1 = {"name"     : "",
                       "move"     : -1,
                       "numWins"  :  0,
                       "numLosses":  0,
                       "messages" : []};

            database.ref("player1").set(player1);

            // Create Player 2 object
            player2 = {"name"     : "",
                       "move"     : -1,
                       "numWins"  :  0,
                       "numLosses":  0,
                       "messages" : []};

            database.ref("player2").set(player2);

        // Load database if it exists
        } else {
            numPlayers = snapshot.val().numPlayers;
            playerTurn = snapshot.val().playerTurn;
            player1    = snapshot.child("player1").val();
            player2    = snapshot.child("player2").val();

        }

        console.log(numPlayers);
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