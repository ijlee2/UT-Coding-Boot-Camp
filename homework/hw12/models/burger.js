const path = require("path");

const orm = require(path.join(__dirname, "..", "config", "orm.js"));

exports.getBurgers = function() {
    Promise.resolve(orm.selectAll())
    .then(burgers => {
        console.log(burgers);

        return {
            "burgers_uneaten": burgers.filter(b => b.devoured),
            "burgers_eaten"  : burgers.filter(b => !b.devoured)
        };
        
    }, function() {
        console.log("error");

    });
}