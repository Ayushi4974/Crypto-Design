import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    DollarSign,
    Layers,
    Link as LinkIcon,
    Target,
    Trophy,
    ArrowUpRight,
    TrendingDown,
    Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import API from '../utils/api';

const incomeData = [
    { month: 'Jan', earnings: 4000 },
    { month: 'Feb', earnings: 3000 },
    { month: 'Mar', earnings: 2000 },
    { month: 'Apr', earnings: 2780 },
    { month: 'May', earnings: 1890 },
    { month: 'Jun', earnings: 2390 },
    { month: 'Jul', earnings: 3490 },
    { month: 'Aug', earnings: 4000 },
    { month: 'Sep', earnings: 3000 },
    { month: 'Oct', earnings: 4500 },
    { month: 'Nov', earnings: 5200 },
    { month: 'Dec', earnings: 6100 },
];

const IncomeCard = ({ title, amount, icon: Icon, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.4 }}
        whileHover={{ y: -5 }}
        className="glass p-6 border border-white/5 relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700`} />

        <div className="flex items-start justify-between relative z-10">
            <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-500 mb-4`}>
                <Icon size={24} />
            </div>
            <div className="flex items-center space-x-1 text-green-500 text-xs font-bold">
                <TrendingUp size={12} />
                <span>+12%</span>
            </div>
        </div>

        <div className="relative z-10">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-2xl font-black text-white tracking-tight">${amount}</h3>
        </div>
    </motion.div>
);

const IncomeEarnings = () => {
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
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase tracking-widest">Income <span className="text-orange-500">Analytics</span></h2>
                    <p className="text-gray-500 text-xs font-bold mt-1 uppercase tracking-widest leading-none">Complete Breakdown of your network revenue</p>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    <Calendar size={16} className="text-orange-500" />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">Fiscal Year 2024-25</span>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <IncomeCard 
                    title="Direct Income" 
                    amount={stats?.totalEarnings?.toLocaleString() || '0.00'} 
                    icon={LinkIcon} 
                    color="orange" 
                    delay={0.1} 
                />
                <IncomeCard 
                    title="Level Income" 
                    amount="0.00" 
                    icon={Layers} 
                    color="blue" 
                    delay={0.2} 
                />
                <IncomeCard 
                    title="Matching Income" 
                    amount="0.00" 
                    icon={Target} 
                    color="purple" 
                    delay={0.3} 
                />
                <IncomeCard 
                    title="Bonus Income" 
                    amount="0.00" 
                    icon={Trophy} 
                    color="green" 
                    delay={0.4} 
                />
                <IncomeCard 
                    title="Total Earnings" 
                    amount={stats?.totalEarnings?.toLocaleString() || '0.00'} 
                    icon={DollarSign} 
                    color="amber" 
                    delay={0.5} 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Earnings Chart */}
                <div className="lg:col-span-8 glass border border-white/5 rounded-3xl p-8 h-[450px] relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <div>
                            <h3 className="text-lg font-bold text-white tracking-tight">Revenue Stream</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Monthly earning growth visualization</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Earnings</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full pb-14">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={incomeData}>
                                <defs>
                                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0f0f12',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#f97316' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="earnings"
                                    stroke="#f97316"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorEarnings)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Breakdown Panel */}
                <div className="lg:col-span-4 flex flex-col space-y-6">
                    <div className="p-8 glass-dark border border-white/5 rounded-3xl flex-1 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 relative">
                            <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-ping opacity-20" />
                            <Trophy size={40} />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-white tracking-tight">Top Performer Bonus</h4>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 leading-relaxed">
                                You are in the top 5% of earners this month. Keep it up to qualify for the Global Diamond Pool.
                            </p>
                        </div>
                        <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all active:scale-95">
                            View Achievement History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncomeEarnings;
