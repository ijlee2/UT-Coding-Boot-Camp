// The url library allows us to parse parts of the request url.
const fs     = require("fs");
const http   = require("http");
const url    = require("url");
const PORT   = 8080;
const server = http.createServer(handleRequest);

// Let's start our server
server.listen(PORT, function() {
    // Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

// We need a function which handles requests and send response
const redirect = {
    "/"          : `${__dirname}/server_favorites_index.html`,
    "/foods"     : `${__dirname}/server_favorites_foods.html`,
    "/movies"    : `${__dirname}/server_favorites_movies.html`,
    "/frameworks": `${__dirname}/server_favorites_frameworks.html`
}

function handleRequest(request, response) {
    // Capturing the url the request is made to.
    const urlParts = url.parse(request.url);

    // When we visit different urls, the switch statement call on different functions.
    if (Object.keys(redirect).indexOf(urlParts.pathname) >= 0) {
        const url = redirect[urlParts.pathname];

        displayPage(url, request, response);

    } else {
        display404(urlParts.pathname, request, response);

    }
}

function displayPage(url, request, response) {
    fs.readFile(url, (error, data) => {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end(data);
    });
}

// When we visit any path that is not specifically defined, this function is run.
function display404(url, request, response) {
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("<h1>404 Not Found</h1>");
    response.end(`The page you were looking for: ${url} can not be found.`);
}