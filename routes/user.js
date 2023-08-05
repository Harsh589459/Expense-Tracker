const express= require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const userAuthentication = require("../middleware/auth");


router.use(express.static("public"))
//sign-up routes
router.get('/',userController.getSignUp)
router.get('/login',userController.getLogin)
router.post('/login',userController.postLogin);
router.post('/sign-up',userController.postSignUp);
router.get('/isPremiumUser',userAuthentication.authentication,userController.isPremiumUser)

module.exports=router;