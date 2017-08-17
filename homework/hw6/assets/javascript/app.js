// Use GIPHY's API
var numGIFs = 10;
var api_url = "https://api.giphy.com/v1/gifs/search?api_key=0010990be74a4f048609620599cd5f8f&limit=" + numGIFs + "&q=";

// Default search items
var searchHistory = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret",
                     "turtle", "super glider", "chinchilla", "hedgehog", "hermit crab", "gerbil",
                     "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

var initializePage = function() {
    var output = "";

    for (var i = 0; i < searchHistory.length; i++) {
        output += `<div class="searchItems">${searchHistory[i]}</div>`;
    }

    $("#searchHistory").html(output);
}

var updateSearchHistory = function(query) {
    // Add a new query to the search history
    if (arguments.length === 1) {
        if (query !== "" && searchHistory.indexOf(query) === -1) {
            searchHistory.push(query);
        }
    }

    var output = "";

    for (var i = 0; i < searchHistory.length; i++) {
        output += `<div class="searchItems">${searchHistory[i]}</div>`;
    }

    $("#searchHistory").html(output);
}

var toggleGIFAnimation = function() {
    var img_url = $(this).attr("src");
    var index   = img_url.indexOf(".gif");

    if (img_url.substring(index - 2, index) === "_s") {
        // Play the GIF
        img_url = img_url.substring(0, index - 2) + ".gif";

    } else {
        // Stop the GIF
        img_url = img_url.substring(0, index) + "_s.gif";

    }

    $(this).attr("src", img_url);
}


$(document).ready(function() {
    initializePage();

    $("#button_search").on("click", function() {
        var query = $("#query").val().trim().toLowerCase();
        
        updateSearchHistory(query);

    });

    $(".searchItems").on("click", function() {
        $.ajax({
            "url"   : api_url + $(this).text(),
            "method": "GET"}

        ).done(function(response) {
            console.log(response);

            var output = "";

            for (var i = 0; i < numGIFs; i++) {
                output += `<img src="${response.data[i].images.fixed_width_still.url}" height="150">`;
            }
            
            $(document).on("click", "img", toggleGIFAnimation);

            $("#searchResults").html(output);
        });
    });
});