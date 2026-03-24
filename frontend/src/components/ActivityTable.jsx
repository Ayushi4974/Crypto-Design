import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../utils/api';

const ActivityTable = ({ type = 'transactions' }) => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true);
            try {
                if (type === 'transactions') {
                    const res = await API.get('/transactions');
                    setActivities(res.data.data.map(t => ({
                        id: t._id,
                        user: 'System', // Transactions don't have associated user names in this simple model
                        action: t.type.replace('_', ' ').toUpperCase(),
                        amount: `$${t.amount.toFixed(2)}`,
                        date: new Date(t.createdAt).toLocaleString(),
                        status: t.status === 'completed' ? 'Success' : t.status === 'pending' ? 'Pending' : 'Failed'
                    })));
                } else if (type === 'joining') {
                    const res = await API.get('/users/referrals');
                    setActivities(res.data.data.map(r => ({
                        id: r._id,
                        user: r.name,
                        action: 'NEW DIRECT JOIN',
                        amount: r.rank || 'Bronze',
                        date: new Date(r.createdAt).toLocaleDateString(),
                        status: 'Active'
                    })));
                } else if (type === 'withdraw') {
                    const res = await API.get('/transactions');
                    const withdrawals = res.data.data.filter(t => t.type.toLowerCase().includes('withdraw'));
                    setActivities(withdrawals.map(w => ({
                        id: w._id,
                        user: 'You',
                        action: 'PAYOUT REQUEST',
                        amount: `$${w.amount.toFixed(2)}`,
                        date: new Date(w.createdAt).toLocaleString(),
                        status: w.status === 'completed' ? 'Success' : w.status === 'pending' ? 'Pending' : 'Failed'
                    })));
                }
            } catch (err) {
                console.error('Failed to fetch activities', err);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, [type]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-orange-500/10 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-gray-500 text-[11px] font-bold uppercase tracking-widest pl-4">
                        <th className="pb-4 pl-4">User</th>
                        <th className="pb-4">Action / Type</th>
                        <th className="pb-4">Details / Amount</th>
                        <th className="pb-4">Date / Time</th>
                        <th className="pb-4 text-right pr-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map((item, idx) => (
                        <motion.tr
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={item.id}
                            className="group bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-2xl overflow-hidden"
                        >
                            <td className="py-4 pl-4 rounded-l-2xl">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-white uppercase border border-white/5">
                                        {item.user.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{item.user}</p>
                                        <p className="text-[10px] text-gray-500 uppercase">ID: #{item.id.toString().slice(-6)}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4">
                                <span className="text-sm text-gray-300 font-medium">{item.action}</span>
                            </td>
                            <td className="py-4">
                                <span className="text-sm font-bold text-white">
                                    {item.amount || '---'}
                                </span>
                            </td>
                            <td className="py-4">
                                <span className="text-xs text-gray-500 font-medium">{item.date}</span>
                            </td>
                            <td className="py-4 pr-4 text-right rounded-r-2xl">
                                <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
                  ${item.status === 'Success' || item.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                                        item.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}
                `}>
                                    <div className={`w-1 h-1 rounded-full ${item.status === 'Success' || item.status === 'Active' ? 'bg-green-500' :
                                            item.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                                        } animate-pulse`} />
                                    <span>{item.status}</span>
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityTable;
