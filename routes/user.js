const express= require('express')
const router = express.Router();
const userController = require('../controllers/userController')

router.use(express.static("public"))
//sign-up routes
router.get('/',userController.getSignUp)
router.get('/login',userController.getLogin)
router.post('/login',userController.postLogin);
router.post('/sign-up',userController.postSignUp)

module.exports=router;