var dictionary = ["apple", "banana", "pear", "kiwi", "orange"];
var answer;
var numWins = 0, numLosses = 0;
var progress_string, progress_array;
var guessesSoFar, numGuessesLeft;


var resetGame = function() {
    answer = dictionary[Math.floor(Math.random() * dictionary.length)];

    progress_string = "";
    progress_array = [];
    guessesSoFar = [];
    numGuessesLeft = 15;

    for (var i = 0; i < answer.length; i++) {
        progress_array.push("_");
    }

    $("#progress, #guesses, #numGuessesLeft").empty();
    $("#numGuessesLeft").text(numGuessesLeft);    
}

var updateProgressString = function() {
    progress_string = progress_array.join("");

    $("#progress").text(progress_string);
}


$(document).ready(function() {
    resetGame();
    updateProgressString();

    $(document).on("keyup", function(event) {
        var letter = String.fromCharCode(event.which).toLowerCase();

        if ("a" <= letter && letter <= "z") {
            var index = answer.indexOf(letter);

            // If the letter does not exist, then push it into guessesSoFar
            if ($.inArray(letter, guessesSoFar) === -1) {
                guessesSoFar.push(letter);
                $("#guesses").text(guessesSoFar);
            }

            if (index === -1) {
                numGuessesLeft--;
                $("#numGuessesLeft").text(numGuessesLeft);
            }

            while (index !== -1) {
                progress_array[index] = letter;

                index = answer.indexOf(letter, index + 1);
            }
            updateProgressString();

            // Win condition
            if (progress_string === answer) {
                numWins++;
                $("#numWins").text(numWins);

                resetGame();
            }

            // Loss condition
            if (numGuessesLeft === 0) {
                numLosses++;
                $("#numLosses").text(numLosses);

                resetGame();
            }
        }
    });
});