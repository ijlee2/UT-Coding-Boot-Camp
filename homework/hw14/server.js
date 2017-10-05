/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
// Use Express
const express        = require("express");
const exphbs         = require("express-handlebars");
const path           = require("path");
const app            = express();

// For making requests
const methodOverride = require("method-override");
const bodyParser     = require("body-parser");

// For MongoDB
const mongoose       = require("mongoose");

// Set port number
const PORT = process.env.PORT || 3000;



/****************************************************************************
 ****************************************************************************

    Set models

*****************************************************************************
*****************************************************************************/
// Configure mongoose
mongoose.Promise = Promise;

mongoose.connect("mongodb://heroku_fzsk9cr3:dr5vpejt5av9494j3nj5uhto0c@ds015398.mlab.com:15398/heroku_fzsk9cr3", {"useMongoClient": true});

const db = mongoose.connection;

// Log errors if mongodb runs into an issue
db.on("error", error => {
    console.log(`Database Error: ${error}`);
});

// Log success once we connect to the database through mongoose
db.once("open", () => {
    console.log("Mongoose connection successful.");
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

// Set extended to true so that we can parse arrays of input fields
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