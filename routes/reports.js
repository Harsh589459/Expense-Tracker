const express= require('express');
const router = express.Router();

const userAuthentication = require('../middleware/auth')
const reportsController = require('../controllers/reportsController')

router.post('/getDailyReportList',userAuthentication.authentication,reportsController.downloadDailyLinkGet)
router.post('/getMonthlyReportList',userAuthentication.authentication,reportsController.downloadMonthlyLinkGet)

module.exports=router;