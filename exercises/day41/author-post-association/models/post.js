module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        "title": {
            "type": DataTypes.STRING,
            "allowNull": false,
            "validate": {
                len: [1]
            }
        },

        "body": {
            "type": DataTypes.TEXT,
            "allowNull": false,
            "len": [1]
        }

    });

    Post.associate = function(models) {
        Post.belongsTo(models.Author, {
            "onDelete"  : "CASCADE",
            "foreignKey": {"allowNull": false}
        });
    }

    // Add a belongsTo association to Authors here
    // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
    return Post;
};