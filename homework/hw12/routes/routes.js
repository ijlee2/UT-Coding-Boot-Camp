const express = require("express");
const path    = require("path");

//const burger = require(path.join(__dirname, "..", "models", "burger.js"));

// Create a router
module.exports = function createRouter(app) {
    app.route("/")
        .get((req, res) => {
            console.log("Get");
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