const express= require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const userAuthentication = require("../middleware/auth");
const expenseController = require('../controllers/expenseController')

router.use(express.static("public"))
//sign-up routes
router.get('/',userController.getSignUp)
router.get('/login',userController.getLogin)
router.post('/login',userController.postLogin);
router.post('/sign-up',userController.postSignUp);
router.get('/isPremiumUser',userAuthentication.authentication,userController.isPremiumUser)
router.get('/download',userAuthentication.authentication,expenseController.downloadexpense)
router.get('/leaderboards',expenseController.getLeaderBoardPage);
module.exports=router;