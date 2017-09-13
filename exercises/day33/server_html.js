// Dependencies
const http = require("http");
const fs   = require("fs");

// Set our port to 8080
const PORT = 8080;

// Create our server
const server = http.createServer(handleRequest);

// Create a function for handling the requests and responses coming into our server
function handleRequest(request, response) {
    // Here we use the fs package to read our index.html file
    fs.readFile(`${__dirname}/server_html_index.html`, (error, data) => {
        // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
        // an html file.
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end(data);
    });
}

// Starts our server
server.listen(PORT, function() {
    console.log(`Server is listening on PORT: ${PORT}`);
});