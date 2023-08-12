const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authentication = async (req,res,next)=>{
    try{
        const token = req.header("Authorization")
        const user = jwt.verify(token,process.env.TOKEN_SECRET);
        User.findByPk(user.userId).then(user=>{
            req.user=user;//req.user is a global object so that it cann accessible to the expensecontroller it is only accessible in this file and expenseController.getAllExpenses
            next();//this will flow to the next function in the route expenseController
        }).catch(err=>{throw new Error(err)})
    }catch(err){
        console.log(err);
        return res.status(401).json({success:false})
    }

}
module.exports={
    authentication
}