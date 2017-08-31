const bands = require("./band.js").bands;

for (let genre in bands) {
    console.log(`An example of a ${genre} band is ${bands[genre]}.`);
}

if (process.argv.length === 3) {
    const query = process.argv[2];

    console.log(`Search for a ${query} band:`);
    
    if (bands.hasOwnProperty(query)) {
        console.log(`Result: ${bands[query]}`);

    } else {
        console.log("Result: Not found");
        
    }
}