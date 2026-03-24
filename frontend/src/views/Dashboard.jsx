import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    Wallet,
    Users,
    ArrowUpRight,
    Layers,
    CreditCard,
    Target,
    Clock,
    UserPlus,
    ArrowUpCircle,
    ArrowDownCircle,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EarningsChart from '../components/EarningsChart';
import TeamGrowthChart from '../components/TeamGrowthChart';
import ActivityTable from '../components/ActivityTable';
import API from '../utils/api';

const StatCard = ({ title, value, change, icon, color, trend }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass p-5 group cursor-pointer border border-white/5 hover:border-orange-500/20 transition-all duration-300 h-full flex flex-col justify-between"
    >
        <div className="flex items-start justify-between">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${color}-500/10 text-${color}-500 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            {change && (
                <div className={`flex items-center space-x-1 text-[10px] sm:text-xs font-bold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    <span className="whitespace-nowrap">{change}</span>
                    <TrendingUp size={12} className={trend === 'up' ? '' : 'rotate-180'} />
                </div>
            )}
        </div>
        <div className="mt-4">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{title}</p>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1 whitespace-nowrap overflow-hidden text-ellipsis">{value}</h3>
        </div>
    </motion.div>
);

const Dashboard = ({ setActiveTab, user }) => {
    const [activeInfoTab, setActiveInfoTab] = useState('transactions');
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get('/users/stats');
                setStats(res.data.data);
            } catch (err) {
                console.error('Failed to fetch stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const topStats = [
        { 
            title: 'Total Earnings', 
            value: stats ? `$${stats.totalEarnings.toLocaleString()}` : '$0.00', 
            change: '+0.0%', 
            trend: 'up', 
            icon: <Wallet size={20} />, 
            color: 'orange' 
        },
        { 
            title: 'Wallet Balance', 
            value: stats ? `$${stats.walletBalance.toLocaleString()}` : '$0.00', 
            change: '+0.0%', 
            trend: 'up', 
            icon: <CreditCard size={20} />, 
            color: 'blue' 
        },
        { 
            title: 'Direct Referrals', 
            value: stats ? stats.directReferrals.toString() : '0', 
            change: '0', 
            trend: 'up', 
            icon: <UserPlus size={20} />, 
            color: 'green' 
        },
        { 
            title: 'Total Team', 
            value: stats ? stats.totalTeam.toString() : '0', 
            change: '0', 
            trend: 'up', 
            icon: <Users size={20} />, 
            color: 'purple' 
        },
        { 
            title: 'Total Withdrawn', 
            value: '$0.00', 
            change: '$0', 
            trend: 'down', 
            icon: <ArrowDownCircle size={20} />, 
            color: 'pink' 
        },
        { 
            title: 'Rank', 
            value: stats ? stats.rank : 'Member', 
            change: null, 
            trend: null, 
            icon: <Target size={20} />, 
            color: 'yellow' 
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-10 h-10 border-4 border-orange-500/10 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Message */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Welcome back, <span className="text-[#ff8c00]">{user?.name || 'Partner'}!</span>
                </h2>
                <p className="text-gray-500 mt-2 font-medium">Here's what's happening with your network today.</p>
            </motion.div>

            {/* Quick Actions Buttons */}
            <div className="flex flex-wrap gap-4">
                <button
                    onClick={() => setActiveTab('Referral Link')}
                    className="flex items-center space-x-2 bg-gradient-to-tr from-orange-500/20 to-orange-500/5 hover:from-orange-500/30 hover:to-orange-500/10 text-orange-500 px-6 py-3 rounded-xl font-bold transition-all border border-orange-500/20 active:scale-95 shadow-lg shadow-orange-500/5"
                >
                    <UserPlus size={18} />
                    <span>Refer Now</span>
                </button>
                <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/10 active:scale-95">
                    <ArrowUpCircle size={18} className="text-blue-500" />
                    <span>Upgrade Package</span>
                </button>
                <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/10 active:scale-95">
                    <ArrowDownCircle size={18} className="text-pink-500" />
                    <span>Withdraw Money</span>
                </button>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {topStats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Earnings Chart */}
                <div className="glass p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-white">Earnings Graph</h3>
                            <p className="text-sm text-gray-500">Weekly revenue statistics</p>
                        </div>
                        <div className="flex bg-white/5 rounded-lg p-1">
                            <button className="px-3 py-1 text-[10px] font-bold text-white bg-orange-500 rounded-md">WEEKLY</button>
                            <button className="px-3 py-1 text-[10px] font-bold text-gray-400 hover:text-white transition-colors">MONTHLY</button>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <EarningsChart />
                    </div>
                </div>

                {/* Team Growth Chart */}
                <div className="glass p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-white">Team Growth</h3>
                            <p className="text-sm text-gray-500">Monthly networking performance</p>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <TrendingUp size={18} />
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <TeamGrowthChart />
                    </div>
                </div>
            </div>

            {/* Quick Info & Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
                <div className="lg:col-span-12 glass p-6 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <div className="flex bg-white/5 rounded-xl p-1 w-fit">
                            {[
                                { id: 'transactions', label: 'Recent Transactions' },
                                { id: 'joining', label: 'Latest Joinings' },
                                { id: 'withdraw', label: 'Withdraw Requests' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveInfoTab(tab.id)}
                                    className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${activeInfoTab === tab.id
                                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                        : 'text-gray-500 hover:text-white'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <button className="text-orange-500 text-sm font-bold hover:underline flex items-center space-x-1">
                            <span>View All</span>
                            <ChevronRight size={14} />
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeInfoTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ActivityTable type={activeInfoTab} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
