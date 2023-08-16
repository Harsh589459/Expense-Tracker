const db = require('../util/database');
const DailyExpense = require('../models/expenseModel');
const path = require('path');
const User = require('../models/userModel')
const sequelize = require("../util/database");
const UserServices = require("../services/userServices")
const S3Service = require('../services/S3services')
const reports = require('../models/reportModel');



exports.getExpense = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../', "public", "views", "daily-expense.html"))
    }
    catch (err) {
        res.sendStatus(504).json(err);
    }
}
exports.getAllExpense = async (req, res, next) => {
    try {
        const pageNo = req.params.page;
        const limit = 10;
        const offset = (pageNo - 1) * limit;
        const totalExpenses = await DailyExpense.count({
            where: { userId: req.user.id }
        });
        const totalPages = Math.ceil(totalExpenses / limit);

        const expense = await DailyExpense.findAll({
            where: { userId: req.user.id },
            offset: offset,
            limit: limit
        })

        res.json({expense:expense,totalPages:totalPages});

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error, success: false })
    }
}
//suppost we add expense in database successfully but in User.update it have some error like misspeelled where as were so it will reponse as error and it is not updated in total expense but the expense is added in Daily Expense so it is giving error thats why we use transaction to keep track
exports.addExpense = async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
        const { amount, description, category,date } = req.body;
        await DailyExpense.create({
            date:date,
            amount: amount,
            description: description,
            category: category,
            userId: req.user.id
        }, { transaction: t });
        await User.update({
            totalExpenses: Number(req.user.totalExpenses) + Number(amount),
        },
            { where: { id: req.user.id }, transaction: t },

        )
        await t.commit();//now the data gets updated
        res.status(200).json({ message: "Expenses added" });

    } catch (err) {
        await t.roolback();//if error comes then data is not get commited
        console.log(err)
        res.status(500).then("Error occured while adding the expenses")


    }


}
exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction();

    const id = req.params.id;
    console.log(id);
    console.log(req.user);
    try {
        const expense = await DailyExpense.findByPk(id);
        await DailyExpense.destroy({ where: { id: id, userId: req.user.id }, transaction: t })
        await User.update({
            totalExpenses: Number(req.user.totalExpenses) - Number(expense.amount),
        },
            { where: { id: req.user.id }, transaction: t },

        )
        await t.commit();
        res.status(200).json({ message: "Deleted successfully" })

    }
    catch (err) {
        await t.roolback();
        console.log(err);
        res.status(500).then("Error occured while deleting the expenses")
    }

}
exports.downloadexpense = async (req, res) => {
    try {
        const expenses = await UserServices.getExpenses(req)
        const stringifiedExpenses = JSON.stringify(expenses);
        console.log(stringifiedExpenses);
        const userId = req.user.id

        //file name should depend on userid
        const filename = `Expense${userId}/${new Date()}.txt`
        const fileUrl = await S3Service.uploadToS3(stringifiedExpenses, filename);
        const today = new Date();

        let year = today.getFullYear();
        let month = today.getMonth() + 1; // Adding 1 because month is zero-based
        let day = today.getDate();
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        const formattedDate = `${year}-${month}-${day}`;
        console.log(">>>>>>>>>>", typeof (formattedDate))

        const response = await reports.create({
            link: fileUrl,
            UserId: userId,
            date: formattedDate

        })

        res.status(200).json({ fileUrl, success: true })
    } catch (err) {
        res.status(500).json({ fileUrl: '', success: false, err: err })
    }
}

