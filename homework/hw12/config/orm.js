const mysql = require("mysql");
const path  = require("path");

const connection = require(path.join(__dirname, "connection.js"));

function addQuotes(x) {
    return (typeof x === "string") ? `"${x}"` : `${x}`;
}

const orm = {
    "selectAll": function(table_name, callback) {
        const sql_command = `SELECT * FROM ${table_name}`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;

            callback(results);
        });
    },

    "insertOne": function(table_name, object, callback) {
        const keys = [], values = [];

        // Use a for loop to ensure that the key-value pairs appear correctly
        // (Object.values is not fully implemented yet)
        for (let key in object) {
            keys.push(key);
            values.push(addQuotes(object[key]));
        }

        const sql_command = `INSERT INTO ${table_name} (${keys.join(", ")}) VALUES (${values.join(", ")});`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;

            callback(results);
        });
    }

    "updateOne": function(table_name, object, id_object, callback) {
        const key_values = [];

        for (let key in object) {
            key_values.push(`${key} = ${addQuotes(object[key])}`);
        }

        const sql_command = `UPDATE ${table_name} SET ${key_values.join(", ")} WHERE ${id_object.name} = ${id_object.value};`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;

            callback(results);
        });
    }
}

module.exports = orm;