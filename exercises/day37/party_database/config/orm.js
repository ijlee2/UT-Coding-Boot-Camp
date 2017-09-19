const connection = require("./connection.js");

// Object Relational Mapper (ORM)
const orm = {
    selectWhere: function(tableInput, colToSearch, valOfCol) {
        const sql_command = "SELECT * FROM ?? WHERE ?? = ?";

        connection.query(sql_command, [tableInput, colToSearch, valOfCol], function(error, results) {
            console.log(results);
        });
    },

    selectAndOrder: function(whatToSelect, table, orderCol) {
        const sql_command = "SELECT ?? FROM ?? ORDER BY ?? DESC";

        connection.query(sql_command, [whatToSelect, table, orderCol], function(error, results) {
            console.log(results);
        });
    },
    
    findWhoHasMost: function(tableOneCol, tableTwoForeignKey, tableOne, tableTwo) {
        const sql_command = "SELECT ??, COUNT(??) AS count FROM ?? LEFT JOIN ?? ON ??.??= ??.id GROUP BY ?? ORDER BY count DESC LIMIT 1";

        connection.query(sql_command, [tableOneCol, tableOneCol, tableOne, tableTwo, tableTwo, tableTwoForeignKey, tableOne, tableOneCol], function(error, results) {
            console.log(results);
        });
    }
};

module.exports = orm;