/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const express    = require("express");
const bodyParser = require("body-parser");
const mysql      = require("mysql");

const app  = express();
const PORT = process.env.PORT || 3000;

// Set up Express to handle parsing data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.text());

// Set up MySQL
const connection = mysql.createConnection({
    "host"    : "localhost",
    "port"    : 3306,
    "user"    : "root",
    "password": "",
    "database": "house_db"
});

connection.connect(error => {
    if (error) throw error;
});



/****************************************************************************
 ****************************************************************************
    
    Set up routes
    
*****************************************************************************
*****************************************************************************/
// Display actors by id
app.get("/cast", function(req, res) {
    connection.query("SELECT * FROM actors ORDER BY id", (error, results) => {
        if (error) throw error;

        let output = "<h1>Display actors by ID</h1>";

        results.forEach(r => {
            output +=
                `<ul>
                     <li>ID: ${r.id}</li>
                     <li>Name: ${r.name}</li>
                     <li>Coolness: ${r.coolness_points}</li>
                     <li>Attitude: ${r.attitude}</li>
                 </ul>`;
        });

        res.send(output);
    });
});

// Display actors by coolness (descending)
app.get("/coolness-chart", function(req, res) {
    connection.query("SELECT * FROM actors ORDER BY coolness_points DESC, id", (error, results) => {
        if (error) throw error;

        let output = "<h1>Display actors by Coolness Points</h1>";

        results.forEach(r => {
            output +=
                `<ul>
                     <li>ID: ${r.id}</li>
                     <li>Name: ${r.name}</li>
                     <li>Coolness: ${r.coolness_points}</li>
                     <li>Attitude: ${r.attitude}</li>
                 </ul>`;
        });

        res.send(output);
    });
});

// Display actors with a particular attitude
app.get("/attitude-chart/:att", function(req, res) {
    const attitude = req.params.att;

    connection.query(`SELECT * FROM actors WHERE attitude = "${attitude}" ORDER BY id`, (error, results) => {
        if (error) throw error;

        let output = `<h1>Display actors who are ${attitude}</h1>`;

        results.forEach(r => {
            output +=
                `<ul>
                     <li>ID: ${r.id}</li>
                     <li>Name: ${r.name}</li>
                     <li>Coolness: ${r.coolness_points}</li>
                     <li>Attitude: ${r.attitude}</li>
                 </ul>`;
        });

        res.send(output);
    });
});



/****************************************************************************
 ****************************************************************************
    
    Helper functions
    
*****************************************************************************
*****************************************************************************/
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});