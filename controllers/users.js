const db = require('../util/database')
const User = require('../models/users');
const path =require('path')

exports.getSignUp=(req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,"../","public","views","signUp.html"))
    }
    catch(error){
        console.log(error)
    }
}


exports.postSignUp=(req,res,next)=>{
    const name=req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user  =new User(name,email,password);
    user.signUpUser().then((response)=>{
        console.log('response',response)
        res.send(response);
    }).catch((err)=>{
        console.log(err);
    })
}
exports.getLogin=(req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,"../","public","views","login.html"))
    }
    catch(error){
        console.log(error)
    }

}

exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password= req.body.password;

    const user = new User(null,email,password);
    user.loginUser().then((response)=>{
        console.log("response",response)
        res.send(response);
    }).catch((err)=>{
        console.log(err)
    })

}