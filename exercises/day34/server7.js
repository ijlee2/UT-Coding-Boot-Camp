// Dependencies
// =============================================================
const express    = require("express");
const bodyParser = require("body-parser");
const path       = require("path");

// Sets up the Express App
// =============================================================
const app  = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.text());
app.use(bodyParser.json({"type": "application/vnd.api+json"}));

// Star Wars Characters (DATA)
// =============================================================
const characters = [
    {
        "routeName"  : "yoda",
        "name"       : "Yoda",
        "role"       : "Jedi Master",
        "age"        : 900,
        "forcePoints": 2000
    }, {
        "routeName"  : "darthmaul",
        "name"       : "Darth Maul",
        "role"       : "Sith Lord",
        "age"        : 200,
        "forcePoints": 1200
    }, {
        "routeName"  : "obiwankenobi",
        "name"       : "Obi Wan Kenobi",
        "role"       : "Jedi Master",
        "age"        : 55,
        "forcePoints": 1350
    }
];

// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

// Get all characters
app.get("/all", function(req, res) {
    res.json(characters);
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:characters?", function(req, res) {
    const chosen = req.params.characters;

    if (chosen) {
        console.log(chosen);

        for (let i = 0; i < characters.length; i++) {
            if (chosen === characters[i].routeName) {
                return res.json(characters[i]);
            }
        }

        return res.json(false);
    }
    
    return res.json(characters);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    const newcharacter = req.body;

    // Remove all spaces for router names
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    // We then add the json the user sent to the character array
    characters.push(newcharacter);

    // We then display the JSON to the users
    res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});