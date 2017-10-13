# My Fitness Buddy


## Technologies


## Notes

[Laravel - Deploying to Heroku](https://devcenter.heroku.com/articles/getting-started-with-laravel#deploying-to-heroku)

[Fideloper Proxy Setup](https://github.com/fideloper/TrustedProxy)

[Database Setup](https://laravel.com/docs/5.5/database)

[Authentication Setup](https://laravel.com/docs/5.5/authentication)


## Instructions

We will use [PHP 7.1.9](https://www.apachefriends.org/download.html), [Composer](https://getcomposer.org/download/), Laravel 5.5, Bootstrap 4, and MySQL to create My Fitness Buddy.

The instructions below have been tested in Windows 10.


### Prerequisites

1. Install Xampp (if you don't have PHP already) and Composer.

1. Search `View Advanced System Settings`. This will open a window called `System Properties`.

1. Click on `Environment Variables...` button and select `Path` under `System variables`. Then, click on `Edit` button to open a window called `Edit environment variable`.

1. Click on `New` button, and add the addresses `C:\xampp\php` and `C:\ProgramData\ComposerSetup\bin`. Check that there are no other paths to an older version of PHP.

1. Open bash and run `php -v` and `composer --version` to verify that you have PHP >= 7.0.0 and Composer >= 1.5.0.

1. Finally, install Laravel by typing,

    ```bash
    composer global require "laravel/installer"
    ```


### Create a Laravel project

1. Let's create a Laravel project. Go to your work directory (e.g. `work`) and type,

    ```bash
    // Current directory (cd): work

    laravel new my-fitness-buddy
    cd my-fitness-buddy
    ```

1. We will save our project on GitHub and run it on Heroku.
    
    Create a new repository on GitHub (e.g. `my-fitness-buddy`), and initialize it with no README, no .gitignore, and no license. (They can be added later.)

    In bash, type:

    ```bash
    // cd: work/my-fitness-buddy

    git init
    git add .
    git commit -m "initial build"
    git remote add origin git@github.com:<YOUR USERNAME HERE>/<YOUR REPO NAME HERE>.git
    git push -u origin master
    ```

    Create a new app on Heroku (e.g. `my-fitness-buddy`) and add JawsDB resource. Connect the app with your repository.

    ```bash
    // cd: work/my-fitness-buddy

    heroku git:remote -a <YOUR APP NAME HERE>
    ```

1. Next, create a file called `Procfile` and add the line `web: vendor/bin/heroku-php-apache2 public/ > Procfile`:

    ```bash
    // cd: work/my-fitness-buddy

    touch Procfile
    echo web: vendor/bin/heroku-php-apache2 public/ > Procfile
    ```

1. Open `.env` file. Modify the database host, port, database, username, and password to match those that were given by JawsDB. Remove the corresponding entries in `.env.example` to let others know that they need to provide their own information.

    In `.env`, copy the value for `APP_KEY` and type the following in bash:

    ```bash
    // cd: work/my-fitness-buddy
    
    heroku config:set APP_KEY=<YOUR APP KEY HERE>
    ```

1. We will now create user authentication. Simply run,

    ```bash
    // cd: work/my-fitness-buddy

    php artisan make:auth
    php artisan migrate
    ```

1. Let's test that our setup has worked. Type,

    ```bash
    // cd: work/my-fitness-buddy

    git push heroku master
    heroku open
    ```

    You should see the default Laravel welcome page, with Login and Register on the upper-right corner.

    Please follow Heroku's suggestions for [best practices](https://devcenter.heroku.com/articles/getting-started-with-laravel#best-practices), especially that for `Trusting the Load Balancer` using [Fideloper](https://github.com/fideloper/TrustedProxy#slightly-longer-installation-instructions). We will use HTTP routes to talk to our database.


### Install Bootstrap 4

At the time of writing, Laravel ships with Bootstrap-Sass 3.3.7. We will override this to use Bootstrap 4.