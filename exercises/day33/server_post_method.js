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

        console.log("You just posted some data to the server!");
        console.log("Your data was " + requestData);
    });

    // When the request has ended...
    request.on("end", function() {
        const output =
            `<html>
                <head>
                    <title>Hello, guest!</title>
                </head>
                <body>
                    <h1>Thank you for subscribing!</h1>
                </body>
            </html>`;

        response.end(output);
    });
});

// Starts our server.
server.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
});