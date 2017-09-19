var connection = require("../config/connection.js");

var orm = {
  // The last variable cb represents the anonymous function being passed from server.js
  selectWhere: function(tableInput, colToSearch, valOfCol, cb) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
      cb(result);
    });
  }
};

module.exports = orm;
