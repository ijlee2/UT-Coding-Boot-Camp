use classroom_db;

db.students.find().pretty();

// Add a new hobby
db.students.update({"name": "Isaac"}, {
    "$addToSet": {
        "hobbies": "extreme basket weaving"
    }
});

// Update a student's os
db.students.update({"name": "David"}, {
    "$set": {
        "os": "Linux"
    }
});

// Remove a student from the classroom
db.students.remove({"name": "Jason"});

// Add a new field to every document
db.students.updateMany({}, {
    "$set": {
        "gaveCandy": false
    }
});

db.students.update({"name": "Isaac"}, {
    "$set": {
        "gaveCandy": true
    }
});