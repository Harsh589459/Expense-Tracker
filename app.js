const express = require('express');

const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config();


const userRoutes =require('./routes/user');
const expenseRoutes= require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')

const User = require('./models/userModel');
const Expense = require('./models/expenseModel')
const Order = require("./models/ordersModel")

app.use(cors())

app.use(bodyParser.json());

app.use('/',userRoutes)
app.use('/user',userRoutes)
app.use('/',expenseRoutes);
app.use('/purchase',purchaseRoutes)

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

app.listen(3000);