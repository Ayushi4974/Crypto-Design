const User = require('../models/User');

// @desc    Get user's direct referrals
// @route   GET /api/users/referrals
// @access  Private
exports.getReferrals = async (req, res, next) => {
    try {
        const referrals = await User.find({ referredBy: req.user.id });

        res.status(200).json({
            success: true,
            count: referrals.length,
            data: referrals
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get dashboard stats summary
// @route   GET /api/users/stats
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const directReferralsCount = await User.countDocuments({ referredBy: req.user.id });
        
        // In a real MLM, you'd calculate total team recursively, but for now:
        const totalTeamCount = directReferralsCount; // Placeholder

        res.status(200).json({
            success: true,
            data: {
                totalEarnings: user.totalEarnings,
                walletBalance: user.walletBalance,
                directReferrals: directReferralsCount,
                totalTeam: totalTeamCount,
                rank: user.rank,
                referralCode: user.referralCode
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
