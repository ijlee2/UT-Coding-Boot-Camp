/****************************************************************************
 ****************************************************************************
    
    Create an object of Hangman game
    
*****************************************************************************
*****************************************************************************/
var game;

var HangmanGame = function() {
    /************************************************************************
        
        Private variables
        
    *************************************************************************/
    // Variables for the game
    var numWins = 0, numLosses = 0;
    var keyEnabled = true;

    // Variables for the user
    var answer, answer_array, answer_string;
    var guesses_array, guesses_string, numTriesLeft;


    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        // Choose a random word from the dictionary
        answer            = getWord().toLowerCase();
        var answer_length = answer.length;

        // Initialize what the user sees
        answer_array = new Array(answer_length);

        for (var i = 0; i < answer_length; i++) {
            answer_array[i] = "_";
        }

        updateAnswerString();

        // Reset guesses
        guesses_array  = [];
        guesses_string = "";

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

        if (lightBoxOn) {
            $("#lightBox_background, #lightBox").css({"display": "block"});

        } else {
            $("#lightBox_background, #lightBox").css({"display": "none"});

        }
    }

    var displayProgress = function() {
        $("#answerProgress").text(answer_string);
    }

    var displayNumWins = function() {
        $("#numWins").text(numWins);
    }

    var displayNumLosses = function() {
        $("#numLosses").text(numLosses);        
    }

    var displayNumTriesLeft = function() {
        $("#numTriesLeft").text(numTriesLeft);
    }

    var displayGuesses = function() {
        $("#guesses").text(guesses_string);
    }
    

    /************************************************************************
        
        Set (update) methods
        
    *************************************************************************/
    this.updateKeyEnabled = function(changeTo) {
        keyEnabled = changeTo;
    }

    var updateAnswerString = function() {
        answer_string = answer_array.join("");

        displayProgress();
    }

    var updateGuesses = function(changeBy) {
        guesses_array.push(changeBy);
        guesses_string += changeBy;

        displayGuesses();
    }

    var updateNumTriesLeft = function(changeBy) {
        numTriesLeft += changeBy;

        displayNumTriesLeft();
    }


    /************************************************************************
        
        Query methods
        
    *************************************************************************/
    this.isKeyEnabled = function() {
        return keyEnabled;
    }

    var isGuessNew = function(x) {
        return (guesses_array.indexOf(x) === -1);
    }

    this.checkProgress = function(letter) {
        if (isGuessNew(letter)) {
            // Check if the letter is a part of the word
            var index = answer.indexOf(letter);

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

                $("#outputMessage").html("Yep, it was <strong>" + answer + "</strong>!<br>Press any key to continue.");
                $("#lightBox").css({"animation-name"  : "slide_down",
                                    "background-color": "var(--color-mint-green)"});
                $("#lightBox strong").css({"color": "#fff896"});

                this.displayLightBox(true);
                
                this.startNewGame();

            // Check if the user has run out of guesses
            } else if (numTriesLeft === 0) {
                numLosses++;

                $("#outputMessage").html("Nah, it was <strong>" + answer + "</strong>!<br>Press any key to continue.");
                $("#lightBox").css({"animation-name"  : "shake",
                                    "background-color": "#c81a4c"});
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
$(document).ready(function() {
    game = new HangmanGame();

    game.startNewGame();


    /************************************************************************
        
        Respond to user's actions
        
    *************************************************************************/
    $(document).on("keypress", function(e) {
        // Allow the user to press any key to hide the lightbox
        if (!game.isKeyEnabled()) {
            game.updateKeyEnabled(true);
            game.displayLightBox(false);

            return;
        }

        // Find out which key was pressed
        var letter = String.fromCharCode(e.which).toLowerCase();

        if ("a" <= letter && letter <= "z") {
            game.checkProgress(letter);
        }
    });

    // Lightbox
    $("#lightBox_background, #lightBox").on("click", function() {
        game.displayLightBox(false);
    });
});