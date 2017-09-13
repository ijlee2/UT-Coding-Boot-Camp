const http = require("http");


// Select a port number that won't be in conflict
const port_good   = 7000;
const port_bad    = 7500;
const server_good = http.createServer(displayGoodMessage);
const server_bad  = http.createServer(displayBadMessage);

server_good.listen(port_good, function() {
    console.log(`Good server listening on: http://localhost:${port_good}`);
});

server_bad.listen(port_bad, function() {
    console.log(`Bad server listening on: http://localhost:${port_bad}`);
});


const goodMessages = [
    "You are awesome!",
    "You go, girl!",
    "You are beautiful!",
    "The sun shines because of you."
];

const badMessages = [
    "You disappoint me.",
    "Is that all you can do?",
    "Tsk, tsk, tsk.",
    "Why bother?"
];

function displayGoodMessage(request, response) {
    const index = Math.floor(goodMessages.length * Math.random());

    response.end(`<h1>${goodMessages[index]}</h1>`);
}

function displayBadMessage(request, response) {
    const index = Math.floor(badMessages.length * Math.random());

    response.end(`<h1>${badMessages[index]}</h1>`);
}