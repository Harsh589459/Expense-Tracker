const express= require('express');
const router = express.Router();

const userAuthentication = require('../middleware/auth')
const premiumFeatureController = require('../controllers/premiumFeatureController')
const reportsController = require('../controllers/reportsController')
router.get('/showLeaderBoard',userAuthentication.authentication,premiumFeatureController.getUserLeaderboard)
router.get('/reports',reportsController.getReportsPage);
module.exports=router;