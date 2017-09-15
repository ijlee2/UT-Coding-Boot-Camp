/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
const express    = require("express");
const bodyParser = require("body-parser");

const app  = express();
const PORT = process.env.PORT || 3000;

// Set up Express to handle parsing data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.text());



/****************************************************************************
 ****************************************************************************
    
    Set up routes
    
*****************************************************************************
*****************************************************************************/
// HTML routes
app.get("/:operation/:number1/:number2", function(req, res) {
    const x = parseFloat(req.params.number1);
    const y = parseFloat(req.params.number2);
    let output;

    switch (req.params.operation) {
        case "addition":
            output = `${x} + ${y} = ${x + y}`;
            break;

        case "subtraction":
            output = `${x} - ${y} = ${x - y}`;
            break;

        case "multiplication":
            output = `${x} x ${y} = ${x * y}`;
            break;

        case "division":
            output = `${x} / ${y} = ${(y !== 0) ? x / y : "undefined"}`;
            break;

        default:
            output = `Sorry, the only valid operations are "addition", "subtraction", "multiplication", and "division"!`

    }

    res.send(`<h1>${output}</h1>`);
});



/****************************************************************************
 ****************************************************************************
    
    Helper functions
    
*****************************************************************************
*****************************************************************************/
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});