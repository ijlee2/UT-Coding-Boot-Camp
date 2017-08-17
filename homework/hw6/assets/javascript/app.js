// Default search items
var searchHistory = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret",
                     "turtle", "super glider", "chinchilla", "hedgehog", "hermit crab", "gerbil",
                     "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

var displaySearchHistory = function() {
    var output = "";

    for (var i = 0; i < searchHistory.length; i++) {
        output += `<div class="animals">${searchHistory[i]}</div>`;
    }

    $("#searchHistory").html(output);
}


/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    displaySearchHistory();
});