// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// *****************************************************************************
// Dependencies
// =============================================================
const express    = require("express");
const bodyParser = require("body-parser");
const path       = require("path");

// Require our models for syncing
const db = require(path.join(__dirname, "models"));

// Sets up the Express App
// =============================================================
const app  = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.text());
app.use(bodyParser.json({"type": "application/vnd.api+json"}));

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({"force": true}).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});