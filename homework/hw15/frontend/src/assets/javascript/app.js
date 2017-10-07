function displayImages(isTrue) {
    $("img").css({"display": (isTrue) ? "block" : "none"});

    $("#neotech-image i").attr({"title": (isTrue) ? "Click to hide images." : "Click to show images."});
    $("#neotech-image i").text((isTrue) ? "image" : "broken_image");
}

// Show images by default
if (localStorage.getItem("displayImages") === null) {
    localStorage.setItem("displayImages", true);
    displayImages(true);
}

const isTrue = (localStorage.getItem("displayImages") === "true")
displayImages(isTrue);

$(document).ready(function() {
    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav();

    // Make the page responsive
    $("img").addClass("responsive-img");

    // Allow the user to show or hide images
    $("#neotech-image").click(() => {
        // Toggle
        const newValue = !(localStorage.getItem("displayImages") === "true");
        
        localStorage.setItem("displayImages", newValue);
        displayImages(newValue);
    });
});