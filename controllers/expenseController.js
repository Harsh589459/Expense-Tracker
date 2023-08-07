const db =require('../util/database');
const DailyExpense = require('../models/expenseModel');
const path = require('path');
const User = require('../models/userModel')
const sequelize = require("../util/database");


exports.getExpense=async (req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,'../',"public","views","daily-expense.html"))
    }
    catch(err){
        res.sendStatus(504).json(err);
    }
}
exports.getAllExpense=async (req,res,next)=>{
    try{
        console.log(req.user.id)
        const expense = await DailyExpense.findAll({where:{userId:req.user.id}})
        res.json(expense);

    }catch(error){
        console.log(error)
        return res.status(500).json({error:error,success:false})
    }
}
//suppost we add expense in database successfully but in User.update it have some error like misspeelled where as were so it will reponse as error and it is not updated in total expense but the expense is added in Daily Expense so it is giving error thats why we use transaction to keep track
exports.addExpense=async (req,res,next)=>{
    const t = await sequelize.transaction();

    try{
        const{amount,description,category}=req.body;
         await DailyExpense.create({
            amount:amount,
            description:description,
            category:category,
            userId:req.user.id
        },{transaction:t});
        await User.update({
            totalExpenses:Number(req.user.totalExpenses)+ Number(amount),
        },
        {where:{id:req.user.id},transaction:t},
        
        )
        await t.commit();//now the data gets updated
        res.status(200).json({message:"Expenses added"});

    }catch(err){
        await t.roolback();//if error comes then data is not get commited
        console.log(err)
        res.status(500).then("Error occured while adding the expenses")


    }


}
exports.deleteExpense=async (req,res,next)=>{
    const t = await sequelize.transaction();

    const id = req.params.id;
    console.log(id);
    console.log(req.user);
    try{
        const expense = await DailyExpense.findByPk(id);
        await DailyExpense.destroy({where:{id:id,userId:req.user.id},transaction:t})
        await User.update({
            totalExpenses:Number(req.user.totalExpenses)- Number(expense.amount),
        },
        {where:{id:req.user.id},transaction:t},
        
        )
        await t.commit();
        res.status(200).json({message:"Deleted successfully"})

    }
    catch(err){
        await t.roolback();
        console.log(err);
        res.status(500).then("Error occured while deleting the expenses")
    }

}