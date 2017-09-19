const path = require("path");

// Talk to the ORM
const orm = require(path.join(__dirname, "..", "config", "orm.js"));

const burger = {
    "getAll": function(callback) {
        orm.selectAll("burgers", results => callback(results));
    }

};

module.exports = burger;