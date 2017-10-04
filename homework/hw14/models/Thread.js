// Import mongoose package
const mongoose = require("mongoose");

// Create the Schema class
const Schema = mongoose.Schema;

// Create the schema for Thread
const threadSchema = new Schema({
    // Title of the thread
    "title": {
        "type"    : String,
        "trim"    : true,
        "required": true
    },

    // Link to the thread
    "url_thread": {
        "type"    : String,
        "unique"  : true,
        "required": true
    },

    // Thread starter
    "author": {
        "type"    : String,
        "trim"    : true,
        "required": true
    },

    // Thread comments
    "comments": {
        "type": [{"type": Schema.ObjectId, "ref": "Comment"}]
    }

});

// Export the Thread model
module.exports = mongoose.model("Thread", threadSchema);