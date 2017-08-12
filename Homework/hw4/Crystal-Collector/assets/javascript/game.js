/****************************************************************************
 ****************************************************************************
    
    Create an object of Crystal Collector game
    
*****************************************************************************
*****************************************************************************/
var game;

var CrystalCollectorGame = function() {
    /************************************************************************
        
        Private variables
        
    *************************************************************************/
    // Variables for the game
    var numPages = 2, currentPage = 0;
    var numWins = 0, numLosses = 0;

    // Variables for the user
    var numCrystals   = 4;
    var crystalValues = new Array(numCrystals);
    var targetSum, currentSum;
    

    /************************************************************************
        
        Helper functions
        
    *************************************************************************/
    // Generate a random number between a and b
    var randomInteger = function(a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a;
    }
    

    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        // Reset variables
        targetSum  = 0;
        currentSum = 0;

        // Assign a value between 1 and 12 to each crystal
        for (var i = 0; i < numCrystals; i++) {
            crystalValues[i] = randomInteger(1, 12);

            // Take a linear combination
            targetSum += crystalValues[i] * randomInteger(1, 6);
        }

        // Ensure that the target sum is between 19 and 120
        while (targetSum < 19 || targetSum > 120) {
            targetSum = 0;

            for (var i = 0; i < numCrystals; i++) {
                targetSum += crystalValues[i] * randomInteger(1, 6);
            }
        }

        // Display messages
        displayCurrentPage();
        this.displayNumWins();
        this.displayNumLosses();
        this.displayTargetSum();
        displayCurrentSum();
    }

    
    /************************************************************************
        
        Display functions
        
    *************************************************************************/
    var displayCurrentPage = function() {
        for (var i = 0; i < numPages; i++) {
            if (i === currentPage) {
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

    var displayCurrentSum = function() {
        $("#currentSum").text(currentSum);
    }


    /************************************************************************
        
        Get functions
        
    *************************************************************************/
    this.getCrystalValue = function(index) {
        return crystalValues[index];
    }


    /************************************************************************
        
        Set (update) functions
        
    *************************************************************************/
    this.updatePage = function(changeBy) {
        currentPage = (currentPage + changeBy + numPages) % numPages;

        displayCurrentPage();
    }

    this.updateNumWins = function(changeBy) {
        numWins += changeBy;
    }

    this.updateNumLosses = function(changeBy) {
        numLosses += changeBy;
    }

    this.updateCurrentSum = function(changeBy) {
        currentSum += changeBy;

        displayCurrentSum();
    }


    /************************************************************************
        
        Query functions
        
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
    });

    $(".page_next").on("click", function() {
        game.updatePage(1);
    });

    $(".crystals").on("click", function() {
        var index = $(".crystals").index(this);

        game.updateCurrentSum(game.getCrystalValue(index));

        switch (game.checkCurrentSum()) {
            // If the user reached the target sum
            case 1:
                game.updateNumWins(1);

                $("#outputMessage").html("Congratulations!<br>Press any key to continue.");
                $("#lightBox").css({"animation-name"  : "slide_down",
                                    "background-color": "var(--color-mint-green)"});
                displayLightBox(true);
                
                game.startNewGame();

                break;

            // If the user went over the target sum
            case -1:
                game.updateNumLosses(1);

                $("#outputMessage").html("Sorry, you got greedy!<br>Press any key to continue.");
                $("#lightBox").css({"animation-name"  : "shake",
                                    "background-color": "#c81a4c"});
                displayLightBox(true);
                
                game.startNewGame();

                break;

        }
    });

    $("#lightBox_background, #lightBox").on("click", function() {
        displayLightBox(false);
    });
});


function displayLightBox(lightBoxOn) {
    if (lightBoxOn) {
        $("#lightBox_background, #lightBox").css({"display": "block"});

    } else {
        $("#lightBox_background, #lightBox").css({"display": "none"});

    }
}