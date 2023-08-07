
const path = require('path');
const Sib = require('sib-api-v3-sdk')
require('dotenv').config();
const client = Sib.ApiClient.instance;

const apiKey = client.authentications['api-key']
apiKey.apiKey = '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';

const transEmailApi = new Sib.TransactionalEmailsApi();



exports.getforgetPasswordPage=async(req,res)=>{
    try{
        res.sendFile(path.join(__dirname,'../',"public","views","forgetPassword.html"))
    }catch(err){
        res.sendStatus(504).json(err);

    }
}

exports.postForgetPassword=async(req,res)=>{
    const email = req.body.email;

    try{
        const sender = {
            email:'hs589459@gmail.com',
        }
        const receivers = [
            {
                email:'hs0589459@gmail.com',
            }
        ]
       await  transEmailApi.sendTransacEmail({
            sender,
            to:receivers,
            subject:'Reset password',
            textContent:[
                'Reset your password using this code'
            ]
        })

    }
    catch(err){
        console.log(err)
    }
}