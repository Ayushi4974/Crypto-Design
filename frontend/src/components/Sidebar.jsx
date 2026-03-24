import React from 'react';
import {
    UserPlus,
    GitBranch,
    LayoutDashboard,
    User,
    LogOut,
    HelpCircle,
    History,
    ArrowUpCircle,
    Wallet,
    Users,
    Share2
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'My Profile', icon: <User size={18} /> },
        { name: 'Referral Link', icon: <Share2 size={18} /> },
        { name: 'Genealogy Tree', icon: <GitBranch size={18} /> },
        { name: 'My Team', icon: <Users size={18} /> },
        { name: 'Income / Earnings', icon: <Wallet size={18} /> },
        { name: 'Packages / Upgrade', icon: <ArrowUpCircle size={18} /> },
        { name: 'Transactions', icon: <History size={18} /> },
        { name: 'Wallet', icon: <Wallet size={18} /> },
        { name: 'Withdraw', icon: <ArrowUpCircle size={18} /> },
        { name: 'Support', icon: <HelpCircle size={18} /> },
    ];

    return (
        <div className="w-[280px] bg-[#0f0f12] h-full border-r border-white/[0.03] flex flex-col py-8 shadow-2xl">
            {/* Logo */}
            <div className="px-10 mb-12 flex items-center space-x-4">
                <div className="relative group">
                    <div className="w-11 h-11 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500 shadow-lg shadow-orange-500/20">
                        <span className="text-[#0a0a0c] font-black text-2xl">M</span>
                    </div>
                </div>
                <div>
                    <h1 className="text-white font-extrabold text-xl tracking-tight leading-none">MLM<span className="text-orange-500">.</span></h1>
                    <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">Elite Network</p>
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-5 space-y-1.5 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        className={`w-full flex items-center space-x-4 px-5 py-3.5 rounded-2xl transition-all duration-300 relative group
                            ${activeTab === item.name
                                ? 'bg-orange-500/[0.07] text-orange-500'
                                : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.03]'}
                        `}
                    >
                        {activeTab === item.name && (
                            <motion.div
                                layoutId="active-indicator"
                                className="absolute left-0 w-1.5 h-6 bg-orange-500 rounded-r-full shadow-[2px_0_10px_rgba(255,140,0,0.4)]"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className={`transition-colors duration-300 ${activeTab === item.name ? 'text-orange-500' : 'group-hover:text-orange-400'}`}>
                            {item.icon}
                        </span>
                        <span className="font-bold text-[13px] tracking-wide">{item.name}</span>
                    </button>
                ))}
            </nav>

            {/* Footer / Logout */}
            <div className="px-5 mt-8">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] mb-6">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Need Help?</p>
                    <p className="text-xs text-gray-400 leading-relaxed">Check our knowledge base or contact support.</p>
                </div>
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-red-500/60 hover:text-red-500 hover:bg-red-500/[0.05] transition-all group font-bold text-sm"
                >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
