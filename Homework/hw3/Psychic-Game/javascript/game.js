/****************************************************************************
 ****************************************************************************
    
    Global variables
    
*****************************************************************************
*****************************************************************************/
// Game stats
var numWins, numLosses;
var answer;

// User inputs
var guesses, str_guesses, numGuessesLeft;



/****************************************************************************
 ****************************************************************************
    
    Start a new game
    
*****************************************************************************
*****************************************************************************/
function startNewGame() {
    // Create a random letter between a and z
    answer = String.fromCharCode(Math.floor(Math.random() * 25 + 97));

    // Display the answer for debugging
    $("#solution").text(answer);

    // Reset variables
    guesses        = [];
    str_guesses    = "";
    numGuessesLeft = 10;

    // Display variables
    $("#numWins").text(numWins);
    $("#numLosses").text(numLosses);

    $("#numGuessesLeft").text(numGuessesLeft);
    $("#guesses").text(str_guesses);
}

// Start a new game when the page loads for the first time
$(document).ready(function() {
    // Reset stats
    numWins   = 0;
    numLosses = 0;

    // Start a new game
    startNewGame();
});



/****************************************************************************
 ****************************************************************************
    
    Respond to user's actions
    
*****************************************************************************
*****************************************************************************/
$(document).on("keypress", function(e) {
    // Find out which key was pressed
    var yourGuess = String.fromCharCode(e.which).toLowerCase();

    if ("a" <= yourGuess && yourGuess <= "z") {
        // Check if the guess has yet to be made
        if (guesses.indexOf(yourGuess) === -1) {
            numGuessesLeft--;

            guesses.push(yourGuess);
            str_guesses += (yourGuess + " ");

            $("#numGuessesLeft").text(numGuessesLeft);
            $("#guesses").text(str_guesses);

            // Check if the guess is correct
            if (yourGuess === answer) {
                numWins++;

                startNewGame();

            // Check if the user has run out of guesses
            } else if (numGuessesLeft === 0) {
                numLosses++;

                startNewGame();

            }
        }
    }
});