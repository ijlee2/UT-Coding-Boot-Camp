function Person(parameters) {
    for (let key in parameters) {
        this[key] = parameters[key];
    }

    this.printStats = function() {
        console.log(`Name      : ${this.name}`);
        console.log(`Profession: ${this.profession}`);
        console.log(`Gender    : ${this.gender}`);
        console.log(`Age       : ${this.age}`);
        console.log(`Strength  : ${this.strength}`);
        console.log(`HP        : ${this.hp}`);
        console.log("");
    }

    this.isAlive = function() {
        if (this.hp === 0) {
            console.log(`${this.name} is dead.`);
        }

        return (this.hp > 0);
    }

    this.attack = function(enemy) {
        enemy.hp = Math.max(enemy.hp - this.strength, 0);

        console.log(`${this.name} attacked ${enemy.name}! ${enemy.name} now has HP of ${enemy.hp}.`);
    }

    this.levelUp = function() {
        this.age++;
        this.strength += 5;
        this.hp += 25;

        console.log(`${this.name} is now ${this.age} years old, has a strength of ${this.strength}, and HP of ${this.hp}.`);
    }
}

const person1 = new Person({
    "name"      : "Andrew",
    "profession": "Student",
    "gender"    : "Male",
    "age"       : 25,
    "strength"  : 10,
    "hp"        : 80
});

const person2 = new Person({
    "name"      : "Jeremy",
    "profession": "Professor",
    "gender"    : "Male",
    "age"       : 53,
    "strength"  : 15,
    "hp"        : 60
});

// Print stats
console.log("\n--- Print stats ---\n");
person1.printStats();
person2.printStats();

// Print alive status
console.log("\n--- Print alive status ---\n");
person1.isAlive();
person2.isAlive();

// Attack
console.log("\n--- Attack ---\n");
person1.attack(person2);
person2.attack(person1);

// Level up
console.log("\n--- Level up ---\n");
person1.levelUp();
person2.levelUp();

// Start the game
console.log("\n--- Start the game ---\n");
while (person1.isAlive() && person2.isAlive()) {
    if (person1.isAlive()) {
        person1.attack(person2);

    } else {
        break;

    }

    if (person2.isAlive()) {
        person2.attack(person1);

    } else {
        break;

    }

    console.log();
}