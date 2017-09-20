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
router.get("/:id?", (req, res) => {
    function callback(results) {
        if (!req.params.id) {
            res.render("index", {
                "title"   : "Add",
                "action"  : "/",
                "id"      : undefined,
                "name"    : "",
                "burgers" : results
            });

        } else {
            const id = parseInt(req.params.id);

            res.render("index", {
                "title"   : "Edit",
                "action"  : `/${id}?_method=PATCH`,
                "id"      : id,
                "name"    : results.filter(r => r.id === id)[0].name,
                "burgers" : results
            });

        }
    }

    burger.getBurgers(callback);
});

router.post("/", (req, res) => {
    function callback(results) {
        res.redirect("/");
    }

    burger.addBurger(req.body.burger_name, false, callback);
});

router.patch("/:id", (req, res) => {
    function callback(results) {
        res.redirect("/");
    }

    burger.updateBurger(req.body.burger_name, parseInt(req.params.id), callback);
});

router.delete("/:id", (req, res) => {
    function callback(results) {
        res.redirect("/");
    }

    burger.deleteBurger(parseInt(req.params.id), callback);
});

module.exports = router;