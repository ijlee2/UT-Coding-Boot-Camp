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

const database = firebase.database();
const database_eat   = database.ref("events").child("eat");
const database_play  = database.ref("events").child("play");
const database_drink = database.ref("events").child("drink");
const database_recommendations = database.ref("recommendations");

// ADMIN TODO: Uncomment to remove existing databases (be careful!)
//database_recommendations.remove();



/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
// For making recommendations
const numRecommendations_max = 400, metric_max = 10;

// Possible events
const eventNames_eat   = ["asian"  , "bbq"    , "indian" , "pizza"  , "tex-mex"];
const eventNames_play  = ["bowl"   , "hike"   , "movie"  , "spa"    , "swim"   ];
const eventNames_drink = ["bar"    , "brewery", "coffee" , "tea"    , "wine"   ];

function loadDatabases(eventName_eat, eventName_play, eventName_drink) {
    let   eat, play, drink;
    const directoryName = `${eventName_eat}_${eventName_play}_${eventName_drink}`;

    // When the page loads
    database_eat.child(eventName_eat).on("value", function(snapshot) {
        eat = snapshot.val();

        database_play.child(eventName_play).on("value", function(snapshot) {
            play = snapshot.val();

            database_drink.child(eventName_drink).on("value", function(snapshot) {
                drink = snapshot.val();

                createRecommendations(eat, play, drink, directoryName);
            });
        });
    });
}

// ADMIN TODO: Create 25 databases at a time
// eventIndex = 0, 1, 2, 3, 4
const eventIndex = 0;

eventNames_play.forEach(eventName_play =>
    eventNames_drink.forEach(eventName_drink =>
        loadDatabases(eventNames_eat[eventIndex], eventName_play, eventName_drink)
    )
)



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
function createRecommendations(eat, play, drink, directoryName) {
    // Variables that we will store in Firebase
    let data = [], bins = [0];

    // Temporary variables
    let key1, key2, key3;
    let event1, event2, event3;
    let a, b, c;
    let metric;
    let latitude, longitude;
    let temp, total = 0;

    for (key1 in eat) {
        // Ignore the proto method
        if (!eat.hasOwnProperty(key1)) {
            continue;
        }

        event1 = eat[key1];

        for (key2 in play) {
            if (!play.hasOwnProperty(key2)) {
                continue;
            }

            event2 = play[key2];

            // Find the distance between points
            a = spherical_distance(event1.geometry, event2.geometry);

            for (key3 in drink) {
                if (!drink.hasOwnProperty(key3)) {
                    continue;
                }

                event3 = drink[key3];

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
                    temp = 1 / Math.pow(Math.log(1 + metric), 2);

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
            }
        }
    }

    // List our recommendations from best to worst (low to high metric)
    data.sort(function(a, b) {
        return a.metric - b.metric;
    });

    if (data.length > numRecommendations_max) {
        data.splice(numRecommendations_max, data.length - numRecommendations_max);
    }

    // Assign the probability that a recommendation occurs
    data.forEach(d => d.probability /= total);

    // Save to Firebase
    database_recommendations.child(directoryName).set(data);

    console.log(`${directoryName} successfully created.\nNumber of recommendations: ${data.length}`);
}