// Configure
const keys = require("./keys.js");

// Twitter
const Twitter = require("twitter");
const twitter = new Twitter(keys.twitter);
const params_twitter = {
    count: 20,
    screen_name: "BobBarker000000"
};

// Spotify
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// Initialize
const option = process.argv[2];
const title  = process.argv.slice(3).join(" ");

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
        break;

    default:
        console.log("Command not found.");

}


function getTweets() {
    twitter.get("statuses/user_timeline", params_twitter, function(error, tweets, response) {
        if (error) {
            return console.log(`Error occurred with Twitter: ${error}`);
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
    const query = {
        "type" : "track",
        "query": title,
        "limit": 1
    }

    spotify.search(query, function(error, data) {
        if (error) {
            return console.log(`Error occurred with Spotify: ${error}`);
        }

        // For simplicity, we assume that Spotify always finds the right song
        const song = data.tracks.items[0];

        // Display all artists
        const artists = [];
        song.artists.forEach(a => artists.push(a.name));

        // Display song information
        drawSeparator();
        console.log(`Artists:\t${artists.join(", ")}\nAlbum:\t\t${song.album.name}\nTrack:\t\t${song.name}\nPreview link:\t${song.preview_url}\n`);
        drawSeparator();
    });
}


function getMovie(title) {

}


function drawSeparator() {
    console.log("-".repeat(50) + "\n");
}