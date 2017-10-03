// Dependencies
const express    = require("express");
const bodyParser = require("body-parser");
const logger     = require("morgan");
const mongoose   = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Here's where we establish a connection to the collection
// We bring the model in like any old module
// Most of the magic with mongoose happens there
//
// Example gets saved as a class, so we can create new Example objects
// and send them as validated, formatted data to our mongoDB collection.
const Example = require("./userModel.js");


// Initialize Express
const app = express();

// Configure app with morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({"extended": false}));

// Static file support with public folder
app.use(express.static("public"));


// Database configuration for mongoose
// db: week18day3mongoose
mongoose.connect("mongodb://localhost/week18day3mongoose");

// Hook mongoose connection to db
const db = mongoose.connection;

// Log any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Log a success message when we connect to our mongoDB collection with no issues
db.once("open", function() {
    console.log("Mongoose connection successful.");
});


// Routes
// ======
// Route to post our form submission to mongoDB via mongoose
app.post("/submit", function(req, res) {
    // We use the "Example" class we defined above to check our req.body against our user model
    const user = new Example(req.body);

    // With the new "Example" object created, we can save our data to mongoose
    // Notice the different syntax. The magic happens in userModel.js
    user.save(function(error, doc) {
        // Send any errors to the browser
        if (error) {
            res.send(error);
        }
        // Otherwise, send the new doc to the browser
        else {
            res.send(doc);
        }
    });
});


// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});