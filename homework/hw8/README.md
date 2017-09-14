# LIRI 
LIRI (Language Interpretation and Recognition Interface) understands your commands and performs useful tasks like SIRI.


## Technologies Used
- [x] ES6

- [x] Node.js


## How to Run
To run LIRI, you will need [Bash](https://git-scm.com/downloads/), [Node](https://nodejs.org/en/), and [npm](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm).

1. In Bash, type `git clone git@github.com:ijlee2/UT-Coding-Boot-Camp.git` to download LIRI.

![How to Run: Step 1](images/how_to_run_step1.png?raw=true)

2. Then, type `cd UT-Coding-Boot-Camp/homework/hw8; npm install` to download the required packages.

![How to Run: Step 2](images/how_to_run_step2.png?raw=true)

3. Change the file name of `keys_template.js` to `keys.js`. Open this file to add your API keys for Twitter, Spotify, and OMDB.

![How to Run: Step 3](images/how_to_run_step3.png?raw=true)

4. Finally, in Bash, type `node liri.js` to start the program. Please read below for the options.

![How to Run: Step 4](images/how_to_run_step4.png?raw=true)


## Demos - My Tweets

Type `node liri.js my-tweets` to get your 20 most recent Tweets.

![My Tweets](images/my_tweets.png?raw=true)


## Demos - Spotify This Song

Type `node liri.js spotify-this-song "SONG NAME"` to find the artist and album information.

![Spotify This Song](images/spotify_this_song.png?raw=true)


## Demos - Movie This

Type `node liri.js movie-this "MOVIE NAME"` to find the movie information.

![Movie This](images/movie_this.png?raw=true)


## Demos - Do What It Says

Type `node liri.js do-what-it-says` to run the commands in `random.txt` file.
