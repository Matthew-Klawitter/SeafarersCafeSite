module.exports = (database, DataTypes) => database.define("Photo", {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    URL: {
        type: DataTypes.STRING,
        allowNull: false
    }
})