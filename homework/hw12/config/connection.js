/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const mysql = require("mysql");

// Connect to MySQL
const connection = mysql.createConnection({
    "connectionLimit"   : 10,
    "host"              : "xq7t6tasopo9xxbs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "port"              : 3306,
    "user"              : "hm1lc2ulcte784rs",
    "password"          : "f3zwbvolinwcctn4",
    "database"          : "brvxapelkn8nfbdt",
    "multipleStatements": true
});

/* For testing on localhost
const connection = mysql.createConnection({
    "host"              : "localhost",
    "port"              : 3306,
    "user"              : "root",
    "password"          : "",
    "database"          : "burgers_db",
    "multipleStatements": true
});
*/

connection.connect(error => {
    if (error) throw error;

    console.log(`Database connected as thread ${connection.threadId}.`);
});

module.exports = connection;