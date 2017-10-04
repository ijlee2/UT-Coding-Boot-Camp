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

const url_forum  = "http://www.neogaf.com/forum/forumdisplay.php?f=2";
const url_thread = "http://www.neogaf.com/forum/showthread.php?t=";



/****************************************************************************
 ****************************************************************************

    Set up routes

*****************************************************************************
*****************************************************************************/
router.get("/scrape", (req, res) => {
    // Extract information from the forum
    request(url_forum, (err0, res0, html) => {
        if (err0) throw err0;

        // Load the HTML into cheerio
        const $ = cheerio.load(html);

        // Scrape all threads on the first page
        $(`tr.threadbit`).each((index, element) => {
            const data = $(element).children("td");

            // Get the thread ID and title
            let   selector = $(data[1]).children("div").children("a");
            const threadId = selector.attr("href").match(/\d+$/)[0];
            const title    = selector.text();
            
            // Get the thread starter (author)
            selector     = $(data[2]).children("a");
            const author = selector.text();

            // Save the thread to database if it doesn't exist
            Thread.update({threadId}, {
                "$setOnInsert": new Thread({threadId, title, author, "body": ""})

            }, {
                "upsert": true

            }, (err1, res1) => {
                if (err1) throw err1;

                // Extract information from the thread
                request(url_thread + threadId, (err2, res2, html) => {
                    if (err2) throw err2;

                    const $$ = cheerio.load(html);

                    // Get the thread body
                    const body = $($$(".post")[0]).html().trim();

                    // Insert body
                    Thread.update({threadId}, {
                        "$set": {body}

                    }, (err3, res3) => {
                        if (err3) throw err3;

                    });
                });
            });
        });

        res.redirect("/");
    });
});

router.post("/add-comment_:threadId", (req, res) => {
    const comment = new Comment(req.body);

    comment.save((err, doc) => {
        if (err) throw err;

        Thread.findOneAndUpdate({"threadId": req.params.threadId}, {
            // Save the comment id
            "$push": {"comments": doc._id}

        }, {
            // Return the modified document
            "new": true

        }, (err1, doc1) => {
            if (err1) throw err1;

            res.redirect(`/showthread_${req.params.threadId}`);

        });
    });
});

router.delete("/delete-comment_:threadId&:commentId", (req, res) => {
    Comment.remove({"_id": req.params.commentId}, (err, doc) => {
        if (err) throw err;

        res.redirect(`/showthread_${req.params.threadId}`);

    });
});


module.exports = router;