// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
const express    = require("express");
const bodyParser = require("body-parser");
const db         = require("./models");


// Sets up the Express App
// =============================================================
const app  = express();
const PORT = process.env.PORT || 8080;


// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});