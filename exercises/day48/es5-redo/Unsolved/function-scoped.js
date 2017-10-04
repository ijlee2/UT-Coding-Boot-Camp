let name = "Nick";

const tinyize = function(name) {
    const myName = "Tiny " + name + "!";

    return myName;
};

name = tinyize("Rick");
console.log(name);

for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);

    }, 100);
}