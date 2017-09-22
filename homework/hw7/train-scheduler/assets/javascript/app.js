/****************************************************************************
 ****************************************************************************
    
    Configure Firebase
    
*****************************************************************************
*****************************************************************************/
const config = {
    "apiKey"           : "AIzaSyDTZzRZokWqHyFnA0T11Hte9ZwJ9QgO4kI",
    "authDomain"       : "train-scheduler-3f682.firebaseapp.com",
    "databaseURL"      : "https://train-scheduler-3f682.firebaseio.com",
    "projectId"        : "train-scheduler-3f682",
    "storageBucket"    : "train-scheduler-3f682.appspot.com",
    "messagingSenderId": "886128771331"
};

firebase.initializeApp(config);

const database = firebase.database();



/****************************************************************************
 ****************************************************************************
    
    Train scheduler
    
*****************************************************************************
*****************************************************************************/
// Global variables
let trains = [], availableID = 0;
let myTrain, trainID, arrayID;


/****************************************************************************
    
    Set the database behavior
    
*****************************************************************************/
function loadDatabase() {
    // When the page loads, or when a user adds a train
    database.ref().on("child_added", function(snapshot) {
        // Get the train
        const train = snapshot.val();

        // Update the array
        trains.push(train);

        // Update the schedule table
        $("tbody").append(displayTrain(train));

        // Set the next available ID
        availableID = Math.max(train.id + 1, availableID);
    });

    // When a user edits a train
    database.ref().on("child_changed", function(snapshot) {
        // Get the train
        const train = snapshot.val();
        trainID = train.id;
        
        // Update the array
        findArrayID();
        trains[arrayID] = train;

        // Update the schedule table
        $(`tr#${trainID}`).replaceWith(displayTrain(train));
    });

    // When a user removes a train
    database.ref().on("child_removed", function(snapshot) {
        // Get the train
        const train = snapshot.val();
        trainID = train.id;

        // Update the array
        findArrayID();
        trains.splice(arrayID, 1);

        // Update the schedule table
        $(`tr#${trainID}`).remove();
    });
}


/****************************************************************************
    
    Query functions
    
*****************************************************************************/
function findArrayID() {
    // Find the train in the array
    for (arrayID = 0; arrayID < trains.length; arrayID++) {
        if (trains[arrayID].id === trainID) {
            myTrain = trains[arrayID];

            break;
        }
    }
}

function findNextArrival(train) {
    // Express the departure in minutes
    const h0 = train.departure[1];
    const m0 = train.departure[2];
    const t0 = 60 * h0 + m0;

    // Express the current time in minutes
    const currentTime = new Date();

    const h1 = currentTime.getHours();
    const m1 = currentTime.getMinutes();
    const t1 = 60 * h1 + m1;

    // Number of trips that can be made between t0 and t1
    const numTripsMade = Math.max(Math.floor((t1 - t0) / train.frequency), 0);
    
    // Find the arrival time
    const arrivalTime = t0 + (numTripsMade + 1) * train.frequency;
    
    let d = 0;
    let h = Math.floor(arrivalTime / 60);
    let m = arrivalTime - 60 * h;

    // Account for departure on another day
    if (h >= 24) {
        d = Math.floor(h / 24);
        h = h % 24;
    }
    
    return {
        "nextArrival": [d, h, m],
        "minutesAway": arrivalTime - t1
    };
}


/****************************************************************************
    
    Display functions
    
*****************************************************************************/
function displayTime(timeArray) {
    // Get the day, hour, and minute
    let d = timeArray[0];
    let h = timeArray[1];
    let m = timeArray[2];

    // Display the period
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

    // Display the day
    if (d === 0) {
        return `${h}:${m} ${period}`

    } else if (d === 1) {
        return `${h}:${m} ${period}, in ${d} day`;

    } else {
        return `${h}:${m} ${period}, in ${d} days`;

    }
}

function displayTrain(train) {
    const info = findNextArrival(train);

    return `<tr id="${train.id}">
                <td>${train.name}</td>
                <td>${train.destination}</td>
                <td>${train.frequency}</td>
                <td>${displayTime(info.nextArrival)}</td>
                <td>${info.minutesAway}</td>
            </tr>`;
}

function refreshSchedule() {
    let output = "";

    trains.forEach(train => output += displayTrain(train));

    $("tbody").empty().append(output);
}


/****************************************************************************
    
    Add, edit, or delete a train
    
*****************************************************************************/
function switchMode(mode) {
    if (mode === "add") {
        // Reset the fields
        $("input").val("");
        
        // Change to add mode
        $("#search > h2").text("Add a Train");
        $("#button_add").css({"display": "block"});
        $("#button_delete, #button_edit").css({"display": "none"});

    } else if (mode === "edit") {
        // Format the departure time
        const h = myTrain.departure[1];
        const m = myTrain.departure[2];

        let departure_string = (h < 10) ? `0${h}` : h;
        departure_string += (m < 10) ? `:0${m}` : `:${m}`;

        // Update the fields
        $("#name").val(myTrain.name);
        $("#destination").val(myTrain.destination);
        $("#departure").val(departure_string);
        $("#frequency").val(myTrain.frequency);

        // Change to edit mode
        $("#search > h2").text("Delete or Edit the Train");
        $("#button_add").css({"display": "none"});
        $("#button_delete, #button_edit").css({"display": "block"});

    }
}

function addTrain() {
    // Format the departure time
    const departure_string = $("#departure").val().trim();

    // Extract hour and minute
    [h, m] = departure_string.split(":").map(x => parseInt(x, 10));

    // Update the database
    const train = {
        "id"         : availableID,
        "name"       : $("#name").val().trim(),
        "destination": $("#destination").val().trim(),
        "departure"  : [0, h, m],
        "frequency"  : parseInt($("#frequency").val().trim())
    };

    database.ref().child(availableID).set(train);

    // Reset
    $("input").val("");
}

function editTrain() {
    // Format the departure time
    const departure_string = $("#departure").val().trim();

    // Extract hour and minute
    [h, m] = departure_string.split(":").map(x => parseInt(x, 10));

    // Update the database
    const train = {
        "id"         : trainID,
        "name"       : $("#name").val().trim(),
        "destination": $("#destination").val().trim(),
        "departure"  : [0, h, m],
        "frequency"  : parseInt($("#frequency").val().trim())
    };
    
    database.ref().child(trainID).update(train);

    // Reset
    switchMode("add");
}

function deleteTrain() {
    // Update the database
    database.ref().child(trainID).remove();

    // Reset
    switchMode("add");
}


/****************************************************************************
    
    Wait for user actions
    
*****************************************************************************/
$(document).ready(function() {
    loadDatabase();

    // Refresh the schedule every minute
    const numSecondsLeft = 60 - (new Date()).getSeconds();

    setTimeout(function() {
        refreshSchedule();

        setInterval(refreshSchedule, 60000);

    }, 1000 * numSecondsLeft);

    // Listen to clicks on static elements
    $("#button_add").on("click", addTrain);
    $("#button_edit").on("click", editTrain);
    $("#button_delete").on("click", deleteTrain);
});

// Listen to clicks on dynamic elements
$("body").on("click", "tr", function() {
    trainID = parseInt($(this).attr("id"));

    findArrayID();
    
    switchMode("edit");
});