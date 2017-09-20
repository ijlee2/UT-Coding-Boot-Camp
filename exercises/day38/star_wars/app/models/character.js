// Dependencies
// =============================================================
// This may be confusing but here Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection.js");

// Creates a "Character" model that matches up with DB
const Character = sequelize.define("character", {
    "routeName"  : {"type": Sequelize.STRING},
    "name"       : {"type": Sequelize.STRING},
    "role"       : {"type": Sequelize.STRING},
    "age"        : {"type": Sequelize.INTEGER},
    "forcePoints": {"type": Sequelize.INTEGER}
    
}, {
    "timestamps": false
});

// Syncs with DB
Character.sync();

// Makes the Character model available for other files (will also create a table)
module.exports = Character;