const express= require('express');
const router = express.Router();

const userAuthentication = require('../middleware/auth')
const premiumFeatureController = require('../controllers/premiumFeatureController')

router.get('showLeaderBoard',userAuthentication.authentication,premiumFeatureController.getUserLeaderboard)

module.exports=router;