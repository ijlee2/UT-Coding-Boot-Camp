/****************************************************************************
 ****************************************************************************

    Initialize

*****************************************************************************
*****************************************************************************/
// Import packages
const express = require("express");
const path    = require("path");

// For web scraping
const cheerio = require("cheerio");
const request = require("request");

// Create an instance of Router
const router = express.Router();

// Talk to the models
const Thread  = require(path.join(__dirname, "..", "models", "Thread.js"));
const Comment = require(path.join(__dirname, "..", "models", "Comment.js"));



/****************************************************************************
 ****************************************************************************

    Set up routes

*****************************************************************************
*****************************************************************************/
router.get("/", (req, res) => {
    // Get threads from the database
    Thread.find({}, (err, doc) => {
        if (err) throw err;

        res.render("index", {
            "customCSS"       : ["style"],
            "customJavascript": ["index"],
            "threads"         : doc
        });

    });
});


router.get("/scrape", (req, res) => {
    request("http://www.neogaf.com/forum/forumdisplay.php?f=2", (error, response, html) => {
        // Load the HTML into cheerio
        const $ = cheerio.load(html);

        // Extract information
        $(`#threadbits_forum_2 tr.threadbit`).each((index, element) => {
            const data = $(element).children("td");

            // Find thread title and url
            let   selector   = $(data[1]).children("div").children("a");
            const title      = selector.text();
            const url_thread = `http://www.neogaf.com/forum/${selector.attr("href")}`;

            // Find author
            selector     = $(data[2]).children("a");
            const author = selector.text();

            // Create a new entry
            const entry = new Thread({title, url_thread, author});

            entry.save((err, doc) => {
                if (err) throw err;

                console.log(doc);
            });
        });

        res.send("Scrape complete");
    });
});


router.get("/saved", (req, res) => {
    res.send("saved");
});


module.exports = router;