const db = require('../util/database')
const User = require('../models/users');
const path =require('path');
const becrypt = require('bcrypt');

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

    becrypt.hash(password,10,async(err,hash)=>{
        const user  =new User(name,email,hash);
        user.signUpUser().then((response)=>{
            console.log('response',response)
            res.send(response);
        }).catch((err)=>{
            console.log(err);
        })

    }).catch((err)=>{
        res.status(500).json(err);
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