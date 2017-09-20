// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

/*
 *  STEPS TO SEQUELIZE THE STAR WARS APP.
 *  1. Install the sequelize and mysql2 npm packages.
 *  2. Delete the orm from config. In your app folder, create a model folder
 *     with a character.js file in the model
 *  3. In character.js, model out the character table, as detailed
 *     in the schema.sql file located in the root of this project directory.
 *  4. Remove all references to the old orm file,
 *     and replace it with character.js
 *  5. Use Sequelize methods in place of the orm calls
 *     to retrieve and insert data.
 *  6. Update connection.js to use sequelize instead of the mysql package.
 *
 * -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ */

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

// Here we introduce HTML routing to serve different HTML files
require("./app/routes/html-routes.js")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});