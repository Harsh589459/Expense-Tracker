const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/daily-expense');

router.use(express.static("public"))

router.get('/expense',expenseController.getExpense);
router.post('/expense',expenseController.addExpense);
router.get('/expense/getAllExpense',expenseController.getAllExpense)
router.post('/expense/delete',expenseController.deleteExpense);

module.exports=router;