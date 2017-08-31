const fs = require("fs");

fs.readFile("best.txt", "utf8", function(error, data) {
    if (error) {
        return console.log(error);
    }

    const bestThings = data.split(",");

    bestThings.forEach(b => console.log(b.trim()));
});