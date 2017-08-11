/****************************************************************************
 ****************************************************************************
    
    Create an object of Star Wars RPG game
    
*****************************************************************************
*****************************************************************************/
var game;

// Generate a random number between 1 and n
var randomInteger = function(n) {
    return Math.floor(n * Math.random()) + 1;
}

var StarWarsRPGGame = function() {
    /************************************************************************
        
        Private variables
        
    *************************************************************************/
    // Variables for the game
    var numPages = 3, currentPage = 0;
    var numWins = 0, numLosses = 0;

    // Variables for the user
    var characterID, enemyID;
    var numCharacters   = 4;
    var characters      = new Array(numCharacters);
    var character_names = ["Rey", "Luke Skywalker", "Darth Vader", "Stormtrooper"];
    

    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        // Assign random stats to each character
        for (var i = 0; i < numCharacters; i++) {
            characters[i] = {"name"  : character_names[i],
                             "hp"    : 10 * randomInteger(10) + 100,
                             "damage": randomInteger(10)};
        }

        // Display messages
        this.displayPage();
//        this.displayNumWins();
//        this.displayNumLosses();
//        this.displayTargetSum();
//        this.displayCurrentSum();
    }

    
    /************************************************************************
        
        Display methods
        
    *************************************************************************/
    this.displayPage = function() {
        for (var i = 0; i < numPages; i++) {
            if (i === currentPage) {
                $(".page:nth-child(" + (i + 1) + ")").css({"display": "block"});

            } else {
                $(".page:nth-child(" + (i + 1) + ")").css({"display": "none"});

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
    this.getCharacters = function() {
        return characters;
    }


    /************************************************************************
        
        Set (update) methods
        
    *************************************************************************/
    this.updatePage = function(changeBy) {
        currentPage = (currentPage + changeBy + numPages) % numPages;
    }

    this.updateCharacter = function(changeTo) {
        characterID = changeTo;
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
    
    Start a new game when the page loads for the first time
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    game = new StarWarsRPGGame();

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

    $.each(game.getCharacters(), function(index, value) {
        $(".characters:nth-child(" + (index + 1) + ")").on("click", function() {
            game.updateCharacter(index);

            // Hide the character from the list of enemies
            for (var i = 0; i < game.getCharacters().length; i++) {
                if (i === index) {
                    $(".enemies:nth-child(" + (i + 1) + ")").css({"display": "none"});

                } else {
                    $(".enemies:nth-child(" + (i + 1) + ")").css({"display": "block"});

                }
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