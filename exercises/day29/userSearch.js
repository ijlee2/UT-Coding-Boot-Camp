const weather = require("weather-js");
const fs      = require("fs");

// Create a log file if it does not exist
const file_log = "log.txt";

if (!fs.existsSync(file_log)) {
    fs.writeFile(file_log, "", error => {
        if (error) {
            return console.log(`Error in creating "${file_log}"\n${error}\n\n\n`);
        }
    });
}

exports.UserSearch = function UserSearch(name, location) {
    this.name      = name;
    this.location  = location;
    this.timestamp = Date.now();

    this.getWeather = function() {
        weather.find({search: this.location, degreeType: "F"}, (error, result) => {
            if (error) {
                return console.log(error);
            }
            
            // Output to the console
            console.log(JSON.stringify(result[0], null, 2));

            // Output to the file
            const output = `Name: ${this.name}\nLocation: ${this.location}\nTime Stamp: ${this.timestamp}\n\n`;

            fs.appendFile(file_log, output, error => {
                if (error) {
                    return console.log(`Error in appending to "${file_log}"\n${error}\n\n\n`);
                }
            });
        });
    }
}