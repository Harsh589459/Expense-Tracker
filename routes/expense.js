const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const userAuthentication = require('../middleware/auth')

router.use(express.static("public"))

router.get('/expense',expenseController.getExpense);
router.post('/expense',userAuthentication.authentication,expenseController.addExpense);
router.get('/expense/getAllExpense/:page',userAuthentication.authentication,expenseController.getAllExpense)
router.get('/expense/delete/:id',userAuthentication.authentication,expenseController.deleteExpense);

module.exports=router;