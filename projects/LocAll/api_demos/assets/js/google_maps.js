let map;

const places = [
    {
        "name"   : "Rudy's BBQ",
        "address": "512 W 29th Street, Austin 78705",
        "lat"    :  30.295317,
        "lng"    : -97.742369
    },

    {
        "name"   : "Bert's BBQ",
        "address": "907 W 24th Street, Austin 78705",
        "lat"    :  30.288106,
        "lng"    : -97.747453
    },
    
    {
        "name"   : "BBQ Revolution",
        "address": "3111 Manor Road, Austin 78723",
        "lat"    :  30.315499,
        "lng"    : -97.716711
    }
];

function displayMap() {
    // Find the center of all bbq places
    const center = {"lat": 0, "lng": 0};

    places.forEach(p => {
        center.lat += p.lat;
        center.lng += p.lng;
    });

    center.lat /= places.length;
    center.lng /= places.length;

    // Create the map
    map = new google.maps.Map(document.getElementById("map"), {
        "center": center,
        "zoom"  : 13
    });
    
    // Place a marker for each bbq place
    places.forEach(p => {
        new google.maps.Marker({
            "position": {"lat": p.lat, "lng": p.lng},
            "map"     : map
        });
    });
}