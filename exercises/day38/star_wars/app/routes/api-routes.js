// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
//const orm = require("../models/character.js");
const Character = require("../models/character.js");

// Routes
// =============================================================
module.exports = function(app) {
    // Search for Specific Character (or all characters) then provides JSON
    app.get("/api/:characters?", function(req, res) {
        // If the user provides a specific character in the URL...
        if (req.params.characters) {
            // Then display the JSON for ONLY that character.
            // (Note how we're using the ORM here to run our searches)
            /*
            orm.searchCharacter(req.params.characters, function(data) {
                res.json(data);
            });
            */

            Character.findOne({
                "where": {"routeName": req.params.characters}

            }).then(function(results) {
                res.json(results);

            });
        }

        // Otherwise...
        else {
            // Otherwise display the data for all of the characters.
            // (Note how we're using the ORM here to run our searches)
            /*
            orm.allCharacters(function(data) {
                res.json(data);
            });
            */

            Character.findAll({}).then(function(results) {
                res.json(results);
            });
        }
    });

    // If a user sends data to add a new character...
    app.post("/api/new", function(req, res) {
        // Take the request...
        const character = req.body;

        // Then send it to the ORM to "save" into the DB.
        /*
        orm.addCharacter(character, function(data) {
            console.log(data);
        });
        */

        Character.create({
            "routeName"  : character.name.replace(/\s+/g, "").toLowerCase(),
            "name"       : character.name,
            "role"       : character.role,
            "age"        : parseInt(character.age),
            "forcePoints": parseInt(character.forcePoints)

        }).then(function(results) {
            res.end();

        });
    });
};