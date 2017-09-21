module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        "title": {
            "type"     : DataTypes.STRING,
            "allowNull": false,
            "validate" : {
                "len": [1, 160]
            }
        },

        "body": {
            "type"     : DataTypes.TEXT,
            "allowNull": false,
            "validate" : {
                "notEmpty": true
            }
        },

        "category": {
            "type"        : DataTypes.STRING,
            "allowNull"   : false,
            "validate"    : {
                "isIn": [["Personal", "announcement", "news"]]
            },
            "defaultValue": "Personal"
        }
    });

    return Post;
};