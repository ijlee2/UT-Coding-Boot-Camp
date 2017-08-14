/****************************************************************************
 ****************************************************************************
    
    Create an object of Trivia game
    
*****************************************************************************
*****************************************************************************/
var game;

var TriviaGame = function() {
    /************************************************************************
        
        Private variables
        
    *************************************************************************/
    // Variables for the game
//    var numPages = $(".page").length, currentPage = 0;
//    var clickDisabled = false;

    // Variables for the user
    // The API limits the number of questions to 50
    var numQuestions = 10;
    var questions;


    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        var api_url = "https://opentdb.com/api.php?amount=" + numQuestions + "&type=multiple";

        $.getJSON(api_url, function(data) {
            console.log(data);

            // The API returned results successfully
            if (data.response_code === 0) {
                questions = data.results;

                /*
                $.each(data.results[0], function(key, value) {
                    console.log(key + ": " + value);
                });
                */
            }
        });

        console.log("questions: " + questions);
    }

    
    /************************************************************************
        
        Display functions
        
    *************************************************************************/
    this.displayQuestions = function() {
        var output;

        for (var i = 0; i < numQuestions; i++) {
            output = "<p>Category: " + questions[i].category + "</p>";
            
            $("#debugMessage").append(output);
        }
    }
}



/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    game = new TriviaGame();

    game.startNewGame();
    game.displayQuestions();
});