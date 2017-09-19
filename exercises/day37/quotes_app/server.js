const express        = require("express");
const exphbs         = require("express-handlebars");
const bodyParser     = require("body-parser");
const methodOverride = require("method-override");
const mysql          = require("mysql");

const app  = express();
const PORT = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({"extended": false}));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({"defaultLayout": "main"}));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
    "host"    : "localhost",
    "user"    : "root",
    "password": "",
    "database": "quotes_db"
});

connection.connect(error => {
    if (error) {
        return console.error("error connecting: " + error.stack);
    }

    console.log("connected as id " + connection.threadId);
});

// Express and MySQL code should go here.
app.get("/", (req, res) => {
    const sql_command = "SELECT * FROM quotes;";

    connection.query(sql_command, (error, results) => {
        if (error) throw error;

        res.render("index", {"quotes": results});
    });
});

app.get("/:id", (req, res) => {
    const sql_command = `SELECT * FROM quotes WHERE id = ${req.params.id};`;

    connection.query(sql_command, (error, results) => {
        if (error) throw error;

        res.render("single_quote", results[0]);
    });
});

app.post("/", (req, res) => {
    const sql_command =
        `INSERT INTO quotes (author, quote)
         VALUES ("${req.body.author}", "${req.body.quote}");`;

    connection.query(sql_command, (error, results) => {
        if (error) throw error;

        res.redirect("/");
    });
});

app.patch("/:id", (req, res) => {
    const sql_command =
        `UPDATE quotes
         SET author = "${req.body.author}", quote = "${req.body.quote}"
         WHERE id = ${req.params.id};`;

    connection.query(sql_command, (error, results) => {
        if (error) throw error;

        res.redirect("/");
    });
});

app.delete("/:id", (req, res) => {
    const sql_command = `DELETE FROM quotes WHERE id = ${req.params.id}`;

    connection.query(sql_command, (error, results) => {
        if (error) throw error;

        res.redirect("/");
    });
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));