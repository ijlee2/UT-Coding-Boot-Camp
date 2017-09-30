module.exports = function(sequelize, DataTypes) {
    const Reader = sequelize.define("Reader", {
        "id": {
            "type"        : DataTypes.UUID,
            "defaultValue": DataTypes.UUIDV4,
            "allowNull"   : false,
            "primaryKey"  : true
        },
        
        "reader_id": {
            "type"     : DataTypes.UUID,
            "allowNull": false,
            "validate" : {
                "isUUID": {
                    "args": 4,
                    "msg" : "Please enter a valid UUID."
                }
            }
        }

    }, {"underscored": true});

    // Create associations
    Reader.associate = function(models) {
        Reader.belongsTo(models.Writer, {"onDelete": "CASCADE"});
    }

    return Reader;
}