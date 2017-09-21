module.exports = function(sequelize, DataTypes) {
    const Burger = sequelize.define("Burger", {
        "name": {
            "type"     : DataTypes.STRING,
            "allowNull": false,
            "validate" : {
                "notEmpty": {"args": true, "msg": "Please give the burger a name."}
            }
        },

        "devoured": {
            "type"        : DataTypes.BOOLEAN,
            "allowNull"   : false,
            "defaultValue": false
        },

        "date": {
            "type"     : DataTypes.DATE,
            "allowNull": false,
            "validate" : {
                "notEmpty": {"args": true, "msg": "Please enter a start date and time."}
            }
        }
    });

    return Burger;
}