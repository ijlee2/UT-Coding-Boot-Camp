const WeatherAdmin = require("./weatherAdmin").WeatherAdmin;
const weatherAdmin = new WeatherAdmin();

const action   = process.argv[2]
const name     = process.argv[3];
const location = process.argv.slice(4).join(" ");

if (action === "user") {
    weatherAdmin.newUserSearch(name, location);

} else if (action === "admin") {
    weatherAdmin.getData();

}