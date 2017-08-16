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
    
    // Variables for the user
    var timeAllowed  = 3, timeLeft;
    var numQuestions = 10, numChoicesPerQuestion = 4;
    var answerKey, numCorrectAnswers, currentQuestion;

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
        answerKey         = new Array(numQuestions);
        numCorrectAnswers = 0;
        currentQuestion   = 0;
        
        // Reset quiz page
        $("#question, #answer, #timer").empty();
        displayPage(1);

        $.getJSON(api_url, function(json) {
            // Parse the JSON given by the API (if successful)
            var htmlOutput = parseData((json.response_code === 0) ? json.results : sampleResults);

            // Write questions to the DOM
            updateDOM(htmlOutput);

            // Display questions one by one
            displayCurrentQuestion();
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
        $("#question, #timer").css({"display": "block"});
        $("#answer").css({"display": "none"});

        if (currentQuestion < numQuestions) {
            // Hide the previous question
            if (currentQuestion > 0) {
                $("#q" + (currentQuestion - 1)).css({"display": "none"});
            }

            // Display the current question
            $("#q" + currentQuestion).css({"display": "block"});

            resetTimer();

            intervalID = setInterval(updateTimer, 1000);

        } else {
            clearInterval(intervalID);

            $("#numCorrectAnswers").text(numCorrectAnswers);
            $("#numQuestions").text(numQuestions);
            displayPage(2);

        }
    }

    var displayAnswer = function(answer) {
        clearInterval(intervalID);

        $("#question, #timer").css({"display": "none"});
        $("#answer").css({"display": "block"});

        if (answer === answerKey[currentQuestion]) {
            numCorrectAnswers++;

            $("#answer").html("Correct!");

        } else {
            $("#answer").html("Incorrect!");

        }

        setTimeout(updateQuestion, 2000);
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
        
        if (timeLeft < 0) {
            displayAnswer(-1);
        }
    }

    var resetTimer = function() {
        timeLeft = timeAllowed;
        $("#timer").text(timeLeft);
    }


    /************************************************************************
        
        Helper methods
        
    *************************************************************************/
    var parseData = function(data) {
        var output  = "";
        
        // Temporary variables
        var i, j;
        var choices;
        
        for (i = 0; i < numQuestions; i++) {
            // Insert the correct answer among the incorrect ones
            choices = data[i].incorrect_answers;
            
            answerKey[i] = Math.floor(numChoicesPerQuestion * Math.random());
            
            choices.splice(answerKey[i], 0, data[i].correct_answer);
            
            // Write to HTML
            output += `<div class=\"questions\" id=\"q${i}\">
                       <div class=\"category\"><p>${data[i].category}</p></div>
                       <div class=\"prompt\"><p>Question ${i + 1}. ${data[i].question}</p></div>`;

            for (j = 0; j < numChoicesPerQuestion; j++) {
                output += `<div class=\"choices choices_q${i}\">${String.fromCharCode(65 + j)}. ${choices[j]}</div>`;
            }

            output += "</div>";
        }

        return output;
    }

    var updateDOM = function(htmlOutput) {
        // Display the questions
        $("#question").html(htmlOutput);

        $(".questions").css({"display": "none"});
        
        $(".prompt").css({"margin-bottom" : "0.5em",
                          "border-bottom" : "4px double black",
                          "padding-bottom": "0"});

        // Handle click events
        $(".choices").on("click", function() {
            displayAnswer($(".choices").index(this) % numChoicesPerQuestion);
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