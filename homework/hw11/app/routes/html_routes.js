/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const express = require("express");
const path    = require("path");

// Create an instance of router
const router = express.Router();

// Set public directory
const directory_public = path.join(__dirname, "..", "public");



/****************************************************************************
 ****************************************************************************
    
    Set up routes
    
*****************************************************************************
*****************************************************************************/
// Home page
router.get("/", (req, res) => {
    res.sendFile(path.join(directory_public, "home.html"));
});

// Survey page
router.get("/survey", (req, res) => {
    res.sendFile(path.join(directory_public, "survey.html"));
});

// Export the router
module.exports = router;