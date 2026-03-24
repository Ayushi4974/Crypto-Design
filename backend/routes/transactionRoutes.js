const express = require('express');
const { getTransactions, getTransactionSummary } = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getTransactions);
router.get('/summary', protect, getTransactionSummary);

module.exports = router;
