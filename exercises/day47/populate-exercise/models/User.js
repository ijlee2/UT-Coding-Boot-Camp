// Require mongoose
const mongoose = require("mongoose");

// Create a Schema class with mongoose
const Schema = mongoose.Schema;

// Create a UserSchema with the Schema class
const UserSchema = new Schema({
    // name: a unique String
    "name": {
        "type": String,
        "unique": true
    },
    // notes property for the user
    "notes": [{
        // Store ObjectIds in the array
        "type": Schema.Types.ObjectId,
        // The ObjectIds will refer to the ids in the Note model
        "ref": "Note"
    }]
});

// Create the User model with the UserSchema
const User = mongoose.model("User", UserSchema);

// Export the user model
module.exports = User;