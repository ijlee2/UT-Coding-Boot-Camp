// Constructor
function Animal(raining, noise) {
    this.raining   = raining;
    this.noise     = noise;
    this.makeNoise = function() {
        if (this.raining) {
            console.log(this.noise);
        }
    }
}

function massHysteria(dogs, cats) {
    if (dogs.raining && cats.raining) {
        console.log("DOGS AND CATS LIVING TOGETHER. MASS HYSTERIA!");
    }
}

const dogs = new Animal(true, "Woof!");
const cats = new Animal(false, "Meow!");

dogs.makeNoise();
cats.makeNoise();

// If we want, we can change an object's properties
cats.raining = true;
cats.makeNoise();

massHysteria(dogs, cats);