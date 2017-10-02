// Display our databases
show dbs;

use lessondb;

// Display which database we are looking at
db;

// Display our collections
show collections;

db.iWantToGoThere.find().pretty();

// Update all documents whose country is Morocco
db.iWantToGoThere.update({"country": "Morocco"}, {
    "$set": {
        "continent": "Australia"
    }

}, {"multi": true});

// Create a new field in an existing document
db.iWantToGoThere.update({"country": "Morocco"}, {
    "$set": {
        "capital": "Rabat"
    }

}, {"multi": true});

// Create a new city in Morocco (can also use $push, which always inserts an item in an array)
// https://docs.mongodb.com/manual/reference/operator/update/
db.iWantToGoThere.update({"country": "Morocco"}, {
    "$addToSet": {
        "majorCities": "Rabat"
    }

}, {"multi": true});

// Delete documents that match a criterion
db.iWantToGoThere.remove({"country": "Morocco"}, {"multi": true});

// Delete all documents
db.iWantToGoThere.remove({});

// Delete the collection
db.iWantToGoThere.drop();

// Delete the database
db.dropDatabase();