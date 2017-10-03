// Dependencies
const express    = require("express");
const bodyParser = require("body-parser");
const logger     = require("morgan");
const mongoose   = require("mongoose");
// Set mongoose to leverage built in JavaScript ES6 Promises

mongoose.Promise = Promise;

// Require our userModel model
const Example = require("./userModel.js");


// Initialize Express
const app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({"extended": false}));

// Make public a static dir
app.use(express.static("public"));


// Database configuration with mongoose
mongoose.connect("mongodb://localhost/week18day3mongoose");
const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});


// Routes
// ======
app.post("/submit", function(req, res) {
    const user = new Example(req.body);

    user.setFullName();

    user.lastUpdatedDate();

    // Save a user to our mongoDB
    user.save(function(error, doc) {
        // Send an error to the browser
        if (error) {
            res.send(error);
        }
        // Or send the doc to our browser
        else {
            res.send(doc);
        }
    });
});

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});
