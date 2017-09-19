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

exports.selectAll = function(table_name) {
    const sql_command = "SELECT * FROM ${table_name}";
    
    connection.query(sql_command, (error, results) => {
        if (error) throw error;

        return results;
    });
}

exports.insertOne = function(table_name, object) {
    let keys = "", values = "";

    for (let key in object) {

    }

    const sql_command =
        `INSERT INTO ${table_name} (${keys}) VALUES (${values});`;

    connection.query(sql_command, (error, results) => {
        if (error) throw error;
    });
}

exports.updateOne = function(table_name, object, id) {
    const sql_command =
        `UPDATE ${table_name}
         SET name = "${burger.name}", devoured = ${burger.devoured}, date = "${getTimestamp()}"
         WHERE id = ${id};`;

    connection.query(sql_command, (error, results) => {
        if (error) throw error;
    });
}