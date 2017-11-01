$(document).ready(function() {
    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav({"closeOnClick": true});

    // Carousel settings
    $(".carousel").carousel({
        "duration": 120,
        "dist"    : -60,
        "shift"   : 50
    });
});