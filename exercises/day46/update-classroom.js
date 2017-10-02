use classroom_db;

db.students.find().pretty();

db.students.update({"name": "Isaac"}, {
    "$addToSet": {
        "hobbies": "extreme basket weaving"
    }
});

db.students.update({"name": "David"}, {
    "$set": {
        "os": "Linux"
    }
});

db.students.remove({"name": "Jason"});

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