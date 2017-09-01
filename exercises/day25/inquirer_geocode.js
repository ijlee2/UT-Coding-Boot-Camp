const geocoder = require("geocoder");
const inquirer = require("inquirer");

inquirer.prompt([
    {
        "type"   : "input",
        "name"   : "query",
        "message": "Enter a place."
    }

]).then((response) => {
    geocoder.geocode(response.query, (error, data) => {
        if (error) {
            return console.log(error);
        }

        console.log(JSON.stringify(data, null, 2));

    });

});