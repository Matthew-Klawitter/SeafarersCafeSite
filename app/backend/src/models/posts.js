module.exports = (database, DataTypes) => database.define("Post", {
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Published: {
        type: DataTypes.BOOLEAN
    }
})