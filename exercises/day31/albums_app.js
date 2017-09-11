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

connection.connect(error => {
    if (error) throw error;

    console.log("connected as id " + connection.threadId);

    displayAlbums();
    displayAlbumsByGenre("Soul");
    displayAlbumsByArtist("Queens of the Stone Age");

    connection.end();
});

function displayAlbums() {
    connection.query("SELECT * FROM albums ORDER BY genre ASC", (error, result) => {
        if (error) throw error;

        console.log("\n--- Display albums ---\n");
        result.forEach(a => {
            console.log(`${a.genre}: "${a.title}" by ${a.artist}`);
        });
    });
}

function displayAlbumsByGenre(genre) {
    connection.query(`SELECT * FROM albums WHERE genre="${genre}"`, (error, result) => {
        if (error) throw error;

        console.log(`\n--- Display albums of genre: ${genre} ---\n`);
        result.forEach(a => {
            console.log(`"${a.title}" by ${a.artist}`);
        });
    });
}

function displayAlbumsByArtist(artist) {
    const query = connection.query(`SELECT * FROM albums WHERE artist="${artist}"`, (error, result) => {
        if (error) throw error;

        console.log(`\n--- Display albums of artist: ${artist} ---\n`);
        result.forEach(a => {
            console.log(a.title);
        });
    });

    // Display the SQL commands that was run
    console.log(query.sql);
}