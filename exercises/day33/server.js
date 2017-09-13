// The url library allows us to parse parts of the request url.
const url    = require("url");
const http   = require("http");
const PORT   = 8080;
const server = http.createServer(handleRequest);

// Let's start our server
server.listen(PORT, function() {
    // Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

// We need a function which handles requests and send response
function handleRequest(request, response) {
    // Capturing the url the request is made to.
    const urlParts = url.parse(request.url);

    // When we visit different urls, the switch statement call on different functions.
    switch (urlParts.pathname) {
        case "/":
            displayRoot(urlParts.pathname, request, response);
            break;

        case "/portfolio":
            displayPortfolio(urlParts.pathname, request, response);
            break;

        case "/edit":
            console.log("display edit");
            break;

        default:
            display404(urlParts.pathname, request, response);
    }
}

// When we visit the "http://localhost:8080/" path, this function is run.
function displayRoot(url, request, response) {
    const output =
       `<html>
            <body>
                <h1>Home Page</h1>
                <a href="/portfolio">Portfolio</a>
            </body>
        </html>`;

    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(output);
}

// When we visit the "http://localhost:8080/portfolio" path, this function is run.
function displayPortfolio(url, request, response) {
    const output =
       `<html>
            <body>
                <h1>My Portfolio</h1>
                <a href="/">Go Home</a>
            </body>
        </html>`;

    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(output);
}

// When we visit any path that is not specifically defined, this function is run.
function display404(url, request, response) {
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("<h1>404 Not Found</h1>");
    response.end(`The page you were looking for: ${url} can not be found.`);
}