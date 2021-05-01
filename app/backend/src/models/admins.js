module.exports = (database, DataTypes) => database.define("Admin", {
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Salt: {
        type: DataTypes.STRING,
        allowNull: false
    }
})