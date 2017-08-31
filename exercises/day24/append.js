var fs = require("fs");

var textFile = process.argv[2];

fs.appendFile(textFile, "Hello Kitty\n", function(error) {
    if (error) {
        console.log(error);
    }

    console.log("Content added!");
});