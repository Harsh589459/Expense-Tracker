const db =require('../util/database');
const DailyExpense = require('../models/daily-expense');
const path = require('path');


exports.getExpense=(req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,'../',"public","views","daily-expense.html"))
    }
    catch(err){
        res.sendStatus(504).json(err);
    }
}
exports.getAllExpense=(req,res,next)=>{
    DailyExpense.getAllExpense().then((response)=>{
        res.send(response);
    })
}

exports.addExpense=(req,res,next)=>{
    const{amount,description,category}=req.body;

    const dailyExpense=new DailyExpense(null,amount,description,category);

    dailyExpense.addExpense().then((response)=>{
        console.log(response);
        res.send(response);
    }).catch((err)=>{
        res.status(500).send("Error occurred while adding the expense.");
    })
}
exports.deleteExpense=(req,res,next)=>{
    console.log(req.body.id);
    const dailyExpense = new DailyExpense(req.body.id,null,null,null);
    dailyExpense.deleteExpense().then((response)=>{
        console.log("delte done")
        res.status(200).send(response)
    }).catch((err)=>{
        console.log("nodDete")
        res.status(500).send("Error occurred while deleting the expense.");


    })
}