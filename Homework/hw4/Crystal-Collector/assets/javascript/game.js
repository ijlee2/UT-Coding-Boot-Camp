/****************************************************************************
 ****************************************************************************
    
    Create an object of Crystal Collector game
    
*****************************************************************************
*****************************************************************************/
var game;

// Generate a random number between 1 and n
var randomInteger = function(n) {
    return Math.floor(n * Math.random()) + 1;
}

var CrystalCollectorGame = function() {
    /************************************************************************
        
        Private variables
        
    *************************************************************************/
    // Variables for the game
    var numPages = 2, pageNumber = 0;
    var numWins = 0, numLosses = 0;

    // Variables for the user
    var targetSum, currentSum;
    var numCrystals = 4, crystalValues = new Array(numCrystals);
    

    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        // Reset variables
        targetSum = 0;
        currentSum = 0;

        // Assign a value between 1 and 12 to each crystal
        for (var i = 0; i < numCrystals; i++) {
            crystalValues[i] = randomInteger(12);
            targetSum += crystalValues[i] * randomInteger(6);
        }

        // Ensure that the target sum is between 19 and 120
        while (targetSum < 19 || targetSum > 120) {
            targetSum = 0;

            for (var i = 0; i < numCrystals; i++) {
                targetSum += crystalValues[i] * randomInteger(6);
            }
        }

        // Display messages
        this.displayPage();
        this.displayNumWins();
        this.displayNumLosses();
        this.displayTargetSum();
        this.displayCurrentSum();
    }

    
    /************************************************************************
        
        Display methods
        
    *************************************************************************/
    this.displayPage = function() {
        for (var i = 0; i < numPages; i++) {
            if (i === pageNumber) {
                $(".page:nth-of-type(" + (i + 1) + ")").css({"display": "block"});

            } else {
                $(".page:nth-of-type(" + (i + 1) + ")").css({"display": "none"});

            }
        }
    }

    this.displayNumWins = function() {
        $("#numWins").text(numWins);
    }

    this.displayNumLosses = function() {
        $("#numLosses").text(numLosses);        
    }

    this.displayTargetSum = function() {
        $("#targetSum").text(targetSum);
    }

    this.displayCurrentSum = function() {
        $("#currentSum").text(currentSum);
    }


    /************************************************************************
        
        Get methods
        
    *************************************************************************/
    this.getCrystalValues = function() {
        return crystalValues;
    }


    /************************************************************************
        
        Set (update) methods
        
    *************************************************************************/
    this.updatePage = function(changeBy) {
        pageNumber = (pageNumber + changeBy + numPages) % numPages;
    }

    this.updateNumWins = function(changeBy) {
        numWins += changeBy;
    }

    this.updateNumLosses = function(changeBy) {
        numLosses += changeBy;
    }

    this.updateCurrentSum = function(changeBy) {
        currentSum += changeBy;
    }


    /************************************************************************
        
        Query methods
        
    *************************************************************************/
    this.checkCurrentSum = function() {
        if (currentSum < targetSum) {
            // Still good to go
            return 0;

        } else if (currentSum === targetSum) {
            // Win condition
            return 1;

        } else {
            // Loss condition
            return -1;

        }
    }
}



/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    game = new CrystalCollectorGame();

    game.startNewGame();

    
    /************************************************************************
        
        Respond to user's actions
        
    *************************************************************************/
    $(".page_prev").on("click", function() {
        game.updatePage(-1);
        game.displayPage();
    });

    $(".page_next").on("click", function() {
        game.updatePage(1);
        game.displayPage();
    });

    $.each(game.getCrystalValues(), function(index, value) {
        $(".crystal:nth-of-type(" + (index + 1) + ")").on("click", function() {
            game.updateCurrentSum(value);

            game.displayCurrentSum();

            switch (game.checkCurrentSum()) {
                // If the user reached the target sum
                case 1:
                    game.updateNumWins(1);

                    $("#outputMessage").html("Congratulations!<br>Press any key to continue.");
                    $("#lightBox").css({"animation-name"  : "slide_down",
                                        "background-color": "var(--color-mint-green)"});
//                    $("#lightBox strong").css({"color": "#fff896"});
                    displayLightBox(true);
                    
                    game.startNewGame();

                    break;

                // If the user went over the target sum
                case -1:
                    game.updateNumLosses(1);

                    $("#outputMessage").html("Sorry, you got greedy!<br>Press any key to continue.");
                    $("#lightBox").css({"animation-name"  : "shake",
                                        "background-color": "#c81a4c"});
//                    $("#lightBox strong").css({"color": "#beffad"});
                    displayLightBox(true);
                    
                    game.startNewGame();

                    break;

            }
        });
    });

    $("#lightBox_background, #lightBox").on("click", function() {
        displayLightBox(false);
    });
});


function displayLightBox(lightBoxOn) {
//    game.updateKeyEnabled(!lightBoxOn);

    if (lightBoxOn) {
        $("#lightBox_background").css({"display": "block"});
        $("#lightBox").css({"display": "block"});

    } else {
        $("#lightBox_background").css({"display": "none"});
        $("#lightBox").css({"display": "none"});

    }
}