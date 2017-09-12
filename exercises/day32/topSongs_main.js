const inquirer = require("inquirer");
const mysql    = require("mysql");

const connection = mysql.createConnection({
    "host"    : "localhost",
    "port"    : 3306,
    "user"    : "root",
    "password": "",
    "database": "topSongs_db"
});

connection.connect(error => {
    if (error) throw error;

    mainMenu();
});

function mainMenu() {
    clearScreen();

    console.log("--- Top 5000 Songs ---\n");

    inquirer.prompt([
        {
            "type"   : "list",
            "name"   : "menuItem",
            "message": "Select an action:",
            "choices": ["Search artists with multiple top songs", "Search by artist", "Search by song", "Search by year", "Exit program"]
        }

    ]).then(response => {
        clearScreen();

        switch (response.menuItem) {
            case "Search artists with multiple top songs":
                searchArtists_multipleTopSongs();
                break;

            case "Search by artist":
                searchArtist();
                break;

            case "Search by song":
                searchSong();
                break;

            case "Search by year":
                searchYear();
                break;

            case "Exit program":
                console.log("Goodbye!");
                connection.end();
                break;

        }

    });
}

function searchArtists_multipleTopSongs() {
    const sql_command = `SELECT artist_name, COUNT(*) c FROM top5000 GROUP BY artist_name HAVING c > 1 ORDER BY c DESC LIMIT 50`;

    connection.query(sql_command, (error, results) => {
        if (error) throw error;

        console.log("--- Top 50 artists with most top songs ---\n");

        results.forEach(r => console.log(`${r.artist_name}. ${r.c} times`));

        setTimeout(mainMenu, 5000);
    });
}

function searchArtist() {
    inquirer.prompt([
        {
            "type"    : "input",
            "name"    : "artist",
            "message" : "Enter the name of the artist:",
            "validate": value => (value !== "")
        }

    ]).then(response => {
        const sql_command = `SELECT position, song_name, year, raw_total, raw_usa, raw_uk, raw_europe, raw_global FROM top5000 WHERE artist_name = "${response.artist}"`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;

            if (results.length === 0) {
                console.log("Artist not found!");
    
                setTimeout(mainMenu, 1000);

            } else {
                results.forEach(r => {
                    console.log(`${r.position}. ${r.song_name} (${r.year})`);
                    console.log(`Raw total: ${r.raw_total}\n`);
                });
    
                setTimeout(mainMenu, 5000);
            }

        });

    });
}

function searchSong() {
    inquirer.prompt([
        {
            "type"    : "input",
            "name"    : "song",
            "message" : "Enter the name of the song:",
            "validate": value => (value !== "")
        }

    ]).then(response => {
        const sql_command = `SELECT position, artist_name, year, raw_total, raw_usa, raw_uk, raw_europe, raw_global FROM top5000 WHERE song_name = "${response.song}"`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;

            if (results.length === 0) {
                console.log("Song not found!");
                setTimeout(mainMenu, 1000);

            } else {
                results.forEach(r => {
                    console.log(`${r.position}. ${response.song} by ${r.artist_name} (${r.year})`);
                    console.log(`Raw total: ${r.raw_total}\n`);
                });

                setTimeout(mainMenu, 5000);
            }

        });

    });
}

function searchYear() {
    inquirer.prompt([
        {
            "type"    : "input",
            "name"    : "year_start",
            "message" : "Enter the start year:",
            "validate": value => (value !== "")
        },
        {
            "type"    : "input",
            "name"    : "year_end",
            "message" : "Enter the end year:",
            "validate": value => (value !== "")
        }

    ]).then(response => {
        const sql_command = `SELECT position, artist_name, song_name, year, raw_total, raw_usa, raw_uk, raw_europe, raw_global FROM top5000 WHERE year BETWEEN ${response.year_start} AND ${response.year_end} ORDER BY year LIMIT 20`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;

            if (results.length === 0) {
                console.log("No songs found!");
                setTimeout(mainMenu, 1000);

            } else {
                results.forEach(r => {
                    console.log(`${r.position}. ${r.song_name} by ${r.artist_name} (${r.year})`);
                    console.log(`Raw total: ${r.raw_total}\n`);
                });

                setTimeout(mainMenu, 5000);
            }

        });

    });
}

function clearScreen() {
    process.stdout.write("\033c");
}