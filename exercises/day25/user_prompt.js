// Create a basic command line Node application using the inquirer package.
// Your application should ask the user any five questions of your choosing.
// The question set should include at least one:

//    - Basic input,
//    - Password,
//    - List,
//    - Checkbox,
//    - and Confirm

// Then if a user's password matches a pre-defined password, re-display the data back to the user with some text. 
// See the inquirer GitHub documentation "examples" page if you need help.

// Remember to be creative!
// ========================================================================
const inquirer = require("inquirer");

inquirer.prompt([
    {
        "type"   : "input",
        "name"   : "name",
        "message": "What is your name?"
    },
    {
        "type"   : "confirm",
        "name"   : "confirm",
        "message": "Is this you?",
        "default": true
    },
    {
        "type"   : "password",
        "name"   : "password",
        "message": "What is your password?"
    },
    {
        "type"   : "list",
        "name"   : "bloodType",
        "message": "Select your blood type.",
        "choices": ["A", "B", "O", "AB"]
    },
    {
        "type"   : "checkbox",
        "name"   : "hobbies",
        "message": "Select your hobbies.",
        "choices": ["Eating", "Drinking", "Sleeping", "Studying"]
    },
    {
        "type"   : "password",
        "name"   : "password_check",
        "message": "Type in your password again."
    }

]).then((response) => {
    if (response.confirm && response.password_check === response.password) {
        console.log(`\nWelcome ${response.name}.`);
        console.log(`\nYour blood type is ${response.bloodType}.`);
        console.log(`\nYour hobbies are ${response.hobbies.join(", ")}.`);

    } else {
        console.log("Please try again!");

    }

});