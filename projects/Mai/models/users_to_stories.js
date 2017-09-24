module.exports = function(sequelize, DataTypes) {
    const users_to_stories = sequelize.define("user_to_story", {
       "user_id": {
            "type"     : DataTypes.INTEGER,
            "allowNull": false,
            "validate" : {
            }
        },
        
        "story_id": {
            "type"     : DataTypes.INTEGER,
            "allowNull": false,
            "validate" : {
            }
        }
    });

    return users_to_stories;
}