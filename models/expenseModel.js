

const Sequelize = require("sequelize");
const sequelize = require('../util/database');

const Expenses = sequelize.define("expense", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:true,
    }
}, {
    timestamps: false, // Disable timestamps
});
module.exports = Expenses;