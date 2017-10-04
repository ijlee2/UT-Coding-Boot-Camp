function displayLogin() {
    $(".mai-signup-wrapper").fadeOut(200);
    $(".mai-login-wrapper").fadeIn(1000);
}

function displaySignup() {
    $(".mai-login-wrapper").fadeOut(200);
    $(".mai-signup-wrapper").fadeIn(1000);
}

$(document).ready(function() {
    displaySignup();

    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav();
});