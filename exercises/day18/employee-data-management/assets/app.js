// Configure Firebase
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


// When the user clicks on Submit
$("#button_submit").on("click", function() {
    // I get the information from the broswer
    var name        = $("#name").val();
    var role        = $("#role").val();
    var startDate   = moment($("#startDate").val().trim(), "MM/DD/YYYY").format("X");
//    var startDate   = $("#startDate").val().trim();
    var monthlyRate = $("#monthlyRate").val();

    // Add the information to the database
	database.ref().push({
		"name"        : name,
		"role"        : role,
		"startDate"   : startDate,
		"monthlyRate" : monthlyRate
	});
});


database.ref().on("child_added", function(snapshot) {
    // Get the database
    var employee = snapshot.val();
//    moment.unix(startDate).format("MM/DD/YY");

    $("tbody").append(`<tr>
                           <td>${employee.name}</td>
                           <td>${employee.role}</td>
                           <td>${employee.startDate}</td>
                           <td></td>
                           <td>${employee.monthlyRate}</td>
                           <td></td>
                       </tr>`);
});