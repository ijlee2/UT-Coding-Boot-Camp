/****************************************************************************
 ****************************************************************************
    
    Global variables
    
*****************************************************************************
*****************************************************************************/
// Variables for the game
var numWins = 0, numLosses = 0;
var keyEnabled = true;

// Variables for the user
var answer, answer_array, answer_string;
var guesses_array, guesses_string, numTriesLeft;



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
    answer_array = new Array(answer_length);

    for (var i = 0; i < answer_length; i++) {
        answer_array[i] = "_";
    }

    answer_string = answer_array.join("");

    // Reset guesses_array
    guesses_array  = [];
    guesses_string = "";

    // Allow more tries for shorter words
    numTriesLeft = Math.max(6, Math.min(13 - Math.ceil(answer_length / 2), 10));

    // Display messages
    $("#answerProgress").text(answer_string);
    $("#numWins").text(numWins);
    $("#numLosses").text(numLosses);
    $("#numTriesLeft").text(numTriesLeft);
    $("#guesses").text(guesses_string);
}



/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads for the first time
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    startNewGame();
});



/****************************************************************************
 ****************************************************************************
    
    Respond to user's actions
    
*****************************************************************************
*****************************************************************************/
$(document).on("keypress", function(e) {
    if (!keyEnabled) {
        keyEnabled = true;
        displayLightBox(false);

        return;
    }

    // Find out which key was pressed
    var yourGuess = String.fromCharCode(e.which).toLowerCase();

    if ("a" <= yourGuess && yourGuess <= "z") {
        // Check if the letter is a new guess
        if (guesses_array.indexOf(yourGuess) === -1) {
            // Check if the letter is a part of the word
            var index = answer.indexOf(yourGuess);

            if (index === -1) {
                numTriesLeft--;
                $("#numTriesLeft").text(numTriesLeft);

            } else {
                // Reveal all letters that match the letter
                while (index >= 0) {
                    answer_array[index] = yourGuess;

                    index = answer.indexOf(yourGuess, index + 1);
                }

                answer_string = answer_array.join("");
                $("#answerProgress").text(answer_string);
                
            }

            // Record the letter
            guesses_array.push(yourGuess);
            guesses_string += yourGuess;
            $("#guesses").text(guesses_string);

            // Check if the user has guessed the word correctly
            if (answer_string === answer) {
                numWins++;
                
                $("#outputMessage").html("Yep, it was <strong>" + answer + "</strong>!<br>Press any key to continue.");
                $("#lightBox").css({"animation-name"  : "slide_down",
                                    "background-color": "var(--color-mint-green)"});
                $("#lightBox strong").css({"color": "#fff896"});
                displayLightBox(true);

                startNewGame();

            // Check if the user has run out of guesses
            } else if (numTriesLeft === 0) {
                numLosses++;

                $("#outputMessage").html("Nah, it was <strong>" + answer + "</strong>!<br>Press any key to continue.");
                $("#lightBox").css({"animation-name"  : "shake",
                                    "background-color": "#c81a4c"});
                $("#lightBox strong").css({"color": "#beffad"});
                displayLightBox(true);
                
                startNewGame();

            }
        }
    }
});


function displayLightBox(lightBoxOn) {
    keyEnabled = !lightBoxOn;

    if (lightBoxOn) {
        $("#lightBox_background").css({"display": "block"});
        $("#lightBox").css({"display": "block"});

    } else {
        $("#lightBox_background").css({"display": "none"});
        $("#lightBox").css({"display": "none"});

    }
}