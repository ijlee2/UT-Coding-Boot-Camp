/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const express = require("express");
const path    = require("path");

// Create an instance of Router
const router = express.Router();



/****************************************************************************
 ****************************************************************************
    
    Set up routes
    
*****************************************************************************
*****************************************************************************/
const directory_public = path.join(__dirname, "..", "public");

// Home page
router.get("/", (req, res) => {
    res.sendFile(path.join(directory_public, "home.html"));
});

// Survey page
router.get("/survey", (req, res) => {
    res.sendFile(path.join(directory_public, "survey.html"));
});

module.exports = router;