/****************************************************************************
 ****************************************************************************
    
    Create an object of Hangman game
    
*****************************************************************************
*****************************************************************************/
const HangmanGame = function() {
    /************************************************************************
        
        Private variables
        
    *************************************************************************/
    // Variables for the game
    let numWins = 0, numLosses = 0;
    let keyEnabled = true;

    // Variables for the user
    let answer, answer_string, answer_array;
    let guesses_string, guesses_array, numTriesLeft;


    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        // Choose a random word from the dictionary
        answer              = getWord().toLowerCase();
        const answer_length = answer.length;

        // Initialize what the user sees
        answer_string = "_".repeat(answer_length);
        answer_array  = answer_string.split("");

        updateAnswerString();

        // Reset guesses
        guesses_string = "";
        guesses_array  = [];

        // Allow more tries for shorter words
        numTriesLeft = Math.max(6, Math.min(13 - Math.ceil(answer_length / 2), 10));

        // Display messages
        displayNumWins();
        displayNumLosses();
        displayNumTriesLeft();
        displayGuesses();
    }

    
    /************************************************************************
        
        Display methods
        
    *************************************************************************/
    this.displayLightBox = function(lightBoxOn) {
        this.updateKeyEnabled(!lightBoxOn);

        $("#lightBox_background, #lightBox").css({"display": (lightBoxOn) ? "block" : "none"});
    }

    function displayProgress() {
        $("#answerProgress").text(answer_string);
    }

    function displayNumWins() {
        $("#numWins").text(numWins);
    }

    function displayNumLosses() {
        $("#numLosses").text(numLosses);        
    }

    function displayNumTriesLeft() {
        $("#numTriesLeft").text(numTriesLeft);
    }

    function displayGuesses() {
        $("#guesses").text(guesses_string);
    }
    

    /************************************************************************
        
        Set (update) methods
        
    *************************************************************************/
    this.updateKeyEnabled = function(changeTo) {
        keyEnabled = changeTo;
    }

    function updateAnswerString() {
        answer_string = answer_array.join("");

        displayProgress();
    }

    function updateGuesses(changeBy) {
        guesses_string += changeBy;
        guesses_array.push(changeBy);
        
        displayGuesses();
    }

    function updateNumTriesLeft(changeBy) {
        numTriesLeft += changeBy;

        displayNumTriesLeft();
    }


    /************************************************************************
        
        Query methods
        
    *************************************************************************/
    this.isKeyEnabled = function() {
        return keyEnabled;
    }

    function isGuessNew(x) {
        return !guesses_array.includes(x);
    }

    this.checkProgress = function(letter) {
        if (isGuessNew(letter)) {
            // Check if the letter is a part of the word
            let index = answer.indexOf(letter);

            if (index === -1) {
                updateNumTriesLeft(-1);

            } else {
                // Reveal all letters that match the letter
                while (index >= 0) {
                    answer_array[index] = letter;

                    index = answer.indexOf(letter, index + 1);
                }

                updateAnswerString();
                
            }

            // Record the letter
            updateGuesses(letter);

            // Check if the user has guessed the word correctly
            if (answer_string === answer) {
                numWins++;

                $("#outputMessage").html(`Yep, it was <strong>${answer}</strong>!<br>Press any key to continue.`);
                $("#lightBox").css({
                    "animation-name"  : "slide_down",
                    "background-color": "var(--color-mint-green)"
                });
                $("#lightBox strong").css({"color": "#fff896"});

                this.displayLightBox(true);
                
                this.startNewGame();

            // Check if the user has run out of guesses
            } else if (numTriesLeft === 0) {
                numLosses++;

                $("#outputMessage").html(`Nah, it was <strong>${answer}</strong>!<br>Press any key to continue.`);
                $("#lightBox").css({
                    "animation-name"  : "shake",
                    "background-color": "var(--color-danger-red)"
                });
                $("#lightBox strong").css({"color": "#beffad"});

                this.displayLightBox(true);
                
                this.startNewGame();

            }
        }
    }
}



/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads for the first time
    
*****************************************************************************
*****************************************************************************/
let game;

$(document).ready(function() {
    game = new HangmanGame();

    game.startNewGame();


    /************************************************************************
        
        Respond to user's actions
        
    *************************************************************************/
    $(document).on("keypress", event => {
        // Allow the user to press any key to hide the lightbox
        if (!game.isKeyEnabled()) {
            game.updateKeyEnabled(true);
            game.displayLightBox(false);

            return;
        }

        // Find out which key was pressed
        const letter = String.fromCharCode(event.which).toLowerCase();

        if ("a" <= letter && letter <= "z") {
            game.checkProgress(letter);
        }
    });

    // Lightbox
    $("#lightBox_background, #lightBox").on("click", function() {
        game.displayLightBox(false);
    });
});