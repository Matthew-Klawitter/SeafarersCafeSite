module.exports = (database, DataTypes) => database.define("Project", {
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})