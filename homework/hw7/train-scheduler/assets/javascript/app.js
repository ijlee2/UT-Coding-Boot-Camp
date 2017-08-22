// Configure Firebase
const config = {
    apiKey           : "AIzaSyDTZzRZokWqHyFnA0T11Hte9ZwJ9QgO4kI",
    authDomain       : "train-scheduler-3f682.firebaseapp.com",
    databaseURL      : "https://train-scheduler-3f682.firebaseio.com",
    projectId        : "train-scheduler-3f682",
    storageBucket    : "train-scheduler-3f682.appspot.com",
    messagingSenderId: "886128771331"
};

firebase.initializeApp(config);

// Define test case
let testInput = [{"name"       : "Trenton Express",
                  "destination": "Trenton",
                  "departure"  : [0, 8, 0],
                  "frequency"  : 25},

                 {"name"       : "Oregon Trail",
                  "destination": "Salem",
                  "departure"  : [0, 11, 0],
                  "frequency"  : 200}
                ];



/****************************************************************************
 ****************************************************************************
    
    Train scheduler
    
*****************************************************************************
*****************************************************************************/
// Global variables
let database;
let trains;

var loadDatabase = function() {
    database = firebase.database();

    database.ref().once("value", function(snapshot) {
        // Create database if it doesn't exist
        if (snapshot.val() == null) {
            trains = testInput;

            database.ref().set(testInput);

        // Load database if it exists
        } else {
            trains = snapshot.val();

        }

        displaySchedule();
    });
}

function findNextArrival(train) {
    // Express the departure in minutes (time0)
    const hour0   = train.departure[1];
    const minute0 = train.departure[2];

    const time0 = 60 * hour0 + minute0;

    // Express the current time in minutes (time1)
    const currentTime = new Date();
    const hour1       = currentTime.getHours();
    const minute1     = currentTime.getMinutes();

    const time1 = 60 * hour1 + minute1;

    
    /************************************************************************
        
        Calculate the next arrival
        
    *************************************************************************/
    const numTripsMade = Math.floor((time1 - time0) / train.frequency);
    
    // Departure time
    let day = 0, hour, minute, time;

    // The train will depart much later
    if (numTripsMade < 0) {
        hour   = hour0;
        minute = minute0;
        time   = 60 * hour + minute;

    // The train will depart soon
    } else {
        time   = time0 + (numTripsMade + 1) * train.frequency;
        hour   = Math.floor(time / 60);
        minute = time - 60 * hour;

    }

    // Account for departure on another day
    if (hour >= 24) {
        day  = Math.floor(hour / 24);
        hour = hour % 24;
    }
    
    return {"nextArrival": [day, hour, minute],
            "minutesAway": time - time1};
}



/****************************************************************************
 ****************************************************************************
    
    Display functions
    
*****************************************************************************
*****************************************************************************/
function displayTime(timeArray) {
    // Get the hour and minute
    let d = timeArray[0], h = timeArray[1], m = timeArray[2];
    const period = (0 <= h && h < 12) ? "AM": "PM";

    // Display the hour
    h = h % 12;

    if (h === 0) {
        h = 12;
    }

    // Display the minute
    if (m < 10) {
        m = "0" + m;
    }

    if (d === 0) {
        return `${h}:${m} ${period}`

    } else if (d === 1) {
        return `${h}:${m} ${period}, in ${d} day`;

    } else {
        return `${h}:${m} ${period}, in ${d} days`;

    }
}

function displaySchedule() {
    let info;
    let output = "";

    trains.forEach(train => {
        info = findNextArrival(train);

        output += `<tr>
                       <td>${train.name}</td>
                       <td>${train.destination}</td>
                       <td>${train.frequency}</td>
                       <td>${displayTime(info.nextArrival)}</td>
                       <td>${info.minutesAway}</td>
                   </tr>`;
    });

    $("#currentSchedule tbody").empty().append(output);

    $("tr").on("click", function() {
        let index = $("tr").index(this) - 1;

        // Edit train information
        $("#name").val(trains[index].name);
        $("#destination").val(trains[index].destination);
        $("#departure").val(displayTime(trains[index].departure));
        $("#frequency").val(trains[index].frequency);

        // Edit button
        $("#search > h2").text("Delete or Edit the Train");

        $("#button_add").css({"display": "none"});
        $("#button_delete, #button_edit").css({"display": "block"});
    });
}



/****************************************************************************
 ****************************************************************************
    
    Add, edit, or delete a train
    
*****************************************************************************
*****************************************************************************/
function addTrain() {
    // Convert the departure time (String) to an Array
    const departure_string = $("#departure").val().trim();

    const index  = departure_string.indexOf(":");
    const hour   = parseInt(departure_string.substring(0, index));
    const minute = parseInt(departure_string.substring(index + 1));

    // Create a new train object
    let train = {"name"       : $("#name").val().trim(),
                 "destination": $("#destination").val().trim(),
                 "departure"  : [0, hour, minute],
                 "frequency"  : parseInt($("#frequency").val())};

    trains.push(train);
    database.ref().set(trains);
    
    displaySchedule();
}

function editTrain() {

}

function deleteTrain() {

}



/****************************************************************************
 ****************************************************************************
    
    Wait for user actions
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    loadDatabase();

    // Update the train schedule every minute
    const currentTime = new Date();

    setTimeout(function() {
        displaySchedule();

        setInterval(displaySchedule, 60000);

    }, 1000 * (60 - currentTime.getSeconds()));

    // Add a new train
    $("#button_add").on("click", addTrain);
        /*
        // Input validation
        $("input").each(function() {
            var element = $(this);
            console.log(element);

            if (element.val() == undefined) {
                element.css({"background-color": "red"});
                element.attr("placeholder", `Please fill out the ${this.id}!`);
            }
        });

        if ($("#name").val() === "") {
            console.log("Fill out name");
            return;
        }
        if ($("#destination").val() === "") {
            console.log("Fill out destination");
            return;
        }
        if ($("#departure").val() === "") {
            console.log("Fill out departure");
            return;
        }
        if ($("#frequency").val() === "") {
            console.log("Fill out frequency");
            return;
        }
        */

    $("#button_edit").on("click", editTrain);

    $("#button_delete").on("click", deleteTrain);
});