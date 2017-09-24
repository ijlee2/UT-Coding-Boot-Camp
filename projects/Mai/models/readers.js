module.exports = function(sequelize, DataTypes) {
    const readers = sequelize.define("reader", {
       "user_id": {
            "type"      : DataTypes.INTEGER,
            "references": {
                "model": users,
                "key"  : "id"
            },
            "allowNull" : false,
            "validate"  : {
            }
        },
        
        "reader_id": {
            "type"     : DataTypes.INTEGER,
            "allowNull": false,
            "validate" : {
            }
        }
    });

    return reader;
}