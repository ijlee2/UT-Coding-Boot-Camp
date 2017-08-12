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
        var temp;

        // Assign random stats to each character
        for (var i = 0; i < numCharacters; i++) {
            characters[i] = {"player": false,
                             "name"  : characters_name[i],
                             "hp"    : 10 * randomInteger(10) + 100,
                             "damage": randomInteger(10)};

            // Display stats in character selection
            temp = ".characters:nth-of-type(" + (i + 1) + ")";
            
            $(temp + " .name").text(characters[i].name);
            $(temp + " .hp").text("HP." + characters[i].hp);

            temp = ".enemies:nth-of-type(" + (i + 1) + ")";
            
            $(temp + " .name").text(characters[i].name);
            $(temp + " .hp").text("HP." + characters[i].hp);
        }

        // Display messages
        this.displayPage();
    }

    
    /************************************************************************
        
        Display methods
        
    *************************************************************************/
    this.displayPage = function() {
        var temp;

        for (var i = 0; i < numPages; i++) {
            temp = ".page:nth-of-type(" + (i + 1) + ")";

            if (i === currentPage) {
                $(temp).css({"display": "block"});

            } else {
                $(temp).css({"display": "none"});

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
        var temp1, temp2;

        for (var i = 0; i < game.getNumCharacters(); i++) {
            temp1 = ".characters:nth-of-type(" + (i + 1) + ") img";
            temp2 = ".enemies:nth-of-type(" + (i + 1) + ")";

            // If selected, highlight the character and
            // hide it from the list of enemies
            if (i === index) {
                $(temp1).css({"border-color": "magenta"});
                $(temp2).css({"display": "none"});

            } else {
                $(temp1).css({"border-color": "white"});
                $(temp2).css({"display": "block"});

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