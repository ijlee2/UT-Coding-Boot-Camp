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

var db_firebase = firebase.database();

// Set Initial Counter
var initialValue = 100;

var clickCounter = initialValue;

// Change the html to reflect the initial value.
$("#click-value").text(clickCounter);

// --------------------------------------------------------------

// At the initial load, get a snapshot of the current data.
db_firebase.ref().on("value", function(snapshot) {
  if (snapshot.val() == 0) {
    // Print the initial data to the console.
    console.log(snapshot.val());

    // Change the clickCounter to match the data in the database
    clickCounter = snapshot.val().clickCount;

    // Change the html value
    $("#click-value").text(clickCounter);
    
    // Log the value of the clickCounter
    console.log(clickCounter);
  }

}, function(error) {
  // If any errors are experienced, log them to console.
  console.log("The read failed: " + error.code);

});

// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#click-button").on("click", function() {
  // Reduce the clickCounter by 1
  clickCounter--;

  // Alert User and reset the counter
  if (clickCounter === 0) {
    alert("You have 0 clicks left!");

    clickCounter = initialValue;
  }

  // Save new value to Firebase
  db_firebase.ref().set({"clickCount": clickCounter});

  // Log the value of clickCounter
  $("#click-value").text(clickCounter);
  console.log(clickCounter);

});

// Whenever a user clicks the restart button
$("#restart-button").on("click", function() {
  // Set the clickCounter back to initialValue
  clickCounter = initialValue;

  // Save new value to Firebase
  db_firebase.ref().set({"clickCount": clickCounter});

  // Log the value of clickCounter
  console.log(clickCounter);

  // Change the HTML Values
  $("#click-value").text(clickCounter);
});