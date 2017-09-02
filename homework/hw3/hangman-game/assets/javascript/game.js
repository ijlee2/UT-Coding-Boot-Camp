/****************************************************************************
 ****************************************************************************
    
    Global variables
    
*****************************************************************************
*****************************************************************************/
// Variables for the game
let numWins = 0, numLosses = 0;
let keyEnabled = true;

// Variables for the user
let answer, answer_string, answer_array;
let guesses_string, guesses_array, numTriesLeft;



/****************************************************************************
 ****************************************************************************
    
    Start a new game
    
*****************************************************************************
*****************************************************************************/
function startNewGame() {
    // Choose a random word from the dictionary
    answer              = getWord().toLowerCase();
    const answer_length = answer.length;

    // Initialize what the user sees
    answer_string = "_".repeat(answer_length);
    answer_array  = answer_string.split("");

    // Reset guesses
    guesses_string = "";
    guesses_array  = [];

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


    /****************************************************************************
        
        Respond to user's actions
        
    *****************************************************************************/
    $(document).on("keypress", event => {
        // Allow the user to press any key to hide the lightbox
        if (!keyEnabled) {
            keyEnabled = true;
            displayLightBox(false);

            return;
        }

        // Find out which key was pressed
        const letter = String.fromCharCode(event.which).toLowerCase();

        if ("a" <= letter && letter <= "z") {
            // Check if the letter is a new guess
            if (guesses_array.indexOf(letter) === -1) {
                // Check if the letter is a part of the word
                let index = answer.indexOf(letter);

                if (index === -1) {
                    numTriesLeft--;
                    $("#numTriesLeft").text(numTriesLeft);

                } else {
                    // Reveal all letters that match the letter
                    while (index >= 0) {
                        answer_array[index] = letter;

                        index = answer.indexOf(letter, index + 1);
                    }

                    answer_string = answer_array.join("");
                    $("#answerProgress").text(answer_string);
                    
                }

                // Record the letter
                guesses_string += letter;
                guesses_array.push(letter);
                $("#guesses").text(guesses_string);

                // Check if the user has guessed the word correctly
                if (answer_string === answer) {
                    numWins++;
                    
                    $("#outputMessage").html(`Yep, it was <strong>${answer}</strong>!<br>Press any key to continue.`);
                    $("#lightBox").css({
                        "animation-name"  : "slide_down",
                        "background-color": "var(--color-mint-green)"
                    });
                    $("#lightBox strong").css({"color": "#fff896"});

                    displayLightBox(true);

                    startNewGame();

                // Check if the user has run out of guesses
                } else if (numTriesLeft === 0) {
                    numLosses++;

                    $("#outputMessage").html(`Nah, it was <strong>${answer}</strong>!<br>Press any key to continue.`);
                    $("#lightBox").css({
                        "animation-name"  : "shake",
                        "background-color": "#c81a4c"
                    });
                    $("#lightBox strong").css({"color": "#beffad"});
                    
                    displayLightBox(true);
                    
                    startNewGame();

                }
            }
        }
    });

    $("#lightBox_background, #lightBox").on("click", function() {
        displayLightBox(false);
    });
});

function displayLightBox(lightBoxOn) {
    keyEnabled = !lightBoxOn;

    $("#lightBox_background, #lightBox").css({"display": (lightBoxOn) ? "block" : "none"});
}