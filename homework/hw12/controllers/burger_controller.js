const express = require("express");
const path    = require("path");

// Create an instance of Router
const router = express.Router();

// Talk to the model
const burger = require(path.join(__dirname, "..", "models", "burger.js"));



/****************************************************************************
 ****************************************************************************
    
    Set up routes
    
*****************************************************************************
*****************************************************************************/
router.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "test.html"));
});

router.get("/", (req, res) => {
    const callback = function(burgers) {
        console.log(burgers);

//        res.render("index", burgers);
    }

    burger.getAll(callback);
});

router.post("/", (req, res) => {
    console.log("Post");
});

router.patch("/", (req, res) => {
    console.log("Patch");
});

router.delete("/", (req, res) => {
    console.log("Delete");
});

module.exports = router;