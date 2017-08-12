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
    var numPages = 5, currentPage = 0;

    // Variables for the user
    var characters_name = ["Rey", "Luke", "Darth", "Storm"];
    var numCharacters   = characters_name.length;
    var characters      = new Array(numCharacters);
    var myID, enemyID;
    var numEnemiesLeft;
    

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
        for (var i = 0; i < numCharacters; i++) {
            // Assign random stats (hit points, attack points)
            characters[i] = {"name"  : characters_name[i],
                             "hp"    : 10 * randomInteger(10, 20),
                             "ap"    : randomInteger(6, 20)};

            // Damage will increase for the player, but not for the enemies
            characters[i].damage = characters[i].ap;

            // Display stats in character selection
            $(".characters:nth-of-type(" + (i + 1) + ") .hp").text("HP." + characters[i].hp);
            
            // Display stats in enemy selection
            $(".enemies:nth-of-type(" + (i + 1) + ") .hp").text("HP." + characters[i].hp);

            myID    = -1;
            enemyID = -1;
            numEnemiesLeft = numCharacters - 1;
        }

        // Display messages
        displayCurrentPage();
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


    /************************************************************************
        
        Get functions
        
    *************************************************************************/
    this.getPage = function() {
        return currentPage;
    }

    this.getMyID = function() {
        return myID;
    }

    this.getEnemyID = function() {
        return enemyID;
    }

    this.getNumEnemiesLeft = function() {
        return numEnemiesLeft;
    }


    /************************************************************************
        
        Set (update) functions
        
    *************************************************************************/
    this.updatePage = function(changeBy) {
        // Allow pages to move in a carousel
        currentPage = (currentPage + changeBy + numPages) % numPages;

        // Enemy selection
        if (currentPage === 2) {
            for (var i = 0; i < numCharacters; i++) {
                if (characters[i].hp === 0) {
                    // For enemy selection
                    $(".enemies:nth-of-type(" + (i + 1) + ")").css({"display": "none"});
                }
            }

            $("#battle_player .damageReceived").css({"display": "block"});
            $("#battle_enemy .damageReceived").css({"display": "block"});

            // Change the functionality of the button
            $("#battle_button").text("Attack!");
        }

        displayCurrentPage();
    }

    this.updateMyID = function(changeTo) {
        myID = changeTo;

        for (var i = 0; i < numCharacters; i++) {
            if (i === myID) {
                // For character selection
                $(".characters:nth-of-type(" + (i + 1) + ") img").css({"border-color": "var(--color-character)"});

                // For enemy selection
                $(".enemies:nth-of-type(" + (i + 1) + ")").css({"display": "none"});

                // For battle
                $("#battle_player img").attr("src", "assets/images/" + characters[i].name + ".jpg");
                $("#battle_player img").css("border-color", "var(--color-character)");
                $("#battle_player .name").text(characters[i].name);
                $("#battle_player .hp").text("HP." + characters[i].hp);

            } else {
                // For character selection
                $(".characters:nth-of-type(" + (i + 1) + ") img").css({"border-color": "white"});
                
                // For enemy selection
                $(".enemies:nth-of-type(" + (i + 1) + ")").css({"display": "block"});

            }
        }
    }

    this.updateEnemyID = function(changeTo) {
        enemyID = changeTo;

        for (var i = 0; i < numCharacters; i++) {
            if (i === enemyID) {
                // For enemy selection
                $(".enemies:nth-of-type(" + (i + 1) + ") img").css({"border-color": "var(--color-enemy)"});

                // For battle
                $("#battle_enemy img").attr("src", "assets/images/" + characters[i].name + ".jpg");
                $("#battle_enemy img").css("border-color", "var(--color-enemy)");
                $("#battle_enemy .name").text(characters[i].name);
                $("#battle_enemy .hp").text("HP." + characters[i].hp);

            } else {
                // For enemy selection
                $(".enemies:nth-of-type(" + (i + 1) + ") img").css({"border-color": "white"});

            }
        }
    }


    /************************************************************************
        
        Game mechanics functions
        
    *************************************************************************/
    this.attack = function() {
        var player = characters[myID];
        var enemy  = characters[enemyID];
        
        // The player attacks the enemy first
        enemy.hp = Math.max(enemy.hp - player.damage, 0);

        $("#battle_enemy .damageReceived").text(-player.damage);
        $("#battle_enemy .damageReceived").css({"animation": "slide_and_fade 1.80s cubic-bezier(.36, .07, .19, .97) both"});
        $("#battle_enemy .damageReceived").replaceWith($("#battle_enemy .damageReceived").clone());
        $("#battle_enemy .hp").text("HP." + enemy.hp);

        // The player's damage increases after attack
        player.damage += player.ap;

        // If the enemy surives, the enemy attacks the player
        if (enemy.hp > 0) {
            player.hp = Math.max(player.hp - enemy.damage, 0);

            setTimeout(function() {
                $("#battle_player .damageReceived").text(-enemy.damage);
                $("#battle_player .damageReceived").css({"animation": "slide_and_fade 1.80s cubic-bezier(.36, .07, .19, .97) both"});
                $("#battle_player .damageReceived").replaceWith($("#battle_player .damageReceived").clone());
                $("#battle_player .hp").text("HP." + player.hp);
            }, 600);

        } else {
            numEnemiesLeft--;

            setTimeout(function() {
                $("#battle_player .damageReceived").text("");
                $("#battle_player .damageReceived").css({"display": "none", "animation": "none"});
                
                $("#battle_enemy .damageReceived").text("");
                $("#battle_enemy .damageReceived").css({"display": "none", "animation": "none"});
                
                $("#battle_button").text("You won!");
            }, 600);

            setTimeout(function() {
                $("#battle_button").text("Next");
            }, 1800);

        }
    }
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
    // Page selection
    $(".page_prev").on("click", function() {
        game.updatePage(-1);
    });

    $(".page_next").on("click", function() {
        if (game.getPage() === 0 || (game.getPage() === 1 && game.getMyID() >= 0) || (game.getPage() === 2 && game.getEnemyID() >= 0)) {
            game.updatePage(1);
        }
    });

    // Character selection
    $(".characters").on("click", function() {
        var index = $(".characters").index(this);

        game.updateMyID(index);
    });

    // Enemy selection
    $(".enemies").on("click", function() {
        var index = $(".enemies").index(this);

        game.updateEnemyID(index);
    });

    // Battle
    $("#battle_button").on("click", function() {
        switch ($(this).text()) {
            case "Attack!":
                game.attack();
                break;

            case "Next":
                if (game.getNumEnemiesLeft() > 0) {
                    game.updatePage(-1);
                } else {
                    game.updatePage(1);
                }

                break;

        }
    });

    // Lightbox
    $("#lightBox_background, #lightBox").on("click", function() {
        game.displayLightBox(false);
    });
});