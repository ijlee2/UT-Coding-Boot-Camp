/****************************************************************************
 ****************************************************************************
    
    Test case
    
*****************************************************************************
*****************************************************************************/
const eat = [
    {"name": "Stubb's"       , "geometry": {"lat": 30.268490, "lng": -97.736156}},
    {"name": "Franklin"      , "geometry": {"lat": 30.270119, "lng": -97.731273}},
    {"name": "SLAB"          , "geometry": {"lat": 30.370630, "lng": -97.725124}},
    {"name": "Stiles"        , "geometry": {"lat": 30.334553, "lng": -97.721391}},
    {"name": "Black's"       , "geometry": {"lat": 30.298485, "lng": -97.741200}},
    {"name": "Green Mesquite", "geometry": {"lat": 30.261519, "lng": -97.759200}}
];

const play = [
    {"name": "Chisholm"      , "geometry": {"lat": 30.511925, "lng": -97.689391}},
    {"name": "Copperfield"   , "geometry": {"lat": 30.388973, "lng": -97.655342}},
    {"name": "Roy and Ann"   , "geometry": {"lat": 30.264217, "lng": -97.755940}},
    {"name": "Ranch Trails"  , "geometry": {"lat": 30.523158, "lng": -97.770973}},
    {"name": "Great Hills"   , "geometry": {"lat": 30.410463, "lng": -97.755936}}
];

const drink = [
    {"name": "Draught House" , "geometry": {"lat": 30.311071, "lng": -97.742874}},
    {"name": "Brew Exchange" , "geometry": {"lat": 30.270356, "lng": -97.749884}},
    {"name": "NXNW"          , "geometry": {"lat": 30.391162, "lng": -97.738351}},
    {"name": "Jester King"   , "geometry": {"lat": 30.232402, "lng": -98.000223}},
    {"name": "Lazarus"       , "geometry": {"lat": 30.261739, "lng": -97.722008}},
    {"name": "Wright Bros"   , "geometry": {"lat": 30.264564, "lng": -97.733129}}
];



/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
// A metric allows us to make a quantitative recommendation
const metric_max = 20;

// For Google Maps
let   map, infowindow;
const location_austin = {"lat": 30.284919, "lng": -97.734057};

let   markers     = [];
const markerIcons = {
    "eat"  : "assets/images/eat.png",
    "play" : "assets/images/play.png",
    "drink": "assets/images/drink.png"
};



/****************************************************************************
 ****************************************************************************
    
    Distance formula
    
*****************************************************************************
*****************************************************************************/
const deg_to_rad = Math.PI / 180;

// Radius of Earth (in miles)
const r = 6371 / 1.60934;

// Haversine formula
function spherical_distance(point1, point2) {
    const lat1_rad = point1.lat * deg_to_rad;
    const lng1_rad = point1.lng * deg_to_rad;

    const lat2_rad = point2.lat * deg_to_rad;
    const lng2_rad = point2.lng * deg_to_rad;

    // Find the distance
    return 2 * r * Math.sqrt(Math.sin((lat2_rad - lat1_rad) / 2) ** 2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin((lng2_rad - lng1_rad) / 2) ** 2);
}



/****************************************************************************
 ****************************************************************************
    
    Create recommendations
    
*****************************************************************************
*****************************************************************************/
// Our recommendations
let data = [];

// Temporary variables
let a, b, c;
let metric;
let latitude, longitude;
let temp, total = 0;

eat.forEach(event1 => {
    play.forEach(event2 => {
        // Find the distance between points
        a = spherical_distance(event1.geometry, event2.geometry);

        drink.forEach(event3 => {
            // Find the distance between points
            b = spherical_distance(event2.geometry, event3.geometry);
            c = spherical_distance(event3.geometry, event1.geometry);

            // Use the spherical perimeter as our metric
            metric = a + b + c;

            // Save the recommendation if it is good
            if (metric < metric_max) {
                // Find the center of the 3 places
                latitude  = (event1.geometry.lat + event2.geometry.lat + event3.geometry.lat) / 3;
                longitude = (event1.geometry.lng + event2.geometry.lng + event3.geometry.lng) / 3;

                // Un-normalized probability
                temp = 1 / (Math.log(1 + metric) ** 2);

                data.push({
                    "eat"        : event1,
                    "play"       : event2,
                    "drink"      : event3,
                    "center"     : {"lat": latitude, "lng": longitude},
                    "metric"     : metric,
                    "probability": temp
                });

                // Keep track of the total for normalization
                total += temp;
            }
        });
    });
});

// List our recommendations from best to worst (low to high metric)
data.sort(function(a, b) {
    return a.metric - b.metric;
});

// Assign the probability that a recommendation occurs
data.forEach(d => d.probability /= total);



/****************************************************************************
 ****************************************************************************
    
    Display recommendations
    
*****************************************************************************
*****************************************************************************/
let names, output = "";

data.forEach(d => {
    names = `<p>▪ ${d.eat.name}</p><p>▪ ${d.play.name}</p><p>▪ ${d.drink.name}</p>`;

    output += `<tr><td>${names}</td><td>${d.metric.toFixed(3)}</td><td>${d.probability.toFixed(4)}</td></tr>`;
});

$("#recommendations tbody").html(output);



/****************************************************************************
 ****************************************************************************
    
    Display map
    
*****************************************************************************
*****************************************************************************/
function displayMap() {
    // Initialize the map (only allow zooms)
    map = new google.maps.Map(document.getElementById("map"), {
        "center"          : location_austin,
        "disableDefaultUI": true,
        "zoomControl"     : true,
        "zoom"            : 13
    });

    infowindow = new google.maps.InfoWindow();
}

// Respond to clicks on dynamically generated rows
$("body").on("click", "tbody tr", function() {
    // Delete existing markers
    markers.forEach(m => m.setMap(null));
    markers = [];
    
    // Find out which row was clicked
    const d = data[$("tbody tr").index(this)];
    const places = {"eat": d.eat, "play": d.play, "drink": d.drink};
    
    // Adjust the center of the map
    map.setCenter(d.center);

    // Adjust the zoom level
    map.setZoom(Math.max(10, 15 - Math.floor(1 + d.metric / 3)));
    
    // Place a marker for each place
    for (let key in places) {
        const marker = new google.maps.Marker({
            "map"     : map,
            "position": places[key].geometry,
            "icon"    : markerIcons[key]
        });

        google.maps.event.addListener(marker, "click", function() {
            const output = `<div><strong>${places[key].name}</strong></div>`;

            infowindow.setContent(output);
            infowindow.open(map, this);
        });

        markers.push(marker);
    }
});