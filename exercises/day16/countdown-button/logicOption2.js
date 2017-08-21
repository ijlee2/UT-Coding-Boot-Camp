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

// Set Initial Counter
var initialValue = 100;

var clickCounter = initialValue;

// --------------------------------------------------------------

// At the initial load, get a snapshot of the current data.
$("#click-value").text(initialValue);

// Print the initial data to the console.


// Change the html to reflect the initial value.


// Change the clickCounter to match the data in the database


// Log the value of the clickCounter


// Change the HTML Value


// If any errors are experienced, log them to console.

// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#click-button").on("click", function() {

  // Reduce the clickCounter by 1


  // Alert User and reset the counter


  // Save new value to Firebase


  // Log the value of clickCounter


});

// Whenever a user clicks the restart button
$("#restart-button").on("click", function() {

  // Set the clickCounter back to initialValue


  // Save new value to Firebase


  // Log the value of clickCounter


  // Change the HTML Values

});
