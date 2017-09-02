/****************************************************************************
 ****************************************************************************
    
    Create an object of Trivia game
    
*****************************************************************************
*****************************************************************************/
const TriviaGame = function() {
    /************************************************************************
        
        Private variables
        
    *************************************************************************/
    // Variables for the game
    let   intervalID;
    const numQuestions = 10, numChoicesPerQuestion = 4;
    const timeAllowed = 90, timeWarning = 30;
    
    // Variables for the user
    let timeLeft;
    let answers, answers_user = new Array(numQuestions);

    // Load questions from an online database
    const api_url = `https://opentdb.com/api.php?amount=${numQuestions}&type=multiple`;
    

    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        displayPage(0);
    }

    this.startQuiz = function() {
        // Reset variables
        answers = new Array(numQuestions);

        for (let i = 0; i < numQuestions; i++) {
            answers_user[i] = -1;
        }
        
        // Reset quiz page
        $("#question, #timer, #button_submit").css({"display": "none"});
        resetTimer();
        displayPage(1);

        $.getJSON(api_url, json => {
            // Parse the JSON given by the API (if successful)
            const output = parseData((json.response_code === 0) ? json.results : sampleResults);

            // Write questions to the DOM
            updateDOM(output);

            // Display all questions at once
            displayQuestions();
        });
    }

    function gradeQuiz() {
        clearInterval(intervalID);

        let numCorrectAnswers = 0;

        for (let i = 0; i < numQuestions; i++) {
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
    function displayPage(page) {
        $(".page").css({"display": "none"});
        $(`.page:nth-of-type(${page + 1})`).css({"display": "block"});
    }

    function displayQuestions() {
        $("#question, #timer, #button_submit").css({"display": "block"});

        resetTimer();
        
        intervalID = setInterval(updateTimer, 1000);
    }


    /************************************************************************
        
        Set (update) methods
        
    *************************************************************************/
    function updateTimer() {
        timeLeft--;

        $("#timer").text(timeLeft);
        if (timeLeft <= timeWarning && $("#timer").css("animation-name") !== "shake") {
            $("#timer").css({"animation": "shake 0.80s cubic-bezier(.36, .07, .19, .97) both"});
        }
        $("#timer").replaceWith($("#timer").clone());
        
        if (timeLeft === 0) {
            gradeQuiz();
        }
    }

    function resetTimer() {
        timeLeft = timeAllowed;

        $("#timer").text(timeLeft);
        $("#timer").css({"animation": "spin 0.50s cubic-bezier(.15, .07, .20, .97) both"});
    }


    /************************************************************************
        
        Helper methods
        
    *************************************************************************/
    function parseData(data) {
        let output = "";
        
        // Temporary variables
        let i, j, choices;
        
        for (i = 0; i < numQuestions; i++) {
            // Display the subcategory
            const index = data[i].category.indexOf(":");

            if (index >= 0) {
                // Account for the space after colon
                data[i].category = data[i].category.substring(index + 2, data[i].category.length);
            }

            // Insert the correct answer among the incorrect ones
            choices = data[i].incorrect_answers;
            
            answers[i] = {
                "index": Math.floor(numChoicesPerQuestion * Math.random()),
                "value": data[i].correct_answer
            };
            
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

    function updateDOM(output) {
        // Display the questions
        $("#question").html(output);

        // Handle click events
        $(".choices").on("click", function() {
            // Find out which question and answer the button belongs to
            const index           = $(".choices").index(this);
            const answer          = index % numChoicesPerQuestion;
            const currentQuestion = (index - answer) / numChoicesPerQuestion;

            answers_user[currentQuestion] = answer;

            $(`.choices_q${currentQuestion}`).css({
                "background-color": "var(--color-background)",
                "color"           : "var(--color-text)"
            });
            // Use (answer + 3), not (answer + 1), because of the HTML structure
            $(`.choices_q${currentQuestion}:nth-of-type(${answer + 3})`).css({
                "background-color": "var(--color-light-blue)",
                "color"           : "var(--color-text-contrast)"
            });
        });

        $("#button_submit").on("click", gradeQuiz);
    }
}



/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads
    
*****************************************************************************
*****************************************************************************/
let game;

$(document).ready(function() {
    game = new TriviaGame();

    game.startNewGame();

    $("#button_start").on("click", game.startQuiz);

    $("#button_restart").on("click", game.startNewGame);
});