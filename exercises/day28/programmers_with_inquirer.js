const inquirer = require("inquirer");

const programmers = [];

function Programmer(parameters) {
    for (let key in parameters) {
        this[key] = parameters[key];
    }

    this.displayInformation = function() {
        console.log();
        console.log(`Name     : ${this.name}`);
        console.log(`Position : ${this.position}`);
        console.log(`Age      : ${this.age}`);
        console.log(`Languages: ${this.language}`);
        console.log();
    }
}

function enterProgrammer() {
    inquirer.prompt([
        {
            "type"   : "input",
            "name"   : "name",
            "message": "What is your name?"
        },
        {
            "type"   : "input",
            "name"   : "position",
            "message": "What is your current position?"
        },
        {
            "type"   : "input",
            "name"   : "age",
            "message": "How old are you?"
        },
        {
            "type"   : "input",
            "name"   : "language",
            "message": "What is your favorite programming language?"
        },
        {
            "type"   : "confirm",
            "name"   : "continue",
            "message": "Enter another programmer?",
            "default": true
        }

    ]).then(response => {
        const programmer = new Programmer({
            "name"    : response.name,
            "position": response.position,
            "age"     : parseInt(response.age),
            "language": response.language
        });

        programmers.push(programmer);

        if (response.continue) {
            console.log();
            enterProgrammer();

        } else {
            programmers.forEach(p => p.displayInformation());
            
        }
    });
}

enterProgrammer();