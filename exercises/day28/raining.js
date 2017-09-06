function makeNoise() {
    if (this.raining) {
        console.log(this.noise);
    }
}

const dogs = {
    "raining"  : true,
    "noise"    : "Woof!",
    "makeNoise": makeNoise
}

const cats = {
    "raining"  : false,
    "noise"    : "Meow!",
    "makeNoise": makeNoise
}

function massHysteria(dogs, cats) {
    if (dogs.raining && cats.raining) {
        console.log("DOGS AND CATS LIVING TOGETHER. MASS HYSTERIA!");
    }
}

dogs.makeNoise();

cats.makeNoise();

massHysteria(dogs, cats);