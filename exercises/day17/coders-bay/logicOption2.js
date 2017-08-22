// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

// Assign the reference to the database to a variable named 'database'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyByDtP67YOC3WoitTjlBNB8fX5Dyh1VM90",
    authDomain: "uniquename-1fcfd.firebaseapp.com",
    databaseURL: "https://uniquename-1fcfd.firebaseio.com",
    projectId: "uniquename-1fcfd",
    storageBucket: "uniquename-1fcfd.appspot.com",
    messagingSenderId: "266770525866"
};

firebase.initializeApp(config);

var database = firebase.database();


// Initial Values
var initialBidder = "No one :-(";
var initialBid    = 0;
var highBidder    = initialBidder;
var highPrice     = initialBid;

// --------------------------------------------------------------

// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {
    // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("highPrice").exists() && snapshot.child("highBidder").exists()) {
        // Set the local variables for highBidder equal to the stored values in firebase.
        highBidder = snapshot.val().highBidder;
        highPrice  = snapshot.val().highPrice;

        // change the HTML to reflect the newly updated local values (most recent information from firebase)
        $("#highest-bidder").text(highBidder);
        $("#highest-price").text("$" + highPrice);

        // Print the local data to the console.
        console.log("Highest bidder: " + highBidder);
        console.log("Highest price: " + highPrice);

    // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
    } else {
        // Change the HTML to reflect the local value in firebase
        $("#highest-bidder").text(highBidder);
        $("#highest-price").text("$" + highPrice);

        // Print the local data to the console.
        console.log("Highest bidder: " + highBidder);
        console.log("Highest price: " + highPrice);

    }

// If any errors are experienced, log them to console.
}, function (error) {
    console.log("The read failed: " + error.code);

});


// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
    // prevent form from submitting with event.preventDefault() or returning false
    event.preventDefault();

    // Get the input values
    var bidderName  = $("#bidder-name").val().trim();
    var bidderPrice = parseFloat($("#bidder-price").val().trim());

    // Log the Bidder and Price (Even if not the highest)
    console.log("New bidder: " + bidderName);
    console.log("New price: " + bidderPrice);

    // If Then statements to compare against previous high bidder
    if (bidderPrice > highPrice) {
        // Alert that they are High Bidder
        console.log("You are now the highest bidder.");
        
        // Store the new high price and bidder name as a local variable (could have also used the firebase variable)
        highBidder = bidderName;
        highPrice  = bidderPrice;
        console.log(highPrice)
        
        // Save the new price in Firebase
        database.ref().set({"highBidder": highBidder,
                            "highPrice" : highPrice});

        // Log the new High Price
        console.log("New highest bidder: " + highBidder);
        console.log("New highest price: " + highPrice);

        // Change the HTML to reflect the new high price and bidder
        $("#highest-bidder").text(highBidder);
        $("#highest-price").text(highPrice);

    // Else tell user their bid was too low via alert
    } else {
        console.log("Your bid was too low.");

    }
});