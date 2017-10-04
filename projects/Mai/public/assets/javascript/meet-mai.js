$("#button_home").click(event => {
    window.location = "/";
});

$("#button_compose").click(event => {
    window.location = "/upload-photos";
});

$(document).ready(function() {
    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav();
});