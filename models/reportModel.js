const Sequelize = require("sequelize");
const sequelize = require("../util/database");


const reports = sequelize.define("reports", {
    link:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    date:{
        type:Sequelize.STRING,
    }
  
  
}
);

module.exports =reports;