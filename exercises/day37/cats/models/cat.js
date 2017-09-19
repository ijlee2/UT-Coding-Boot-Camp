// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const cat = {
    "all": function(cb) {
        orm.all("cats", cb);
    },

    // The variables cols and vals are arrays.
    "create": function(cols, vals, cb) {
        orm.create("cats", cols, vals, cb);
    },

    "update": function(objColVals, condition, cb) {
        orm.update("cats", objColVals, condition, cb);
    },

    "delete": function(id, cb) {
        orm.delete("cats", id, cb);
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = cat;