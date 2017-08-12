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
    var numPages = 4, currentPage = 0;

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
        var ip1;

        // Assign random stats to each character
        for (var i = 0; i < numCharacters; i++) {
            ip1 = i + 1;

            characters[i] = {"name"  : characters_name[i],
                             "hp"    : 10 * randomInteger(10, 20),
                             "ap"    : randomInteger(5, 15)};
            characters[i].damage = characters[i].ap;

            // Display stats in character selection
            $(".characters:nth-of-type(" + ip1 + ") .hp").text("HP." + characters[i].hp);
            
            // Display stats in enemy selection
            $(".enemies:nth-of-type(" + ip1 + ") .hp").text("HP." + characters[i].hp);

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
        for (var i = 0; i < numPages; i++) {
            if (i === currentPage) {
                $(".page:nth-of-type(" + (i + 1) + ")").css({"display": "block"});

            } else {
                $(".page:nth-of-type(" + (i + 1) + ")").css({"display": "none"});

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

    this.getMyID = function() {
        return myID;
    }

    this.getEnemyID = function() {
        return enemyID;
    }


    /************************************************************************
        
        Set (update) methods
        
    *************************************************************************/
    this.updatePage = function(changeBy) {
        // Allow pages to move in a carousel
        currentPage = (currentPage + changeBy + numPages) % numPages;
    }

    this.updateMyID = function(changeTo) {
        myID = changeTo;
    }

    this.updateEnemyID = function(changeTo) {
        enemyID = changeTo;
    }

    this.updateHP = function(index, changeBy) {
        characters[index].hp += changeBy;
    }

    this.updateDamage = function(index, changeBy) {
        characters[index].damage += changeBy;
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
            (game.getPage() === 1 && game.getMyID() >= 0) ||
            (game.getPage() === 2 && game.getEnemyID() >= 0)) {
            game.updatePage(1);
            game.displayPage();
        }
    });

    // Character selection
    $(".characters").on("click", function() {
        var index = $(".characters").index(this);
        var ip1;

        game.updateMyID(index);

        for (var i = 0; i < game.getNumCharacters(); i++) {
            ip1 = i + 1;

            if (i === index) {
                $(".characters:nth-of-type(" + ip1 + ") img").css({"border-color": "var(--color-character)"});

                // For enemy selection
                $(".enemies:nth-of-type(" + ip1 + ")").css({"display": "none"});

                // For battle
                var character = game.getCharacters()[i];
                var fileName = "assets/images/" + character.name + ".jpg";

                $("#battle_player img").attr("src", fileName);
                $("#battle_player img").css("border-color", "var(--color-character)");
                $("#battle_player .name").text(character.name);
                $("#battle_player .hp").text("HP." + character.hp);

            } else {
                $(".characters:nth-of-type(" + ip1 + ") img").css({"border-color": "white"});
                
                // For enemy selection
                $(".enemies:nth-of-type(" + ip1 + ")").css({"display": "block"});

            }
        }
    });

    // Enemy selection
    $(".enemies").on("click", function() {
        var index = $(".enemies").index(this);
        var ip1;

        game.updateEnemyID(index);

        for (var i = 0; i < game.getNumCharacters(); i++) {
            ip1 = i + 1;

            if (i === index) {
                $(".enemies:nth-of-type(" + ip1 + ") img").css({"border-color": "var(--color-enemy)"});

                // For battle
                var enemy = game.getCharacters()[i];
                var fileName = "assets/images/" + enemy.name + ".jpg";

                $("#battle_enemy img").attr("src", fileName);
                $("#battle_enemy img").css("border-color", "var(--color-enemy)");
                $("#battle_enemy .name").text(enemy.name);
                $("#battle_enemy .hp").text("HP." + enemy.hp);

            } else {
                $(".enemies:nth-of-type(" + ip1 + ") img").css({"border-color": "white"});

            }
        }
    });

    // Battle
    $(".attackButton").on("click", function() {
        var character = game.getCharacters()[game.getMyID()];
        var enemy     = game.getCharacters()[game.getEnemyID()];
        
        // The character attacks enemy first
        game.updateHP(game.getEnemyID(), -character.damage);
        game.updateDamage(game.getMyID(), character.ap);

        // If the enemy surives, enemy attacks the character
        if (enemy.hp > 0) {
            game.updateHP(game.getMyID(), -enemy.damage);

        } else {
            console.log("You won!");

        }
        
        console.log("-------------------");
        console.log(character);
        console.log(enemy);

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