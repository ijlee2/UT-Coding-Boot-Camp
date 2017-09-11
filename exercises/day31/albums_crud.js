const inquirer = require("inquirer");
const mysql    = require("mysql");

let albums;
const connection = mysql.createConnection({
    "host"    : "localhost",
    "port"    : 3306,
    "user"    : "root",
    "password": "",
    "database": "albums_db"
});

// Start by conecting to the database
connection.connect(error => {
    if (error) throw error;

    displayAlbums(false);
    console.log(albums);

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
    console.log("--- Create albums ---\n");

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
    console.log("--- Display albums ---\n");

    const sql_command = "SELECT * FROM albums ORDER BY genre ASC";

    connection.query(sql_command, (error, result) => {
        if (error) throw error;

        // Save the albums locally
        albums = result.map(a => ({
            "title" : a.title,
            "artist": a.artist,
            "genre" : a.genre
        }));

        if (show) {
            albums.forEach(a => {
                console.log(`${a.genre}: "${a.title}" by ${a.artist}`);
            });

            setTimeout(mainMenu, 3000);
        }
    });
}

// Update
function updateAlbums() {
    console.log("--- Update albums ---\n");

    const query = connection.query("UPDATE products SET ? WHERE ?",
    [
        {
            "quantity": 100
        },
        {
            "flavor": "Rocky Road"
        }
    ], (error, result) => {
        console.log(result.affectedRows + " products updated!\n");

        deleteProduct();

    });
}

function deleteProduct() {
    console.log("Deleting all strawberry ice creams...\n");

    connection.query("DELETE FROM products WHERE ?", {
        "flavor": "strawberry"

    }, (error, result) => {
        console.log(result.affectedRows + " products deleted!\n");

        readProducts();

    });
}

function clearScreen() {
    process.stdout.write("\033c");
}