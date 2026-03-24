const express = require('express');
const { getReferrals, getDashboardStats } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/referrals', protect, getReferrals);
router.get('/stats', protect, getDashboardStats);

module.exports = router;
