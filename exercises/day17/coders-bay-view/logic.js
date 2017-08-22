/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)         
var config = {
    apiKey: "AIzaSyByDtP67YOC3WoitTjlBNB8fX5Dyh1VM90",
    authDomain: "uniquename-1fcfd.firebaseapp.com",
    databaseURL: "https://uniquename-1fcfd.firebaseio.com",
    projectId: "uniquename-1fcfd",
    storageBucket: "uniquename-1fcfd.appspot.com",
    messagingSenderId: "266770525866"
};

firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

// --------------------------------------------------------------
// Link to Firebase Database for viewer tracking
var connectionsRef = database.ref("/connections");
var connectedRef   = database.ref(".info/connected");

// --------------------------------------------------------------
// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------
// Add ourselves to presence list when online.
connectedRef.on("value", function(snap) {
  // If they are connected
  if (snap.val()) {
    // Add the user to the connections list
    var con = connectionsRef.push(true);

    // Remove the user from the connections list when they disconnect
    con.onDisconnect().remove();
  }
});

// Number of online users is the number of objects in the presence list.
connectionsRef.on("value", function(snap) {
  $("#connected-viewers").text(snap.numChildren());
});


// ----------------------------------------------------------------
// At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the values within the firebase node bidderData changes
database.ref("/bidderData").on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the local variables for highBidder equal to the stored values in firebase.
    highBidder = snapshot.val().highBidder;
    highPrice = parseInt(snapshot.val().highPrice);

    // change the HTML to reflect the newly updated local values (most recent information from firebase)
    $("#highest-bidder").html(snapshot.val().highBidder);
    $("#highest-price").html("$" + snapshot.val().highPrice);

    // Print the local data to the console.
    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice);
  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the local value in firebase
    $("#highest-bidder").html(highBidder);
    $("#highest-price").html("$" + highPrice);

    // Print the local data to the console.
    console.log("local High Price");
    console.log(highBidder);
    console.log(highPrice);
  }

// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function() {

  // Get the input values
  var bidderName = $("#bidder-name").val().trim();
  var bidderPrice = parseInt($("#bidder-price").val().trim());

  // Log to console the Bidder and Price (Even if not the highest)
  

  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref("/bidderData").set({
      highBidder: bidderName,
      highPrice: bidderPrice
    });

    // Log the new High Price
    console.log("New High Price!");
    console.log(bidderName);
    console.log(bidderPrice);

    // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)
    highBidder = bidderName;
    highPrice = parseInt(bidderPrice);

    // Change the HTML to reflect the new high price and bidder
    $("#highest-bidder").html(bidderName);
    $("#highest-price").html("$" + bidderPrice);
    
  }
  else {

    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

  // Prevent default behavior
  event.preventDefault();
});
