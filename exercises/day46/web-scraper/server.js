// Students: Using this template, the cheerio documentation, and what you've
// you've learned in class so far, scrape a website of your choice, save
// information from the page in a result array, and log it to the console.
const cheerio = require("cheerio");
const request = require("request");

// Make a request call to grab the HTML body from the site of your choice
request("http://www.neogaf.com/forum/forumdisplay.php?f=2", (error, response, html) => {
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    const $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    const results = [];

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $(`#threadbits_forum_2 tr.threadbit td:nth-of-type(2)`).each((index, element) => {
        const selector = $(element).find("div").find("a");

        const title = selector.text();
        const link  = `http://www.neogaf.com/forum/${selector.attr("href")}`;

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({title, link});
    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(JSON.stringify(results, null, 4));
});