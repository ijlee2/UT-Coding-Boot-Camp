// Use GIPHY's API
const numGIFs = 9;
const api_url = `https://api.giphy.com/v1/gifs/search?api_key=0010990be74a4f048609620599cd5f8f&limit=${numGIFs}&q=`;

// Default topics
let topics    = ["birthday", "hug", "love", "house", "work", "dance", "sleepy", "coffee", "study", "sandwich", "hm", "cute", "math", "beer", "you rock"];
let numTopics = topics.length;


function updateSearchHistory(query) {
    // Reset the input field
    $("#query").val("");
    $("#query").focus();

    // Do nothing if the query is empty
    if (query === "") {
        return;
    }
    
    // Reset the event handler
    $(".topics").off("click");

    // Initialize
    if (arguments.length === 0) {
        let output = "";

        topics.forEach(t => output += `<div class="topics">${t}</div>`);

        $("#searchHistory").html(output);
    
    // Add new queries to the search history
    } else if (!topics.includes(query)) {
        topics.push(query);
        numTopics++;

        $("#searchHistory").append(`<div class="topics">${query}</div>`);

        // Go ahead and find GIFs
        getGIFs(query);

    // Only display GIFs for existing queries
    } else {
        getGIFs(query);

    }

    $(".topics").on("click", function() {
        getGIFs($(this).text());
    });
}


function toggleGIFAnimation() {
    // Allow the user to click either img or div that surrounds the img
    let img_url = $("img", this).attr("src");
    
    // GIPHY adds _s for still images
    if (img_url.includes("_s.gif")) {
        // Play the GIF
        img_url = img_url.replace("_s.gif", ".gif");

    } else {
        // Stop the GIF
        img_url = img_url.replace(".gif", "_s.gif");

    }

    $("img", this).attr("src", img_url);
}


function getGIFs(query) {
    $.ajax({
        "url"   : api_url + query,
        "method": "GET"

    }).done(response => {
        // Reset the event handler
        $(document).off("click", ".image_container");

        let output = "";

        response.data.forEach(r => {
            output += `<div class="image_container">
                           <img src="${r.images.fixed_width_still.url}" height="150">
                           <span class="rating">Rating: ${r.rating.toUpperCase()}</span>
                       </div>`;
        });
        
        $("#searchResults").html(output);

        // Display the images in waves
        $(".image_container").css({"display": "none"});

        let index = 1;
        
        const intervalID = setInterval(function() {
            $(`.image_container:nth-of-type(${index})`).css({"display": "block"});
            
            index++;

            if (index > numGIFs) {
                clearInterval(intervalID);
            }
            
        }, 150);
    });
}


$(document).ready(function() {
    updateSearchHistory();

    $("#query").on("keyup", event => {
        // Allow the user to hit Enter key to submit query
        if (event.keyCode === 13) {
            const query = $("#query").val().trim().toLowerCase();

            updateSearchHistory(query);
        }
    });

    $("#button_search").on("click", function() {
        const query = $("#query").val().trim().toLowerCase();

        updateSearchHistory(query);
    });

    $(".topics").on("click", function() {
        const query = $(this).text();

        getGIFs(query);
    });
});

// Listen to clicks on dynamically created elements
$("body").on("click", ".image_container", toggleGIFAnimation);