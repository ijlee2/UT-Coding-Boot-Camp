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

const testInput = {"trains": [{"name"          : "Trenton Express",
                               "destination"   : "Trenton",
                               "firstDeparture": "08:00 AM",
                               "frequency"     : 25,
                               "nextArrival"   : "05:35 PM",
                               "minutesAway"   : 10},

                              {"name"          : "Oregon Trail",
                               "destination"   : "Salem",
                               "firstDeparture": "08:00 AM",
                               "frequency"     : 3600,
                               "nextArrival"   : "01:39 PM",
                               "minutesAway"   : 1154}]
                    };


var displayPage = function(page) {
    $(".page").css({"display": "none"});
    $(".page:nth-of-type(" + (page + 1) + ")").css({"display": "block"});
}

var loadDatabase = function() {
    database = firebase.database();

    database.ref().once("value", function(snapshot) {
        // Create database if it doesn't exist
        if (snapshot.val() == null) {
            // Create trains object
            trains = testInput.trains;

            database.ref().set(testInput);

        // Load database if it exists
        } else {
            trains = snapshot.val().trains;

        }

        updateSchedule();
    });
}

function updateSchedule() {
    var output = "";

    trains.forEach(train => {
        output += `<tr>
                       <td>${train.name}</td>
                       <td>${train.destination}</td>
                       <td>${train.frequency}</td>
                       <td>${train.nextArrival}</td>
                       <td>${train.minutesAway}</td>
                   </tr>`;
    });

    $("#currentSchedule tbody").empty().append(output);
}

function addTrain() {
    var train = {"name"          : $("#name").val().trim(),
                 "destination"   : $("#destination").val().trim(),
                 "firstDeparture": $("#firstDeparture").val().trim(),
                 "frequency"     : parseInt($("#frequency").val())};

    // Calculate the next arrival
    train.nextArrival = "05:35 PM";
    train.minutesAway = 10;

    trains.push(train);
    database.ref().set(trains);
    
    updateSchedule();
}


$(document).ready(function() {
    displayPage(0);

    loadDatabase();

    $("#button_submit").on("click", addTrain);
});