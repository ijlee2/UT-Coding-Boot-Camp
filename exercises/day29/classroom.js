const Student = require("./student").Student;

exports.Classroom = function Classroom(parameters) {
    // Name of professor, room number
    for (let key in parameters) {
        this[key] = parameters[key];
    }

    const students    = [];
    let   numStudents = 0;

    this.addStudent = function(parameters) {
        students.push(new Student(parameters));
        numStudents++;
    }

    this.displayStudents = function() {
        students.forEach(s => {
            s.displayInformation();
        });
    }
}