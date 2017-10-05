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
const database_users           = firebase.database().ref("users");
const auth                     = firebase.auth();



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

$(function() {
    // Initialize the carousel
    let paused = false;

    $("#myCarousel").carousel({
        "interval": 1000,
        "pause"   : 0
    });

    // Trigger play
    $("#toggleCarousel").click(function() {
        $("#myCarousel").carousel((paused) ? "cycle" : "pause");
        $(this).find("i").toggleClass("fa-play fa-pause");

        paused != paused;
    });
});



/****************************************************************************
 ****************************************************************************
    
    Make recommendations
    
*****************************************************************************
*****************************************************************************/
const eventTypes = ["eat", "play", "drink", "location"];
let   eventNames = ["", "", "", ""];

$(".dropdown-item").click(function() {
    const eventName = $(this).text();
    const index     = Math.floor($(".dropdown-item").index(this) / 5);

    eventNames[index] = eventName.toLowerCase();

    // Change the text in HTML
    $(`#button_${eventTypes[index]}`).text(eventName);

    // Display recommendations once the user selects all options
    if (eventNames.filter(a => a !== "").length === eventNames.length) {
        $("#recommendations").html("<h2>Please wait!</h2>");

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
    return 2 * r * Math.sqrt(Math.sin((lat2_rad - lat1_rad) / 2) ** 2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin((lng2_rad - lng1_rad) / 2) ** 2);
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
            output +=
                `<div class="subContainer">
                    <div class="listItem food">
                        <div class="restaurantImage">
                            <p>${r.eat.name}</p>
                            <img height="150" width="150" src="${r.eat.image}" alt="${r.eat.name}">
                            <p>Rating: ${displayRating(r.eat)}</p>
                        </div>
                        <div class="columnTwo">
                            <p>${r.play.name}</p>
                            <img height="150" width="150" src="${r.play.image}" alt="${r.play.name}">
                            <p>Rating: ${displayRating(r.play)}</p>
                        </div>
                        <div class="item restaurantAddress">
                            <p>${r.drink.name}</p>
                            <img height="150" width="150" src="${r.drink.image}" alt="${r.drink.name}">
                            <p>Rating: ${displayRating(r.drink)}</p>
                        </div>
                    </div>
                </div>`;
        });

        $("#recommendations").html(output);
    });
}

function displayRating(event) {
    let rating = "";
    
    // Whole number
    for (let i = 1; i < event.rating; i++) {
        rating += "★";
    }

    // Fractional part
    if (Math.trunc(event.rating) !== event.rating) {
        rating += "½";
    }

    return rating;
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
$("body").on("click", ".subContainer", function() {
    // Delete existing markers
    markers.forEach(m => m.setMap(null));
    markers = [];

    // Find out which row was clicked
    const r      = recommendations[$(".subContainer").index(this)];
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



/****************************************************************************
 ****************************************************************************
    
    Respond to user actions
    
*****************************************************************************
*****************************************************************************/
$("#button_login").click(function() {
    $(".messageToUser").empty();

    const email    = $("#userEmail_login").val();
    const password = $("#userPassword_login").val();

    let status, validationPassed = true;

    status = checkEmail(email);

    if (status !== "success") {
        validationPassed = false;
        $(".messageToUser").append(`<p>${status}</p>`);
    }

    status = checkPassword(password);

    if (status !== "success") {
        validationPassed = false;
        $(".messageToUser").append(`<p>${status}</p>`);
    }

    if (validationPassed) {
       auth.signInWithEmailAndPassword(email, password)
            .then(function(user) {
                database_users.child(user.uid).once("value", function(snapshot) {
                    $(".messageToUser").text(`Welcome, ${snapshot.val().name}!`);
                    
                    setTimeout(function() {
                        window.location.replace("go_local.html");
                        
                    }, 2000);
                });
            })
            .catch(
                e => console.log(e.message)
            );
    }
});

$("#button_signup").click(function() {
    $(".messageToUser").empty();

    const name     = $("#userName_signup").val();
    const email    = $("#userEmail_signup").val();
    const password = $("#userPassword_signup").val();

    let status, validationPassed = true;

    status = checkName(name);

    if (status !== "success") {
        validationPassed = false;
        $(".messageToUser").append(`<p>${status}</p>`);
    }

    status = checkEmail(email);

    if (status !== "success") {
        validationPassed = false;
        $(".messageToUser").append(`<p>${status}</p>`);
    }

    status = checkPassword(password);

    if (status !== "success") {
        validationPassed = false;
        $(".messageToUser").append(`<p>${status}</p>`);
    }

    if (validationPassed) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(function(user) {
                database_users.child(user.uid).set({
                    "name"    : name,
                    "email"   : email
                });

                $(".messageToUser").text(`${name}, thanks for signing up!`);

                setTimeout(function() {
                        window.location.replace("go_local.html");

                }, 2000);
            })
            .catch(
                e => console.log(e.message)
            );
    }
});



/****************************************************************************
 ****************************************************************************
    
    Input validations
    
*****************************************************************************
*****************************************************************************/
let regex;

// Name consists of all letters and possibly a space
function checkName(name) {
    if (!name) {
        return "Please enter your name.";
    
    } else {
        regex = /^[a-z]+$/i;

        const names    = name.split(" ");
        const numNames = names.length;

        if (numNames <= 2 && !names[0].match(regex)) {
            return "Please enter only letters for your first name.";

        } else if (numNames === 2 && !names[1].match(regex)) {
            return "Please enter only letters for your last name.";

        } else if (numNames > 2) {
            return "Please enter only your first and last names.";

        }
    }

    return "success";
}

// Email must have format of ***@***.com (*** cannot be empty)
function checkEmail(email) {
    if (!email) {
        return "Please enter your email.";
    
    } else {
        regex = /^[a-z0-9._]+@[a-z]+.(com|net|edu)$/i;
        
        if (!email.match(regex)) {
            return "Please enter a valid email address (.com, .net, or .edu).";
        }
    }

    return "success";
}

// Password must have 8-64 characters and include 1 letter, 1 number, and 1 special character
function checkPassword(password) {
    if (!password) {
        return "Please enter your password.";
        
    } else {
        if (password.length < 8 || password.length > 64) {
            return "Password length must be between 8 and 64.";
        }

        regex = /[a-z]+/i;

        if (!password.match(regex)) {
            return "Password must contain at least 1 letter.";
        }

        regex = /[0-9]+/;

        if (!password.match(regex)) {
            return "Password must contain at least 1 number.";
        }

        regex = /[!@#$%^&*()<>{}\[\]-_+=|\\;:'",./?]+/;

        if (!password.match(regex)) {
            return "Password must contain at least 1 special character.";
        }
    }

    return "success";
}