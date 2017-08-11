/****************************************************************************
 ****************************************************************************
    
    Create an object of Star Wars RPG game
    
*****************************************************************************
*****************************************************************************/
var game;

var StarWarsRPGGame = function() {
    /************************************************************************
        
        Private variables
        
    *************************************************************************/
    // Variables for the game
    var numPages = 3, currentPage = 0;

    // Variables for the user
    var characterID, enemyID;
    var numCharacters   = 4;
    var characters      = new Array(numCharacters);
    var characters_name = ["Rey", "Luke", "Darth", "Storm"];


    /************************************************************************
        
        Private functions
        
    *************************************************************************/
    // Generate a random number between 1 and n
    var randomInteger = function(n) {
        return Math.floor(n * Math.random()) + 1;
    }


    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        // Assign random stats to each character
        for (var i = 0; i < numCharacters; i++) {
            characters[i] = {"player": false,
                             "name"  : characters_name[i],
                             "hp"    : 10 * randomInteger(10) + 100,
                             "damage": randomInteger(10)};
        }
        console.log(characters);

        // Display messages
        this.displayPage();
    }

    
    /************************************************************************
        
        Display methods
        
    *************************************************************************/
    this.displayPage = function() {
        var targetElement;

        for (var i = 0; i < numPages; i++) {
            targetElement = ".page:nth-of-type(" + (i + 1) + ")";

            if (i === currentPage) {
                $(targetElement).css({"display": "block"});

            } else {
                $(targetElement).css({"display": "none"});

            }
        }
    }


    /************************************************************************
        
        Get methods
        
    *************************************************************************/
    this.getNumCharacters = function() {
        return numCharacters;
    }

    this.getCharacters = function() {
        return characters;
    }


    /************************************************************************
        
        Set (update) methods
        
    *************************************************************************/
    this.updatePage = function(changeBy) {
        // Allow pages to move in a carousel
        currentPage = (currentPage + changeBy + numPages) % numPages;
    }

    this.updateCharacter = function(changeTo) {
        characterID = changeTo;

//        characters[changeTo].player = true;
    }


    /************************************************************************
        
        Query methods
        
    *************************************************************************/

}



/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads
    
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

    // Character selection
    $(".characters").on("click", function() {
        var index = parseInt($(this).attr("value"));
        game.updateCharacter(index);

        // Hide the character from the list of enemies
        var targetElement1, targetElement2;

        for (var i = 0; i < game.getNumCharacters(); i++) {
            targetElement1 = ".characters:nth-of-type(" + (i + 1) + ")";

            if (i === index) {
                console.log(targetElement1 + " img");
                // Highlight the character
                $(targetElement1 + " img").css({"border-color": "magenta"});

            } else {
                $(targetElement1 + " img").css({"border-color": "white"});

            }
        }
    });

    $("#lightBox_background, #lightBox").on("click", function() {
        displayLightBox(false);
    });
});


function displayLightBox(lightBoxOn) {
    if (lightBoxOn) {
        $("#lightBox_background").css({"display": "block"});
        $("#lightBox").css({"display": "block"});

    } else {
        $("#lightBox_background").css({"display": "none"});
        $("#lightBox").css({"display": "none"});

    }
}