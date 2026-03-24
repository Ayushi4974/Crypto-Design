import React from 'react';
import { Check, Shield, Zap, Star, Crown, Rocket, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const packages = [
    {
        name: 'Starter Node',
        price: '100',
        description: 'Entry-level access to the MLM Elite ecosystem.',
        features: ['5% Direct Commission', '3 Levels Depth', 'Standard Support', 'Core Dashboard'],
        color: 'blue',
        icon: Rocket,
        popular: false
    },
    {
        name: 'Diamond Pro',
        price: '500',
        description: 'The most balanced plan for professional networkers.',
        features: ['10% Direct Commission', '10 Levels Depth', 'Priority 24/7 Support', 'Advanced Analytics'],
        color: 'orange',
        icon: Star,
        popular: true
    },
    {
        name: 'Elite Director',
        price: '2,000',
        description: 'Ultimate power for network leaders and directors.',
        features: ['15% Direct Commission', 'Infinite Levels Depth', 'Personal Account Manager', 'VIP Event Access'],
        color: 'purple',
        icon: Crown,
        popular: false
    }
];

const PricingCard = ({ pkg, idx }) => {
    const Icon = pkg.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`relative glass p-8 flex flex-col items-center border transition-all duration-500 group
        ${pkg.popular ? 'border-orange-500/50 scale-105 z-10 shadow-2xl shadow-orange-500/10' : 'border-white/5 hover:border-white/20'}
      `}
        >
            {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-xl shadow-orange-500/20">
                    Recommended
                </div>
            )}

            <div className={`p-4 rounded-3xl mb-6 bg-white/[0.03] border border-white/5 text-orange-500 group-hover:scale-110 group-hover:bg-orange-500/10 transition-all duration-500`}>
                <Icon size={32} />
            </div>

            <h3 className="text-xl font-black text-white tracking-tight uppercase tracking-widest leading-none mb-2">{pkg.name}</h3>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.1em] mb-8">{pkg.description}</p>

            <div className="flex items-start justify-center mb-8">
                <span className="text-gray-500 text-lg font-bold mt-2">$</span>
                <span className="text-6xl font-black text-white tracking-tighter">{pkg.price}</span>
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 self-end ml-1">USD</span>
            </div>

            <div className="w-full space-y-4 mb-10">
                {pkg.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                            <Check size={12} strokeWidth={4} />
                        </div>
                        <span className="text-gray-400 text-xs font-medium">{feature}</span>
                    </div>
                ))}
            </div>

            <button className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2
        ${pkg.popular
                    ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20 hover:bg-orange-600'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'}
      `}>
                <span>Upgrade Now</span>
                <ArrowRight size={14} />
            </button>

            {/* Decorative Blur */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-[60px] -mr-16 -mt-16 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
        </motion.div>
    );
};

const Packages = () => {
    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="inline-flex items-center space-x-2 bg-orange-500/10 text-orange-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-orange-500/20">
                    <Sparkles size={12} />
                    <span>Premium Upgrades</span>
                </div>
                <h2 className="text-4xl font-black text-white tracking-tight uppercase tracking-widest">Amplify Your <span className="text-orange-500">Network Power</span></h2>
                <p className="text-gray-500 max-w-2xl text-sm font-medium">
                    Scale your earning potential by upgrading your membership node. Higher tiers unlock deeper network commissions and exclusive leadership perks.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                {packages.map((pkg, idx) => (
                    <PricingCard key={idx} pkg={pkg} idx={idx} />
                ))}
            </div>

            <div className="glass p-8 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mt-20 max-w-5xl mx-auto">
                <div className="flex items-center space-x-6 text-left">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <Shield size={28} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white tracking-tight">Need a customized leadership plan?</h4>
                        <p className="text-xs text-gray-500 mt-1">If you lead a team of 5,000+, contact us for custom enterprise nodes.</p>
                    </div>
                </div>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all whitespace-nowrap">
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default Packages;
