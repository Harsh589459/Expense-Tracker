const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//id, name , password, phone number, role

const Forgotpassword = sequelize.define('ForgotPasswordRequest', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    isActive: Sequelize.BOOLEAN,
})

module.exports = Forgotpassword;