// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
const express    = require("express");
const bodyParser = require("body-parser");

// Get index.js in models folder, which loads all models on db (e.g. db.User)
const db = require("./models");


// Sets up the Express App
// =============================================================
const app  = express();
const PORT = process.env.PORT || 8080;


// Type `sequelize init:config` then `sequelize init:models`


// Starts the server to begin listening
// =============================================================
// Create the database
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});