import React from 'react';
import { ShieldCheck, TrendingUp, Award, ChevronRight, X } from 'lucide-react';

const ProfilePanel = ({ user, isMobile, onClose }) => {
    return (
        <div className="w-[320px] bg-[#0f0f12] h-full border-l border-white/5 p-6 flex flex-col space-y-8 overflow-y-auto custom-scrollbar relative">
            {isMobile && (
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white bg-white/5 rounded-xl transition-colors"
                >
                    <X size={20} />
                </button>
            )}
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center space-y-4 pt-4">
                <div className="relative">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#ff8c00] to-[#ff4d00] p-[3px] rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="w-full h-full rounded-[21px] bg-[#0a0a0c] flex items-center justify-center overflow-hidden rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                            <img src={`https://ui-avatars.com/api/?name=${user?.name}&size=128&background=random`} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-[#0f0f12] flex items-center justify-center">
                        <ShieldCheck size={14} className="text-white" />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-white">{user?.name || 'User'}</h3>
                    <p className="text-sm text-gray-500">{user?.rank || 'Member'}</p>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl px-6 py-2">
                    <span className="text-xs font-bold text-[#ff8c00] uppercase tracking-wider">{user?.rank || 'Level 1'} / Platinum</span>
                </div>
            </div>

            {/* Main Stats */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Network Stats</h4>

                <div className="glass p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <TrendingUp size={16} />
                            </div>
                            <span className="text-sm text-gray-300">Success Rate</span>
                        </div>
                        <span className="text-sm font-bold text-white">94%</span>
                    </div>

                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#ff8c00] to-[#ff4d00] h-full w-[94%] rounded-full shadow-[0_0_10px_rgba(255,140,0,0.5)]"></div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                <Award size={16} />
                            </div>
                            <span className="text-sm text-gray-300">Team Target</span>
                        </div>
                        <span className="text-sm font-bold text-white">8/10</span>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Latest Achievement</h4>
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e1e24] to-[#0a0a0c] p-4 border border-white/5 cursor-pointer">
                    <div className="relative z-10 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-500">
                            <Award size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white">Golden Leader</p>
                            <p className="text-xs text-gray-500">Unlocked 12 referrals</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                </div>
            </div>

            {/* Referal Code Card */}
            <div className="mt-auto bg-gradient-to-br from-[#ff8c00] to-[#ff4d00] rounded-2xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-white/80 text-xs font-medium uppercase tracking-wider mb-2">Invite Link</p>
                    <div className="bg-black/20 backdrop-blur-md rounded-lg p-3 border border-white/10 flex items-center justify-between">
                        <span className="text-white font-bold text-sm tracking-wider">{user?.referralCode || 'N/A'}</span>
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(user?.referralCode || '');
                                alert('Code copied!');
                            }}
                            className="text-white hover:scale-110 active:scale-95 transition-transform"
                        >
                            <ShieldCheck size={16} />
                        </button>
                    </div>
                    <button className="w-full mt-4 bg-white text-orange-600 font-bold py-3 rounded-xl text-sm hover:shadow-xl transition-all shadow-white/10">
                        Share Invite
                    </button>
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
        </div>
    );
};

export default ProfilePanel;
