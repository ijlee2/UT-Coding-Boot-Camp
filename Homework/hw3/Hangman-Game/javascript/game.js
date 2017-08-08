/****************************************************************************
 ****************************************************************************
    
    Global variables
    
*****************************************************************************
*****************************************************************************/
// Game stats and variables
var numWins, numLosses;
var answer, answer_array;

// User inputs
var guesses, str_guesses, numGuessesLeft;



/****************************************************************************
 ****************************************************************************
    
    Start a new game
    
*****************************************************************************
*****************************************************************************/
function startNewGame() {
    // Choose a random word from the dictionary
    answer            = getWord().toLowerCase();
    var answer_length = answer.length;

    answer_array = new Array(answer_length);
    for (var i = 0; i < answer_length; i++) {
        answer_array[i] = "_";
    }

    // Display the answer for debugging
    $("#answer").text(answer);

    // What the user sees
    $("#answer_display").text(answer_array.join(" "));

    // Reset variables
    guesses        = [];
    str_guesses    = "";
    numGuessesLeft = Math.max(10, Math.min(answer_length + 4, 13));

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
            // Check if the guess is correct
            var index = answer.indexOf(yourGuess);

            if (index === -1) {
                numGuessesLeft--;

            } else {
                // Reveal all letters that match the guess
                while (index >= 0) {
                    answer_array[index] = yourGuess;

                    index = answer.indexOf(yourGuess, index + 1);
                }

                $("#answer_display").text(answer_array.join(" "));
            }

            // Record the guess
            guesses.push(yourGuess);
            str_guesses += (yourGuess + " ");

            $("#numGuessesLeft").text(numGuessesLeft);
            $("#guesses").text(str_guesses);

            // Check if the user has guessed the word correctly
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