// Dependencies
const http = require("http");
const PORT = 8080;

const server = http.createServer(function(request, response) {
    // Saving the request method as a variable.
    const method      = request.method.toLowerCase();
    let   requestData = "";

    // When the server receives data, it will add it to requestData.
    request.on("data", function(data) {
        requestData += data;
    });

    // When the request has ended...
    request.on("end", function() {
        // We display the request method, as well as the data received!
        const output = `You just did ${method}.\n${requestData.toString()}`;
        console.log(output);

        response.end();
    });
});

// Starts our server.
server.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
});