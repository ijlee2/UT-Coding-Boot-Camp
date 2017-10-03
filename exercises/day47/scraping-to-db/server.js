/* Students: Using the tools and techniques you learned so far, you will scrape
 * a website of your choice, then place the data in a MongoDB database. Be sure
 * to make the database and collection before running this exercise.

 * Consult the assignment files from earlier in class if you need a refresher
 * on Cheerio. */

// Dependencies
const express = require("express");
const mongojs = require("mongojs");
const request = require("request");
const cheerio = require("cheerio");

// Initialize Express
const app = express();

// Database configuration
const databaseUrl = "scraper";
const collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
const db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
    console.log("Database Error:", error);
});

// Allow bulk insertion
const bulk = db.scrapedData.initializeOrderedBulkOp();

// Main route (simple Hello World Message)
app.get("/", (req, res) => {
    res.send("Hello world");
});

// Retrieve all of the data
app.get("/all", (req, res) => {
    db.scrapedData.find((err, docs) => {
        if (err) throw err;

        res.json(docs);
    });
});

// Scrape data from the site of your choice, and save it to MongoDB
app.get("/scrape", (req, res) => {
    request("http://www.neogaf.com/forum/forumdisplay.php?f=2", (error, response, html) => {
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        const $ = cheerio.load(html);

        // An empty array to save the data that we'll scrape
//        const results = [];

        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $(`#threadbits_forum_2 tr.threadbit td:nth-of-type(2)`).each((index, element) => {
            const selector = $(element).find("div").find("a");

            const title = selector.text();
            const link  = `http://www.neogaf.com/forum/${selector.attr("href")}`;

            // Save title and link to the database
//            results.push({title, link});
            bulk.insert({title, link});
        });

        bulk.execute((error, results) => {
            if (error) throw error;

            console.log(results);

            res.send("Scraping complete!");
        })
    });
});

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});