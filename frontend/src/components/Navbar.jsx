import React from 'react';
import { Search, Bell, Wallet, ChevronDown } from 'lucide-react';

const Navbar = ({ tabTitle, user, toggleProfile }) => {
    return (
        <header className="h-20 border-b border-white/[0.05] bg-[#0a0a0c]/90 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center">
                <h2 className="text-2xl font-bold text-white tracking-tight">{tabTitle}</h2>
            </div>

            <div className="flex items-center space-x-6">
                {/* Search */}
                <div className="hidden lg:flex items-center bg-white/[0.03] border border-white/[0.08] rounded-2xl px-4 py-2.5 w-72 group focus-within:border-orange-500/40 focus-within:bg-orange-500/[0.02] transition-all duration-300">
                    <Search size={18} className="text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for something..."
                        className="bg-transparent border-none outline-none text-sm text-gray-200 px-3 w-full placeholder:text-gray-600 font-medium"
                    />
                </div>

                {/* Wallet */}
                <div className="flex items-center space-x-3 bg-gradient-to-br from-orange-500/[0.08] to-transparent border border-orange-500/20 rounded-2xl px-5 py-2 hover:border-orange-500/40 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Wallet size={16} className="text-orange-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] text-gray-500 leading-none uppercase font-bold tracking-[0.1em]">Available Balance</span>
                        <span className="text-[13px] font-bold text-white mt-0.5 tracking-wide">$ {user?.walletBalance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}</span>
                    </div>
                </div>

                {/* Notifications */}
                <button className="relative p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#0a0a0c] shadow-[0_0_8px_rgba(255,140,0,0.5)]"></span>
                </button>

                <div className="flex items-center space-x-4 pl-6 border-l border-white/[0.08]">
                    <div className="relative group cursor-pointer" onClick={toggleProfile}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-[2px] shadow-lg shadow-orange-500/10 group-hover:rotate-12 transition-transform duration-500">
                            <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=141417&color=fff&bold=true`} alt="User" />
                            </div>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0a0a0c]"></div>
                    </div>
                    <div className="hidden xl:block" onClick={toggleProfile}>
                        <p className="text-sm font-bold text-white leading-none">{user?.name || 'User'}</p>
                        <p className="text-[11px] text-gray-500 mt-1.5 font-medium">Rank: <span className="text-orange-500">{user?.rank || 'Member'}</span></p>
                    </div>
                    <ChevronDown size={14} className="text-gray-600 hidden xl:block" />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
