// Dependency
const mongoose = require("mongoose");

// Create the Schema class
const Schema = mongoose.Schema;

// Instantiate a userSchema object with the Schema class we just made
const UserSchema = new Schema({
    /* TODO:
     * Add four entries into our schema. These should be:
     * 1: username. A string that will be be required, and also trimmed.
     * 2: password. A string that will be required, trimmed, and at least 6 characters.
     * 3: email. A string that must be a valid email address and unique in our collection.
     * 4: userCreated. A date that will default to the current date.

     *
     * TIP: The regex for checking if a string is an email is: /.+\@.+\..+/
     * Use that with the model attribute that checks for a valid match.
     * -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ */
    "username": {
        "type"    : String,
        "trim"    : true,
        "required": true
    },

    "password": {
        "type"    : String,
        "trim"    : true,
        "required": true,
        "validate": [
            function(input) { return input.length >= 6; }, "password must have at least 6 characters"
        ]
    },

    "email": {
        "type"  : String,
        "unique": true,
        "match" : [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },

    "userCreated": {
        "type"   : Date,
        "default": Date.now
    }
});

// Create the "User" model with our UserSchema schema
const User = mongoose.model("User", UserSchema);

// Export the User model, so it can be used in server.js with a require
module.exports = User;