// *********************************************************************************
// TO DO:
// 1. Display all chirps on page load
// 2. Add new chirp to database and prepend to existing chirps
// *********************************************************************************
// When the page loads, grab and display all of our chirps
function getChirps() {
    $.get("/api/all", function(results) {
        let output = "";

        results.forEach(r => {
            output += `
                <div>
                    <p><strong>${r.author}</strong></p><p>${r.chirp}</p><p>${r.time_created}</p>
                </div>`;
        });

        $("#chirps").html(output);
    });    
}

$(document).ready(getChirps);

// When user chirps
$("#submit_chirp").click(function() {
    const data = {
        "author": $("#name").val().trim(),
        "chirp" : $("#chirp").val().trim()
    };

    $.post("/api/new", data, function() {
        $("#name, #chirp").val("");

        getChirps();
    });
});