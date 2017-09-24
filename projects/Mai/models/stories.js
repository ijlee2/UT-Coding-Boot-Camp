module.exports = function(sequelize, DataTypes) {
    const user = sequelize.define("story", {
        "url": {
            "type"     : DataTypes.STRING,
            "allowNull": false,
            "validate" : {
                "isURL": true
            }
        },
    });

    return story;
}