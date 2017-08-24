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

const database   = firebase.database();
const playersRef = database.ref("players");



/****************************************************************************
 ****************************************************************************
    
    Rock, Paper, Scissors Game
    
*****************************************************************************
*****************************************************************************/
// Global variables
const numPlayersAllowed = 2;
let   numPlayersInMatch;
let   players = [], availableID = 0;
let   playerID, arrayID, turn;
let   messages;


/****************************************************************************
    
    Set the database behavior
    
*****************************************************************************/
function loadDatabase() {
    playersRef.on("child_added", function(snapshot) {
        // Get the player
        const player = snapshot.val();

        // Update the array
        players.push(player);
        
        database.ref("numPlayersInMatch").set(numPlayersInMatch + 1);
        
        refreshDisplay();
    });

    playersRef.on("child_removed", function(snapshot) {
        // Get the player
        const player = snapshot.val();
        playerID = player.id;

        // Update the array
        findArrayID();
        players.splice(arrayID, 1);
        
        database.ref("numPlayersInMatch").set(numPlayersInMatch - 1);
        
        refreshDisplay();
    });

    database.ref("numPlayersInMatch").on("value", function(snapshot) {
        numPlayersInMatch = (snapshot.val()) ? snapshot.val() : 0;

        console.log("Number of players in match: " + numPlayersInMatch);
    });

    database.ref("turn").on("value", function(snapshot) {
        turn = (snapshot.val()) ? snapshot.val() : undefined;
    });
}


/****************************************************************************
    
    Query functions
    
*****************************************************************************/
function findArrayID() {
    // Find the player in the array
    for (arrayID = 0; arrayID < players.length; arrayID++) {
        if (players[arrayID].id === playerID) {
//            myPlayer = players[arrayID];

            break;
        }
    }
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
    }
}


/****************************************************************************
    
    Add or delete a player
    
*****************************************************************************/
function addPlayer() {
    // Add the player
    if (numPlayersInMatch < numPlayersAllowed) {
        playerID = numPlayersInMatch;

        const player = {"id"       : playerID,
                        "name"     : $("#input_name").val().trim(),
                        "choice"   : -1,
                        "numWins"  : 0,
                        "numLosses": 0};    

        const playerRef = playersRef.child(playerID);

        playerRef.set(player);
        playerRef.onDisconnect().remove();

        displayPage(1);
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