// Require mongoose
const mongoose = require("mongoose");

// Create a Schema class with mongoose
const Schema = mongoose.Schema;

// Create a NoteSchema with the Schema class
const NoteSchema = new Schema({
    // title: a string
    "title": {
        "type": String
    },
    // body: a string
    "body": {
        "type": String
    }
});

// Make a Note model with the NoteSchema
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;