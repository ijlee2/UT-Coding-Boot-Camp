// Find all hiking trails in Austin, TX
const api_url = "https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=hiking&q[city_cont]=Austin&q[state_cont]=Texas&radius=50";

$.ajax({
    url       : api_url,
    method    : "GET",
    dataType  : "JSON",
    beforeSend: setHeader

}).done(function(response) {
    const trails = [];

    response.places.forEach(p => {
        // Create a custom object
        const trail = {
            "name"    : p.name,
            "location": {
                "address": null,
                "city"   : p.city,
                "state"  : p.state,
                "zipcode": null,
                "lat"    : p.lat,
                "lng"    : p.lon
            },
            "website" : p.activities[0].url,
            "image"   : null,
            "rating"  : p.activities[0].rating,
            "type"    : p.activities[0].activity_type_name
        };

        trails.push(trail);
    });

    console.table(trails);
});

function setHeader(xhr) {
    xhr.setRequestHeader('X-Mashape-Key', 'YJAiQK0Cirmshoi4JIWN51e4ZBWzp1FCJuTjsng1orgLvIxQK9');
}