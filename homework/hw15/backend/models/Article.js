// Import mongoose package
const mongoose = require("mongoose");

// Create the Schema class
const Schema = mongoose.Schema;

// Create the schema for Thread
const articleSchema = new Schema({
    "id": {
        "type"    : String,
        "unique"  : true,
        "required": true
    },

    "title": {
        "type"    : String,
        "required": true
    },

    "byline": {
        "type"    : String,
        "required": true
    },

    "summary": {
        "type"    : String,
        "required": true
    },

    "url": {
        "type"    : String,
        "required": true
    },

    "category": String,

    "date": {
        "type"    : Date,
        "required": true
    },

    "keywords": Array,

    "wordCount": Number,

    "dateSaved": {
        "type"    : Date,
        "required": true
    }
});

// Export the Article model
module.exports = mongoose.model("Article", articleSchema);