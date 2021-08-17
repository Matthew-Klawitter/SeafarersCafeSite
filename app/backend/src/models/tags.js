module.exports = (database, DataTypes) => database.define("Tag", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})