function Programmer(parameters) {
    for (let key in parameters) {
        this[key] = parameters[key];
    }

    this.displayInformation = function() {
        console.log(`Name     : ${this.name}`);
        console.log(`Position : ${this.position}`);
        console.log(`Age      : ${this.age}`);
        console.log(`Languages: ${this.languages.join(", ")}`);
    }
}

const programmer = new Programmer({
    "name"     : "John Smith",
    "position" : "Full Strack Developer",
    "age"      : 33,
    "languages": ["html", "css", "javascript"]
});

programmer.displayInformation();