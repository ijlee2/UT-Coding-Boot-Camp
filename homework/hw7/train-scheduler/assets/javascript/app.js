// Configure Firebase
var config = {
    apiKey           : "AIzaSyDTZzRZokWqHyFnA0T11Hte9ZwJ9QgO4kI",
    authDomain       : "train-scheduler-3f682.firebaseapp.com",
    databaseURL      : "https://train-scheduler-3f682.firebaseio.com",
    projectId        : "train-scheduler-3f682",
    storageBucket    : "train-scheduler-3f682.appspot.com",
    messagingSenderId: "886128771331"
};

firebase.initializeApp(config);


// Global variables
var database;
var trains;

var displayPage = function(page) {
    $(".page").css({"display": "none"});
    $(".page:nth-of-type(" + (page + 1) + ")").css({"display": "block"});
}

$(document).ready(function() {
    displayPage(0);

    database = firebase.database();

    database.ref().once("value", function(snapshot) {
        // Create database if it doesn't exist
        if (snapshot.val() == null) {
            // Create trains object
            trains = {"list"  : [{"name": "Thomas"}, {"name": "Jack"}],
                      "length": 0};

            database.ref().set(trains);

        // Load database if it exists
        } else {
            trains = snapshot.val().trains;

        }

        if (trains.length > 0) {
            var output = "";

            trains.forEach(train => {
                output += `${train.name}`;
            });
        }
    });
});

/*
database.ref("player1").on("value", function(snapshot) {
    // Get the most recent value from Firebase

    // Update the local values

}, function(error) {
    console.log("The read failed: " + error.code);

});

database.ref("player2").on("value", function(snapshot) {
    // Get the most recent value from Firebase

    // Update the local values

}, function(error) {
    console.log("The read failed: " + error.code);

});
*/