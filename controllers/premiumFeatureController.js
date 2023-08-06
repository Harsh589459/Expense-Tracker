const User = require('../models/userModel');
const Expense =require('../models/expenseModel')

const Sequelize = require('../util/database');
const sequelize = require('../util/database');

const getUserLeaderboard = async (req,res)=>{
    try{

        const leaderBoardofUsers=await User.findAll({
            order:[['totalExpenses','DESC']]
        })
        // const leaderBoardofUsers = await User.findAll({
        //     attributes:['id','name',[sequelize.fn('sum',sequelize.col('amount')),'total_cost']],
        //     include:[
        //         {
        //             model:Expense,
        //             attributes:[]
        //         }
        //     ],
        //     group:['id'],//if we take useId then it will only take user id that have expenses and user.id will take all the user
        //     order:[['total_cost','DESC']
        //     ],
        // })
        // const userAggregatedExpenses = await Expense.findAll({
        //     attributes:['userId',[sequelize.fn('sum',sequelize.col('amount')),'total_cost']],
        //     group:['userId']
        // });
        // const userAggregatedExpenses={};

        // expenses.forEach((expense)=>{ 

        //     if(userAggregatedExpenses[expense.userId]){
        //         userAggregatedExpenses[expense.userId]+=expense.amount

        //     }
        //     else{
        //         userAggregatedExpenses[expense.userId]=expense.amount

        //     }
        // })
        // var userLeaderBoardDetails=[];
        // users.forEach((user)=>{
        //     userLeaderBoardDetails.push({name:user.name,total_cost:userAggregatedExpenses[user.id] || 0 })
        // })
        
        // userLeaderBoardDetails.sort((a,b)=>b.total_cost-a.total_cost)
        // console.log(userLeaderBoardDetails);

        res.status(200).json(leaderBoardofUsers);

    }catch(err){
        console.log(err);
        res.status(500).json(err)

    }
}
module.exports={
    getUserLeaderboard
}