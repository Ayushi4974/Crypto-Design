const Transaction = require('../models/Transaction');

// @desc    Get all transactions for logged-in user
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort('-createdAt');

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get transaction summary (Total earned, withdrawn, etc.)
// @route   GET /api/transactions/summary
// @access  Private
exports.getTransactionSummary = async (req, res, next) => {
    try {
        const stats = await Transaction.aggregate([
            { $match: { user: req.user._id, status: 'completed' } },
            {
                $group: {
                    _id: '$type',
                    total: { $sum: '$amount' }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
