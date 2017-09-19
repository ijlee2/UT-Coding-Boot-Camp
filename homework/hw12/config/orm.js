const mysql = require("mysql");
const path  = require("path");

const connection = require(path.join(__dirname, "connection.js"));

// Convert JS Date to MySQL Timestamp
// Source: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
function getTimestamp() {
    // Get current time
    let time = new Date();

    // Convert to local time
    time -= time.getTimezoneOffset() * 60000;

    // Change the format to Timestamp
    return new Date(time).toISOString().slice(0, 19).replace("T", " ");
}

exports.selectAll = function() {
    const sql_command = "SELECT * FROM burgers;";
    
    connection.query(sql_command, (error, results) => {
        if (error) throw error;

        return results;
    });

    /*
    return [
    {
        "name": "burger 1",
        "devoured": true
    },
    {
        "name": "burger 2",
        "devoured": false
    },
    {
        "name": "burger 3",
        "devoured": true
    }
    ];
    */
}

exports.insertOne = function(burger) {
    const sql_command =
        `INSERT INTO burgers (name, devoured, date)
         VALUES ("${burger.name}", false, "${getTimestamp()}");`;

    connection.query(sql_command, (error, results) => {
        if (error) throw error;
    });
}

exports.updateOne = function(id, burger) {
    const sql_command =
        `UPDATE burgers
         SET name = "${burger.name}", devoured = ${burger.devoured}, date = "${getTimestamp()}"
         WHERE id = ${id};`;

    connection.query(sql_command, (error, results) => {
        if (error) throw error;
    });
}