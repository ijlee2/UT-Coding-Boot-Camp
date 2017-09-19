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
    function callback(results) {
        res.render("index", {"burgers": results});
    }

    burger.getBurgers(callback);
});

router.post("/", (req, res) => {
    function callback(results) {
        res.redirect("/");
    }

    burger.addBurger(req.body.burger_name, req.body.isEaten, callback);
});

router.patch("/", (req, res) => {
    function callback(results) {
        res.redirect("/");
    }

    burger.updateBurger(req.body.burger_name, req.body.isEaten, req.body.id, callback);
});

router.delete("/", (req, res) => {
    function callback(results) {
        res.redirect("/");
    }

    burger.deleteBurger(req.body.id, callback);
});

module.exports = router;