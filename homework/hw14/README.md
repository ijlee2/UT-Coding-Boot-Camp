# NeoTECH

[When you need to check NeoGAF in discreet.](https://neotech-app.herokuapp.com)


## Technologies Used

- [x] Front end: HTML5, CSS3, Materialize, ES7, Handlebars

- [x] Back end: Node, Express, MongoDB, Mongoose, Cheerio


## How to Run

To run NeoTECH, you will need [Bash](https://git-scm.com/downloads/), [Node](https://nodejs.org/en/), [npm](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm), and [Heroku](https://www.heroku.com/).

1. In Bash, type `git clone git@github.com:ijlee2/neotech.git` to download NeoTECH.

![How to Run: Step 1](readme/how_to_run_step1.png?raw=true)

2. Then, type `cd neotech; npm install` to download the required packages.

![How to Run: Step 2](readme/how_to_run_step2.png?raw=true)

3. Type `heroku login` to log in to your Heroku account. Then, type `heroku create` to create a Heroku app.

![How to Run: Step 3](readme/how_to_run_step3.png?raw=true)

4. Finally, type `git push heroku master` to build the app. You can find the URL at the end.

![How to Run: Step 4a](readme/how_to_run_step4a.png?raw=true)

![How to Run: Step 4b](readme/how_to_run_step4b.png?raw=true)


## How to Configure Database

You can use your own database and manage it using [Robo 3T](https://robomongo.org/download).

1. On Heroku, you can use [mLab](https://devcenter.heroku.com/articles/mongolab). It provides a free-tier option.

Type `heroku addons:create mongolab`, then `heroku config:get MONGODB_URI` to find the MongoDB connection information.

![How to Configure Database: Step 1](readme/how_to_configure_database_step1.png?raw=true)

2. Change line 36 in `server.js` to include your URI string.

![How to Configure Database: Step 2](readme/how_to_configure_database_step2.png?raw=true)