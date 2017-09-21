$(".burgers").each(function() {
    const theta = Math.floor(61 * Math.random()) - 30;

    $(this).css({
        "filter": `hue-rotate(${theta}deg)`
    });
});