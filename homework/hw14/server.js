/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
// Import packages
const express        = require("express");
const exphbs         = require("express-handlebars");
const mongojs        = require("mongojs");
const mongoose       = require("mongoose");
const path           = require("path");
const methodOverride = require("method-override");
const bodyParser     = require("body-parser");
const cheerio        = require("cheerio");
const request        = require("request");

// Use Express
const app  = express();
const PORT = process.env.PORT || 3000;



/****************************************************************************
 ****************************************************************************

    Set models

*****************************************************************************
*****************************************************************************/
// Import our models
const databaseUrl = "zoo";
const collections = ["animals"];

// Use mongojs to hook the database to the db variable
const db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", error => {
    console.log(`Database Error: ${error}`);
});



/****************************************************************************
 ****************************************************************************
    
    Set up views
    
*****************************************************************************
*****************************************************************************/
// Set public directory
app.use(express.static("public"));

// Set up Express to handle parsing data
app.use(bodyParser.json());
app.use(bodyParser.text());

// Set extended to true so that we can parse arrays of input fields (e.g. name="captions[0]")
app.use(bodyParser.urlencoded({"extended": true}));

// Set handlebars
app.engine(".hbs", exphbs({
    "defaultLayout": "main",
    "extname"      : ".hbs"
}));

app.set("view engine", ".hbs");



/****************************************************************************
 ****************************************************************************

    Set controllers

*****************************************************************************
*****************************************************************************/
// Override POST methods to handle PATCH and DELETE
app.use(methodOverride("_method"));

// Set routers
const router_html = require(path.join(__dirname, "controllers", "html_routes.js"));
const router_api  = require(path.join(__dirname, "controllers", "api_routes.js"));

// Talk to routers
app.use("/", router_html);
app.use("/api", router_api);



/****************************************************************************
 ****************************************************************************

    Listen for connections on the port

*****************************************************************************
*****************************************************************************/
// Set the app to listen on port 3000
app.listen(PORT, () => console.log(`App listening on ${PORT}.`));