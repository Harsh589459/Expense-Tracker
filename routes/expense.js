const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.use(express.static("public"))

router.get('/expense',expenseController.getExpense);
router.post('/expense',expenseController.addExpense);
router.get('/expense/getAllExpense',expenseController.getAllExpense)
router.get('/expense/delete/:id',expenseController.deleteExpense);

module.exports=router;