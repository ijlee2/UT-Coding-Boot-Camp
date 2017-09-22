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
const paths = {
    "/"          : "home.html",
    "/survey"    : "survey.html",
    "/importance": "importance.html"
};

for (let key of paths) {
    router.get(key, (req, res) => {
        res.sendFile(path.join(directory_public, paths[key]));
    });
}

module.exports = router;