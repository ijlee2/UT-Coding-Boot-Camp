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
const Article = require(path.join(__dirname, "..", "models", "Article.js"));



/****************************************************************************
 ****************************************************************************

    Set up routes

*****************************************************************************
*****************************************************************************/
router.get("/saved", (req, res) => {
    // Find saved articles
    Article.find({}, (err, doc) => {
        if (err) throw err;

        res.send(doc);
        
    });
});

router.post("/saved", (req, res) => {
    Article.findOne({"id": req.body.article.id}, (err, doc) => {
        if (err) throw err;

        // Save the article to database if it does not exist yet
        if (!doc) {
            // Add a timestamp
            req.body.article.dateSaved = new Date();
            
            const article = new Article(req.body.article);

            article.save((err1, doc1) => {
                if (err1) throw err1;

                res.send(doc1);
                
            });

        } else {
            res.status(409).send("You already saved this article.");

        }

    });
});

router.delete("/saved", (req, res) => {
    Article.remove({"id": req.body.id}, (err, doc) => {
        if (err) throw err;

        res.send(doc);

    });
});


module.exports = router;