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

    // First photo in the thread (if exists)
    "url_thread_photo": {
        "type": String
    },

    // Thread starter
    "author": {
        "type"    : String,
        "trim"    : true,
        "required": true
    },

    // Profile photo of thread starter
    "url_author_photo": {
        "type": String
    },

    // Thread comments
    "comments": {
        "type": [{"type": Schema.ObjectId, "ref": "Comment"}]
    }

});

// Export the Thread model
module.exports = mongoose.model("Thread", threadSchema);