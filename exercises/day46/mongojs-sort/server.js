// Dependencies
const express = require("express");
const mongojs = require("mongojs");

// Initialize Express
const app = express();

// Database configuration
// Save the URL of our database as well as the name of our collection
const databaseUrl = "zoo";
const collections = ["animals"];

// Use mongojs to hook the database to the db variable
const db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", error => {
    console.log(`Database Error: ${error}`);
});


// TODO: Make four routes that display results from your zoo collection
// 0: Root: Displays a simple "Hello World" message (no mongo required)
app.get("/", (req, res) => {
    res.send("Hello world");
});

// 1: All: Send JSON response with all animals
app.get("/all", (req, res) => {
    // Query: In our database, go to the animals collection, then "find" everything
    db.animals.find((err, docs) => {
        // Log any errors if the server encounters one
        if (err) {
            console.log(err);
        }
        // Otherwise, send the result of this query to the browser
        else {
            res.json(docs);
        }
    });
});

// 2: Name: Send JSON response sorted by name in ascending order
app.get("/name", (req, res) => {
    db.animals.find().sort({"name": 1}, (err, docs) => {
        if (err) {
            console.log(err);

        } else {
            res.json(docs);

        }
    });
});

// 3: Weight: Send JSON response sorted by weight in descending order
app.get("/weight", (req, res) => {
    db.animals.find().sort({"weight": -1}, (err, docs) => {
        if (err) {
            console.log(err);

        } else {
            res.json(docs);
            
        }
    });
});


// Set the app to listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});