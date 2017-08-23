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

// Define a test case
/*
const test_trains = [
    {"id"         : 0,
     "name"       : "Trenton Express",
     "destination": "Trenton",
     "departure"  : [0, 8, 0],
     "frequency"  : 25},

    {"id"         : 1,
     "name"       : "Oregon Trail",
     "destination": "Salem",
     "departure"  : [0, 11, 0],
     "frequency"  : 200},

    {"id"         : 2,
     "name"       : "Flying Scotsman",
     "destination": "Milwaukee",
     "departure"  : [0, 14, 20],
     "frequency"  : 8}
];
*/


/****************************************************************************
 ****************************************************************************
    
    Train scheduler
    
*****************************************************************************
*****************************************************************************/
// Global variables
let database;
let trains = [], availableID = 0;
let myTrain, trainID, arrayID;

function loadDatabase() {
    database = firebase.database();

    // When the loads, or when a user adds a train
    database.ref().on("child_added", function(snapshot) {
        // Get the train
        let train  = snapshot.val();
        const info = findNextArrival(train);

        // Update the array
        trains.push(train);

        // Update the schedule table
        const output = `<tr id="${train.id}">
                            <td>${train.name}</td>
                            <td>${train.destination}</td>
                            <td>${train.frequency}</td>
                            <td>${displayTime(info.nextArrival)}</td>
                            <td>${info.minutesAway}</td>
                        </tr>`;

        $("tbody").append(output);

        // Find the next available ID
        availableID = Math.max(train.id + 1, availableID);
    });

    // When a user edits a train
    database.ref().on("child_changed", function(snapshot) {
        // Get the train
        let train  = snapshot.val();
        const info = findNextArrival(train);

        // Update the array
        trainID = train.id;
        findArrayID();
        trains[arrayID] = train;

        // Update the schedule table
        const output = `<tr id="${train.id}">
                            <td>${train.name}</td>
                            <td>${train.destination}</td>
                            <td>${train.frequency}</td>
                            <td>${displayTime(info.nextArrival)}</td>
                            <td>${info.minutesAway}</td>
                        </tr>`;

        $(`tr#${trainID}`).replaceWith(output);

    });

    // When a user removes a train
    database.ref().on("child_removed", function(snapshot) {
        // Get the train
        let train  = snapshot.val();

        // Update the array
        trainID = train.id;
        findArrayID();
        trains.splice(arrayID, 1);

        // Update the schedule table
        $(`tr#${trainID}`).remove();
        
    });
}

function findAvailableID() {
    let availableID = 0;

    for (let i = 0; i < trains.length; i++) {
        // The next available ID is always 1 greater than a current ID
        availableID = Math.max(trains[i].id + 1, availableID);
    }

    return availableID;
}

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

    const time0 = 60 * h0 + m0;

    // Express the current time in minutes
    const currentTime = new Date();

    const h1 = currentTime.getHours();
    const m1 = currentTime.getMinutes();

    const time1 = 60 * h1 + m1;

    
    /************************************************************************
        
        Calculate the next arrival
        
    *************************************************************************/
    const numTripsMade = Math.max(Math.floor((time1 - time0) / train.frequency), 0);
    
    // Find the arrival time in minutes
    const time = time0 + (numTripsMade + 1) * train.frequency;
    
    let d = 0;
    let h = Math.floor(time / 60);
    let m = time - 60 * h;

    // Account for departure on another day
    if (h >= 24) {
        d = Math.floor(h / 24);
        h = h % 24;
    }
    
    return {"nextArrival": [d, h, m],
            "minutesAway": time - time1};
}



/****************************************************************************
 ****************************************************************************
    
    Display functions
    
*****************************************************************************
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

    if (d === 0) {
        return `${h}:${m} ${period}`

    } else if (d === 1) {
        return `${h}:${m} ${period}, in ${d} day`;

    } else {
        return `${h}:${m} ${period}, in ${d} days`;

    }
}

function refreshSchedule() {
    let info;
    let output = "";

    trains.forEach(train => {
        info = findNextArrival(train);

        output += `<tr id="${train.id}">
                       <td>${train.name}</td>
                       <td>${train.destination}</td>
                       <td>${train.frequency}</td>
                       <td>${displayTime(info.nextArrival)}</td>
                       <td>${info.minutesAway}</td>
                   </tr>`;
    });

    $("tbody").empty().append(output);
}



/****************************************************************************
 ****************************************************************************
    
    Add, edit, or delete a train
    
*****************************************************************************
*****************************************************************************/
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

        let departure_string = (h < 10) ? ("0" + h) : h;
        departure_string += (m < 10) ? (":0" + m) : (":" + m);

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

    const i = departure_string.indexOf(":");
    const h = parseInt(departure_string.substring(0, i));
    const m = parseInt(departure_string.substring(i + 1));

    // Save to the database
    const train = {"id"         : availableID,
                   "name"       : $("#name").val().trim(),
                   "destination": $("#destination").val().trim(),
                   "departure"  : [0, h, m],
                   "frequency"  : parseInt($("#frequency").val())};

    database.ref().child(availableID).set(train);

    // Reset the fields
    $("input").val("");
}

function editTrain() {
    // Format the departure time
    const departure_string = $("#departure").val().trim();

    const i = departure_string.indexOf(":");
    const h = parseInt(departure_string.substring(0, i));
    const m = parseInt(departure_string.substring(i + 1));

    // Save to the database
    const train = {"id"         : trainID,
                   "name"       : $("#name").val().trim(),
                   "destination": $("#destination").val().trim(),
                   "departure"  : [0, h, m],
                   "frequency"  : parseInt($("#frequency").val())};
    
    database.ref().child(trainID).update(train);

    switchMode("add");
}

function deleteTrain() {
    // Remove from the database
    database.ref().child(trainID).remove();

    switchMode("add");
}



/****************************************************************************
 ****************************************************************************
    
    Wait for user actions
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    loadDatabase();

    // Refresh the train schedule every minute
    const numSecondsLeft = 60 - (new Date()).getSeconds();

    setTimeout(function() {
        refreshSchedule();

        setInterval(refreshSchedule, 60000);

    }, 1000 * refreshSchedule);

    // Listen to clicks on static elements
    $("#button_add").on("click", addTrain);
    $("#button_edit").on("click", editTrain);
    $("#button_delete").on("click", deleteTrain);
});

// Listen to clicks on dynamic elements
$(document.body).on("click", "tr", function() {
    trainID = parseInt($(this).attr("id"));

    findArrayID();
    
    switchMode("edit");
});