/****************************************************************************
 ****************************************************************************

    Initialize

*****************************************************************************
*****************************************************************************/
// Import packages
const express = require("express");
const path    = require("path");

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

            // Scrape if there aren't any threads yet
            if (threads.length === 0) {
                res.redirect("/api/scrape");

            } else {
                res.render("index", {threads});
                
            }
        });
});

router.get("/showthread_:threadId", (req, res) => {
    Thread.find({"threadId": req.params.threadId})
        .populate("comments")
        .exec((err, doc) => {
            if (err) throw err;

            res.render("thread", {"thread": doc[0]});
        });
});

router.get("/about", (req, res) => {
    res.render("about", {});
});


module.exports = router;