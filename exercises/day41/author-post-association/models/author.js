module.exports = function(sequelize, DataTypes) {
    const Author = sequelize.define("Author", {
        // Giving the Author model a name of type STRING
        "name": DataTypes.STRING

    });

    Author.associate = function(models) {
        Author.hasMany(models.Post);
    }

    return Author;
};