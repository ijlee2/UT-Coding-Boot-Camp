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
    "user"    : "root",
    "password": "",
    "database": "task_saver_db"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

// Root get route
app.get("/", function(req, res) {
    connection.query("SELECT * FROM tasks;", function(err, data) {
        if (err) throw err;

        // Test it
        // console.log('The solution is: ', data);

        // Test it
        // res.send(data);

        res.render("index", { tasks: data });
    });
});

// Post route -> back to home
app.post("/", function(req, res) {
    // Test it
    // console.log('You sent, ' + req.body.task);

    // Test it
    // res.send('You sent, ' + req.body.task);

    connection.query("INSERT INTO tasks (task) VALUES (?)", [req.body.task], function(err, result) {
        if (err) throw err;

        res.redirect("/");
    });
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));