const express= require('express')
const router = express.Router();
const userController = require('../controllers/users')

//sign-up routes
router.post('/sign-up',userController.postSignUp)

module.exports=router;