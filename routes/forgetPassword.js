const express =require('express')
const router = express.Router();
const forgetPasswordController = require('../controllers/forgetPasswordController')

router.use(express.static("public"))


router.get('/forget-password',forgetPasswordController.getforgetPasswordPage)
router.post('/forgotpassword',forgetPasswordController.postForgetPassword)
router.get("/resetPasswordPage/:id",forgetPasswordController.resetPasswordPage)
router.post("/resetPassword",forgetPasswordController.updatePassword);


module.exports=router;