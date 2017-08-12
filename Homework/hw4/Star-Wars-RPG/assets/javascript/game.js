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
    var clickDisabled = false;

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
        for (var i = 0; i < numCharacters; i++) {
            // Assign random stats (hit points, attack points, damage)
            characters[i] = {"name": characters_name[i],
                             "hp"  : 10 * randomInteger(10, 20),
                             "ap"  : randomInteger(6, 25)};

            // Damage will increase for the player, but not for the enemies
            characters[i].damage = characters[i].ap;

            // Reset character selection page
            $(".characters:nth-of-type(" + (i + 1) + ") .hp").text("HP." + characters[i].hp);
            
            // Reset enemy selection page
            $(".enemies:nth-of-type(" + (i + 1) + ") .hp").text("HP." + characters[i].hp);
        }

        // Reset character and enemy selection pages
        $(".characters, .enemies").css({"display": "block"});
        $(".characters img, .enemies img").css({"border-color": "var(--color-text)"});

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
        $(".page").css({"display": "none"});

        for (var i = 0; i < numPages; i++) {
            if (i === currentPage) {
                $(".page:nth-of-type(" + (i + 1) + ")").css({"display": "block"});

                break;
            }
        }
    }

    var resetBattlePage = function() {
        // Elements such as #battle_player img, #battle_enemy img can be
        // overwritten later
        $("#battle_player, #battle_enemy").css({"animation": "none"});
        $(".damageReceived").text("");
        $("#battle_button").text("Attack!");
    }


    /************************************************************************
        
        Get functions
        
    *************************************************************************/
    this.getPage = function() {
        return currentPage;
    }

    this.getClickDisabled = function() {
        return clickDisabled;
    }

    this.getMyID = function() {
        return myID;
    }

    this.getEnemyID = function() {
        return enemyID;
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
                // Reset enemy ID
                enemyID = -1;
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

    this.updateClickDisabled = function(changeTo) {
        clickDisabled = changeTo;
    }

    this.updateMyID = function(changeTo) {
        myID = changeTo;

        $(".characters img").css({"border-color": "var(--color-text)"});

        for (var i = 0; i < numCharacters; i++) {
            if (i === myID) {
                $(".characters:nth-of-type(" + (i + 1) + ") img").css({"border-color": "var(--color-character)"});

                break;
            }
        }
    }

    this.updateEnemyID = function(changeTo) {
        enemyID = changeTo;

        $(".enemies img").css({"border-color": "var(--color-text)"});

        for (var i = 0; i < numCharacters; i++) {
            if (i === enemyID) {
                $(".enemies:nth-of-type(" + (i + 1) + ") img").css({"border-color": "var(--color-enemy)"});

                break;
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

        if (player.hp === 0 || enemy.hp === 0) {
            return;
        }
        

        /********************************************************************
        
            The player attacks the enemy
        
        *********************************************************************/
        enemy.hp = Math.max(enemy.hp - player.damage, 0);

        $("#battle_enemy").css({"z-index": "0"});
        $("#battle_player").css({"animation": "attack_right 1.00s cubic-bezier(.36, .07, .19, .97) both",
                                 "z-index"  : "1"});
        $("#battle_player").replaceWith($("#battle_player").clone());

        setTimeout(function() {
            $("#battle_enemy .hp").text("HP." + enemy.hp);
            $("#battle_enemy .damageReceived").text(-player.damage);
            $("#battle_enemy .damageReceived").replaceWith($("#battle_enemy .damageReceived").clone());

            // The player's damage increases after attack
            player.damage += player.ap;
        }, 200);


        /********************************************************************
        
            If the enemy is alive, the enemy attacks the player
        
        *********************************************************************/
        if (enemy.hp > 0) {
            player.hp = Math.max(player.hp - enemy.damage, 0);

            setTimeout(function() {
                $("#battle_player").css({"z-index": "0"});
                $("#battle_enemy .damageReceived").text("");
                $("#battle_enemy").css({"animation": "attack_left 1.00s cubic-bezier(.36, .07, .19, .97) both",
                                        "z-index"  : "1"});
                $("#battle_enemy").replaceWith($("#battle_enemy").clone());
            }, 1500);

            setTimeout(function() {
                $("#battle_player .hp").text("HP." + player.hp);
                $("#battle_player .damageReceived").text(-enemy.damage);
                $("#battle_player .damageReceived").replaceWith($("#battle_player .damageReceived").clone());
            }, 1700);

            setTimeout(function() {
                $("#battle_player .damageReceived").text("");
            }, 3000);

            if (player.hp === 0) {
                clickDisabled = false;

                setTimeout(function() { $("#battle_button").text("You lost!"); }, 2500);
                setTimeout(function() { $("#battle_button").text("Restart"); }, 3800);
            }

        } else {
            clickDisabled = false;
            numEnemiesLeft--;

            setTimeout(function() { $("#battle_button").text("You won!"); }, 1000);
            setTimeout(function() { $("#battle_button").text((numEnemiesLeft > 0) ? "Next" : "Restart"); }, 2300);

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
        if (game.getClickDisabled()) {
            return;
        }

        game.updateClickDisabled(true);

        setTimeout(function() { game.updateClickDisabled(false); }, 3000);

        switch ($(this).text()) {
            case "Attack!":
                game.attack();

                break;

            case "Next":
                game.updatePage(-1);

                break;

            case "Restart":
                game.startNewGame();
                game.updatePage(1);

                break;

        }
    });
});