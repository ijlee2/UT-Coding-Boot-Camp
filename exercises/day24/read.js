const fs = require("fs");

// It's important to include the "utf8" parameter, or the code will
// The code will store the contents of the reading inside the variable data
fs.readFile("movies.txt", "utf8", function(error, data) {
    if (error) {
        return console.log(error);
    }

    console.log(data);

    const dataArray = data.split(",");

    console.log(dataArray);
});