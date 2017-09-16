/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const mysql = require("mysql");

// Connect to MySQL
const connection = mysql.createConnection({
    "host"    : "localhost",
    "port"    : 3306,
    "user"    : "root",
    "password": "",
    "database": "friend_finder_db"
});

connection.connect(error => {
    if (error) throw error;

    console.log(`Database connected as thread ${connection.threadId}.\n`);
});


module.exports = function FriendFinder() {
    // Scope-safe constructor
    if (!(this instanceof FriendFinder)) {
        return new FriendFinder();
    }

    // Get friends from the database
    let friends = [];

    connection.query("SELECT * FROM friends", (error, results) => {
        if (error) throw error;

        results.forEach(r => {
            friends.push({
                "id"       : r.id,
                "name"     : r.name,
                "photo_url": r.photo_url,
                "answers"  : JSON.parse(r.answers)
            });
        });
    });


    /************************************************************************
        
        Private methods
        
    *************************************************************************/
    function findCompatibility(a, b) {
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
        const answers = JSON.stringify(profile.answers).replace("/,/g", ", ");

        const sql_command =
            `INSERT INTO friends (name, photo_url, answers)
             VALUES ("${profile.name}", "${profile.photo_url}", "${answers}")`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;

            // Save a local copy
            friends.push(profile);
        });
    }

    this.getFriends = function() {
        return friends;
    }

    this.findFriend = function(profile) {
        friends.sort((a, b) => findCompatibility(a, profile) - findCompatibility(b, profile));

        return friends[0];
    }
}