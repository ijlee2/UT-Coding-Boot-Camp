$(document).ready(function() {
    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav();

    // Make the page responsive
    $("img").addClass("responsive-img");

    $("#neotech-image").click(() => {
        console.log("thread button clicked");
        // Toggle
        const displayImages = !($("#neotech-image i").text() === "image");

        $("img").css({"display": (displayImages) ? "block" : "none"});
        $("#neotech-image i").text((displayImages) ? "image" : "broken_image");

    });
});