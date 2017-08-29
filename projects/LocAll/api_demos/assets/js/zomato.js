// Find all bbq locations in Austin, TX
const api_url = "https://developers.zomato.com/api/v2.1/search?q=bbq%2C%20barbecue&lat=30.307182&lon=-97.755996&radius=100000";

$.ajax({
    url       : api_url,
    method    : "GET",
    dataType  : "JSON",
    beforeSend: setHeader

}).done(function(response) {
    const restaurants = [];

    response.restaurants.forEach(r => {
        // Create a custom object
        const restaurant = {
            "name"    : r.restaurant.name,
            "location": {
                "address": r.restaurant.location.address,
                "city"   : r.restaurant.location.city,
                "state"  : "TX",
                "zipcode": r.restaurant.location.zipcode,
                "lat"    : parseFloat(r.restaurant.location.latitude),
                "lng"    : parseFloat(r.restaurant.location.longitude)
            },
            "website" : null,
            "image"   : r.restaurant.featured_image,
            "rating"  : parseFloat(r.restaurant.user_rating.aggregate_rating),
            "type"    : "bbq"
        };

        // Add the object to our array
        restaurants.push(restaurant);
    });
    
    console.table(restaurants);
});

function setHeader(xhr) {
    xhr.setRequestHeader('user-key', 'b5ee5402ab1c74adead9b0b432d1db0f');
}