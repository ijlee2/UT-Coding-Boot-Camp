// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");


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


// Routes
// =============================================================
module.exports = function(app) {
    // Get all chirps
    app.get("/", (req, res) => {
        res.sendFile("index.html");
    });

    app.get("/api/all", (req, res) => {
        const sql_command =
            `SELECT author, chirp, date_format(time_created, "%M %D, %Y at %r") AS time_created
             FROM chirps ORDER BY time_created DESC`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;

            res.send(results);
        });
    });

    // Add a chirp
    app.post("/api/new", (req, res) => {
        const sql_command =
            `INSERT INTO chirps (author, chirp, time_created)
             VALUES ("${req.body.author}", "${req.body.chirp}", "${getDate()}")`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;

            res.redirect("/");
        });
    });
};