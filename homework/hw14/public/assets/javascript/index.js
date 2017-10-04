let displayImages = true;

$(document).ready(function() {
    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav();

    // Hide images by default
    $("img").css({"display": "none"});

    $("#neotech-image").click(() => {
        console.log("index button clicked");
        // Toggle
        const displayImages = !($("#neotech-image i").text() === "image");

        $("img").css({"display": (displayImages) ? "block" : "none"});

        $("#neotech-image i").attr({"title": (displayImages) ? "Click to hide images." : "Click to show images."});
        $("#neotech-image i").text((displayImages) ? "image" : "broken_image");

    });
});