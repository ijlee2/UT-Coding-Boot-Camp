function Programmer(parameters) {
    for (let key in parameters) {
        this[key] = parameters[key];
    }
}

const programmer1 = new Programmer({
    "name"     : "John Smith",
    "position" : "Full Stack Developer",
    "age"      : 33,
    "languages": ["HTML", "CSS", "JavaScript"]
});

// We can modify an object after defining it and ensure that all its instances have the new method
Programmer.prototype.displayInformation = function() {
    console.log(`Name     : ${this.name}`);
    console.log(`Position : ${this.position}`);
    console.log(`Age      : ${this.age}`);
    console.log(`Languages: ${this.languages.join(", ")}`);
    console.log();
}

const programmer2 = new Programmer({
    "name"     : "Jane Smith",
    "position" : "Full Stack Developer",
    "age"      : 30,
    "languages": ["HTML", "CSS", "JavaScript"]
});

programmer1.displayInformation();
programmer2.displayInformation();