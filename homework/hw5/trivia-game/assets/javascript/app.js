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
    var numQuestions = 10;
    var questions;


    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        displayQuestions();
    }

    
    /************************************************************************
        
        Display functions
        
    *************************************************************************/
    var displayQuestions = function() {
        var api_url = "https://opentdb.com/api.php?amount=" + numQuestions + "&difficulty=easy&type=multiple";
        
        // Making JSON synchronous as shown below fixes the problem, but the async will be deprecated
        // $.ajaxSetup({ async: false });

        var output = "";

        $.getJSON(api_url, function(data) {
            // The API returned results successfully
            if (data.response_code === 0) {
//                console.log(data);

                $.each(data.results, function(key, value) {
                    var choices = value.incorrect_answers;
                    var index_answer = Math.floor(4 * Math.random());
                    choices.splice(index_answer, 0, value.correct_answer);

                    output += `<div class=\"questions\" id=\"question${key + 1}\">
                               <div class=\"category\">${value.category}</div>
                               <div class=\"prompt\"><p>Question ${key + 1}. ${value.question}</p></div>`;

                    for (var i = 0; i < choices.length; i++) {
                        output += `<div class=\"choices\">${choices[i]}</div>`;
                    }

                    output += "</div>";
                });

                $("#debugMessage").html(output);

                $(".questions").css({"display": "none"});
                $("#question1").css({"display": "block"});
            }
        });
    }

    
    /************************************************************************
        
        Get functions
        
    *************************************************************************/
}



/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    game = new TriviaGame();

    game.startNewGame();
});