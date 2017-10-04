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
    Thread.find({})
        .sort({"title": 1})
        .exec((err, threads) => {
            if (err) throw err;

            res.render("index", {
                "customCSS"       : ["style"],
                "customJavascript": ["index"],
                threads
            });
        });
});


router.get("/scrape", (req, res) => {
    request("http://www.neogaf.com/forum/forumdisplay.php?f=2", (error, response, html) => {
        if (error) throw error;

        // Load the HTML into cheerio
        const $ = cheerio.load(html);

        // Extract information
        $(`#threadbits_forum_2 tr.threadbit`).each((index, element) => {
            const data = $(element).children("td");

            // Find thread title and url
            let   selector = $(data[1]).children("div").children("a");
            const threadId = selector.attr("href").match(/\d+$/)[0];
            const title    = selector.text();
            
            // Find author
            selector     = $(data[2]).children("a");
            const author = selector.text();

            // Create a new entry
            const entry = new Thread({threadId, title, author});
            
            // Save the entry if it doesn't exist
            Thread.update({threadId}, {
                "$setOnInsert": entry

            }, {
                "upsert": true

            }, (err, doc) => {
                if (err) throw err;

            });
        });

        res.redirect("/");
    });
});


router.get("/showthread_:id", (req, res) => {
    Thread.find({"threadId": req.params.id}, (err, doc) => {
        if (err) throw err;
        
        // Retrieve the main post
        request(`http://www.neogaf.com/forum/showthread.php?t=${req.params.id}`, (error, response, html) => {
            if (error) throw error;

            // Load the HTML into cheerio
            const $ = cheerio.load(html);

            // Find thread body
            const selector = $(".post")[0];
            const body     = $(selector).html().trim();

            res.render("thread", {
                "customCSS"       : ["style"],
                "customJavascript": ["index"],
                "thread"          : doc[0],
                body
            });
        });
    });
});


router.get("/saved", (req, res) => {
    res.send("saved");
});


module.exports = router;