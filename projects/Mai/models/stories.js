module.exports = function(sequelize, DataTypes) {
    const Story = sequelize.define("Story", {
        "id": {
            "type"        : DataTypes.UUID,
            "defaultValue": DataTypes.UUIDV4,
            "allowNull"   : false,
            "primaryKey"  : true
        },
        
        "title": {
            "type"     : DataTypes.STRING(100),
            "allowNull": false,
            "validate" : {
                "len": {
                    "args": [1, 100],
                    "msg" : "Your title cannot exceed 100 characters."
                }
            }
        }

    }, {"underscored": true});

    // Create associations
    Story.associate = function(models) {
        Story.belongsTo(models.Writer, {"onDelete": "CASCADE"});
        Story.hasMany(models.Photo);
    }

    return Story;
}