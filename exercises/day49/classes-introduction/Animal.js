// Pokemon base class
class Pokemon {
    constructor(name, isSleepy) {
        this.name     = name;
        this.isSleepy = isSleepy;
    }

    sayName() {
        console.log("Hey, little buddy, what's your name?");

        if (this.isSleepy) {
            console.log("ZZZZzzzzzzzzzzz\nHmmmmm..... seems to be sleeping.\n");

        } else {
            console.log(`${this.name}!!!\n`);

        }
    }

    wakeUp() {
        console.log(`Waking up ${this.name}...`);

        this.isSleepy = false;
        
        console.log(`${this.name} is awake!\n`);
    }
}

// By extending a class we are creating a brand new class with all of the features of the original base class
class Pikachu extends Pokemon {
    constructor(name, isSleepy, isHungry) {
        super(name, isSleepy);
        this.isHungry = isHungry;
    }

    askAboutMood() {
        console.log(`Hey, ${this.name} how are you feeling?`);

        if (this.isHungry) {
            console.log("Pika... 😠");
            console.log("Looks like Pikachu is hungry!\n");

        } else if (this.isSleepy) {
            console.log("ZZZZzzzzzzzzzzz\nHmmmmm..... seems to be sleeping.\n");

        } else {
            console.log("Pikapi! 😊");
            console.log("Looks like Pikachu is in a good mood!\n");
        }
    }

    feed() {
        this.isHungry = false;
        this.isSleepy = true;
        
        console.log(`Just fed ${this.name}! They look a little sleepy now.\n`);
    }
}

const pikachu = new Pikachu("Pikachu", false, true);

pikachu.sayName();
pikachu.feed();
pikachu.wakeUp();
pikachu.askAboutMood();