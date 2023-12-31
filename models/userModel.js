
const Sequelize = require('sequelize');
const sequelize= require('../util/database');

const User = sequelize.define("Users",{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
  },
  name:Sequelize.STRING,
  email:Sequelize.STRING,
  password:Sequelize.STRING,
  isPremiumUser:Sequelize.BOOLEAN,
  totalExpenses:{
    type:Sequelize.INTEGER,
    defaultValue:0,
  }
}, {
  timestamps: false, // Disable timestamps
});

module.exports=User;