/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
// Use Express
const express        = require("express");
const path           = require("path");
const app            = express();

// For making requests
const methodOverride = require("method-override");
const bodyParser     = require("body-parser");

// For real-time notification
const http           = require("http");
const socketIO       = require("socket.io");

// For MongoDB
const mongoose       = require("mongoose");

// Use CORS to bypass security
const cors           = require("cors");

// Set port number
const PORT = process.env.PORT || 3001;



/****************************************************************************
 ****************************************************************************
    
    Set models
    
*****************************************************************************
*****************************************************************************/
// Configure mongoose
mongoose.Promise = Promise;

mongoose.connect("mongodb://heroku_9d5g2039:b02qd7irk8mcfrft78drfu7u15@ds013495.mlab.com:13495/heroku_9d5g2039", {"useMongoClient": true});

const db = mongoose.connection;

// Log errors if mongodb runs into an issue
db.on("error", error => {
    console.log(`Database Error: ${error}`);
});

// Log success once we connect to the database through mongoose
db.once("open", () => {
    console.log("Mongoose connection successful.");
});



/****************************************************************************
 ****************************************************************************
    
    Set up views
    
*****************************************************************************
*****************************************************************************/
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

// Set up CORS
app.use(cors());

// Set up Express to handle parsing data
app.use(bodyParser.json());
app.use(bodyParser.text());

// Set extended to true so that we can parse arrays of input fields
app.use(bodyParser.urlencoded({"extended": true}));



/****************************************************************************
 ****************************************************************************
    
    Set controllers
    
*****************************************************************************
*****************************************************************************/
// Override POST methods to handle PATCH and DELETE
app.use(methodOverride("_method"));

// Set routers
const router_api = require(path.join(__dirname, "controllers", "api_routes.js"));

// Talk to routers (order matters here)
app.use("/api", router_api);

// Display the single page app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));

});



/****************************************************************************
 ****************************************************************************
    
    Listen for connections on the port
    
*****************************************************************************
*****************************************************************************/
const server = http.createServer(app);
const io     = socketIO(server);

io.on("connection", socket => {
    socket.on("articleSaved", data => {
        // Alert everyone else
        socket.broadcast.emit("alertEveryoneElse", `${data.user} saved the article "${data.title}!"`);
        
    });
});

// Start the server
server.listen(PORT, () => console.log(`App listening on ${PORT}.`));