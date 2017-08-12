/****************************************************************************
 ****************************************************************************
    
    Create an object of Star Wars RPG game
    
*****************************************************************************
*****************************************************************************/
var game;

var StarWarsRPG = function() {
    /************************************************************************
        
        Private variables
        
    *************************************************************************/
    // Variables for the game
    var numPages = $(".page").length, currentPage = 0;

    // Variables for the user
    var characters_name = ["Rey", "Luke", "Darth", "Storm"];
    var numCharacters   = characters_name.length;
    var characters      = new Array(numCharacters);
    var myID, enemyID;
    var numEnemiesLeft;


    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        var element;

        for (var i = 0; i < numCharacters; i++) {
            // Assign random stats (hit points, attack points, damage)
            characters[i] = {"name"  : characters_name[i],
                             "hp"    : 10 * randomInteger(10, 20),
                             "ap"    : randomInteger(6, 25)};

            // Damage will increase for the player, but not for the enemies
            characters[i].damage = characters[i].ap;

            // Reset character selection page
            element = ".characters:nth-of-type(" + (i + 1) + ")";
            $(element).css({"display": "block"});
            $(element + " img").css({"border-color": "var(--color-text)"});
            $(element + " .hp").text("HP." + characters[i].hp);
            
            // Reset enemy selection page
            element = ".enemies:nth-of-type(" + (i + 1) + ")";
            $(element).css({"display": "block"});
            $(element + " img").css({"border-color": "var(--color-text)"});
            $(element + " .hp").text("HP." + characters[i].hp);

        }

        // Reset variables
        myID    = -1;
        enemyID = -1;
        numEnemiesLeft = numCharacters - 1;

        // Display to the browser
        displayCurrentPage();
        resetBattlePage();
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

    var resetBattlePage = function() {
        $(".damageReceived").text("");
        $(".damageReceived").css({"display": "block"});
        $("#battle_player img").attr("src", "");
        $("#battle_enemy img").attr("src", "");
        $("#battle_button").text("Attack!");
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

        switch (currentPage) {
            // Enemy selection
            case 2:
                resetBattlePage();

                // Hide the player's character and enemies who died
                for (var i = 0; i < numCharacters; i++) {
                    if (i === myID || characters[i].hp === 0) {
                        $(".enemies:nth-of-type(" + (i + 1) + ")").css({"display": "none"});
                    }
                }

                // Display the player's character in battle
                $("#battle_player img").attr("src", "assets/images/" + characters[myID].name + ".jpg");
                $("#battle_player img").css("border-color", "var(--color-character)");
                $("#battle_player .name").text(characters[myID].name);
                $("#battle_player .hp").text("HP." + characters[myID].hp);

                break;

            // Battle
            case 3:
                // Display the enemy in battle
                $("#battle_enemy img").attr("src", "assets/images/" + characters[enemyID].name + ".jpg");
                $("#battle_enemy img").css("border-color", "var(--color-enemy)");
                $("#battle_enemy .name").text(characters[enemyID].name);
                $("#battle_enemy .hp").text("HP." + characters[enemyID].hp);

                break;
        }

        displayCurrentPage();
    }

    this.updateMyID = function(changeTo) {
        myID = changeTo;

        for (var i = 0; i < numCharacters; i++) {
            if (i === myID) {
                $(".characters:nth-of-type(" + (i + 1) + ") img").css({"border-color": "var(--color-character)"});

            } else {
                $(".characters:nth-of-type(" + (i + 1) + ") img").css({"border-color": "var(--color-text)"});

            }
        }
    }

    this.updateEnemyID = function(changeTo) {
        enemyID = changeTo;

        for (var i = 0; i < numCharacters; i++) {
            if (i === enemyID) {
                $(".enemies:nth-of-type(" + (i + 1) + ") img").css({"border-color": "var(--color-enemy)"});

            } else {
                $(".enemies:nth-of-type(" + (i + 1) + ") img").css({"border-color": "var(--color-text)"});

            }
        }
    }


    /************************************************************************
        
        Game mechanics
        
    *************************************************************************/
    // Generate a random number between a and b
    var randomInteger = function(a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a;
    }

    this.attack = function() {
        var player = characters[myID];
        var enemy  = characters[enemyID];

        // Prevent mashing the button
        if (player.hp === 0 || enemy.hp === 0) {
            return;
        }
        
        // The player attacks the enemy
        enemy.hp = Math.max(enemy.hp - player.damage, 0);

        $("#battle_enemy .damageReceived").text(-player.damage);
        $("#battle_enemy .damageReceived").replaceWith($("#battle_enemy .damageReceived").clone());
        $("#battle_enemy .hp").text("HP." + enemy.hp);

        // The player's damage increases after attack
        player.damage += player.ap;

        // If the enemy survives, the enemy attacks the player
        if (enemy.hp > 0) {
            player.hp = Math.max(player.hp - enemy.damage, 0);

            setTimeout(function() {
                $("#battle_player .damageReceived").text(-enemy.damage);
                $("#battle_player .damageReceived").replaceWith($("#battle_player .damageReceived").clone());
                $("#battle_player .hp").text("HP." + player.hp);
            }, 600);

            if (player.hp === 0) {
                setTimeout(function() { $("#battle_button").text("You lost!"); }, 600);
                setTimeout(function() { $("#battle_button").text("Restart"); }, 1800);
            }

        } else {
            numEnemiesLeft--;

            setTimeout(function() { $("#battle_button").text("You won!"); }, 600);
            setTimeout(function() { $("#battle_button").text((numEnemiesLeft > 0) ? "Next" : "Restart"); }, 1800);

        }
    }
}



/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    game = new StarWarsRPG();

    game.startNewGame();

    
    /************************************************************************
        
        Respond to user's actions
        
    *************************************************************************/
    // Page selection
    $(".page_prev").on("click", function() {
        game.updatePage(-1);
    });

    $(".page_next").on("click", function() {
        // Make sure that the user has selected a character
        if ((game.getPage() === 1 && game.getMyID() === -1) || (game.getPage() === 2 && game.getEnemyID() === -1)) {
            return;
        }

        game.updatePage(1);
    });

    // Character selection
    $(".characters").on("click", function() {
        game.updateMyID($(".characters").index(this));
    });

    // Enemy selection
    $(".enemies").on("click", function() {
        game.updateEnemyID($(".enemies").index(this));
    });

    // Battle
    $("#battle_button").on("click", function() {
        switch ($(this).text()) {
            case "Attack!":
                game.attack();

                break;

            case "Next":
                game.updatePage(-1);

                break;

            case "Restart":
                game.startNewGame();
                game.updatePage(-3);

                break;

        }
    });
});