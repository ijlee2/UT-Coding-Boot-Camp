use classroom_db;

// Create students
db.students.insert([
    {
        "name"     : "Isaac",
        "rownumber": 5,
        "os"       : "Win",
        "hobbies"  : ["coding", "bouldering", "drinking coffee"]
    },
    {
        "name"     : "David",
        "rownumber": 4,
        "os"       : "Mac",
        "hobbies"  : ["coding", "playing basketball", "hanging out with friends"]
    },
    {
        "name"     : "John",
        "rownumber": 4,
        "os"       : "Win",
        "hobbies"  : ["coding", "practicing law", "walking out the dog"]
    },
    {
        "name"     : "Jason",
        "rownumber": 5,
        "os"       : "Mac",
        "hobbies"  : ["coding", "playing music", "drinking coffee"]
    }
]);

// List every student
db.students.find();

// List one student
db.students.find({"name": "Isaac"}).pretty();

// List Mac-user students on row 5
db.students.find({"rownumber": 5, "os": "Mac"}).pretty();

// List students whose hobby includes drinking coffee
db.students.find({"hobbies": "drinking coffee"});

// Query with an or
db.students.find({
    "hobbies": {$in: ["drinking coffee", "playing basketball"]}
    
});

// Drop database
db.dropDatabase();