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
router.post("/saved", (req, res) => {
    // Add date saved
    req.body.article.dateSaved = new Date();
    
    const article = new Article(req.body.article);

    article.save((err, doc) => {
        if (err) throw err;

        res.send(doc);
        
    });
});

router.delete("/saved", (req, res) => {
    /*
    Comment.remove({"_id": req.params.commentId}, (err, doc) => {
        if (err) throw err;

        res.redirect(`/showthread_${req.params.threadId}`);

    });
    */
});


module.exports = router;