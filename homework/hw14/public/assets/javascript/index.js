let displayImages = true;

$(document).ready(function() {
    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav();

    $("#neotech-image").click(() => {
        console.log("index button clicked");
        // Toggle
        const displayImages = !($("#neotech-image i").text() === "image");

        $("img").css({"display": (displayImages) ? "block" : "none"});
        $("#neotech-image i").text((displayImages) ? "image" : "broken_image");

    });
});