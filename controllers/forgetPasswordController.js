const path = require('path');
const uuid = require('uuid')
const Sib = require('sib-api-v3-sdk')
require('dotenv').config();
const client = Sib.ApiClient.instance;

const User = require('../models/userModel')

const apiKey = client.authentications['api-key']
console.log("pr>>>>>>>>>>>>>>",process.env.SIB_API_KEY);
apiKey.apiKey = process.env.SIB_API_KEY;
const Forgotpassword = require('../models/forgotPasswordModel')
const transEmailApi = new Sib.TransactionalEmailsApi();



exports.getforgetPasswordPage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../', "public", "views", "forgetPassword.html"))
    } catch (err) {
        res.sendS(504).json(err);

    }
}

exports.postForgetPassword = async (req, res) => {

    // try{
    //     const {email} = req.body;
    //     const user = await User.findOne({where:{email}})
    //     if(!user){
    //         const id = uuid.v4();
    //         console.log(id);
    //         user.createForgotpassword({id,active:true}).catch(err=>{
    //             throw new Error(err);
    //         })



    //     const receivers = [
    //         {
    //             email:email,
    //         }
    //     ]
    //    const response = await  transEmailApi.sendTransacEmail({
    //         sender,
    //         to:receivers,
    //         subject:'Reset Your password',
    //         textContent:
    //             'Reset your password using this code',
    //         htmlContent:`<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`


    //     })
    //    return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail',success:true})
    //     }
    //     else{
    //         res.status(404).json({message:'User does not exi'})
    //         throw new Error("User does not exist")
    //     }

    // }
    try {
        const { email } = req.body;
        console.log(email);
        const requestId = uuid.v4();
        const recepientEmail = await User.findOne({ where: { email: email } })
        if (!recepientEmail) {
            return res.status(404).json({ message: "Please provide the registered email!" })
        }
      
        const resetRequest = await Forgotpassword.create({
            id: requestId,
            isActive: true,
            userId: recepientEmail.dataValues.id,
        })

        const client = Sib.ApiClient.instance;
        const sender = {
            email: "mypc589459@gmail.com",
            name: "Harsh"
        }
        const receiver = [
            { email: email }
        ];
        const emailResponse = await transEmailApi.sendTransacEmail({
            sender,
            to: receiver,
            subject: "Expense Tracker Reset Password",
            textContent: "Link Below",
            htmlContent: `<h3> Hi! We got the request from you for reset the password. Here is the link below>>></h3>
            <a href="http://localhost:3000/password/resetPasswordPage/{{params.requestId}}">Click here </a>`,
            params: {
                requestId: requestId,
            }

        });
        return res.status(200).json({
            message: "Link for reset the password is successfully send on you Mail Id!",
        })

    }
    catch (err) {
        console.error(err)
        return res.status(409).json({ message: "Failed to changing password" });
    }
}

exports.resetPasswordPage = async (req, res, next) => {
    try {
        res.status(200).sendFile(
            path.join(__dirname, "../", "public", "views", "resetPassword.html")
        )
    } catch (error) {
        console.log(error);
    }
}
exports.updatePassword = async (req, res, next) => {
    try {
        console.log("res>>>>>>>>>>>>>>>.",req);
        const requestId = req.headers.referer.split("/");
        const password = req.body.password;
        const checkResetRequest = await Forgotpassword.findAll({
            where: { id: requestId[requestId.length - 1], isActive: true },
        });
        if (checkResetRequest[0]) {
            const userId = checkResetRequest[0].dataValues.userId;
            const result = await Forgotpassword.update(
                { isActive: false },
                { where: { id: requestId } }
            );
            const newPassword = await hashPassword(password);
            const user = await User.update(
              { password: newPassword },
              { where: { id: userId } }
            );
      
            return res.status(200).json({ message: "Successfully Changed password! " })
        }
        else {
            return res.status(409).json({ message: "Link is already used once , Request for new LInk" })
        }
    } catch (err) {
        console.log(err);
        return res.status(409).json({ message: "Failed to change password!" })

    }
   

}