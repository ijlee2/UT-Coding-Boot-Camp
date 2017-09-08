const weather = require("weather-js");

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
        });
    }
}