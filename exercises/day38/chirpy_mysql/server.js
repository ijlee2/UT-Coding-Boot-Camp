// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
const express    = require("express");
const bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
const app  = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.text());
app.use(bodyParser.json({"type": "application/vnd.api+json"}));

// Static directory to be served
app.use(express.static("app/public"));

// Routes
// =============================================================
require("./app/routes/api-routes.js")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});