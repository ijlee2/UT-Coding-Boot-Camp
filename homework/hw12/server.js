/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const express    = require("express");
const path       = require("path");
const bodyParser = require("body-parser");

const app  = express();
const PORT = process.env.PORT || 3000;

const directory_public = path.join(__dirname, "app", "public");
const directory_routes = path.join(__dirname, "app", "routes");

// Set public directory
app.use(express.static(directory_public));

// Set up Express to handle parsing data
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({"extended": true}));



/****************************************************************************
 ****************************************************************************
    
    Set up routes
    
*****************************************************************************
*****************************************************************************/
const router_html = require(path.join(directory_routes, "html_routes.js"));
const router_api  = require(path.join(directory_routes, "api_routes.js"));

app.use("/", router_html);
app.use("/api", router_api);



/****************************************************************************
 ****************************************************************************
    
    Listen for connections on the port
    
*****************************************************************************
*****************************************************************************/
app.listen(PORT, () => console.log(`App listening on ${PORT}.`));