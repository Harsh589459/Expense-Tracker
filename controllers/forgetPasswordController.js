const uuid = require('uuid');
const sgMail = require('@sendgrid/mail')
const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const forgotpassword=require('../models/forgotPasswordModel');



exports.getforgetPasswordPage=async(req,res)=>{
    try{
        res.sendFile(path.join(__dirname,'../',"public","views","forgetPassword.html"))
    }catch(err){
        res.sendStatus(504).json(err);

    }
}

exports.postForgetPassword=async(req,res)=>{
    try{
        const {email} = req.body;
        const id = uuid.v4();

    }
    catch(err){
        console.log(err)
    }

    }
  
