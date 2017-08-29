/****************************************************************************
 ****************************************************************************
    
    Configure Firebase
    
*****************************************************************************
*****************************************************************************/
const config = {
    "apiKey"           : "AIzaSyDjGV94on0gidAzG2sLCy5F8s-tkQXAzPc",
    "authDomain"       : "locall-atx512.firebaseapp.com",
    "databaseURL"      : "https://locall-atx512.firebaseio.com",
    "projectId"        : "locall-atx512",
    "storageBucket"    : "locall-atx512.appspot.com",
    "messagingSenderId": "1032168672035"
};

firebase.initializeApp(config);

const database_recommendations = firebase.database().ref("recommendations");



/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
// For making recommendations
let   recommendations;
const numRecommendations_max = 10, metric_max = 7;

// For Google Maps
let   map, infowindow;
let   markers     = [];
const markerIcons = {
    "eat"  : "assets/images/eat.png",
    "play" : "assets/images/play.png",
    "drink": "assets/images/drink.png"
};

const locations_in_austin = {
    "central": {"lat": 30.284919, "lng": -97.734057},  // UT Austin
    "north"  : {"lat": 30.402065, "lng": -97.725883},  // The Domain
    "west"   : {"lat": 30.343171, "lng": -97.835514},  // Emma Long Metropolitan Park
    "east"   : {"lat": 30.263466, "lng": -97.695904},  // Austin Bouldering Project
    "south"  : {"lat": 30.256079, "lng": -97.763509}   // Alamo Drafthouse South Lamar
};



/****************************************************************************
 ****************************************************************************
    
    Respond to user actions
    
*****************************************************************************
*****************************************************************************/
let eventNames = ["", "", "", ""];

$("select").change(function() {
    const events = $("select option:selected");
    const index  = $("select").index(this);

    eventNames[index] = events[index].value;

    // Display recommendations once the user selects all options
    if (eventNames.filter((a) => a !== "").length === eventNames.length) {
        displayRecommendations(eventNames);
    }
});



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
    return 2 * r * Math.sqrt(Math.pow(Math.sin((lat2_rad - lat1_rad) / 2), 2) + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.pow(Math.sin((lng2_rad - lng1_rad) / 2), 2));
}



/****************************************************************************
 ****************************************************************************
    
    Create recommendations
    
*****************************************************************************
*****************************************************************************/
function createBins(data) {
    let bins = [0], bin_count = 0;

    data.forEach(d => {
        bin_count += Math.round(1000000 * d.probability);

        bins.push(bin_count);
    });

    return bins;
}


function displayRecommendations(eventNames) {
    const directoryName = `${eventNames[0]}_${eventNames[1]}_${eventNames[2]}`;
    const myLocation    = locations_in_austin[eventNames[3]];
    
    // Temporary variables
    let i, j;
    let bins, bin_max;
    let randomNumber;

    database_recommendations.child(directoryName).once("value", function(snapshot) {
        // Reset our recommendations
        recommendations = [];

        // Recommend events near the user
        const data = snapshot.val().filter((a) => spherical_distance(a.center, myLocation) < metric_max);

        // Select recommendations at random
        for (i = 0; i < numRecommendations_max; i++) {
            // Create bins
            bins    = createBins(data);
            bin_max = bins[bins.length - 1];

            // Select a number at random
            randomNumber = Math.floor(bin_max * Math.random());

            // Find the correct bin
            for (j = 0; j < (bins.length - 1); j++) {
                if (bins[j] <= randomNumber && randomNumber < bins[j + 1]) {
                    // Save the recommendation
                    recommendations.push(...data.splice(j, 1));

                    break;
                }
            }
        }
        
        // Display recommendations
        let names, output = "";

        recommendations.forEach(r => {
            names = `<p>▪ ${r.eat.name}</p><p>▪ ${r.play.name}</p><p>▪ ${r.drink.name}</p>`;

            output += `<tr><td>${names}</td><td>${r.metric.toFixed(3)}</td></tr>`;
        });

        $("#recommendations tbody").html(output);
    });
}



/****************************************************************************
 ****************************************************************************
    
    Display the map
    
*****************************************************************************
*****************************************************************************/
function displayMap() {
    // Initialize the map (only allow zooms)
    map = new google.maps.Map(document.getElementById("map"), {
        "center"          : {"lat": 30.2849, "lng": -97.7341},
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
    const r      = recommendations[$("tbody tr").index(this)];
    const places = {"eat": r.eat, "play": r.play, "drink": r.drink};
    
    // Adjust the center of the map
    map.setCenter(r.center);

    // Adjust the zoom level
    map.setZoom(Math.max(10, 15 - Math.floor(1 + r.metric / 3)));
    
    // Place a marker for each place
    for (let key in places) {
        const p = places[key];

        const marker = new google.maps.Marker({
            "map"     : map,
            "position": p.geometry,
            "icon"    : markerIcons[key]
        });

        // Provide additional information
        google.maps.event.addListener(marker, "click", function() {
            const phone   = (p.phone)   ? `${p.phone}<br>` : "";
            const website = (p.website) ? `<a href="${p.website}" target="_blank">Visit their website</a>` : "";
            const output  = `<div><strong>${p.name}</strong><br>${p.location.street}<br>${phone}${website}</div>`;

            infowindow.setContent(output);
            infowindow.open(map, this);
        });

        markers.push(marker);
    }
});