module.exports = function(sequelize, DataTypes) {
    const Photo = sequelize.define("Photo", {
        "id": {
            "type"        : DataTypes.UUID,
            "defaultValue": DataTypes.UUIDV4,
            "allowNull"   : false,
            "primaryKey"  : true
        },
        
        "url": {
            "type"     : DataTypes.STRING,
            "allowNull": false,
            "validate" : {
                "isURL": {
                    "args": true,
                    "msg" : "Please enter a valid url."
                }
            }
        },
        
        "caption": {
            "type"     : DataTypes.TEXT,
            "allowNull": false,
            "validate" : {
                "notEmpty": {
                    "args": true,
                    "msg" : "Please enter a caption."
                }
            }
        },
        
        "time_taken": {
            "type"    : DataTypes.DATE,
            "validate": {
                "isDate": {
                    "args": true,
                    "msg" : "Please enter a valid date string."
                }
            }
        }

    }, {"underscored": true});

    // Create associations
    Photo.associate = function(models) {
        Photo.belongsTo(models.Story, {"onDelete": "CASCADE"});
    }

    return Photo;
}