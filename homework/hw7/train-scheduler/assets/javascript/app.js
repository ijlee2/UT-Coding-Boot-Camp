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

const testInput = {"trains": [{"name"       : "Trenton Express",
                               "destination": "Trenton",
                               "departure"  : "08:00 AM",
                               "frequency"  : 25,
                               "nextArrival": "05:35 PM",
                               "minutesAway": 10},

                              {"name"       : "Oregon Trail",
                               "destination": "Salem",
                               "departure"  : "08:00 AM",
                               "frequency"  : 3600,
                               "nextArrival": "01:39 PM",
                               "minutesAway": 1154}]
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
    const train = {"name"       : $("#name").val().trim(),
                   "destination": $("#destination").val().trim(),
                   "departure"  : $("#departure").val().trim(),
                   "frequency"  : parseInt($("#frequency").val())};

    const currentTime = new Date();

    // Express the departure in minutes (time0)
    let hour   = parseInt(train.departure.substring(0, 2));
    let minute = parseInt(train.departure.substring(3, 5));

    const time0 = 60 * hour + minute;

    // Express the current time in minutes (time1)
    hour   = currentTime.getHours();
    minute = currentTime.getMinutes();

    const time1 = 60 * hour + minute;

    // Find the next arrival
    const numRoundsMade = Math.floor((time1 - time0) / train.frequency);
    const time2 = time0 + (numRoundsMade + 1) * train.frequency;

    hour   = Math.floor(time2 / 60);
    minute = time2 - 60 * hour;
    hour   = hour % 24;

    train.nextArrival = (hour < 12) ? `${hour}:${minute} AM` : `${hour - 12}:${minute} PM`;
    train.minutesAway = time2 - time1;

    trains.push(train);
    database.ref().set(trains);
    
    updateSchedule();
}


$(document).ready(function() {
    displayPage(0);

    loadDatabase();

    $("#button_submit").on("click", addTrain);
});