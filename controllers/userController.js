const db = require('../util/database')
const User = require('../models/userModel');
const path = require('path');
const becrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

exports.getSignUp = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "../", "public", "views", "signUp.html"))
    }
    catch (error) {
        console.log(error)
    }
}


exports.postSignUp = async (req, res, next) => {


    try {
        const { name, email, password } = req.body

        await User.findOne({ where: { email: email } }).then((response) => {
            if (response) {
                res.status(409).send(`<p>User already Exist</p>`)
            }
            else {
                becrypt.hash(password, 10, async (err, hash) => {
                    await User.create({
                        name: name,
                        email: email,
                        password: password
                    })
                })
                res.status(200).send(`<script>User Created Successfully';window.location.href='/'</script>`)

            }
        }).catch((err) => {
            console.log(err);
        })
    }
    catch (error) {
        console.log(error);
    }
}

function generateAccessToken(id,email){
    return jwt.sign({userId:id,email:email},'7f3251c2e0ac5bbf51dbf3f9d5b7a6959b8be2d5a3a421ed7c9fe4c781faa5d7')
}
exports.getLogin = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "../", "public", "views", "login.html"))
    }
    catch (error) {
        console.log(error)
    }

}

exports.postLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        await User.findOne({ where: { email: email } }).then((response) => {
            if (response) {
                console.log(response);
                becrypt.compare(password, response.password, (err, passwordMatch) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: "Something Went wrong" })
                    }
                    if (passwordMatch == true) {
                        return res.status(200).json({
                            success: true,
                            message: "Logged In Successfully",token:generateAccessToken(response.id,response.email)
                        })
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: "Your Password is incorrect",
                        })
                    }

                })
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: "User doesn't Exist Please SignUp"
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}