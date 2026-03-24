import React, { useState } from 'react';
import {
    Shield,
    Zap,
    Check,
    ArrowUpCircle,
    ShoppingCart,
    Star,
    Gem,
    LayoutGrid,
    TrendingUp,
    Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const packageItems = [
    {
        id: 'silver',
        name: 'Silver',
        price: 50,
        benefits: '5% Level Income',
        features: ['3 Levels Depth', 'Basic Support', 'Standard Dashboard', '5% Direct Income'],
        color: 'blue',
        icon: Zap,
        popular: false
    },
    {
        id: 'gold',
        name: 'Gold',
        price: 100,
        benefits: '10% Level Income',
        features: ['10 Levels Depth', 'Priority Support', 'Advanced Analytics', '10% Direct Income'],
        color: 'orange',
        icon: Star,
        popular: true
    },
    {
        id: 'diamond',
        name: 'Diamond',
        price: 500,
        benefits: '15% Level Income',
        features: ['Infinite Levels', 'Personal Mentor', 'VIP Event Access', 'Unlimited Withdrawals'],
        color: 'purple',
        icon: Gem,
        popular: false
    }
];

const PackageCard = ({ pkg, idx }) => {
    const Icon = pkg.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className={`relative glass p-8 flex flex-col border transition-all duration-500 group
        ${pkg.popular ? 'border-orange-500/50 scale-105 z-10 shadow-2xl shadow-orange-500/10' : 'border-white/5 hover:border-white/20'}
      `}
        >
            {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-xl shadow-orange-500/20">
                    Best Value
                </div>
            )}

            <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-${pkg.color}-500/10 text-${pkg.color}-500 group-hover:scale-110 transition-transform`}>
                    <Icon size={32} />
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none mb-1">Price</p>
                    <h3 className="text-3xl font-black text-white tracking-tight leading-none">${pkg.price}</h3>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <div>
                    <h4 className="text-xl font-black text-white tracking-tight uppercase tracking-widest">{pkg.name} Plan</h4>
                    <div className="flex items-center space-x-2 mt-2">
                        <span className="text-orange-500 text-xs font-bold">{pkg.benefits}</span>
                        <span className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Lifetime Access</span>
                    </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">Elevate your earning potential with our {pkg.name} tier network permissions.</p>
            </div>

            <div className="w-full h-px bg-white/5 mb-8" />

            <ul className="w-full space-y-4 flex-1 mb-10">
                {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                            <Check size={12} strokeWidth={4} />
                        </div>
                        <span className="text-gray-400 text-xs font-medium">{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="grid grid-cols-2 gap-3 mt-auto">
                <button className="py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center space-x-2">
                    <ShoppingCart size={14} />
                    <span>Buy Plan</span>
                </button>
                <button className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center space-x-2
            ${pkg.popular
                        ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20 hover:bg-orange-600'
                        : 'bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500/20'}
         `}>
                    <ArrowUpCircle size={14} />
                    <span>Upgrade</span>
                </button>
            </div>
        </motion.div>
    );
};

const PackagesUpdate = ({ user }) => {
    const userRank = user?.rank?.toLowerCase() || 'silver';
    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-orange-500 shadow-2xl">
                        <Award size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight uppercase tracking-widest">Upgrade <span className="text-orange-500">Packages</span></h2>
                        <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-[0.2em] leading-none">Select the optimal tier for your network growth</p>
                    </div>
                </div>
                <div className="hidden lg:flex items-center space-x-8 px-8 py-4 bg-white/[0.02] border border-white/5 rounded-3xl">
                    <div className="text-center">
                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Current Plan</p>
                        <span className="text-xs font-black text-white tracking-widest flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="uppercase">{user?.rank || 'SILVER'}</span>
                        </span>
                    </div>
                    <div className="w-px h-8 bg-white/5" />
                    <div className="text-center">
                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Next Perk</p>
                        <span className="text-xs font-black text-orange-500 tracking-widest underline underline-offset-4 decoration-orange-500/40 cursor-pointer">10% COMMISSION</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {packageItems.map((pkg, idx) => (
                    <PackageCard key={pkg.id} pkg={pkg} idx={idx} />
                ))}
            </div>

            {/* Comparison Snapshot */}
            <div className="glass border border-white/5 rounded-[2.5rem] overflow-hidden">
                <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                    <div className="flex items-center space-x-3">
                        <LayoutGrid size={20} className="text-orange-500" />
                        <h3 className="text-xl font-bold text-white tracking-tight">Benefits Comparison</h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                        <TrendingUp size={14} className="text-green-500" />
                        <span className="text-[10px] text-green-500 font-black uppercase tracking-widest">Max Potential Active</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.01]">
                                <th className="px-10 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Network Package</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Entry Price</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Primary Benefit</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {packageItems.map((pkg) => (
                                <tr key={pkg.id} className="hover:bg-white/[0.02] transition-all">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-2 rounded-xl bg-${pkg.color}-500/10 text-${pkg.color}-500`}>
                                                <pkg.icon size={16} />
                                            </div>
                                            <span className="text-sm font-black text-white uppercase tracking-widest">{pkg.name} Node</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-bold text-white tracking-tight">${pkg.price}.00 USD</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-black text-orange-500/80 uppercase tracking-widest">{pkg.benefits}</span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${pkg.id === userRank
                                                ? 'bg-blue-500/10 text-blue-500 border-blue-500/20 cursor-default'
                                                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-orange-500 hover:text-white hover:border-orange-500'
                                            }`}>
                                            {pkg.id === userRank ? 'Active Plan' : 'Select Plan'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PackagesUpdate;
