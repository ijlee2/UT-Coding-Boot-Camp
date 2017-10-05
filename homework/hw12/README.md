# Eat-Da-Burger

[Plan your next burger today!](https://eat-da-burger-100.herokuapp.com)


## Technologies Used

- [x] Front end: HTML5, CSS3, Bootstrap4, ES7, Handlebars

- [x] Back end: Node, Express, MySQL


## How to Run

To run Eat-Da-Burger, you will need [Bash](https://git-scm.com/downloads/), [Node](https://nodejs.org/en/), [npm](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm), and [Heroku](https://www.heroku.com/).

1. In Bash, type `git clone git@github.com:ijlee2/UT-Coding-Boot-Camp.git` to download Eat-Da-Burger.

![How to Run: Step 1](readme/how_to_run_step1.png?raw=true)

2. Then, type `cd UT-Coding-Boot-Camp/homework/hw12; npm install` to download the required packages.

![How to Run: Step 2](readme/how_to_run_step2.png?raw=true)

3. To deploy on Heroku, you will need to move `hw12` directory to a folder that isn't a Git repository.

Type `mkdir ../../../hw12; mv {.,}* ../../../hw12; cd ../../../hw12` to move `hw12` to your starting folder.

![How to Run: Step 3](readme/how_to_run_step3.png?raw=true)

4. Afterwards, type `git init; git add .; git commit -m "final build"` to create a Git repository.

![How to Run: Step 4](readme/how_to_run_step4.png?raw=true)

5. Type `heroku login` to log in to your Heroku account. Then, type `heroku create` to create a Heroku app.

![How to Run: Step 5](readme/how_to_run_step5.png?raw=true)

6. Finally, type `git push heroku master` to build the app. You can find the URL at the end.

![How to Run: Step 6a](readme/how_to_run_step6a.png?raw=true)

![How to Run: Step 6b](readme/how_to_run_step6b.png?raw=true)


## How to Configure Database

To use your own database, you will also need [MySQL Workbench](https://dev.mysql.com/downloads/workbench/).

1. On Heroku, you can use either [ClearDB](https://devcenter.heroku.com/articles/cleardb) or [JawsDB](https://devcenter.heroku.com/articles/jawsdb). Both provide a free-tier option.

For JawsDB, type `heroku addons:create jawsdb`, then `heroku config:get JAWSDB_URL` to find (in the order of appearance) your username, password, hostname, port number, and default schema.

![How to Configure Database: Step 1](readme/how_to_configure_database_step1.png?raw=true)

2. To seed your database, open MySQL Workbench and click Setup New Connection.

![How to Configure Database: Step 2a](readme/how_to_configure_database_step2a.png?raw=true)

Enter your username, hostname, port number, and default schema. Once you click on OK, you will be asked for the password.

![How to Configure Database: Step 2b](readme/how_to_configure_database_step2b.png?raw=true)

3. Finally, connect to your database, then run `db/schema.sql` and `db/seeds.sql`.

![How to Configure Database: Step 3](readme/how_to_configure_database_step3.png?raw=true)