// Include the request npm package
const request = require("request");

const query = process.argv[2];

const api_url = `https://www.omdbapi.com/?apikey=40e9cece&t=${query}`;

request(`https://www.omdbapi.com/?apikey=40e9cece&t=${query}&plot=short`, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        const movie = JSON.parse(body);

        /* Display JSON
        for (key in movie) {
            console.log(key + ": " + movie[key]);
        }
        */

        console.log(movie.Title);
        console.log(`Release date: ${movie.Year}`);
        console.log(`Rating: ${movie.imdbRating}`);
    }
});