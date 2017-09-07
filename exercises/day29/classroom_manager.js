process.stdout.write("\033c");

const Student   = require("./student").Student;
const Classroom = require("./classroom").Classroom;
const inquirer  = require("inquirer");

const classroom = new Classroom({
    "professor": {"name": "John Smith"},
    "room"     : {"number": 101}
});

let numStudents = 0;

function interact() {
    numStudents++;

    console.log(`\n--- Add student #${numStudents} ---`);

    inquirer.prompt([
        {
            "type"   : "input",
            "name"   : "name",
            "message": "Name:"
        },
        {
            "type"   : "input",
            "name"   : "subject",
            "message": "Favorite subject:"
        },
        {
            "type"   : "input",
            "name"   : "gpa",
            "message": "GPA:",
            "validate": function (value) {
                return (!isNaN(value) && 0 <= parseFloat(value) && parseFloat(value) <= 4);
            },
        },
        {
            "type"   : "confirm",
            "name"   : "continue",
            "message": "Enter another student?",
            "default": true
        }

    ]).then(response => {
        // Create a Student class
        const student = new Student({
            "name"   : response.name,
            "subject": response.subject,
            "gpa"    : parseFloat(response.gpa)
        });

        // Add the class to Classroom instance
        classroom.addStudent(student);

        if (response.continue) {
            interact();

        } else {
            console.log();
            console.log(`${classroom.professor.name}, Room ${classroom.room.number}\n`);
            classroom.displayStudents();

        }
    });
}

interact();