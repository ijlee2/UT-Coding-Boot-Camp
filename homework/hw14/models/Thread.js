// Import mongoose package
const mongoose = require("mongoose");

// Create the Schema class
const Schema = mongoose.Schema;

// Create the schema for Thread
const threadSchema = new Schema({
    // Link to the thread
    "threadId": {
        "type"    : Number,
        "unique"  : true,
        "required": true
    },

    // Title of the thread
    "title": {
        "type"    : String,
        "trim"    : true,
        "required": true
    },

    // Thread starter
    "author": {
        "type"    : String,
        "trim"    : true,
        "required": true
    },

    // Thread body
    "body": {
        "type"    : String,
        "trim"    : true,
        "required": true
    },

    // Thread comments (keep track of their IDs)
    "comments": {
        "type": [{"type": Schema.ObjectId, "ref": "Comment"}]
    }

});

// Export the Thread model
module.exports = mongoose.model("Thread", threadSchema);