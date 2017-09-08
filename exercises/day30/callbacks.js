const fs       = require("fs");
const file_log = "log.txt";

if (!fs.existsSync(file_log)) {
    fs.writeFile(file_log, "", error => {
        if (error) {
            return console.log(`Error in creating the file "${file_log}"\n${error}\n`);
        }
    });
}


// A function that accepts a string and a function as arguments
function isMyName(name, questionIt) {
    // Log the string
    console.log(`My name is ${name}.`);

    // Run the function
    questionIt();
}

console.log();
isMyName("John", () => console.log("Or is it?!"));


// A function that accepts a boolean and a function as arguments
function isItTrue(logicalValue, questionIt) {
    if (logicalValue) {
        questionIt();
    }
}

console.log();
isItTrue(true, () => console.log("Yes, it is true."));


// A function that accepts a function (F) and a value (V), and returns
// a function that returns the result of running the function F on the value V
function newFunction(f, x) {
    return () => f(x);
}

function addOne(x) {
    return x + 1;
}

console.log();
const g = newFunction(addOne, 5);
console.log(g());


// Write a short message to a file using fs.writeFile
// writeFile uses a callback function to handle errors
fs.writeFile(file_log, "Hello world!", error => {
    if (error) {
        return console.log(`Error in writing cards to "${file_bank}"\n${error}\n`.red.bold);
    }
});