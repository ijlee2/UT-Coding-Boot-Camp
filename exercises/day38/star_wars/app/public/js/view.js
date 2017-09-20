// Code here handles queries for specific characters in the database
// In this case, the user submits a character's name... we then pass that character's name as a
// URL parameter. Our server then performs the search to grab that character from the Database.

// when user hits the search-btn
$("#search-btn").on("click", function() {
    // save the character they typed into the character-search input
    let searchedCharacter = $("#character-search").val().trim();

    // replace any spaces between that character with no space
    // (effectively deleting the spaces). Make the string lowercase
    searchedCharacter = searchedCharacter.replace(/\s+/g, "").toLowerCase();

    // run an AJAX GET-request for our servers api,
    // including the user's character in the url
    $.get("/api/" + searchedCharacter, function(data) {
        // log the data to our console
        console.log(data);

        if (!data) {
            $("#stats").hide();

        } else {
            // show the stats section
            $("#stats").show();
            // put the character name in the name tag,
            $("#name").text(data.name);
            // the role in the role tag,
            $("#role").text(data.role);
            // the age in the age tag,
            $("#age").text(data.age);
            // and the force points in the force-points tag
            $("#force-points").text(data.forcePoints);
        }
    });
});