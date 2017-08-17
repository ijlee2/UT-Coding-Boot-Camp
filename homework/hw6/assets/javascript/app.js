// Use GIPHY's API
var numGIFs = 9;
var api_url = "https://api.giphy.com/v1/gifs/search?api_key=0010990be74a4f048609620599cd5f8f&limit=" + numGIFs + "&q=";

// Default topics
var topics    = ["birthday", "hug", "love", "anniversary", "beer", "work", "sleepy", "coffee", "sandwich", "study", "hm", "rage", "what", "cute"];
var numTopics = topics.length;


var updateSearchHistory = function(query) {
    // Do nothing if the query is empty or exists in topics already
    if (query === "" || topics.indexOf(query) >= 0) {
        return;
    }

    $(".topics").off("click");

    // Initialize
    if (arguments.length === 0) {
        var output = "";

        for (var i = 0; i < numTopics; i++) {
            output += `<div class="topics">${topics[i]}</div>`;
        }

        $("#searchHistory").html(output);
    

    // Add new queries to the search history
    } else {
        topics.push(query);
        numTopics++;

        $("#searchHistory").append(`<div class="topics">${query}</div>`);

        // Go ahead and find GIFs
        getGIFs(query);

    }

    $(".topics").on("click", function() {
        getGIFs($(this).text());
    });
}


var toggleGIFAnimation = function() {
    var img_url = $(this).attr("src");
    var index   = img_url.indexOf("_s.gif");

    if (index >= 0) {
        // Play the GIF
        img_url = img_url.substring(0, index) + ".gif";

    } else {
        // Stop the GIF
        img_url = img_url.substring(0, img_url.length - 4) + "_s.gif";

    }

    $(this).attr("src", img_url);
}


var getGIFs = function(query) {
    $("#topPane").css({"display": "block"});

    $.ajax({
        "url"   : api_url + query,
        "method": "GET"}

    ).done(function(response) {
        console.log(response);

        $(document).off("click", "img");

        var output = "";

        for (var i = 0; i < numGIFs; i++) {
            output += `<div class="image_container">
                           <img src="${response.data[i].images.fixed_width_still.url}" height="150">
                           <span class="rating">Rating: ${response.data[i].rating.toUpperCase()}</span>
                       </div>`;
        }
        
        $("#searchResults").html(output);

        $(document).on("click", "img", toggleGIFAnimation);
    });
}


$(document).ready(function() {
    $("#topPane").css({"display": "none"});

    updateSearchHistory();

    $("#button_search").on("click", function() {
        var query = $("#query").val().trim().toLowerCase();
        
        updateSearchHistory(query);
    });

    $(".topics").on("click", function() {
        var query = $(this).text();

        getGIFs(query);
    });
});