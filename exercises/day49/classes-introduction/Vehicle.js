// ES6 Class example
class Vehicle {
    constructor(make, acceleration) {
        this.make         = make;
        this.acceleration = acceleration;
        this.speed        = 0;
    }

    // This class has an accelerate method which increases it's speed
    accelerate() {
        this.speed += this.acceleration;
        console.log(`Current speed is ${this.speed}mph!`);
    }

    // This class has an brake method which decreases it's speed
    brake() {
        const oldSpeed = this.speed;

        this.speed = 0;
        
        console.log(`Wow! This ${this.make} can stop on a dime!!! It went from ${oldSpeed}mph to ${this.speed}mph instantly!`);
    }
}

const lambo = new Vehicle("Lamborghini", 50);

lambo.accelerate();
lambo.brake();

// ES5 equivelent using a constructor function

// function Vehicle(make, acceleration) {
//     this.make = make;
//     this.acceleration = acceleration;
//     this.speed = 0;
// }

// Vehicle.prototype.accelerate = function() {
//     this.speed += this.acceleration;
//     console.log(`Current speed is ${this.speed}mph!`);
// };

// Vehicle.prototype.brake = function() {
//     const oldSpeed = this.speed;
//     this.speed += this.acceleration;
//     console.log(
//         `Wow! This ${this.make} can stop on a dime!!! It went from ${oldSpeed}mph to ${this.speed}mph instantly!`
//     );
// };

// var lambo = new Vehicle("Lamborghini", 50);

// lambo.accelerate();
// lambo.brake();