$("#button_home").click(event => {
    window.location = "/";
});

$("#button_compose").click(event => {
    window.location = "/upload-photos";
});

// Stop a function from running too many times
function debounce(func, wait = 10, immediate = true) {
    let timeout;

    return function() {
        const context = this, args = arguments;

        function later() {
            timeout = null;

            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

function detectDevice() {
    switch ($("#mai-device-detector").css("font-size")) {
        // Extra large, large
        case "4px":
        case "3px":
            $("#mai-about-mai").addClass("mai-vertical-align-wrapper");
            $("#mai-about-mai").css({"margin": "0"});

            break;

        // Medium, small
        case "2px":
        case "1px":
            $("#mai-about-mai").removeClass("mai-vertical-align-wrapper");
            $("#mai-about-mai").css({"margin": "2.5em 0"});

            break;

    }
}

// Check device size before page loads and when window is resized
detectDevice();

$(window).resize(debounce(detectDevice));

$(document).ready(function() {
    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav({"closeOnClick": true});
});