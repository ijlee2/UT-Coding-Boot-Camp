module.exports = function(sequelize, DataTypes) {
    const writers = sequelize.define("writer", {
       "user_id": {
            "type"     : DataTypes.INTEGER,
            "allowNull": false,
            "validate" : {
            }
        },
        
        "reader_id": {
            "type"     : DataTypes.INTEGER,
            "allowNull": false,
            "validate" : {
            }
        }
    });

    return writers;
}