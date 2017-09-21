// Import packages
const path = require("path");

// Talk to the model
const Burger = require(path.join(__dirname, "..", "models")).Burger;

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
module.exports = function(app) {
    app.get("/:id?", (req, res) => {
        function callback(results) {
            // Display a form for adding a burger
            if (!req.params.id) {
                res.render("index", {
                    "title"  : "Add",
                    "action" : "/",
                    "id"     : undefined,
                    "name"   : "",
                    "burgers": results
                });

            // Display a form for editing for burger
            } else {
                const id     = parseInt(req.params.id);
                const burger = results.filter(r => r.id === id)[0];

                res.render("index", {
                    "title"  : "Edit",
                    "action" : `/${id}/${(burger.devoured) ? "1" : "0"}?_method=PATCH`,
                    "id"     : id,
                    "name"   : burger.name,
                    "burgers": results
                });

            }
        }

        Burger.findAll({}).then(callback);
    });    

    app.post("/", (req, res) => {
        function callback(results) {
            res.redirect("/");
        }

        Burger.create({
            "name"    : req.body.name,
            "devoured": false,
            "date"    : getDate()

        }).then(callback);
    });

    app.patch("/:id/:devoured", (req, res) => {
        function callback(results) {
            res.redirect("/");
        }

        Burger.update({
            "name"    : req.body.name,
            "devoured": (req.params.devoured === "1"),
            "date"    : getDate()

        }, {
            "where": {"id": req.params.id}

        }).then(callback);
    });

    app.delete("/:id", (req, res) => {
        function callback(results) {
            res.redirect("/");
        }

        Burger.destroy({
            "where": {"id": req.params.id}

        }).then(callback);
    });
}