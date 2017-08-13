/****************************************************************************
 ****************************************************************************
    
    Create an object of Crystal Collector game
    
*****************************************************************************
*****************************************************************************/
var game;

var CrystalCollector = function() {
    /************************************************************************
        
        Private variables
        
    *************************************************************************/
    // Variables for the game
    var numPages = $(".page").length, currentPage = 0;
    var numWins = 0, numLosses = 0;

    // Variables for the user
    var numCrystals   = 4;
    var crystalValues = new Array(numCrystals);
    var targetSum, currentSum;


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

        // Display to the browser
        displayCurrentPage();
        displayNumWins();
        displayNumLosses();
        displayTargetSum();
        displayCurrentSum();
    }

    
    /************************************************************************
        
        Display functions
        
    *************************************************************************/
    var displayCurrentPage = function() {
        $(".page").css({"display": "none"});
        $(".page:nth-of-type(" + (currentPage + 1) + ")").css({"display": "block"});
    }

    this.displayLightBox = function(lightBoxOn) {
        if (lightBoxOn) {
            $("#lightBox_background, #lightBox").css({"display": "block"});

        } else {
            $("#lightBox_background, #lightBox").css({"display": "none"});

        }
    }

    var displayNumWins = function() {
        $("#numWins").text(numWins);
    }

    var displayNumLosses = function() {
        $("#numLosses").text(numLosses);        
    }

    var displayTargetSum = function() {
        $("#targetSum").text(targetSum);
    }

    var displayCurrentSum = function() {
        $("#currentSum").text(currentSum);
    }


    /************************************************************************
        
        Set (update) functions
        
    *************************************************************************/
    this.updatePage = function(changeBy) {
        currentPage = (currentPage + changeBy + numPages) % numPages;

        displayCurrentPage();
    }

    var updateNumWins = function(changeBy) {
        numWins += changeBy;
    }

    var updateNumLosses = function(changeBy) {
        numLosses += changeBy;
    }


    /************************************************************************
        
        Game mechanics
        
    *************************************************************************/
    // Generate a random number between a and b
    var randomInteger = function(a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a;
    }
    
    this.collectCrystal = function(index) {
        // Update the current sum
        currentSum += crystalValues[index];

        displayCurrentSum();

        if (currentSum < targetSum) {
            return;

        } else if (currentSum === targetSum) {
            updateNumWins(1);

            $("#outputMessage").html("Congratulations!<br>Click anywhere to continue.");
            $("#lightBox").css({"animation-name"  : "slide_down",
                                "background-color": "var(--color-mint-green)"});

            this.displayLightBox(true);
            
            this.startNewGame();

        } else {
            updateNumLosses(1);

            $("#outputMessage").html("You got greedy!<br>Click anywhere to continue.");
            $("#lightBox").css({"animation-name"  : "shake",
                                "background-color": "#c81a4c"});

            this.displayLightBox(true);
            
            this.startNewGame();

        }
    }
}



/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    game = new CrystalCollector();

    game.startNewGame();

    
    /************************************************************************
        
        Respond to user's actions
        
    *************************************************************************/
    // Page selection
    $(".page_prev").on("click", function() {
        game.updatePage(-1);
    });

    $(".page_next").on("click", function() {
        game.updatePage(1);
    });

    // Game mechanics
    $(".crystals").on("click", function() {
        var index = $(".crystals").index(this);

        game.collectCrystal(index);
    });

    // Lightbox
    $("#lightBox_background, #lightBox").on("click", function() {
        game.displayLightBox(false);
    });
});