const express = require("express");
const path    = require("path");

//const burger = require(path.join(__dirname, "..", "models", "burger.js"));

// Create a router
module.exports = function createRouter(app) {
    app.route("/").get((req, res) => {
        res.sendFile(path.join(__dirname, "..", "public", "test.html"));
    });

    app.route("/burgers")
        .get((req, res) => {
            res.render("index", {
                "burgers_uneaten": ["Burger 1", "Burger 2", "Burger 3", "Burger 4"],
                "burgers_eaten"  : ["Burger A", "Burger B", "Burger C"]
            });
        })

        .post((req, res) => {
            console.log("Post");
        })

        .put((req, res) => {
            console.log("Put");
        })

        .delete((req, res) => {
            console.log("Delete");
        });
}