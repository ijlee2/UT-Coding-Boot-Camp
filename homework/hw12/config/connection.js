/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const mysql = require("mysql");

// Connect to MySQL
/*
const pool = mysql.createPool({
    "connectionLimit"   : 10,
    "host"              : "ysp9sse09kl0tzxj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "port"              : 3306,
    "user"              : "l7g2iikw6shnok4f",
    "password"          : "atw1sx49swurflkj",
    "database"          : "yfpdqkylr03ge45y",
    "multipleStatements": true
});*/

/* For testing on localhost */
const connection = mysql.createConnection({
    "host"              : "localhost",
    "port"              : 3306,
    "user"              : "root",
    "password"          : "",
    "database"          : "burgers_db",
    "multipleStatements": true
});

connection.connect(error => {
    if (error) throw error;

    console.log(`Database connected as thread ${connection.threadId}.`);
});

module.exports = connection;