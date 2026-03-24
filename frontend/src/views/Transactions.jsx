import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownLeft,
    History,
    Download,
    Calendar,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    Wallet,
    ArrowRightLeft,
    FilterX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../utils/api';

const Transactions = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [transactionsData, setTransactionsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await API.get('/transactions');
                setTransactionsData(res.data.data);
            } catch (err) {
                console.error('Failed to fetch transactions', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const filteredTransactions = transactionsData.filter(txn => {
        const matchesSearch = txn._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            txn.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || txn.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesType = typeFilter === 'All' || txn.type.toLowerCase().includes(typeFilter.toLowerCase());

        return matchesSearch && matchesStatus && matchesType;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-10 h-10 border-4 border-orange-500/10 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase tracking-widest">Transactions <span className="text-orange-500">Log</span></h2>
                    <p className="text-gray-500 text-xs font-bold mt-1 uppercase tracking-widest leading-none">Complete financial trace of your network nodes</p>
                </div>

                <div className="flex items-center space-x-3">
                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center space-x-2">
                        <Calendar size={14} />
                        <span>Select Date</span>
                    </button>
                    <button className="p-3 bg-orange-500 shadow-lg shadow-orange-500/20 rounded-xl text-white hover:bg-orange-600 transition-all active:scale-95">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-6 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search Transaction ID or Type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-orange-500/40 outline-none transition-all placeholder:text-gray-700"
                    />
                </div>

                <div className="lg:col-span-3">
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="w-full bg-[#141417] border border-white/[0.08] rounded-2xl py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest focus:border-orange-500/40 outline-none cursor-pointer appearance-none"
                    >
                        <option value="All">All Income Types</option>
                        <option value="Direct">Direct Income</option>
                        <option value="Level">Level Income</option>
                        <option value="Matching">Matching Bonus</option>
                        <option value="Withdraw">Withdrawals</option>
                    </select>
                </div>

                <div className="lg:col-span-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full bg-[#141417] border border-white/[0.08] rounded-2xl py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest focus:border-orange-500/40 outline-none cursor-pointer appearance-none"
                    >
                        <option value="All">All Status</option>
                        <option value="Success">Success</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="glass border border-white/5 rounded-[2.5rem] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="px-10 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Transaction ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Type</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Date</th>
                                <th className="px-10 py-5 text-right text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence mode='popLayout'>
                                {filteredTransactions.map((txn, idx) => (
                                    <motion.tr
                                        key={txn._id}
                                        layout
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-10 py-6">
                                            <span className="text-sm font-black text-white tracking-widest uppercase">{txn._id.slice(-6)}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-3">
                                                <div className={`p-1.5 rounded-lg ${!txn.type.includes('withdraw') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                    {!txn.type.includes('withdraw') ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                                                </div>
                                                <span className="text-xs font-bold text-gray-300 uppercase">{txn.type.replace('_', ' ')}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`text-sm font-black tracking-tight ${!txn.type.includes('withdraw') ? 'text-green-500' : 'text-white'}`}>
                                                {!txn.type.includes('withdraw') ? '+' : ''}${txn.amount.toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 align-top">
                                            <div className="flex flex-col text-left">
                                                {(() => {
                                                    const d = new Date(txn.createdAt);
                                                    const day = d.getDate();
                                                    const month = d.toLocaleString('default', { month: 'short' });
                                                    const year = d.getFullYear();
                                                    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                                    return (
                                                        <div className="flex flex-col">
                                                            <div className="flex flex-col mb-4">
                                                                <span className="text-2xl font-black text-white leading-none">{day}</span>
                                                                <span className="text-[11px] font-black text-white uppercase tracking-wider leading-tight mt-1">{month}</span>
                                                                <span className="text-[11px] font-black text-white uppercase tracking-wider leading-tight">{year}</span>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">{time}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${txn.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                txn.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                    'bg-red-500/10 text-red-500 border-red-500/20'
                                                }`}>
                                                <div className={`w-1 h-1 rounded-full ${txn.status === 'completed' ? 'bg-green-500' :
                                                    txn.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                                    } animate-pulse`} />
                                                <span>{txn.status}</span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {filteredTransactions.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="w-16 h-16 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-700">
                            <FilterX size={32} />
                        </div>
                        <h3 className="text-white font-bold tracking-tight">No Transactions Found</h3>
                        <p className="text-gray-600 text-xs mt-1 lowercase italic">Try adjusting your filters to find what you're looking for.</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="px-10 py-6 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Showing {filteredTransactions.length} of {transactionsData.length} records</p>
                    <div className="flex items-center space-x-2">
                        <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-white transition-all">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-white transition-all">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
