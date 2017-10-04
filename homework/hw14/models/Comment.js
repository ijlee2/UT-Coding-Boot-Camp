// Import mongoose package
const mongoose = require("mongoose");

// Create the Schema class
const Schema = mongoose.Schema;

// Create the schema for Comment
const commentSchema = new Schema({
    "author": {
        "type"    : String,
        "trim"    : true,
        "required": true
    },

    "body": {
        "type"    : String,
        "trim"    : true,
        "required": true
    }

});

// Export the Comment model
module.exports = mongoose.model("Comment", commentSchema);