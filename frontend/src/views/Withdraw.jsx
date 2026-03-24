import React, { useState, useEffect } from 'react';
import {
    ArrowUpRight,
    Wallet,
    CreditCard,
    Building2,
    Coins,
    History,
    CheckCircle2,
    Clock,
    XCircle,
    ArrowRight,
    ShieldCheck,
    Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../utils/api';

const paymentMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: Building2, color: 'blue' },
    { id: 'crypto', name: 'Crypto (USDT)', icon: Coins, color: 'orange' },
    { id: 'paypal', name: 'PayPal', icon: CreditCard, color: 'purple' },
];

const Withdraw = ({ user }) => {
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('bank');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [withdrawHistory, setWithdrawHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await API.get('/transactions');
                // Filter for withdrawal type transactions
                const withdrawals = res.data.data.filter(t => t.type.toLowerCase().includes('withdraw'));
                setWithdrawHistory(withdrawals);
            } catch (err) {
                console.error('Failed to fetch withdrawal history', err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || parseFloat(amount) <= 0) return alert('Invalid amount');
        
        setIsSubmitting(true);
        try {
            // Assuming there's a POST /withdraw endpoint
            await API.post('/withdraw', { amount: parseFloat(amount), method: selectedMethod });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            setAmount('');
            // Refresh history
            const res = await API.get('/transactions');
            setWithdrawHistory(res.data.data.filter(t => t.type.toLowerCase().includes('withdraw')));
        } catch (err) {
            console.error('Withdrawal failed', err);
            alert(err.response?.data?.message || 'Withdrawal failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase tracking-widest">Payout <span className="text-orange-500">Gateway</span></h2>
                    <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-[0.2em] leading-none">Withdraw your hard-earned commissions securely</p>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    <ShieldCheck size={16} className="text-orange-500" />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">SSL Secure 256-bit Encryption</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Withdrawal Form */}
                <div className="lg:col-span-5 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass p-8 border border-white/5 rounded-[2.5rem] relative overflow-hidden"
                    >
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <ArrowUpRight size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white tracking-tight leading-none">New Payout Request</h3>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1.5">Available Balance: ${user?.walletBalance?.toLocaleString() || '0.00'}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Amount Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Enter Amount (USD)</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors">
                                        <Wallet size={20} />
                                    </div>
                                    <input
                                        type="number"
                                        required
                                        placeholder="Min $10.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-[#141417] border border-white/[0.08] rounded-2xl py-4 pl-12 pr-4 text-white font-bold text-xl focus:border-orange-500/40 outline-none transition-all placeholder:text-gray-800"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <button
                                            type="button"
                                            onClick={() => setAmount(user?.walletBalance?.toString())}
                                            className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:text-orange-400"
                                        >
                                            Max
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Selector */}
                            <div className="space-y-3">
                                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Payment Method</label>
                                <div className="grid grid-cols-1 gap-3">
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            onClick={() => setSelectedMethod(method.id)}
                                            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${selectedMethod === method.id
                                                    ? 'bg-orange-500/5 border-orange-500/30'
                                                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className={`p-2.5 rounded-xl bg-${method.color}-500/10 text-${method.color}-500`}>
                                                    <method.icon size={20} />
                                                </div>
                                                <span className="text-sm font-bold text-white">{method.name}</span>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethod === method.id ? 'border-orange-500' : 'border-white/10'
                                                }`}>
                                                {selectedMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-3"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Initialize Payout</span>
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>

                        <AnimatePresence>
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-[#0f0f12]/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 z-50 rounded-[2.5rem]"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-6 border border-green-500/20">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h4 className="text-2xl font-black text-white tracking-tight uppercase mb-2">Request Shared</h4>
                                    <p className="text-gray-500 text-xs font-medium max-w-[200px]">Your payout request has been queued for verification. Trace ID: #WD-0092</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Decorative Background Decor */}
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />
                    </motion.div>
                </div>

                {/* Withdraw History */}
                <div className="lg:col-span-7 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col h-full"
                    >
                        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                            <div className="flex items-center space-x-3">
                                <History size={18} className="text-orange-500" />
                                <h3 className="text-lg font-bold text-white tracking-tight">Withdrawal Records</h3>
                            </div>
                            <div className="flex items-center space-x-2 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                                <Zap size={10} className="text-orange-500" />
                                <span className="text-[9px] text-white font-black uppercase tracking-widest">Live Logs</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.01]">
                                        <th className="px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Amount Trace</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Gateway</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Timestamp</th>
                                        <th className="px-8 py-4 text-right text-[10px] font-black text-gray-500 uppercase tracking-widest">Flow Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {withdrawHistory.map((item, idx) => (
                                        <motion.tr
                                            key={item._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + idx * 0.1 }}
                                            className="hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white">
                                                        <ArrowUpRight size={18} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                                                    </div>
                                                    <span className="text-sm font-black text-white tracking-tight">${item.amount.toFixed(2)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="text-xs font-bold text-gray-400 uppercase">{item.type.split('_').pop()}</span>
                                            </td>
                                            <td className="px-6 py-6 text-xs text-gray-500 font-medium">
                                                {new Date(item.createdAt).toLocaleString()}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border ${item.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        item.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                            'bg-red-500/10 text-red-500 border-red-500/20'
                                                    }`}>
                                                    {item.status === 'completed' && <CheckCircle2 size={10} />}
                                                    {item.status === 'pending' && <Clock size={10} />}
                                                    {item.status === 'failed' && <XCircle size={10} />}
                                                    <span>{item.status}</span>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Summary Footer */}
                        <div className="p-8 bg-white/[0.01] border-t border-white/5 rounded-b-[2.5rem]">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-600">
                                <span>Recent 24h Payout Intensity</span>
                                <span className="text-orange-500/60">High Activity</span>
                            </div>
                            <div className="w-full h-1 bg-white/[0.05] rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-orange-500/40 w-[65%]" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;
