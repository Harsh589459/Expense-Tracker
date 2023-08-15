const express = require('express');

const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

// get config vars
dotenv.config();


//routes Imported
const userRoutes =require('./routes/user');
const expenseRoutes= require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const premiumFeatureRoutes = require('./routes/premiumFeatures')
const foregetPasswordRoutes = require('./routes/forgetPassword')
const reportRoutes = require('./routes/reports')

//models imported
const User = require('./models/userModel');
const Expense = require('./models/expenseModel')
const Order = require("./models/ordersModel")
const forgotPassword = require('./models/forgotPasswordModel');
const reports = require('./models/reportModel');

app.use(cors())

app.use(bodyParser.json());

app.use('/',userRoutes)
app.use('/user',userRoutes)
app.use('/',expenseRoutes);
app.use('/purchase',purchaseRoutes)
app.use('/premium/',premiumFeatureRoutes);
app.use('/password',foregetPasswordRoutes)
app.use('/reports',reportRoutes)


//foreign key relationship
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(forgotPassword);
forgotPassword.belongsTo(User);

User.hasMany(reports);
reports.belongsTo(User);

app.listen(process.env.PORT);