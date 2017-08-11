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

var StarWarsRPGGame = function() {
    /************************************************************************
        
        Private variables
        
    *************************************************************************/
    // Variables for the game
    var numPages = 3, pageNumber = 0;
    var numWins = 0, numLosses = 0;

    // Variables for the user
    var characterID;
    var numCharacters = 4, characters = new Array(numCharacters);
    var character_names = ["Rey", "Luke Skywalker", "Darth Vader", "Stormtrooper"];
    

    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        // Assign a value between 1 and 12 to each crystal
        for (var i = 0; i < numCharacters; i++) {
            characters[i] = {"name"  : character_names[i],
                             "hp"    : 10 * randomInteger(10) + 100,
                             "damage": randomInteger(10)};
            
            console.log(characters[i]);
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
            if (i === pageNumber) {
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
    this.getcharacters = function() {
        return characters;
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

    $.each(game.getcharacters(), function(index, value) {
        $(".crystal:nth-child(" + (index + 1) + ")").on("click", function() {
            game.updateCurrentSum(value);

            game.displayCurrentSum();

            switch (game.checkCurrentSum()) {
                // If the user reached the target sum
                case 1:
                    game.updateNumWins(1);

                    $("#outputMessage").html("Congratulations!<br>Press any key to continue.");
                    $("#lightBox").css({"animation-name"  : "slide_down",
                                        "background-color": "var(--color-star-wars-yellow)"});
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