// Coin Flip JavaScript
// These variables are declared for us.
var headsCount = 0;
var tailsCount = 0;
var wins = 0;
var losses = 0;

function flipThatCoin(result) {

  //  STEP ONE:

  //  Declare and initialize a variable named randomNumber to either 0 or 1. Make it random.
  var randomNumber = Math.round(Math.random());

  //  STEP TWO:

  //  If randomNumber is equal to zero then:

    //  Find the div with an id of coin-image.
    //  Replace its html with an img tag containing this image:
    //  http://random-ize.com/coin-flip/us-quarter/us-quarter-front.jpg

  // Else:

    //  Find the div with an id of coin-image.
    //  Replace its html with an img tag containing this image:
    //  http://random-ize.com/coin-flip/us-quarter/us-quarter-back.jpg
  if (randomNumber === 0) {
    $("#coin-image").html('<img src="http://random-ize.com/coin-flip/us-quarter/us-quarter-front.jpg">');

  } else {
    $("#coin-image").html('<img src="http://random-ize.com/coin-flip/us-quarter/us-quarter-back.jpg">');

  }

  //  STEP THREE:

  // If result is equal to randomNumber, do the following:

    //  Increment wins by one.
    //  Find the div with an id of win-lose. Update it with an h2 of "Winner!"
    //  Find the div with an id of wins. Update it with the value of the wins variable.

  // Else:

    //  Increment losses by one.
    //  Find the div with an id of win-lose. Update it with an h2 of "Loser!"
    //  Find the div with an id of losses. Update it with the value of the losses variable.
  if (result === randomNumber) {
    wins++;
    $("#win-lose").html("<h2>Winner!</h2>");
    $("#wins").text(wins);

  } else {
    losses++;
    $("win-lose").html("<h2>Loser!</h2>");
    $("#losses").text(losses);

  }
}

// This on click function has been completed for us.
$(document).ready(function() {
  $("#heads").on("click", function() {
    headsCount++;
    $("#heads-chosen").html(headsCount);
    $("#guess").html("<b>Heads</b>");
    flipThatCoin(0);
  });

  $("#tails").on("click", function() {

    //  STEP FOUR:

    //  Increment tailsCount by one.
    //  Find the span with an id of tails-chosen. Replace the html inside of the span with the tailsCount.
    //  Find the div with an id of guess. Update it with the word "Tails" bolded.
    //  Call the flipThatCoin function and pass value 1 into it.
    tailsCount++;
    $("#tails-chosen").text(tailsCount);
    $("#guess").html("<b>Tails</b>");
    flipThatCoin(1);
  });
});