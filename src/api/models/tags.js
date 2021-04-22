module.exports = (database, DataTypes) => database.define("Tag", {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})