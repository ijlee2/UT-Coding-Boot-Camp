/****************************************************************************
 ****************************************************************************
    
    Global variables
    
*****************************************************************************
*****************************************************************************/
var numWins, numLosses;
var answer, arr_answer, str_answer;
var guesses, str_guesses, numTriesLeft;



/****************************************************************************
 ****************************************************************************
    
    Start a new game
    
*****************************************************************************
*****************************************************************************/
function startNewGame() {
    // Choose a random word from the dictionary
    answer            = getWord().toLowerCase();
    var answer_length = answer.length;

    // Initialize what the user sees
    arr_answer = new Array(answer_length);

    for (var i = 0; i < answer_length; i++) {
        arr_answer[i] = "_";
    }

    str_answer = arr_answer.join("");

    // Display the answer for debugging
    $("#answer").text(answer);

    // Reset guesses
    guesses      = [];
    str_guesses  = "";
    numTriesLeft = Math.max(6, Math.min(13 - Math.ceil(answer_length/2), 10));

    // Display messages
    $("#answer_display").text(str_answer);
    $("#numWins").text(numWins);
    $("#numLosses").text(numLosses);
    $("#numTriesLeft").text(numTriesLeft);
    $("#guesses").text(str_guesses);
}



/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads for the first time
    
*****************************************************************************
*****************************************************************************/
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
            // Check if the letter is a part of the word
            var index = answer.indexOf(yourGuess);

            if (index === -1) {
                numTriesLeft--;

                $("#numTriesLeft").text(numTriesLeft);

            } else {
                // Reveal all letters that match the letter
                while (index >= 0) {
                    arr_answer[index] = yourGuess;

                    index = answer.indexOf(yourGuess, index + 1);
                }

                str_answer = arr_answer.join("");

                $("#answer_display").text(str_answer);
                
            }

            // Record the letter
            guesses.push(yourGuess);
            str_guesses += yourGuess;

            $("#guesses").text(str_guesses);

            // Check if the user has guessed the word correctly
            if (str_answer === answer) {
                numWins++;

                startNewGame();

            // Check if the user has run out of guesses
            } else if (numTriesLeft === 0) {
                numLosses++;

                startNewGame();

            }
        }
    }
});