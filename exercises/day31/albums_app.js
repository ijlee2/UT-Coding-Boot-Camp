process.stdout.write("\033c");

const mysql = require("mysql");

const connection = mysql.createConnection({
    "host": "localhost",
    "port": 3306,

    // User name
    "user": "root",

    // Password
    "password": "",
    "database": "albums_db"
});

connection.connect(function(error) {
    if (error) throw error;

    console.log("connected as id " + connection.threadId);
});

function displayAlbums() {
    connection.query("SELECT * FROM albums ORDER BY title ASC", (error, result) => {
        if (error) throw error;

        console.log("\n--- Display albums ---\n");
        result.forEach(a => {
            console.log(a.title);
        });
    });
}

function displayAlbumsByGenre(genre) {
    connection.query(`SELECT * FROM albums WHERE genre="${genre}"`, (error, result) => {
        if (error) throw error;

        console.log(`\n--- Display albums of genre: ${genre} ---\n`);
        result.forEach(a => {
            console.log(a.title);
        });
    });
}

function displayAlbumsByArtist(artist) {
    connection.query(`SELECT * FROM albums WHERE artist="${artist}"`, (error, result) => {
        if (error) throw error;

        console.log(`\n--- Display albums of artist: ${artist} ---\n`);
        result.forEach(a => {
            console.log(a.title);
        });
    });
}

displayAlbums();
displayAlbumsByGenre("Soul");
displayAlbumsByArtist("Queens of the Stone Age");

connection.end();