const express =require('express')
const router = express.Router();
const userAuthentication = require('../middleware/auth')
const purchaseController = require('../controllers/purchaseController')

router.get('/premiumMembership',userAuthentication.authentication,purchaseController.purchasePremium)
router.post('/updateTransactionStatus',userAuthentication.authentication, purchaseController.updateTransactionStatus)

module.exports=router;