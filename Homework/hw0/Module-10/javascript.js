var box = document.getElementById("box");

/* When button1 is clicked, increase the box's dimensions */
function box_growSize() {
    box.style.width  = (box.offsetWidth  + 10) + 'px';
    box.style.height = (box.offsetHeight + 10) + 'px';
}

/* When button2 is clicked, change the box's color */
document.getElementById("button2").onclick = function() {
    box.style.backgroundColor = "blue";
}

/* When button3 is clicked, change the box's opacity */
document.getElementById("button3").addEventListener("click", function() {
    box.style.opacity = "0.5";
});

/* Add a border around the box */
document.getElementById("button_addBorder").onclick = function() {
    box.style.border = "10px solid magenta";
}

/* Create shadow underneath the box */
document.getElementById("button_dropShadow").onclick = function() {
    box.style.boxShadow = "10px 10px 5px #ccc";
}

/* When button4 is clicked, reset the box's properties to the default */
document.getElementById("button4").onclick = function() {
    box.style = "height: 150px; width: 150px; background-color: orange; margin: 25px";
}