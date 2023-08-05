const Sequelize = require("sequelize");
const sequelize = require("../util/database");


const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  paymentid: Sequelize.STRING,//we will get it when user do the payment
  orderid: Sequelize.STRING,//we will get it from razorpay when we click on buy premium
  status: Sequelize.STRING,
},{ timestamps: false,
}
);

module.exports = Order;