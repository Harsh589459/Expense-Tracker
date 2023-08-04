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
    // DailyExpense.getAllExpense().then((response)=>{
    //     res.send(response);
    // })
    try{
        const expense = await DailyExpense.findAll()
        res.json(expense);

    }catch(error){
        console.log(error)
    }
}

exports.addExpense=async (req,res,next)=>{
    // const{amount,description,category}=req.body;

    // const dailyExpense=new DailyExpense(null,amount,description,category);

    // dailyExpense.addExpense().then((response)=>{
    //     console.log(response);
    //     res.send(response);
    // }).catch((err)=>{
    //     res.status(500).send("Error occurred while adding the expense.");
    // })
    try{
        const{amount,description,category}=req.body;
        await DailyExpense.create({
            amount:amount,
            description:description,
            category:category
        }).then((response)=>{
            res.status(200).json({message:"Expenses added"});
        }).catch((err)=>{
            console.log(err);
        })
    }catch(err){
        console.log(err)

    }


}
exports.deleteExpense=async (req,res,next)=>{
    // conso
    // const dailyExpense = new DailyExpense(req.body.id,null,null,null);
    // dailyExpense.deleteExpense().then((response)=>{
    //     console.log("delte done")
    //     res.status(200).send(response)
    // }).catch((err)=>{
    //     console.log("nodDete")
    //     res.status(500).send("Error occurred while deleting the expense.");


    // })
    const id = req.params.id;
    console.log(id)
    try{
        const expense = await DailyExpense.findByPk(id);
        await DailyExpense.destroy({where:{id:id}}).then((response)=>{
            res.status(200).json({message:"Deleted successfully"})
        }).catch((err)=>{
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    }

}