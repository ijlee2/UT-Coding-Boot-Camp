// Dependencies
const express    = require("express");
const bodyParser = require("body-parser");

const app  = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Data
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
app.get("/", function(req, res) {
    res.send("Welcome to the Star Wars Page!");
});

app.get("/api/:characters?", function(req, res) {
    const chosen = req.params.characters;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < characters.length; i++) {
            if (chosen === characters[i].routeName) {
                res.json(characters[i]);
                return;
            }
        }

        return res.send("No character found");
    }

    return res.json(characters);
});

app.post("/api/new", function(req, res) {
    var newcharacter = req.body;

    console.log(newcharacter);

    characters.push(newcharacter);

    res.json(newcharacter);
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});