// Initialize
const express = require("express");
const exphbs    = require("express-handlebars");

// Create an instance of the express app
const app = express();

// Specify the port
const PORT = process.env.PORT || 3000;

// Set Handlebars as the default templating engine
app.engine("handlebars", exphbs({"defaultLayout": "main"}));
app.set("view engine", "handlebars");

// Data
const icecreams = [
    {
        "name"       : "vanilla",
        "price"      : 10,
        "awesomeness": 3
    },
    {
        "name"       : "chocolate",
        "price"      : 4,
        "awesomeness": 8
    },
    {
        "name"       : "banana",
        "price"      : 1,
        "awesomeness": 1
    },
    {
        "name"       : "greentea",
        "price"      : 5,
        "awesomeness": 7
    },
    {
        "name"       : "jawbreakers",
        "price"      : 6,
        "awesomeness": 2
    }
];

// Routes
app.get("/icecream/:name", (req, res) => {
    const name = req.params.name;
    let flavorFound = false;

    for (let i = 0; i < icecreams.length; i++) {
        if (icecreams[i].name === name) {
            flavorFound = true;

            res.render("benandjerry", {
                "icecream": icecreams[i]
            });

            break;
        }
    }

    if (!flavorFound) {
        res.render("benandjerry", {
            "icecream": []
        });
    }
});

// Initiate the listener.
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));