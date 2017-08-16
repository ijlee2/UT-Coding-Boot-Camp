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
    var timeAllowed = 10, timeWarning = 5, timeLeft;
    var numQuestions = 10, numChoicesPerQuestion = 4;
    var answers, numCorrectAnswers, currentQuestion;

    // Load questions from an online database
    var api_url = "https://opentdb.com/api.php?amount=" + numQuestions + "&type=multiple";
    

    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        displayPage(0);
    }

    this.startQuiz = function() {
        // Reset variables
        answers           = new Array(numQuestions);
        numCorrectAnswers = 0;
        currentQuestion   = 0;
        
        // Reset quiz page
        $("#question, #answer, #timer").css({"display": "none"});
        resetTimer();
        displayPage(1);

        $.getJSON(api_url, function(json) {
            // Parse the JSON given by the API (if successful)
            var output = parseData((json.response_code === 0) ? json.results : sampleResults);

            // Write questions to the DOM
            updateDOM(output);

            // Display questions one by one
            displayCurrentQuestion();
        });
    }

    var gradeQuiz = function() {
        clearInterval(intervalID);

        $("#numCorrectAnswers").text(numCorrectAnswers);
        $("#numQuestions").text(numQuestions);
        displayPage(2);
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
            gradeQuiz();

        }
    }

    var displayAnswer = function(index) {
        clearInterval(intervalID);

        $("#question, #timer").css({"display": "none"});
        $("#answer").css({"display": "block"});

        var output;

        if (index === answers[currentQuestion].index) {
            numCorrectAnswers++;
            output = "<h2>Correct!</h2>";

        } else if (index !== -1) {
            output = "<h2>Incorrect!</h2>";

        } else {
            output = "<h2>Time's up!</h2>";

        }
        
        output += `<p>The answer is ${answers[currentQuestion].value}.</p>`;

        $("#answer").html(output);

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

        if (timeLeft <= timeWarning && $("#timer").css("animation-name") !== "shake") {
            $("#timer").css({"animation": "shake 0.80s cubic-bezier(.36, .07, .19, .97) both"});
        }
        $("#timer").text(timeLeft);
        $("#timer").replaceWith($("#timer").clone());
        
        if (timeLeft === 0) {
            displayAnswer(-1);
        }
    }

    var resetTimer = function() {
        timeLeft = timeAllowed;

        $("#timer").css({"animation": "none"});
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
            // Display the subcategory
            var index = data[i].category.indexOf(":");

            if (index >= 0) {
                // Account for the space after colon
                data[i].category = data[i].category.substring(index + 2, data[i].category.length);
            }

            // Insert the correct answer among the incorrect ones
            choices = data[i].incorrect_answers;
            
            answers[i] = {"index": Math.floor(numChoicesPerQuestion * Math.random()),
                          "value": data[i].correct_answer};
            
            choices.splice(answers[i].index, 0, answers[i].value);
            
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

    var updateDOM = function(output) {
        // Display the questions
        $("#question").html(output);

        $(".questions").css({"display": "none"});
        
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
    $("#button_start").on("click", game.startQuiz);

    $("#button_restart").on("click", game.startNewGame);
});