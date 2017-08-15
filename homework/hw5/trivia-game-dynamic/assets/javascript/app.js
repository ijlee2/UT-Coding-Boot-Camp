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
    var numQuestions = 10, currentQuestion;
    var numQuestionsCorrect = 0;
    var timeAllowed = 3, timeLeft;
    

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

    var displayCurrentQuestion = function() {
        $(".questions").css({"display": "none"});
        $("#question" + currentQuestion).css({"display": "block"});
    }

    var displayTimeLeft = function() {
        $("#timer").text(timeLeft);
    }

    var displayQuestions = function() {
        var api_url = "https://opentdb.com/api.php?amount=" + numQuestions + "&difficulty=easy&type=multiple";
        
        // Making JSON synchronous can make the code below more modular,
        // but the async property will be deprecated in the future
        // $.ajaxSetup({ async: false });

-        $.getJSON(api_url, function(json) {
            /****************************************************************
                
                Load questions from an online database
                
            *****************************************************************/
            if (json.response_code === 0) {
                // Temporary variables
                var output = "";
                var data;
                var correctAnswers = new Array(numQuestions);
                var choices;

                for (var i = 0; i < numQuestions; i++) {
                    // Get the question category, prompt, and answer choices
                    data    = json.results[i];
                    choices = data.incorrect_answers;
                    
                    // Insert the correct answer
                    correctAnswers[i] = Math.floor(4 * Math.random());
                    choices.splice(correctAnswers[i], 0, data.correct_answer);

                    console.log("Hint: Correct answer is "+ (correctAnswers[i] + 1));

                    // Write to HTML
                    output += `<div class=\"questions\" id=\"question${i}\">
                               <div class=\"category\"><p>${data.category}</p></div>
                               <div class=\"prompt\"><p>Question ${i + 1}. ${data.question}</p></div>`;

                    for (var j = 0; j < choices.length; j++) {
                        output += `<div class=\"choices\">${String.fromCharCode(65 + j)}. ${choices[j]}</div>`;
                    }

                    output += "</div>";
                }

                $("#display").html(output);
                $(".questions .prompt").css({"margin-bottom" : "0.5em",
                                             "border-bottom" : "4px double black",
                                             "padding-bottom": "0"});


                /************************************************************
                    
                    Display the first question
                    
                *************************************************************/
                currentQuestion = 0;

                displayCurrentQuestion();

                resetTimer();

                // Display the remaining questions
                var intervalID = setInterval(function() {
                    updateTimer();

                    $(".choices").on("click", function() {
                        if ($(".choices").index(this) === correctAnswers[currentQuestion]) {
                            numQuestionsCorrect++;

                            console.log("Correct!");

                        } else {
                            console.log("Incorrect!");

                        }
                    });

                    if (timeLeft < 0) {
                        resetTimer();

                        currentQuestion++;

                        if (currentQuestion === numQuestions) {
                            clearInterval(intervalID);

                            updatePage(1);
                        }

                        displayCurrentQuestion();
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

    var updateTimer = function() {
        timeLeft--;

        displayTimeLeft();
    }

    var resetTimer = function() {
        timeLeft = timeAllowed;

        displayTimeLeft();
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