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
    var numPages = $(".page").length;
    var intervalID;
    
    // Variables for the game
    var numQuestions = 10, numChoicesPerQuestion = 4;
    var numQuestionsCorrect, currentQuestion;
    var timeAllowed = 5, timeLeft;

    // Load questions from an online database
    var api_url = "https://opentdb.com/api.php?amount=" + numQuestions + "&difficulty=easy&type=multiple";
    

    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        displayPage(0);
    }

    this.startQuiz = function() {
        // Reset variables
        numQuestionsCorrect = 0;
        currentQuestion     = 0;
        
        // Reset quiz page
        $("#display, #timer").empty();
        displayPage(1);

        $.getJSON(api_url, function(json) {
            // Parse the JSON given by the API (if successful)
            var dataParsed = parseData((json.response_code === 0) ? json.results : sampleResults);
            
            // Write questions to the DOM
            updateDOM(dataParsed);

            // Display the 1st question
            displayCurrentQuestion();

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
        
        Display methods
        
    *************************************************************************/
    var displayPage = function(page) {
        $(".page").css({"display": "none"});
        $(".page:nth-of-type(" + (page + 1) + ")").css({"display": "block"});
    }

    var displayCurrentQuestion = function() {
        if (currentQuestion < numQuestions) {
            $(".questions").css({"display": "none"});
            $("#question" + currentQuestion).css({"display": "block"});

            resetTimer();

        } else {
            clearInterval(intervalID);

            $("#numQuestionsCorrect").text(numQuestionsCorrect);
            $("#numQuestions").text(numQuestions);

            displayPage(2);

        }
    }


    /************************************************************************
        
        Set (update) methods
        
    *************************************************************************/
    var updateQuestion = function() {
        currentQuestion++;
        displayCurrentQuestion();
    }

    var updateTimer = function() {
        timeLeft--;
        $("#timer").text(timeLeft);
    }

    var resetTimer = function() {
        timeLeft = timeAllowed;
        $("#timer").text(timeLeft);
    }


    /************************************************************************
        
        Helper methods
        
    *************************************************************************/
    var parseData = function(data) {
        // Variables that we will return
        var output  = "";
        var answers = new Array(numQuestions);
        
        // Temporary variables
        var i, j;
        var choices;
        
        for (i = 0; i < numQuestions; i++) {
            // Insert the correct answer among the incorrect ones
            choices = data[i].incorrect_answers;
            
            answers[i] = Math.floor(numChoicesPerQuestion * Math.random());
            
            choices.splice(answers[i], 0, data[i].correct_answer);
            
            // Write to HTML
            output += `<div class=\"questions\" id=\"question${i}\">
                       <div class=\"category\"><p>${data[i].category}</p></div>
                       <div class=\"prompt\"><p>Question ${i + 1}. ${data[i].question}</p></div>`;

            for (j = 0; j < numChoicesPerQuestion; j++) {
                output += `<div class=\"choices question${i}\">${String.fromCharCode(65 + j)}. ${choices[j]}</div>`;
            }

            output += "</div>";
        }

        return {"output": output, "answers": answers};
    }

    var updateDOM = function(dataParsed) {
        // For clarity
        var output  = dataParsed.output;
        var answers = dataParsed.answers;

        // Display the questions
        $("#display").html(output);
        
        $(".questions .prompt").css({"margin-bottom" : "0.5em",
                                     "border-bottom" : "4px double black",
                                     "padding-bottom": "0"});

        // Handle click events
        $(".choices").on("click", function() {
            var myChoice = $(".choices").index(this) % numChoicesPerQuestion;

            if (myChoice === answers[currentQuestion]) {
                numQuestionsCorrect++;
            }

            updateQuestion();
        });
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


    /************************************************************************
        
        Respond to user's actions
        
    *************************************************************************/
    // Page selection
    $("#button_start").on("click", function() {
        game.startQuiz();
    });

    $("#button_restart").on("click", function() {
        game.startNewGame();
    });
});