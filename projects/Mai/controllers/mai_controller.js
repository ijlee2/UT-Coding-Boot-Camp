// Import packages
const express = require("express");
const vision  = require("node-cloud-vision-api-comoc");
const path    = require("path");

// Authenticate to Google Cloud
vision.init({"auth": "AIzaSyDac5vMeEApkYZaE09R4bFhAWxjJtwyQoU"});

// Create an instance of Router
const router = express.Router();

// Talk to the model
//const Burger = require(path.join(__dirname, "..", "models")).Burger;

// Convert JS Date to MySQL Timestamp
// Source: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
function getDate() {
    // Get current time
    let time = new Date();

    // Convert to local time
    time -= time.getTimezoneOffset() * 60000;

    // Change the format to Timestamp
    return new Date(time).toISOString().slice(0, 19).replace("T", " ");
}



/****************************************************************************
 ****************************************************************************
    
    Set up routes
    
*****************************************************************************
*****************************************************************************/
router.get("/", (req, res) => {
    res.sendFile("index.html");
});

router.get("/vision", (req, res) => {
    // Source: https://github.com/comoc/node-cloud-vision-api
    const request = new vision.Request({
        "image": new vision.Image({
            "url": "http://www.ox.ac.uk/sites/files/oxford/styles/ow_medium_feature/public/field/field_image_main/friends_main.jpg?itok=Wmh9VQWO"
        }),

        "features": [
            new vision.Feature("FACE_DETECTION", 1)
        ]
    });

    vision.annotate(request).then(results => {
        res.send(results.responses);

    }, error => {
        console.log("error: " + error);

    });
});

module.exports = router;