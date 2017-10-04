let displayImages = true;

$(document).ready(function() {
    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav();

    $("#neotech-image").click(() => {
        displayImages = !displayImages;

        $("#neotech-image i").text((displayImages) ? "image" : "broken_image");

    });
});