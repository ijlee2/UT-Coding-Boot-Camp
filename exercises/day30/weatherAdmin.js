const UserSearch = require("./userSearch").UserSearch;
const fs         = require("fs");

// Create a log file if it does not exist
const file_log = "log.txt";

if (!fs.existsSync(file_log)) {
    fs.writeFile(file_log, "", error => {
        if (error) {
            return console.log(`Error in creating "${file_log}"\n${error}\n\n\n`);
        }
    });
}

exports.WeatherAdmin = function WeatherAdmin() {
    this.newUserSearch = function(name, location) {
        const userSearch = new UserSearch(name, location);

        userSearch.getWeather();

        // Output to the file
        const output = `Name: ${userSearch.name}\nLocation: ${userSearch.location}\nTime Stamp: ${userSearch.timestamp}\n\n`;

        fs.appendFile(file_log, output, error => {
            if (error) {
                return console.log(`Error in appending to "${file_log}"\n${error}\n\n\n`);
            }
        });
    }

    this.getData = function() {
        fs.readFile(file_log, "UTF8", (error, data) => {
            if (error) {
                return console.log(`Error in reading "${file_log}"\n${error}\n\n\n`);
            }

            console.log(data);
        });
    }
}