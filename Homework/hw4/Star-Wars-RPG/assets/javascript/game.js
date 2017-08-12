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
    var numCharacters   = 4;
    var characters      = new Array(numCharacters);
    var characters_name = ["Rey", "Luke", "Darth", "Storm"];
    var myID, enemyID;
    

    /************************************************************************
        
        Private functions
        
    *************************************************************************/
    // Generate a random number between a and b
    var randomInteger = function(a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a;
    }


    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        var temp;

        // Assign random stats to each character
        for (var i = 0; i < numCharacters; i++) {
            characters[i] = {"name"  : characters_name[i],
                             "hp"    : 10 * randomInteger(10, 20),
                             "damage": randomInteger(5, 15)};

            // Display stats in character selection
            temp = ".characters:nth-of-type(" + (i + 1) + ")";
            
            $(temp + " .name").text(characters[i].name);
            $(temp + " .hp").text("HP." + characters[i].hp);

            temp = ".enemies:nth-of-type(" + (i + 1) + ")";
            
            $(temp + " .name").text(characters[i].name);
            $(temp + " .hp").text("HP." + characters[i].hp);

            myID    = -1;
            enemyID = -1;
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
    this.getPage = function() {
        return currentPage;
    }

    this.getNumCharacters = function() {
        return numCharacters;
    }

    this.getCharacters = function() {
        return characters;
    }

    this.getMyId = function() {
        return myID;
    }

    this.getEnemyId = function() {
        return enemyID;
    }


    /************************************************************************
        
        Set (update) methods
        
    *************************************************************************/
    this.updatePage = function(changeBy) {
        // Allow pages to move in a carousel
        currentPage = (currentPage + changeBy + numPages) % numPages;
    }

    this.updateMyId = function(changeTo) {
        myID = changeTo;
    }

    this.updateEnemyId = function(changeTo) {
        enemyID = changeTo;
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
        if ((game.getPage() === 0) ||
            (game.getPage() === 1 && game.getMyId() >= 0) ||
            (game.getPage() === 2 && game.getEnemyId() >= 0)) {
            game.updatePage(1);
            game.displayPage();
        }
    });

    // Character selection
    $(".characters").on("click", function() {
        var index = $(".characters").index(this);

        game.updateMyId(index);

        var temp1, temp2;

        for (var i = 0; i < game.getNumCharacters(); i++) {
            temp1 = ".characters:nth-of-type(" + (i + 1) + ") img";
            temp2 = ".enemies:nth-of-type(" + (i + 1) + ")";

            // If selected, highlight the character and
            // hide it from the list of enemies
            if (i === index) {
                $(temp1).css({"border-color": "var(--color-character)"});
                $(temp2).css({"display": "none"});

            } else {
                $(temp1).css({"border-color": "white"});
                $(temp2).css({"display": "block"});

            }
        }
    });

    // Enemy selection
    $(".enemies").on("click", function() {
        var index = $(".enemies").index(this);

        game.updateEnemyId(index);

        var temp;

        for (var i = 0; i < game.getNumCharacters(); i++) {
            temp = ".enemies:nth-of-type(" + (i + 1) + ") img";

            // If selected, highlight the character and
            // hide it from the list of enemies
            if (i === index) {
                $(temp).css({"border-color": "var(--color-enemy)"});

            } else {
                $(temp).css({"border-color": "white"});

            }
        }
    });

    // Lightbox
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