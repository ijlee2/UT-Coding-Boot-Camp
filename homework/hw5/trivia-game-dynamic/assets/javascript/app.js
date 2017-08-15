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
    var numQuestions = 10, timeAllowed = 5;
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
        

        /********************************************************************
        
            Load questions from an online database
        
        *********************************************************************/
        // Making JSON synchronous as shown below fixes the problem, but the async will be deprecated
        // $.ajaxSetup({ async: false });

        var output = "";
        var data;
        
        $.getJSON(api_url, function(json) {
            // The API returned results successfully
            if (json.response_code === 0) {
                for (var i = 0; i < numQuestions; i++) {
                    // Get the question category, prompt, and answer choices
                    data = json.results[i];

                    // Insert the correct answer somewhere
                    var index_answer = Math.floor(4 * Math.random());
                    var choices      = data.incorrect_answers;
                    choices.splice(index_answer, 0, data.correct_answer);

                    output += `<div class=\"questions\" id=\"question${i + 1}\">
                               <div class=\"category\">${data.category}</div>
                               <div class=\"prompt\"><p>Question ${i + 1}. ${data.question}</p></div>`;

                    for (var j = 0; j < choices.length; j++) {
                        output += `<div class=\"choices\">${choices[j]}</div>`;
                    }

                    output += "</div>";
                }

                $("#display").html(output);

                // Display the 1st question
                var currentQuestion = 1;
                $(".questions").css({"display": "none"});
                $("#question" + currentQuestion).css({"display": "block"});

                var secondsLeft = timeAllowed;
                $("#timer").text(secondsLeft);

                // Display the remaining questions
                var intervalID = setInterval(function() {
                    secondsLeft--;
                    $("#timer").text(secondsLeft);

                    $(".choices").on("click", function() {
                        console.log("Div #" + $(".choices").index(this) + "was clicked.");
                    });

                    if (secondsLeft === 0) {
                        secondsLeft = timeAllowed;
                        currentQuestion++;

                        if (currentQuestion > numQuestions) {
                            clearInterval(intervalID);
                        }

                        $(".questions").css({"display": "none"});
                        $("#question" + currentQuestion).css({"display": "block"});
                    }

                }, 1000);

            // Load default questions
            } else {

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