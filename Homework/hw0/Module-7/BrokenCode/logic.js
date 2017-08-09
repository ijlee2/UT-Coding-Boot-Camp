//--------------------------------------------------
//  Display a random fact
//--------------------------------------------------
$("#factButton").on("click", function() {
	// Generate a random number between 0 and 3
	var number = Math.floor((Math.random() * booFacts.length));

	// Display the fact
	$("#factText").text(booFacts[number]);
});

// Facts about Boo
var booFacts = ["Boo is a pomeranian",
                "Boo's best friend is another pomeranian named Buddy",
                "Boo the Pomeranian was born on March 16, making him a Pisces",
                "Boo's favourite food is grass",
                "Boo has released two books"];


//--------------------------------------------------
//  Change the color of funText
//--------------------------------------------------
$("#textPink").on("click", function() {
	$("#funText").css("color", "pink");
});

$("#textOrange").on("click", function() {
    $("#funText").css("color", "orange");
});

$("#textGreen").on("click", function() {
	$("#funText").css("color", "green");
});


//--------------------------------------------------
//  Change the size of box
//--------------------------------------------------
$("#boxGrow").on("click", function() {
	$("#box").animate({height:"+=35px", width:"+=35px"}, "fast");
});

$("#boxShrink").on("click", function() {
	$("#box").animate({height:"-=35px", width:"-=35px"}, "fast");
});