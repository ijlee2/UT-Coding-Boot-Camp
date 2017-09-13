const http = require("http");

// Select a port number that won't be in conflict
const PORT = 8080;

function handleRequest(request, response) {
    response.end(`It works! Path hit: ${request.url}`);
}

// Call handleRequest whenever there is a request
const server = http.createServer(handleRequest);

server.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
});

// Type "node studentServer.js" in Bash and "http://localhost:8080" in the browser
// Also, try typing "http://localhost:8080/activities/videos/1/test?search=http" in the browser