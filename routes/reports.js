const express= require('express');
const router = express.Router();

const userAuthentication = require('../middleware/auth')
const reportsController = require('../controllers/reportsController')

router.post('/getReportList',userAuthentication.authentication,reportsController.downloadLinkGet)
module.exports=router;