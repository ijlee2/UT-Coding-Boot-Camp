var orm = require("./config/orm.js");

/* This won't work - data will appear as undefined
var data = orm.selectWhere("parties", "party_type", "grown-up");

console.log(data);
*/

// Call orm method, passing in the anonymous function (with "res") as the callback.
orm.selectWhere("parties", "party_type", "grown-up", function(result) {
  var data = result;
  console.log(data);
});