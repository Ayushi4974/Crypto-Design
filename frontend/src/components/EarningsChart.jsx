import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Mon', income: 4000, referrals: 24 },
    { name: 'Tue', income: 3000, referrals: 13 },
    { name: 'Wed', income: 5000, referrals: 35 },
    { name: 'Thu', income: 2780, referrals: 20 },
    { name: 'Fri', income: 6890, referrals: 45 },
    { name: 'Sat', income: 8390, referrals: 52 },
    { name: 'Sun', income: 7490, referrals: 40 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#141417] border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md">
                <p className="text-gray-400 text-xs font-bold uppercase mb-2">{label}</p>
                <div className="space-y-1">
                    <p className="text-white font-bold text-base">
                        <span className="text-orange-500 mr-2">$</span>
                        {payload[0].value.toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-[10px] font-medium">Weekly Net Earnings</p>
                </div>
            </div>
        );
    }
    return null;
};

const EarningsChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff8c00" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ff8c00" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                    dy={10}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 140, 0, 0.2)', strokeWidth: 2 }} />
                <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#ff8c00"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                    animationDuration={2000}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default EarningsChart;
