const inquirer = require("inquirer");
const mysql    = require("mysql");

const connection = mysql.createConnection({
    "host"    : "localhost",
    "port"    : 3306,
    "user"    : "root",
    "password": "",
    "database": "twoTables_db"
});

connection.connect(error => {
    if (error) throw error;

    searchAlbumAndSong();
});

function searchAlbumAndSong() {
    clearScreen();

    console.log("--- Search for Album and Song ---\n");

    inquirer.prompt([
        {
            "type"    : "input",
            "name"    : "album",
            "message" : "Enter the name of the album:",
            "validate": value => (value !== "")
        },
        {
            "type"    : "input",
            "name"    : "song",
            "message" : "Enter the name of the song:",
            "validate": value => (value !== "")
        }

    ]).then(response => {
        const sql_command = `SELECT * FROM table_combined WHERE album_name = "${response.album.trim()}" AND song_name = "${response.song.trim()}"`;

        connection.query(sql_command, (error, results) => {
            if (error) throw error;

            if (results.length === 0) {
                console.log("No matches found.");

                setTimeout(searchAlbumAndSong, 1000);

            } else {
                results.forEach(r => {
                    console.log(`\n--- ${r.album_name}, ${r.song_name} ---\n`);
                    console.log(`Artist          : ${r.artist_name}`);
                    console.log(`Year            : ${r.year}`);
                    console.log(`Album position  : ${r.album_position}`);
                    console.log(`Album raw total : ${r.album_raw_total}`);
                    console.log(`Song position   : ${r.song_position}`);
                    console.log(`Song raw total  : ${r.song_raw_total}`);
                    console.log();

                });

                setTimeout(searchAlbumAndSong, 3000);

            }

        });

    });
}

function clearScreen() {
    process.stdout.write("\033c");
}