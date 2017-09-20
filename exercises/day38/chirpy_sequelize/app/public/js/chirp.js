/* global moment */

// When user clicks add-btn
$("#chirp-submit").on("click", function(event) {
    event.preventDefault();

    // Make a newChirp object
    const newChirp = {
        "author"    : $("#author").val().trim(),
        "body"      : $("#chirp-box").val().trim(),
        "created_at": moment().format("YYYY-MM-DD HH:mm:ss")
    };

    console.log(newChirp);

    // Send an AJAX POST-request with jQuery
    $.post("/api/new", newChirp)
        // On success, run the following code
        .done(function() {
            let row = $("<div>");
            row.addClass("chirp");

            row.append("<p>" + newChirp.author + " chirped: </p>");
            row.append("<p>" + newChirp.body + "</p>");
            row.append("<p>At " + moment(newChirp.created_at).format("h:mma on dddd") + "</p>");

            $("#chirp-area").prepend(row);
        });

    // Empty each input box by replacing the value with an empty string
    $("#author").val("");
    $("#chirp-box").val("");
});

// When the page loads, grab all of our chirps
$.get("/api/all", function(data) {
    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            let row = $("<div>");
            row.addClass("chirp");

            row.append("<p>" + data[i].author + " chirped.. </p>");
            row.append("<p>" + data[i].body + "</p>");
            row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");

            $("#chirp-area").prepend(row);
        }
    }
});