const db = require('../util/database')
const User = require('../models/users');

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