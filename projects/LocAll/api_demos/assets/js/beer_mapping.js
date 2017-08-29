// Find all beer locations in Austin, TX
const api_url = "https://beermapping.com/webservice/loccity/68a06dbe893eb0da2b905eecb80e8c2f/austin,tx&s=json";

$.getJSON(api_url, function(response) {
    const breweries = [];

    response.forEach(b => {
        // Create a custom object
        const brewery = {
            "name"    : b.name,
            "location": {
                "address": b.street,
                "city"   : b.city,
                "state"  : b.state,
                "zipcode": b.zip,
                "lat"    : null,
                "lng"    : null
            },
            "website" : b.url,
            "image"   : null,
            // Make the rating out of 5 stars (1 decimal point)
            "rating"  : Math.round(parseFloat(b.overall) / 2) / 10,
            "type"    : "brewery"
        };

        // Add the object to our array
        breweries.push(brewery);
    });

    console.table(breweries);
});