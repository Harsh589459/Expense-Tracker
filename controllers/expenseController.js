const db =require('../util/database');
const DailyExpense = require('../models/expenseModel');
const path = require('path');


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

exports.addExpense=async (req,res,next)=>{
    try{
        const{amount,description,category}=req.body;
        await DailyExpense.create({
            amount:amount,
            description:description,
            category:category,
            userId:req.user.id
        }).then((response)=>{
            res.status(200).json({message:"Expenses added"});
        }).catch((err)=>{
            res.status(500).then("Error occured while adding the expenses")
        })
    }catch(err){
        console.log(err)

    }


}
exports.deleteExpense=async (req,res,next)=>{
    
    const id = req.params.id;
    console.log(id);
    console.log(req.user.id);
    try{
        const expense = await DailyExpense.findByPk(id);
        await DailyExpense.destroy({where:{id:id,userId:req.user.id}}).then((response)=>{
            res.status(200).json({message:"Deleted successfully"})
        }).catch((err)=>{
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    }

}