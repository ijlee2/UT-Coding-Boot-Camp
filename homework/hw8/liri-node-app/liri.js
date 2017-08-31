// Configure
const keys = require("./keys.js");

// Twitter
const Twitter = require("twitter");
const twitter = new Twitter(keys.twitter);

// Spotify
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// OMDB
const request = require("request");

// File System
const fs = require("fs");


// Initialize
const option = process.argv[2];
const title  = process.argv.slice(3).join(" ");

mainMenu(option, title);


function mainMenu(option, title) {
    switch (option) {
        case "my-tweets":
            getTweets();
            break;

        case "spotify-this-song":
            getSong((title) ? title : "The Sign");
            break;

        case "movie-this":
            getMovie((title) ? title : "Mr. Nobody");
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;

        default:
            console.log("Command not found.");

    }
}


function getTweets() {
    const parameters = {
        count: 20,
        screen_name: "BobBarker000000"
    };

    twitter.get("statuses/user_timeline", parameters, function(error, tweets, response) {
        if (error) {
            return console.log(`Error in calling "Twitter": ${error}`);
        }

        tweets.forEach(t => {
//            const tweet_date = moment(t.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
            drawSeparator();
            console.log(`@${t.user.screen_name} · ${t.created_at}\n\n"${t.text}"\n`);
        });

        drawSeparator();
    });
}


function getSong(title) {
    const parameters = {
        "type" : "track",
        "query": title,
        "limit": 1
    };

    spotify.search(parameters, function(error, data) {
        if (error) {
            return console.log(`Error in calling "Spotify": ${error}`);
        }

        // For simplicity, we assume that Spotify always finds the right song
        const song = data.tracks.items[0];

        // Display all artists
        const artists = [];
        song.artists.forEach(a => artists.push(a.name));

        // Display song information
        drawSeparator();
        console.log(`Artists:\t${artists.join(", ")}`);
        console.log(`Album:\t\t${song.album.name}`);
        console.log(`Track:\t\t${song.name}`);
        console.log(`Preview link:\t${song.preview_url}`);
        drawSeparator();
    });
}


function getMovie(title) {
    const api_url = `https://www.omdbapi.com/?apikey=40e9cece&t=${title}&plot=short`;
    
    request(api_url, function(error, response, body) {
        if (error) {
            return console.log(`Error in calling "OMDB": ${error}`);
        }

        // Assume that the request is always successful
        if (response.statusCode === 200) {
            const movie = JSON.parse(body);

            drawSeparator();
            console.log(`Title          : ${movie.Title}`);
            console.log(`Release year   : ${movie.Year}`);
            console.log(`Plot           : ${movie.Plot}`);
            console.log(`Actors         : ${movie.Actors}`);
            console.log(`IMDB           : ${movie.imdbRating}`);
            console.log(`RottenTomatoes : ${movie.Ratings[1].Value}`);
            console.log(`Production     : ${movie.Country}`);
            console.log(`Language       : ${movie.Language}`);
            drawSeparator();
        }
    });
}


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(`Error in calling "Do What It Says": ${error}`);
        }

        const commands = data.split("\r\n");

        commands.forEach(c => {
            // Use indexOf instead of split, in case the title includes a comma
            const index = c.indexOf(",");

            const option = (index >= 0) ? c.substring(0, index).trim().toLowerCase() : c;
            const title  = (index >= 0) ? c.substring(index + 1).trim() : undefined;

            mainMenu(option, title);
        });
    });
}


function drawSeparator() {
    console.log("\n" + "-".repeat(50) + "\n");
}