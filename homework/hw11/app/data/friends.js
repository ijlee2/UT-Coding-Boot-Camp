/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const mysql = require("mysql");

// Connect to MySQL
const connection = mysql.createConnection({
    "host"              : "us-cdbr-iron-east-05.cleardb.net",
    "port"              : 3306,
    "user"              : "baabfce79d92f0",
    "password"          : "e7e93590",
    "database"          : "heroku_d2871eb4b2937fc",
    "multipleStatements": true
});

/* For testing on localhost
const connection = mysql.createConnection({
    "host"              : "localhost",
    "port"              : 3306,
    "user"              : "root",
    "password"          : "",
    "database"          : "friend_finder_db",
    "multipleStatements": true
});
*/

connection.connect(error => {
    if (error) throw error;

    console.log(`Database connected as thread ${connection.threadId}.`);
});



/****************************************************************************
 ****************************************************************************
    
    Create FriendFinder object
    
*****************************************************************************
*****************************************************************************/
module.exports = function FriendFinder() {
    // Scope-safe constructor
    if (!(this instanceof FriendFinder)) {
        return new FriendFinder();
    }

    let friends;

    // Get friends from the database
    connection.query("SELECT * FROM friends", (error, results) => {
        if (error) throw error;

        friends = results.map(r => ({
            "id"       : r.id,
            "name"     : r.name,
            "photo_url": r.photo_url,
            "answers"  : JSON.parse(r.answers)
        }));
    });


    /************************************************************************
        
        Private methods
        
    *************************************************************************/
    function findDifference(a, b) {
        let score = 0;

        for (let i = 0; i < a.answers.length; i++) {
            score += Math.abs(b.answers[i] - a.answers[i]);
        }

        return score;
    }


    /************************************************************************
        
        Public methods
        
    *************************************************************************/
    this.addFriend = function(profile) {
        const sql_command =
            `INSERT INTO friends (name, photo_url, answers)
             VALUES ("${profile.name}", "${profile.photo_url}", "${JSON.stringify(profile.answers)}");

             SELECT id FROM friends ORDER BY id DESC LIMIT 1;`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;

            // Save a local copy
            friends.push(Object.assign({}, {"id": results[1][0].id}, profile));
        });
    }

    this.getFriends = function() {
        return friends;
    }

    this.findBestFriend = function(profile) {
        // The lower the difference in compatibility, the better
        friends.sort((a, b) => findDifference(a, profile) - findDifference(b, profile));

        return friends[0];
    }
}