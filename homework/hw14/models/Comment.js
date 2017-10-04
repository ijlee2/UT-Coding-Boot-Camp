// Import mongoose package
const mongoose = require("mongoose");

// Create the Schema class
const Schema = mongoose.Schema;

// Create the schema for Comment
const commentSchema = new Schema({
    // Commenter
    "author": {
        "type"    : String,
        "trim"    : true,
        "required": true
    },

    // Profile photo of commenter
    "url_author_photo": {
        "type": String
    },

    // Comment
    "body": {
        "type"    : String,
        "trim"    : true,
        "required": true
    }

});

// Export the Comment model
module.exports = mongoose.model("Comment", commentSchema);