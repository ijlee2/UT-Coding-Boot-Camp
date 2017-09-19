const express        = require("express");
const exphbs         = require("express-handlebars");
const bodyParser     = require("body-parser");
const methodOverride = require("method-override");
const mysql          = require("mysql");

const app  = express();
const PORT = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(methodOverride("_method"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({"extended": false}));

app.engine("handlebars", exphbs({"defaultLayout": "main"}));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
    "host"    : "localhost",
    "user"    : "root",
    "password": "",
    "database": "day_planner_db"
});

connection.connect(function(error) {
    if (error) {
        console.error("error connecting: " + error.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
    connection.query("SELECT * FROM plans;", function(error, data) {
        if (error) {
            throw error;
        }

        res.render("index", {"plans": data});
    });
});

app.post("/", function(req, res) {
    connection.query("INSERT INTO plans (plan) VALUES (?)", [req.body.plan], function(error, result) {
        if (error) {
            throw error;
        }

        res.redirect("/");
    });
});

app.put("/", function(req, res) {
    connection.query("UPDATE plans SET plan = ? WHERE id = ?", [req.body.plan, req.body.id], function(error, result) {
        if (error) {
            throw error;
        }

        res.redirect("/");
    });
});

app.delete("/:id", function(req, res) {
    connection.query("DELETE FROM plans WHERE id = ?", [req.params.id], function(error, result) {
        if (error) {
            throw error;
        }

        res.redirect("/");
    });
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));