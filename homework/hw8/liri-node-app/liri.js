/****************************************************************************
 ****************************************************************************
    
    Configure APIs
    
*****************************************************************************
*****************************************************************************/
const keys    = require("./keys.js");

// Twitter
const Twitter = require("twitter");
const twitter = new Twitter(keys.twitter);

// Spotify
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// OMDB
const request = require("request");

// File System
const fs      = require("fs");



/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
process.stdout.write('\033c');

// Create a log file if it does not exist
const file_log = "log.txt";

if (!fs.existsSync(file_log)) {
    fs.writeFile(file_log, "", (error) => {
        if (error) {
            saveOutput(`Error in creating "${file_log}"\n${error}\n\n`);
            return;
        }
    });
}

const option = process.argv[2];
const title  = process.argv.slice(3).join(" ");

mainMenu(option, title);



/****************************************************************************
 ****************************************************************************
    
    Menu options
    
*****************************************************************************
*****************************************************************************/
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
            saveOutput(`Error:\n"${option}" is a not valid command.\n\n`);

    }
}


function getTweets() {
    const parameters = {
        count: 20,
        screen_name: "BobBarker000000"
    };

    twitter.get("statuses/user_timeline", parameters, (error, tweets, response) => {
        if (error) {
            saveOutput(`Error in calling "Twitter"\n${error}\n\n`);
            return;
        }


        /********************************************************************
            
            Write to terminal and file
            
        *********************************************************************/
        let output = "My Tweets\n";

        output += addSeparator();
        
        tweets.forEach(t => {
            // Extract date information
            [, month, day, time, , year] = t.created_at.split(" ");
            [hour, minute]               = time.split(":");

            // Format the time stamp
            const timeStamp = `${month} ${day} ${year}, ${hour % 12}:${minute} ${(hour < 12) ? "AM" : "PM"}`;

            output += `@${t.user.screen_name} · ${timeStamp}\n"${t.text}"\n\n`;
        });

        output += addSeparator();

        saveOutput(output);
    });
}


function getSong(title) {
    const parameters = {
        "type" : "track",
        "query": title,
        "limit": 1
    };

    spotify.search(parameters, (error, data) => {
        if (error) {
            saveOutput(`Error in calling "Spotify"\n${error}\n\n`);
            return;
        }

        // For simplicity, we assume that Spotify always finds the right song
        const song = data.tracks.items[0];

        // Display all artists
        const artists = [];
        song.artists.forEach(a => artists.push(a.name));


        /********************************************************************
            
            Write to terminal and file
            
        *********************************************************************/
        let output = "Spotify This Song\n";
        
        output += addSeparator();
        
        output += `Artists      : ${artists.join(", ")}\n`;
        output += `Album        : ${song.album.name}\n`;
        output += `Track        : ${song.name}\n`;
        output += `Preview link : ${song.preview_url}\n\n`;
        
        output += addSeparator();

        saveOutput(output);
    });
}


function getMovie(title) {
    const api_url = `https://www.omdbapi.com/?apikey=40e9cece&t=${title}&plot=short`;
    
    request(api_url, (error, response, body) => {
        if (error) {
            saveOutput(`Error in calling "OMDB"\n${error}\n\n`);
            return;
        }

        if (response.statusCode !== 200) {
            saveOutput(`Error in calling "OMDB"\n${response}\n\n`);
            return;
        }

        const movie = JSON.parse(body);

        

        /********************************************************************
            
            Write to terminal and file
            
        *********************************************************************/
        let output = "Movie This\n";

        output += addSeparator();
        
        output += `Title          : ${movie.Title}\n`;
        output += `Release year   : ${movie.Year}\n`;
        output += `Plot           : ${movie.Plot}\n`;
        output += `Actors         : ${movie.Actors}\n`;
        output += `IMDB           : ${movie.imdbRating}\n`;
        output += `RottenTomatoes : ${movie.Ratings[1].Value}\n`;
        output += `Production     : ${movie.Country}\n`;
        output += `Language       : ${movie.Language}\n\n`;
        
        output += addSeparator();

        saveOutput(output);
    });
}


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", (error, data) => {
        if (error) {
            saveOutput(`Error in calling "Do What It Says":\n${error}\n\n`);
            return;
        }

        const commands = data.split("\r\n");
        

        /********************************************************************
            
            Write to terminal and file
            
        *********************************************************************/
        if (commands.length === 1 && commands[0] === "") {
            saveOutput(`Error in calling "Do What It Says":\nPlease enter a command in "random.txt".\n\n`);
        }

        commands.forEach(c => {
            if (c === "") {
                return;
            }

            // Use indexOf instead of split, in case the title has a comma
            const index = c.indexOf(",");

            const option = (index >= 0) ? c.substring(0,  index).trim().toLowerCase() : c;
            const title  = (index >= 0) ? c.substring(index + 1).trim()               : undefined;

            mainMenu(option, title);
        });
    });
}


function addSeparator() {
    return "-".repeat(60) + "\n\n";
}

function saveOutput(output) {
    console.log(output);

    fs.appendFile(file_log, output, (error) => {
        if (error) {
            return console.log(`Error in appending to "${file_log}"\n${error}\n\n`);
        }
    });
}