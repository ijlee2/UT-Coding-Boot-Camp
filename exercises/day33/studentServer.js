const http = require("http");
const port = 8080;

function handleRequest(request, response) {
    response.end(`It works! Path hit: ${request.url}`);
}