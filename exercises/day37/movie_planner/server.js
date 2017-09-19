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
    "database": "movie_planner_db"
});

connection.connect(error => {
    if (error) {
        return console.error("error connecting: " + error.stack);
    }

    console.log("connected as id " + connection.threadId);
});

app.get("/", (req, res) => {
    connection.query("SELECT * FROM movies;", (error, results) => {
        if (error) throw error;

        res.render("index", {"movies": results});
    });
});

app.post("/", (req, res) => {
    connection.query(`INSERT INTO movies (title) VALUES ("${req.body.title}")`, (error, results) => {
        if (error) throw error;

        res.redirect("/");
    });
});

app.put("/", (req, res) => {
    connection.query(`UPDATE movies SET title = "${req.body.title}" WHERE id = ${req.body.id}`, (error, results) => {
        if (error) throw error;

        res.redirect("/");
    });
});

app.delete("/:id", (req, res) => {
    connection.query(`DELETE FROM movies WHERE id = ${req.params.id}`, (error, results) => {
        if (error) throw error;

        res.redirect("/");
    });
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));