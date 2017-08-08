/****************************************************************************
 ****************************************************************************
    
    Create an object of Hangman game
    
*****************************************************************************
*****************************************************************************/
var game;

var HangmanGame = function() {
    // Game stats and variables
    var numWins   = 0;
    var numLosses = 0;

    var answer, arr_answer, str_answer;
    var guesses, str_guesses, numTriesLeft;


    /************************************************************************
     ************************************************************************
        
        Start a new game
        
    *************************************************************************
    *************************************************************************/
    this.startNewGame = function() {
        // Choose a random word from the dictionary
        answer = getWord().toLowerCase();
        var answer_length = answer.length;

        // Display the answer for debugging
        $("#answer").text(answer);

        // Initialize what the user sees
        arr_answer = new Array(answer_length);

        for (var i = 0; i < answer_length; i++) {
            arr_answer[i] = "_";
        }

        str_answer = arr_answer.join("");

        // Reset variables
        guesses      = [];
        str_guesses  = "";
        numTriesLeft = Math.max(7, Math.min(18 - answer_length, 13));

        // Display messages
        this.displayProgress();
        this.displayNumWins();
        this.displayNumLosses();
        this.displayNumTriesLeft();
        this.displayGuesses();
    }

    
    /************************************************************************
     ************************************************************************
        
        Display methods
        
    *************************************************************************
    *************************************************************************/
    this.displayProgress = function() {
        $("#answer_display").text(str_answer);
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
        $("#guesses").text(str_guesses);
    }


    /************************************************************************
     ************************************************************************
        
        Get methods
        
    *************************************************************************
    *************************************************************************/
    this.getAnswer = function() {
        return answer;
    }

    this.getStrAnswer = function() {
        return str_answer;
    }

    this.getNumTriesLeft = function() {
        return numTriesLeft;
    }
    

    /************************************************************************
     ************************************************************************
        
        Set (update) methods
        
    *************************************************************************
    *************************************************************************/
    this.updateNumWins = function(changeBy) {
        numWins += changeBy;
    }

    this.updateNumLosses = function(changeBy) {
        numLosses += changeBy;
    }

    this.updateArrAnswer = function(index, changeTo) {
        arr_answer[index] = changeTo;
    }

    this.updateStrAnswer = function() {
        str_answer = arr_answer.join("");
    }

    this.updateGuesses = function(x) {
        guesses.push(x);
    }

    this.updateStrGuesses = function(x) {
        str_guesses += (x + " ");
    }

    this.updateNumTriesLeft = function(changeBy) {
        numTriesLeft += changeBy;
    }


    /************************************************************************
     ************************************************************************
        
        Query methods
        
    *************************************************************************
    *************************************************************************/
    this.isElementOfGuesses = function(x) {
        return (guesses.indexOf(x) === -1);
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
    var answer = game.getAnswer();

    // Find out which key was pressed
    var yourGuess = String.fromCharCode(e.which).toLowerCase();

    if ("a" <= yourGuess && yourGuess <= "z") {
        // Check if the guess has yet to be made
        if (game.isElementOfGuesses(yourGuess)) {
            // Check if the guess is correct
            var index = answer.indexOf(yourGuess);

            if (index === -1) {
                game.updateNumTriesLeft(-1);
                game.displayNumTriesLeft();

            } else {
                // Reveal all letters that match the guess
                while (index >= 0) {
                    game.updateArrAnswer(index, yourGuess);

                    index = answer.indexOf(yourGuess, index + 1);
                }

                game.updateStrAnswer();
                game.displayProgress();
                
            }

            // Record the guess
            game.updateGuesses(yourGuess);
            game.updateStrGuesses(yourGuess);
            game.displayGuesses();

            // Check if the user has guessed the word correctly
            if (game.getStrAnswer() === answer) {
                game.updateNumWins(1);
                game.startNewGame();

            // Check if the user has run out of guesses
            } else if (game.getNumTriesLeft() === 0) {
                game.updateNumLosses(1);
                game.startNewGame();

            }
        }
    }
});