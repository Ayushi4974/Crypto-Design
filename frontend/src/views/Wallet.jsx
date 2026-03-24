import React, { useState, useEffect } from 'react';
import {
    Wallet as WalletIcon,
    ArrowUpRight,
    ArrowDownLeft,
    Plus,
    History,
    TrendingUp,
    CreditCard,
    DollarSign,
    ArrowRightLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../utils/api';



const StatCard = ({ title, amount, icon: Icon, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="glass p-6 border border-white/5 relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/10 rounded-full blur-3xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700`} />
        <div className="flex items-center justify-between relative z-10 mb-4">
            <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-500`}>
                <Icon size={24} />
            </div>
            <div className="flex items-center space-x-1 text-green-500 text-[10px] font-bold">
                <TrendingUp size={12} />
                <span>+4.2%</span>
            </div>
        </div>
        <div className="relative z-10">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-3xl font-black text-white tracking-tight leading-none">${amount}</h3>
        </div>
    </motion.div>
);

const Wallet = () => {
    const [stats, setStats] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, transRes] = await Promise.all([
                    API.get('/users/stats'),
                    API.get('/transactions')
                ]);
                setStats(statsRes.data.data);
                setTransactions(transRes.data.data);
            } catch (err) {
                console.error('Failed to fetch wallet data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-10 h-10 border-4 border-orange-500/10 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }
    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase tracking-widest">Digital <span className="text-orange-500">Wallet</span></h2>
                    <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-[0.2em] leading-none">Manage your assets, earnings and payouts</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                        Withdraw Funds
                    </button>
                    <button className="px-6 py-3 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-500/20 font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95 flex items-center space-x-2">
                        <Plus size={14} />
                        <span>Add Money</span>
                    </button>
                </div>
            </div>

            {/* Wallet Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title="Current Balance" 
                    amount={stats?.walletBalance?.toLocaleString() || '0.00'} 
                    icon={WalletIcon} 
                    color="orange" 
                    delay={0.1} 
                />
                <StatCard 
                    title="Total Earned" 
                    amount={stats?.totalEarnings?.toLocaleString() || '0.00'} 
                    icon={DollarSign} 
                    color="green" 
                    delay={0.2} 
                />
                <StatCard 
                    title="Total Withdrawn" 
                    amount="0.00" 
                    icon={ArrowUpRight} 
                    color="blue" 
                    delay={0.3} 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Card */}
                <div className="lg:col-span-12">
                    <div className="glass border border-white/5 rounded-[2.5rem] overflow-hidden">
                        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                            <div className="flex items-center space-x-3">
                                <History size={18} className="text-orange-500" />
                                <h3 className="text-lg font-bold text-white tracking-tight">Recent Wallet Activity</h3>
                            </div>
                            <button className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest">View All Trace Logs</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.01]">
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Interaction</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Trace Value</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Time Stamp</th>
                                        <th className="px-8 py-4 text-right text-[10px] font-black text-gray-500 uppercase tracking-widest">Flow Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {transactions.map((txn, idx) => (
                                        <motion.tr
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + idx * 0.05 }}
                                            key={txn._id}
                                            className="hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`p-2 rounded-xl ${!txn.type.includes('withdraw') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                        {!txn.type.includes('withdraw') ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                                    </div>
                                                    <span className="text-xs font-bold text-white tracking-tight uppercase">{txn.type.replace('_', ' ')}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`text-sm font-black tracking-tight ${!txn.type.includes('withdraw') ? 'text-green-500' : 'text-white'}`}>
                                                    {!txn.type.includes('withdraw') ? '+' : ''}${Math.abs(txn.amount).toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-xs text-gray-500 font-medium">
                                                {new Date(txn.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${txn.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        txn.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                                                    }`}>
                                                    {txn.status}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
