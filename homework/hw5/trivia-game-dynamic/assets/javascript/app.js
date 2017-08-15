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
    var numPages = $(".page").length, currentPage;
    var intervalID;
    
    // Variables for the game
    var numQuestions = 10, numChoicesPerQuestion = 4;
    var numQuestionsCorrect, currentQuestion;
    var timeAllowed = 5, timeLeft;
    

    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        currentPage = 0;
        displayCurrentPage();

        numQuestionsCorrect = 0;
        currentQuestion = 0;
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
        var api_url    = "https://opentdb.com/api.php?amount=" + numQuestions + "&difficulty=easy&type=multiple";
        var backup_url = "assets/javascript/questions.js";
        
        // Making JSON synchronous can make the code below more modular,
        // but the async property will be deprecated in the future
        // $.ajaxSetup({ async: false });

-        $.getJSON(api_url, function(json) {
            // Temporary variables
            var output = "";
            var data;
            var correctAnswers = new Array(numQuestions);
            var choices;


            /****************************************************************
                
                Load questions from an online database
                
            *****************************************************************/
            if (json.response_code !== 0) {
                for (var i = 0; i < numQuestions; i++) {
                    // Get the question category, prompt, and answer choices
                    data    = json.results[i];
                    choices = data.incorrect_answers;
                    
                    // Insert the correct answer
                    correctAnswers[i] = Math.floor(numChoicesPerQuestion * Math.random());
                    choices.splice(correctAnswers[i], 0, data.correct_answer);

                    // Write to HTML
                    output += `<div class=\"questions\" id=\"question${i}\">
                               <div class=\"category\"><p>${data.category}</p></div>
                               <div class=\"prompt\"><p>Question ${i + 1}. ${data.question}</p></div>`;

                    for (var j = 0; j < choices.length; j++) {
                        output += `<div class=\"choices question${i}\">${String.fromCharCode(65 + j)}. ${choices[j]}</div>`;
                    }

                    output += "</div>";
                }

            } else {
                $.getScript(backup_url, function(data) {
                    for (var i = 0; i < numQuestions; i++) {
                        // Get the question category, prompt, and answer choices
                        choices = data.incorrect_answers;
                        
                        // Insert the correct answer
                        correctAnswers[i] = Math.floor(numChoicesPerQuestion * Math.random());
                        choices.splice(correctAnswers[i], 0, data.correct_answer);

                        // Write to HTML
                        output += `<div class=\"questions\" id=\"question${i}\">
                                   <div class=\"category\"><p>${data.category}</p></div>
                                   <div class=\"prompt\"><p>Question ${i + 1}. ${data.question}</p></div>`;

                        for (var j = 0; j < choices.length; j++) {
                            output += `<div class=\"choices question${i}\">${String.fromCharCode(65 + j)}. ${choices[j]}</div>`;
                        }

                        output += "</div>";
                    }
                });

            }

                console.log(correctAnswers.join(", "));

                $("#display").html(output);
                $(".questions .prompt").css({"margin-bottom" : "0.5em",
                                             "border-bottom" : "4px double black",
                                             "padding-bottom": "0"});

                // Handle click events
                $(".choices").on("click", function() {
                    var myChoice = $(".choices").index(this) % numChoicesPerQuestion;

                    if (myChoice === correctAnswers[currentQuestion]) {
                        numQuestionsCorrect++;
                    }

                    updateQuestion();
                });


                /************************************************************
                    
                    Display the questions
                    
                *************************************************************/
                // Display the 1st question
                displayCurrentQuestion();

                resetTimer();

                // Display the remaining questions
                intervalID = setInterval(function() {
                    updateTimer();

                    if (timeLeft < 0) {
                        updateQuestion();
                    }
                }, 1000);
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

    var updateQuestion = function() {
        // Stop the timer
        currentQuestion++;

        if (currentQuestion === numQuestions) {
            clearInterval(intervalID);

            $("#numQuestionsCorrect").text(numQuestionsCorrect);
            $("#numQuestions").text(numQuestions);

            updatePage(1);

        } else {
            displayCurrentQuestion();

            resetTimer();

        }
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