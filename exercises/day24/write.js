// Core node package for reading and writing files
const fs = require("fs");

// This block of code will create a file called "movies.txt".
// It will then print "Inception, Die Hard" in the file.
fs.writeFile("movies.txt", "Inception, Die Hard", function(error) {
    if (error) {
        return console.log(error);
    }

    console.log("movies.txt was updated!");
});