
const path = require('path');
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;

const apiKey = client.authentications['api-key']
apiKey.apiKey = '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'

const sendinblue = new Sib.TransactionalEmailsApi();



exports.getforgetPasswordPage=async(req,res)=>{
    try{
        res.sendFile(path.join(__dirname,'../',"public","views","forgetPassword.html"))
    }catch(err){
        res.sendStatus(504).json(err);

    }
}

exports.postForgetPassword=async(req,res)=>{
    const {email} = req.body;
    console.log(email)
    const sender = {
        email:'hs589459@gmail.com'
    }

    const to = {
        email:email,
    }

      
        try{
            const sendSmtpEmail = new Sib.SendSmtpEmail();
            sendSmtpEmail.sender=sender
            sendSmtpEmail.to = to
            sendSmtpEmail.subject='Reset Password - Expense Tracker app';
            sendSmtpEmail.textContent="It's okay to forgot things"
            sendinblue.sendTransacEmail(sendSmtpEmail).then((response)=>{
                console.log("email sent",response);
                res.status(200).json('OK')
            })

          
            return res.status(200).json({
                message:"LIn kto reset password sent to your email",
                success:true,
            })


            // const sendEmail = await sendinblue.sendTransacEmail({
            //     sender,
            //     to:receivers,
            //     subject:"Test Email",
            //     textContent:[
            //          'Reset your password using this code'
            //                 ]
                
            // });
            // return res.send(sendEmail);



            // await sendinblue.sendTransac

        }
        catch(err){
            console.log(err);
            return res.json({message:err,success:false});

        }
    //    await  transEmailApi.sendTransacEmail({
    //         sender,
    //         to:receivers,
    //         subject:'Reset password',
    //         textContent:[
    //             'Reset your password using this code'
    //         ]
    //     })

    }
  
