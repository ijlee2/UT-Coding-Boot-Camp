exports.Student = function Student(parameters) {
    // Name, favorite subject, GPA
    for (let key in parameters) {
        this[key] = parameters[key];
    }

    this.displayInformation = function() {
        console.log(`Name    : ${this.name}`);
        console.log(`Subject : ${this.subject}`);
        console.log(`GPA     : ${this.gpa.toFixed(2)}`);
        console.log();
    }
}