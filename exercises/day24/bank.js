const fs = require("fs");

// Create a text file for the bank account
if (process.argv.length === 2) {
    fs.writeFile("bank.txt", "0.00", function(error) {
        if (error) {
            return console.log(error);
        }
    });

} else {
    const option = process.argv[2];
    const amount = process.argv[3];

    switch (option) {
        case "total":
            getTotal();
            break;

        case "deposit":
        case "withdraw":
            updateTotal((option === "deposit") ? amount : -amount);
            break;

        case "lotto":
            playLottery();
            break;

    }
}

function getTotal() {
    fs.readFile("bank.txt", "utf8", function(error, data) {
        if (error) {
            return console.log("getTotal" + error);
        }

        const bankStatements = data.split(",");

        let total = 0;

        bankStatements.forEach(b => total += parseFloat(b));

        console.log(`You have ${total.toFixed(2)} in your account.`);

        if (total < 0) {
            console.log("You overdrafted. Be careful!");
        }
    });
}

function updateTotal(amount) {
    fs.appendFile("bank.txt", `, ${amount}`, function(error) {
        if (error) {
            return console.log("updateTotal" + error);
        }

        getTotal();
    });
}

function playLottery() {
    const lotteryNumber = Math.floor(6 * Math.random());

    if (lotteryNumber === 1) {
        console.log("You won the lottery!");
        updateTotal(2.00);

    } else {
        console.log("You lost the lottery.");
        updateTotal(-0.25);

    }
}