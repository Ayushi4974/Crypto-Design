import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const data = [
    { name: 'Jan', members: 400 },
    { name: 'Feb', members: 600 },
    { name: 'Mar', members: 800 },
    { name: 'Apr', members: 1200 },
    { name: 'May', members: 1500 },
    { name: 'Jun', members: 2100 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#141417] border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md">
                <p className="text-gray-400 text-xs font-bold uppercase mb-2">{label}</p>
                <p className="text-white font-bold text-base">
                    {payload[0].value.toLocaleString()} Members
                </p>
            </div>
        );
    }
    return null;
};

const TeamGrowthChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 140, 0, 0.05)' }} />
                <Bar
                    dataKey="members"
                    radius={[6, 6, 0, 0]}
                    barSize={30}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#ff8c00' : 'rgba(255, 140, 0, 0.2)'} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default TeamGrowthChart;
