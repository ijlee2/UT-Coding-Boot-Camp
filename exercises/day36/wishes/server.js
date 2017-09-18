const express    = require("express");
const exphbs     = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql      = require("mysql");

const app  = express();
const PORT = process.env.PORT || 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({"extended": false}));

app.engine("handlebars", exphbs({"defaultLayout": "main"}));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
    "host"    : "localhost",
    "port"    : 3306,
    "user"    : "root",
    "password": "",
    "database": "wishes_db"
});

connection.connect(function(error) {
    if (error) {
        return console.error(`error connecting: ${error.stack}`);
    }

    console.log(`Connected as id ${connection.threadId}`);
});

// Root get route
app.get("/", function(req, res) {
    connection.query("SELECT * FROM wishes;", function(error, results) {
        if (error) throw error;

        res.render("index", {"wishes": results});
    });
});

// Post route -> back to home
app.post("/", function(req, res) {
    connection.query(`INSERT INTO wishes (wish) VALUES ("${req.body.wish}")`, (error, result) => {
        if (error) throw error;

        res.redirect("/");
    });
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));