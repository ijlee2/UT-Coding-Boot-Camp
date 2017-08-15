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
    var numPages = $(".page").length, currentPage = 0;
    
    // Variables for the game
    var numQuestions = 10, numQuestionsCorrect = 0;
    var timeAllowed = 5;
    var questions;


    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        displayCurrentPage();
        displayQuestions();
    }

    
    /************************************************************************
        
        Display functions
        
    *************************************************************************/
    var displayCurrentPage = function() {
        $(".page").css({"display": "none"});
        $(".page:nth-of-type(" + (currentPage + 1) + ")").css({"display": "block"});
    }

    var displayQuestions = function() {
        var api_url = "https://opentdb.com/api.php?amount=" + numQuestions + "&difficulty=easy&type=multiple";
        

        /********************************************************************
        
            Load questions from an online database
        
        *********************************************************************/
        // Making JSON synchronous as shown below fixes the problem, but the async will be deprecated
        // $.ajaxSetup({ async: false });

        $.getJSON(api_url, function(json) {
            // The API returned results successfully
            if (json.response_code === 0) {
                // Temporary variables
                var output = "";
                var data;
                var index_answer = new Array(numQuestions);
                var choices;

                for (var i = 0; i < numQuestions; i++) {
                    // Get the question category, prompt, and answer choices
                    data = json.results[i];

                    // Insert the correct answer somewhere
                    index_answer[i] = Math.floor(4 * Math.random());
                    choices         = data.incorrect_answers;
                    choices.splice(index_answer[i], 0, data.correct_answer);
                    console.log("Hint: Correct answer is "+ (index_answer[i] + 1));

                    output += `<div class=\"questions\" id=\"question${i}\">
                               <div class=\"category\">${data.category}</div>
                               <div class=\"prompt\"><p>Question ${i + 1}. ${data.question}</p></div>`;

                    for (var j = 0; j < choices.length; j++) {
                        output += `<div class=\"choices\">${choices[j]}</div>`;
                    }

                    output += "</div>";
                }

                $("#display").html(output);

                // Display the 1st question
                var currentQuestion = 0;
                $(".questions").css({"display": "none"});
                $("#question" + currentQuestion).css({"display": "block"});

                var secondsLeft = timeAllowed;
                $("#timer").text(secondsLeft);

                // Display the remaining questions
                var intervalID = setInterval(function() {
                    secondsLeft--;
                    $("#timer").text(secondsLeft);

                    $(".choices").on("click", function() {
                        if ($(".choices").index(this) === index_answer[currentQuestion]) {
                            numQuestionsCorrect++;

                            console.log("Correct!");

                        } else {
                            console.log("Incorrect!");

                        }
                    });

                    if (secondsLeft < 0) {
                        secondsLeft = timeAllowed;
                        $("#timer").text(secondsLeft);

                        currentQuestion++;

                        if (currentQuestion === numQuestions) {
                            clearInterval(intervalID);

                            updatePage(1);
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


    /************************************************************************
        
        Set (update) functions
        
    *************************************************************************/
    var updatePage = function(changeBy) {
        // Allow pages to move in a carousel
        currentPage = (currentPage + changeBy + numPages) % numPages;

        displayCurrentPage();
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
});