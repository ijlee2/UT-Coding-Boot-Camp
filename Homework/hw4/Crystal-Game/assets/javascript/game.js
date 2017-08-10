var targetSum = 50;
var currentSum = 0;

$(document).ready(function() {
    $("#targetSum").text(targetSum);
    $("#currentSum").text(currentSum);

    var powers = new Array(4);

    for (var i = 0; i < powers.length; i++) {
        powers[i] = Math.floor(10 * Math.random()) + 1;
    }

    $.each(powers, function(index, value) {
        console.log("Crystal " + (index + 1) + ": " + value);

        var elementTag = ".crystal:nth-child(" + (index + 1) + ")";

        $(elementTag).on("click", function() {
            currentSum += value;
            $("#currentSum").text(currentSum);
        });
    });


    if (currentSum === targetSum) {
        console.log("You won.");

    } else if (currentSum > targetSum) {
        console.log("You lost.");

    }
});