module.exports = function(sequelize, DataTypes) {
    const stories_to_photos = sequelize.define("stories_to_photo", {
        "story_id": {
            "type"     : DataTypes.INTEGER,
            "allowNull": false,
            "validate" : {
            }
        },

        "photo_id": {
            "type"     : DataTypes.INTEGER,
            "allowNull": false,
            "validate" : {
            }
        }
    });

    return stories_to_photos;
}