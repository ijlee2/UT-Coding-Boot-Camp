// Display photos as we scroll the page
const options_scroll = [];
const numCards       = $(".card").length;

for (let i = 1; i < numCards; i++) {
    const selector = `#card${i}`;

    // Hide the card initially
    $(selector).css({"visibility": "hidden"});

    options_scroll.push({
        "selector": selector,
        "offset"  : Math.round($(selector).height() / 2),
        "callback": element => {
            $(element).css({"visibility": "visible"});
            Materialize.fadeInImage($(element));
        }
    });
}

Materialize.scrollFire(options_scroll);

$(document).ready(function() {
    // Dropdown menu
    $(".dropdown-button").dropdown();

    // Navbar for mobile
    $(".button-collapse").sideNav({"closeOnClick": true});
});