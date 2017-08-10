/****************************************************************************
 ****************************************************************************
    
    Global variables
    
*****************************************************************************
*****************************************************************************/
// Variables for the game
var numWins = 0, numLosses = 0;

// Variables for the user
var answer;
var guesses_array, guesses_string, numTriesLeft;



/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads for the first time
    
*****************************************************************************
*****************************************************************************/
function startNewGame() {
    // Create a random letter between a and z
    answer = String.fromCharCode(Math.floor(26 * Math.random()) + 97);

    // Display the answer for debugging
    $("#answer").text(answer);

    // Reset variables
    guesses_array  = [];
    guesses_string = "";
    numTriesLeft   = 10;

    // Display variables
    $("#numWins").text(numWins);
    $("#numLosses").text(numLosses);
    $("#numTriesLeft").text(numTriesLeft);
    $("#guesses").text(guesses_string);
}

$(document).ready(function() {
    startNewGame();

    
    /************************************************************************
     ************************************************************************
        
        Respond to user's actions
        
    *************************************************************************
    *************************************************************************/
    $(document).on("keypress", function(e) {
        // Find out which key was pressed
        var yourGuess = String.fromCharCode(e.which).toLowerCase();

        if ("a" <= yourGuess && yourGuess <= "z") {
            // Check if the guess has yet to be made
            if (guesses_array.indexOf(yourGuess) === -1) {
                numTriesLeft--;

                $("#numTriesLeft").text(numTriesLeft);
                
                // Record the letter
                guesses_array.push(yourGuess);
                guesses_string += yourGuess;

                $("#guesses").text(guesses_string);

                // Check if the user has guessed the letter correctly
                if (yourGuess === answer) {
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
});