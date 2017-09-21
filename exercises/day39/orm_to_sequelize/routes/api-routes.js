// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// grab the orm from the config
// (remember: connection.js -> orm.js -> route file)
/*
var orm = require("../config/orm.js");
*/

// Grab our models
var Todo = require("../models").Todo;

// Routes
// =============================================================
module.exports = function(app) {
    // GET route for getting all of the todos
    app.get("/api/todos", function(req, res) {
/*
        orm.getTodos(function(results) {
            res.json(results);
        });
*/
        Todo.findAll({}).then(results => {
            res.json(results);
        });
    });

    // POST route for saving a new todo. We can create a todo using the data on req.body
    app.post("/api/todos", function(req, res) {
/*
        orm.addTodo(req.body, function(results) {
            res.json(results);
        });
*/
        Todo.create({
            "text"    : req.body.text,
            "complete": (req.body.complete === "true") ? 1 : 0

        }).then(results => {
            res.end();

        });
    });

    // DELETE route for deleting todos. We can access the ID of the todo to delete in
    // req.params.id
    app.delete("/api/todos/:id", function(req, res) {
/*
        orm.deleteTodo(req.params.id, function(results) {
            res.json(results);
        });
*/
        Todo.destroy({
            "where": {"id": req.body.id}

        }).then(results => {
            res.end();

        })
    });

    // PUT route for updating todos. We can access the updated todo in req.body
    app.put("/api/todos", function(req, res) {
/*
        orm.editTodo(req.body, function(results) {
            res.json(results);
        });
*/
        Todo.update({
            "text"    : req.body.text,
            "complete": (req.body.complete === "true") ? 1 : 0

        }, {
            "id": req.body.id

        }).then(results => {
            res.end();

        });
    });
};