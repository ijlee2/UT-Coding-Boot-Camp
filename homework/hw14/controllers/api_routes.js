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
router.post("/scrape", (req, res) => {

});

router.post("/add-comment", (req, res) => {

});


module.exports = router;