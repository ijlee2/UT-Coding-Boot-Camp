// *********************************************************************************
// orm.js - This file offers a set of easier-to-use methods for interacting with the MySQL db.
// *********************************************************************************

// Dependencies
// =============================================================
const connection = require("./connection.js");

// ORM
// =============================================================
const tableName = "todos";

const orm = {
    // Here our ORM is creating a simple method for performing a query of the entire table.
    // We make use of the callback to ensure that data is returned only once the query is done.
    getTodos: function(callback) {
        const s = "SELECT * FROM " + tableName;

        connection.query(s, function(error, result) {
            if (error) throw error;

            callback(result);

        });
    },

    addTodo: function(todo, callback) {
        const s = "INSERT INTO " + tableName + " (text, complete) VALUES (?,?)";
        
        todo.complete = (todo.complete === "true") ? 1 : 0;
        
        connection.query(s, [todo.text, todo.complete], function(error, result) {
            if (error) throw error;

            callback(result);

        });
    },

    editTodo: function(todo, callback) {
        const s = "UPDATE " + tableName + " SET text=? WHERE id=?";

        connection.query(s, [todo.text, todo.id], function(error, result) {
            if (error) throw error;

            callback(result);

        });
    },

    // Here our ORM is creating a simple method for performing a query of a single character in the table.
    // Again, we make use of the callback to grab a specific character from the database.
    deleteTodo: function(id, callback) {
        const s = "DELETE FROM " + tableName + " WHERE id=?";

        connection.query(s, [id], function(error, result) {
            if (error) throw error;
            
            callback(result);

        });
    }
};

module.exports = orm;