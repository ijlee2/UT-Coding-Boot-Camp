// Import packages
const path = require("path");

// Talk to the ORM
const orm = require(path.join(__dirname, "..", "config", "orm.js"));

// Convert JS Date to MySQL Timestamp
// Source: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
function getDate() {
    // Get current time
    let time = new Date();

    // Convert to local time
    time -= time.getTimezoneOffset() * 60000;

    // Change the format to Timestamp
    return new Date(time).toISOString().slice(0, 19).replace("T", " ");
}

const burger = {
    "getBurgers": function(callback) {
        orm.selectAll("burgers", callback);
    },

    "addBurger": function(name, devoured, callback) {
        const object = {
            name,
            devoured,
            "date": getDate()
        }

        orm.insertOne("burgers", object, callback);
    },

    "updateBurger": function(id, name, devoured, callback) {
        const id_object = {
            "name" : "id",
            "value": id
        };

        const object = {
            name,
            devoured,
            "date": getDate()
        }
        
        orm.updateOne("burgers", id_object, object, callback);
    },

    "deleteBurger": function(id, callback) {
        const id_object = {
            "name" : "id",
            "value": id
        };
        
        orm.deleteOne("burgers", id_object, callback);
    }
};

module.exports = burger;