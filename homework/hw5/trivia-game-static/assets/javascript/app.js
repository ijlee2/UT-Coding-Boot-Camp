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
    var timeAllowed  = 90, timeLeft;
    var numQuestions = 10, numChoicesPerQuestion = 4;
    var answers, answers_user = new Array(numQuestions);

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
        answers = new Array(numQuestions);

        for (var i = 0; i < numQuestions; i++) {
            answers_user[i] = -1;
        }
        
        // Reset quiz page
        $("#question, #timer").empty();
        $("#question, #timer, #button_submit").css({"display": "none"});
        
        displayPage(1);

        $.getJSON(api_url, function(json) {
            // Parse the JSON given by the API (if successful)
            var output = parseData((json.response_code === 0) ? json.results : sampleResults);

            // Write questions to the DOM
            updateDOM(output);

            // Display all questions at once
            displayQuestions();
        });
    }

    var gradeQuiz = function() {
        clearInterval(intervalID);

        var numCorrectAnswers = 0;

        for (var i = 0; i < numQuestions; i++) {
            if (answers_user[i] === answers[i].index) {
                numCorrectAnswers++;
            }
        }

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

    var displayQuestions = function() {
        $("#question, #timer, #button_submit").css({"display": "block"});

        resetTimer();
        
        intervalID = setInterval(updateTimer, 1000);
    }


    /************************************************************************
        
        Set (update) methods
        
    *************************************************************************/
    var updateTimer = function() {
        timeLeft--;

        if (timeLeft < 30 && $("#timer").css("animation-name") !== "shake") {
            $("#timer").css({"animation": "shake 0.80s cubic-bezier(.36, .07, .19, .97) both"});
        }
        $("#timer").text(timeLeft);
        $("#timer").replaceWith($("#timer").clone());
        
        if (timeLeft === 0) {
            gradeQuiz();
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

        // Handle click events
        $(".choices").on("click", function() {
            // Find out which question and answer the button belongs to
            var index           = $(".choices").index(this);
            var answer          = index % numChoicesPerQuestion;
            var currentQuestion = (index - answer) / numChoicesPerQuestion;

            answers_user[currentQuestion] = answer;

            // TODO: Why (answer + 3)?
            $(".choices_q" + currentQuestion).css({"background-color": "white"});
            $(".choices_q" + currentQuestion + ":nth-of-type(" + (answer + 3) + ")").css({"background-color": "var(--color-light-yellow)"});
        });

        $("#button_submit").on("click", gradeQuiz);
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