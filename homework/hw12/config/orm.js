const path = require("path");

const connection = require(path.join(__dirname, "connection.js"));

const orm = {
    function getTimestamp() {
        // Convert JS Date to MySQL Timestamp
        // Source: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
        let time = new Date();

        // Convert to local time
        time -= time.getTimezoneOffset() * 60 * 1000;

        // Change the format to Timestamp
        return new Date(time).toISOString().slice(0, 19).replace("T", " ");
    }

    this.selectAll = function() {
        const sql_command = "SELECT * FROM burgers;";

        connection.query(sql_command, (error, results) => {
            if (error) throw error;

            return results;
        });
    }

    this.insertOne = function(burger) {
        const sql_command =
            `INSERT INTO burgers (name, devoured, date)
             VALUES ("${burger.name}", false, "${getTimestamp()}");`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;
        });
    }

    this.updateOne = function(id, burger) {
        const sql_command =
            `UPDATE burgers
             SET name = "${burger.name}", devoured = ${burger.devoured}, date = "${getTimestamp()}"
             WHERE id = ${id};`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;
        });
    }
}

module.exports = orm;