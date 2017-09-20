// *********************************************************************************
// orm.js - This file offers a set of easier-to-use methods for interacting with the MySQL db.
// *********************************************************************************

// Dependencies
// =============================================================
const connection = require("./connection.js");

// ORM
// =============================================================
const tableName = "allcharacters";

const orm = {
    // Here our ORM is creating a simple method for performing a query of the entire table.
    // We make use of the callback to ensure that data is returned only once the query is done.
    allCharacters: function(callback) {
        const s = "SELECT * FROM " + tableName;

        connection.query(s, function(err, result) {
            callback(result);
        });
    },

    // Here our ORM is creating a simple method for performing a query of a single character in the table.
    // Again, we make use of the callback to grab a specific character from the database.
    searchCharacter: function(name, callback) {
        const s = "select * from " + tableName + " where routeName=?";

        connection.query(s, [name], function(err, result) {
            callback(result);
        });
    },

    // Here our ORM is creating a simple method for adding characters to the database
    // Effectively, the ORM's simple addCharacter method translates into a more complex SQL INSERT statement.
    addCharacter: function(character, callback) {
        // Creating a routeName so its easy to search.
        const routeName = character.name.replace(/\s+/g, "").toLowerCase();
        console.log(routeName);

        const s = "INSERT INTO " + tableName + " (routeName, name, role, age, forcePoints) VALUES (?,?,?,?,?)";

        connection.query(s, [routeName, character.name, character.role, character.age, character.forcePoints], function(err, result) {
            callback(result);
        });
    }
};

module.exports = orm;