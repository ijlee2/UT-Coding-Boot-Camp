// Dependencies
const express    = require("express");
const bodyParser = require("body-parser");
const logger     = require("morgan");
const mongoose   = require("mongoose");

// Requiring our Note and Article models
const Note    = require("./models/Note.js");
const Article = require("./models/Article.js");

// Our scraping tools
const request = require("request");
const cheerio = require("cheerio");

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
// A GET request to scrape the echojs website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    request("http://www.echojs.com/", function(error, response, html) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(html);
        // Now, we grab every h2 within an article tag, and do the following:
        $("article h2").each(function(i, element) {
            // Add the text and href of a link
            const result = {
                "title": $(this).children("a").text(),
                "link" : $(this).children("a").attr("href")
            };

            // Using our Article model, create a new entry
            // This effectively passes the result object to the entry (and the title and link)
            const entry = new Article(result);

            // Now, save that entry to the db
            entry.save(function(err, doc) {
                if (err) throw err;

                console.log(doc);
            });
        });
    });

    // Tell the browser that we finished scraping the text
    res.send("Scrape complete");
});

// This will get the articles we scraped from the mongoDB
app.get("/articles", function(req, res) {
    Article.find({}, function(err, doc) {
        if (err) throw err;

        res.json(doc);
    });
});

// This will grab an article by it's ObjectId
app.get("/articles/:id", function(req, res) {
    // TODO
    // ====
    // Finish the route so it finds one article using the req.params.id,
    // and run the populate method with "note", then responds with the
    // article with the note included
    Article.findOne({"_id": req.params.id})
        .populate("notes")
        .exec(function(err, doc) {
            if (err) throw err;

            res.json(doc);
        });
});

// Create a new note or replace an existing note
app.post("/articles/:id", function(req, res) {
    // TODO
    // ====
    // save the new note that gets posted to the Notes collection
    // then find an article from the req.params.id and update its
    // "note" property with the _id of the new note
    const newNote = new Note(req.body);

    newNote.save(function(err, doc) {
        if (err) throw err;

        /*
        Article.findOneAndUpdate({"_id": req.params.id}, {
            "note": doc._id

        }).exec(function (err1, doc1) {
            if (err1) throw err1;

            res.json(doc1);
        });
        */

        Article.findOneAndUpdate({
            "_id": req.params.id

        }, {
            "$push": {"notes": doc._id}

        }, {
            "new": true

        }, function(err_new, doc_new) {
            if (err_new) throw err_new;

            res.send(err_new);

        });

    });
});


// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});