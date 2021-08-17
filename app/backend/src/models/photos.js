module.exports = (database, DataTypes) => database.define("Photo", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }
})