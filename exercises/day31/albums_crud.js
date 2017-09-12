const inquirer = require("inquirer");
const mysql    = require("mysql");

const connection = mysql.createConnection({
    "host"    : "localhost",
    "port"    : 3306,
    "user"    : "root",
    "password": "",
    "database": "albums_db"
});

let albums;

// Start by conecting to the database
connection.connect(error => {
    if (error) throw error;

    displayAlbums(false);

    mainMenu();
});

function mainMenu() {
    clearScreen();

    inquirer.prompt([
        {
            "type"   : "list",
            "name"   : "menuItem",
            "message": "Select an action:",
            "choices": ["Create albums", "Display albums", "Update albums", "Delete albums", "Exit program"]
        }

    ]).then(response => {
        clearScreen();

        switch (response.menuItem) {
            case "Create albums":
                createAlbums();
                break;

            case "Display albums":
                displayAlbums(true);
                break;

            case "Update albums":
                updateAlbums();
                break;

            case "Delete albums":
                deleteAlbums();
                break;

            case "Exit program":
                console.log("Goodbye!\n");
                connection.end();

                break;

        }

    });
}

// Create
function createAlbums() {
    inquirer.prompt([
        {
            "type"    : "input",
            "name"    : "title",
            "message" : "Enter the album name:",
            "validate": value => (value !== "")
        },
        {
            "type"    : "input",
            "name"    : "artist",
            "message" : "Enter the artist name:",
            "validate": value => (value !== "")
        },
        {
            "type"    : "input",
            "name"    : "genre",
            "message" : "Enter the genre:",
            "validate": value => (value !== "")
        },
        {
            "type"   : "confirm",
            "name"   : "continue",
            "message": "Create another album?",
            "default": true
        }

    ]).then(response => {
        const sql_command = `INSERT INTO albums (title, artist, genre) VALUES ("${response.title}", "${response.artist}", "${response.genre}")`;

        connection.query(sql_command, (error, result) => {
            if (error) throw error;

            console.log("\nAlbum successfully created!\n");
            
            if (response.continue) {
                console.log();
                createAlbums();

            } else {
                setTimeout(mainMenu, 1000);

            }
        });
    });
}

// Read
function displayAlbums(show) {
    const sql_command = `SELECT * FROM albums ORDER BY ${(show) ? "genre" : "title"} ASC`;

    connection.query(sql_command, (error, result) => {
        if (error) throw error;

        // Save the albums locally
        albums = result.map(r => r.title);

        if (show) {
            result.forEach(r => {
                console.log(`${r.genre}: "${r.title}" by ${r.artist}`);
            });

            setTimeout(mainMenu, 3000);
        }
    });
}

// Update
function updateAlbums() {
    inquirer.prompt([
        {
            "type"   : "list",
            "name"   : "title",
            "message": "Select the album that you want to update:",
            "choices": albums
        },
        {
            "type"    : "input",
            "name"    : "title_new",
            "message" : "Update the album name:",
            "validate": value => (value !== "")
        },
        {
            "type"    : "input",
            "name"    : "artist_new",
            "message" : "Update the artist name:",
            "validate": value => (value !== "")
        },
        {
            "type"    : "input",
            "name"    : "genre_new",
            "message" : "Update the genre:",
            "validate": value => (value !== "")
        }

    ]).then(response => {
        const sql_command = `UPDATE albums SET title = "${response.title_new}", artist = "${response.artist_new}", genre = "${response.genre_new}" WHERE title = "${response.title}"`;

        connection.query(sql_command, (error, result) => {
            if (error) throw error;

            console.log("\nAlbum successfully updated!\n");

            // Update the local copy
            displayAlbums(false);

            setTimeout(mainMenu, 1000);

        });

    });
}

// Delete
function deleteAlbums() {
    inquirer.prompt([
        {
            "type"   : "list",
            "name"   : "title",
            "message": "Select the album that you want to delete:",
            "choices": albums
        }

    ]).then(response => {
        const sql_command = `DELETE FROM albums WHERE title = "${response.title}"`;

        connection.query(sql_command, (error, result) => {
            if (error) throw error;

            console.log("\nAlbum successfully deleted!\n");

            // Update the local copy
            displayAlbums(false);

            setTimeout(mainMenu, 1000);
            
        });

    });
}

function clearScreen() {
    process.stdout.write("\033c");
}