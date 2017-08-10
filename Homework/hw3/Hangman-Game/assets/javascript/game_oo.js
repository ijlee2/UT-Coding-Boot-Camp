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

        this.updateAnswerString();

        // Reset guesses_array
        guesses_array  = [];
        guesses_string = "";

        // Allow more tries for shorter words
        numTriesLeft = Math.max(6, Math.min(13 - Math.ceil(answer_length / 2), 10));

        // Display messages
        this.displayProgress();
        this.displayNumWins();
        this.displayNumLosses();
        this.displayNumTriesLeft();
        this.displayGuesses();
    }

    
    /************************************************************************
        
        Display methods
        
    *************************************************************************/
    this.displayProgress = function() {
        $("#answerProgress").text(answer_string);
    }

    this.displayNumWins = function() {
        $("#numWins").text(numWins);
    }

    this.displayNumLosses = function() {
        $("#numLosses").text(numLosses);        
    }

    this.displayNumTriesLeft = function() {
        $("#numTriesLeft").text(numTriesLeft);
    }

    this.displayGuesses = function() {
        $("#guesses").text(guesses_string);
    }


    /************************************************************************
        
        Get methods
        
    *************************************************************************/
    this.getAnswer = function() {
        return answer;
    }

    this.getAnswerString = function() {
        return answer_string;
    }

    this.getNumTriesLeft = function() {
        return numTriesLeft;
    }
    

    /************************************************************************
        
        Set (update) methods
        
    *************************************************************************/
    this.updateNumWins = function(changeBy) {
        numWins += changeBy;
    }

    this.updateNumLosses = function(changeBy) {
        numLosses += changeBy;
    }

    this.updateKeyEnabled = function(changeTo) {
        keyEnabled = changeTo;
    }

    this.updateAnswerArray = function(index, changeTo) {
        answer_array[index] = changeTo;
    }

    this.updateAnswerString = function() {
        answer_string = answer_array.join("");
    }

    this.updateGuesses = function(changeBy) {
        guesses_array.push(changeBy);
    }

    this.updateGuessesString = function(changeBy) {
        guesses_string += changeBy;
    }

    this.updateNumTriesLeft = function(changeBy) {
        numTriesLeft += changeBy;
    }


    /************************************************************************
        
        Query methods
        
    *************************************************************************/
    this.isKeyEnabled = function() {
        return keyEnabled;
    }

    this.isNewGuess = function(x) {
        return (guesses_array.indexOf(x) === -1);
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
});



/****************************************************************************
 ****************************************************************************
    
    Respond to user's actions
    
*****************************************************************************
*****************************************************************************/
$(document).on("keypress", function(e) {
    if (!game.isKeyEnabled()) {
        game.updateKeyEnabled(true);
        displayLightBox(false);

        return;
    }

    var answer = game.getAnswer();

    // Find out which key was pressed
    var yourGuess = String.fromCharCode(e.which).toLowerCase();

    if ("a" <= yourGuess && yourGuess <= "z") {
        // Check if the letter is a new guess
        if (game.isNewGuess(yourGuess)) {
            // Check if the letter is a part of the word
            var index = answer.indexOf(yourGuess);

            if (index === -1) {
                game.updateNumTriesLeft(-1);
                game.displayNumTriesLeft();

            } else {
                // Reveal all letters that match the letter
                while (index >= 0) {
                    game.updateAnswerArray(index, yourGuess);

                    index = answer.indexOf(yourGuess, index + 1);
                }

                game.updateAnswerString();
                game.displayProgress();
                
            }

            // Record the letter
            game.updateGuesses(yourGuess);
            game.updateGuessesString(yourGuess);
            game.displayGuesses();

            // Check if the user has guessed the word correctly
            if (game.getAnswerString() === answer) {
                game.updateNumWins(1);

                $("#outputMessage").html("Yep, it was <strong>" + answer + "</strong>!<br>Press any key to continue.");
                $("#lightBox").css({"animation-name"  : "slide_down",
                                    "background-color": "var(--color-mint-green)"});
                $("#lightBox strong").css({"color": "#fff896"});
                displayLightBox(true);
                
                game.startNewGame();

            // Check if the user has run out of guesses
            } else if (game.getNumTriesLeft() === 0) {
                game.updateNumLosses(1);

                $("#outputMessage").html("Nah, it was <strong>" + answer + "</strong>!<br>Press any key to continue.");
                $("#lightBox").css({"animation-name"  : "shake",
                                    "background-color": "#c81a4c"});
                $("#lightBox strong").css({"color": "#beffad"});
                displayLightBox(true);
                
                game.startNewGame();

            }
        }
    }
});


function displayLightBox(lightBoxOn) {
    game.updateKeyEnabled(!lightBoxOn);

    if (lightBoxOn) {
        $("#lightBox_background").css({"display": "block"});
        $("#lightBox").css({"display": "block"});

    } else {
        $("#lightBox_background").css({"display": "none"});
        $("#lightBox").css({"display": "none"});

    }
}