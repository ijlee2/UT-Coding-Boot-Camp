// Dependencies
const express    = require("express");
const bodyParser = require("body-parser");
const logger     = require("morgan");
const mongoose   = require("mongoose");

// Bring in our Models: Not and User
const Note = require("./models/Note.js");
const User = require("./models/User.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
const app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({"extended": false}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/week18Populater");
const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});


// We'll create a new user by using the User model as a class
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
const exampleUser = new User({
    "name": "Ernest Hemingway"
});

// Using the save method in mongoose, we create our example user in the db
exampleUser.save(function(error, doc) {
    // Log any errors
    if (error) {
        console.log(error);
    }
    // Or log the doc
    else {
        console.log(doc);
    }
});


// Routes
// ======
// Route to see notes we have added
app.get("/notes", function(req, res) {
    // Find all notes in the note collection with our Note model
    Note.find({}, function(error, doc) {
        // Send any errors to the browser
        if (error) {
            res.send(error);
        }
        // Or send the doc to the browser
        else {
            res.send(doc);
        }
    });
});

// Route to see what user looks like without populating
app.get("/user", function(req, res) {
    // Find all users in the user collection with our User model
    User.find({}, function(error, doc) {
        // Send any errors to the browser
        if (error) {
            res.send(error);
        }
        // Or send the doc to the browser
        else {
            res.send(doc);
        }
    });
});

// New note creation via POST route
app.post("/submit", function(req, res) {
    // Use our Note model to make a new note from the req.body
    const newNote = new Note(req.body);
    
    // Save the new note to mongoose
    newNote.save(function(error, doc) {
        // Send any errors to the browser
        if (error) {
            res.send(error);
        }
        // Otherwise
        else {
            // Find our user and push the new note id into the User's notes array
            User.findOneAndUpdate({}, {
                "$push": {"notes": doc._id}

            }, {
                "new": true

            }, function(err, newdoc) {
                // Send any errors to the browser
                if (err) {
                    res.send(err);
                }
                // Or send the newdoc to the browser
                else {
                    res.send(newdoc);
                }
            });
        }
    });
});

// Route to see what user looks like WITH populating
app.get("/populateduser", function(req, res) {
    // TODO
    // =====
    // Write the query to grab the user docs from the User collection,
    // and make sure to include Mongooses populated method in the call.
    // We want to see all of the notes the user left in the Notes section,
    // and not just objectIds. The whole note.

    // TIP: Check the models out to see how the Notes already refer to the User.
    User.find({})
        .populate("notes")
        .exec(function(error, doc) {
            res.send((error) ? error : doc);
        });
});


// Listen on Port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});