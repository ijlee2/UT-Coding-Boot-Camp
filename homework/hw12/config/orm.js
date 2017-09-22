// Import packages
const mysql = require("mysql");
const path  = require("path");

// Talk to the database
const pool = require(path.join(__dirname, "connection.js"));

// Add double quotation marks around strings for SQL queries
function addQuotes(x) {
    return (typeof x === "string") ? `"${x}"` : `${x}`;
}

function querySQL(sql_command, callback) {
    pool.query(sql_command, (error, results) => {
        if (error) throw error;

        callback(results);
    });
}

const orm = {
    // Select all rows in a table
    "selectAll": function(table_name, callback) {
        querySQL(`SELECT * FROM ${table_name};`, callback);
    },

    // Insert a row into a table
    "insertOne": function(table_name, object, callback) {
        const keys = [], values = [];

        // Use a for loop to pair keys and values correctly (Object.values is not fully implemented yet)
        for (let key in object) {
            keys.push(key);
            values.push(addQuotes(object[key]));
        }
        
        querySQL(`INSERT INTO ${table_name} (${keys.join(", ")}) VALUES (${values.join(", ")});`, callback);
    },

    // Update a row in a table
    "updateOne": function(table_name, id_object, object, callback) {
        const key_values = [];

        for (let key in object) {
            key_values.push(`${key} = ${addQuotes(object[key])}`);
        }

        querySQL(`UPDATE ${table_name} SET ${key_values.join(", ")} WHERE ${id_object.name} = ${id_object.value};`, callback);
    },

    // Delete a row from a table
    "deleteOne": function(table_name, id_object, callback) {
        querySQL(`DELETE FROM ${table_name} WHERE ${id_object.name} = ${id_object.value};`, callback);
    }
}

module.exports = orm;