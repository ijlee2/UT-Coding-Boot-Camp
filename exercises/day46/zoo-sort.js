use zoo;

db.animals.insert([
    {
        "name"       : "dog",
        "numLegs"    : 4,
        "class"      : "mammal",
        "weight"     : 50,
        "name_custom": "man's best friend"
    },
    {
        "name"       : "cat",
        "numLegs"    : 4,
        "class"      : "mammal",
        "weight"     : 10,
        "name_custom": "second-rate alternative to dog"
    },
    {
        "name"       : "snake",
        "numLegs"    : 0,
        "class"      : "reptile",
        "weight"     : 30,
        "name_custom": "proceed with caution"
    },
    {
        "name"       : "pigeon",
        "numLegs"    : 2,
        "class"      : "bird",
        "weight"     : 4,
        "name_custom": "man's enemy"
    },
    {
        "name"       : "ant",
        "numLegs"    : 6,
        "class"      : "insect",
        "weight"     : 1,
        "name_custom": "diligent worker"
    }
]);

db.animals.find().pretty();

// Sort by id, which contains a timestamp (earliest to latest)
db.animals.find().sort({"_id": 1});

// Descending sort
db.animals.find().sort({"_id": -1});

db.animals.find().sort({"numLegs": 1});

db.animals.find().sort({"class": 1});