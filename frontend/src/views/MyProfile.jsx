import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ShieldCheck,
    Edit3,
    Lock,
    CheckCircle2,
    Camera,
    ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileField = ({ icon: Icon, label, value, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="flex items-center p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.04] transition-colors group"
    >
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mr-4 group-hover:scale-110 transition-transform">
            <Icon size={18} />
        </div>
        <div className="flex-1">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1.5">{label}</p>
            <p className="text-sm font-bold text-white tracking-wide">{value}</p>
        </div>
    </motion.div>
);

const ActionButton = ({ icon: Icon, label, variant = 'secondary', onClick }) => {
    const variants = {
        primary: 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600',
        secondary: 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white',
        'outline-orange': 'bg-orange-500/5 text-orange-500 border border-orange-500/20 hover:bg-orange-500/10 hover:border-orange-500/40'
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 w-full ${variants[variant] || variants.secondary}`}
        >
            <Icon size={18} />
            <span>{label}</span>
        </button>
    );
};

const MyProfile = ({ user }) => {
    const [kycStatus, setKycStatus] = useState('Verified');

    const profileData = [
        { icon: User, label: 'Full Name', value: user?.name || 'N/A' },
        { icon: Mail, label: 'Email Address', value: user?.email || 'N/A' },
        { icon: Phone, label: 'Mobile Number', value: user?.phone || 'Not Provided' },
        { icon: MapPin, label: 'Address', value: user?.address || 'Not Provided' },
        { icon: ShieldCheck, label: 'Sponsor ID', value: user?.referredBy || 'Direct Signup' },
        { icon: Calendar, label: 'Joining Date', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-10">
            {/* Header Profile Section */}
            <div className="relative glass p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-400 p-1 shadow-2xl shadow-orange-500/20"
                        >
                            <div className="w-full h-full rounded-[20px] bg-[#0a0a0c] overflow-hidden flex items-center justify-center">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user?.name}&size=200&background=141417&color=fff&bold=true`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                        <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white text-[#0a0a0c] rounded-xl flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all">
                            <Camera size={18} />
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1 space-y-3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col md:flex-row md:items-center gap-4"
                        >
                            <h2 className="text-3xl font-black text-white tracking-tight">{user?.name || 'User'}</h2>
                            <div className="inline-flex items-center space-x-2 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20 mx-auto md:mx-0 w-fit">
                                <CheckCircle2 size={12} />
                                <span>KYC {kycStatus}</span>
                            </div>
                        </motion.div>
                        <p className="text-gray-500 font-medium">{user?.rank || 'Member'} | Elite Network</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-400 font-bold uppercase tracking-widest">RANK #12</div>
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-400 font-bold uppercase tracking-widest">LVL 4 ACHIEVER</div>
                        </div>
                    </div>

                    {/* Quick Actions for Profile */}
                    <div className="hidden lg:flex flex-col gap-3">
                        <button className="flex items-center space-x-2 text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-widest">
                            <span>View Public Profile</span>
                            <ExternalLink size={14} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Personal Details Grid */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-lg font-bold text-white tracking-tight">Account Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {profileData.map((field, idx) => (
                            <ProfileField key={idx} {...field} delay={0.1 + idx * 0.05} />
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="p-6 glass-orange border border-orange-500/10 rounded-2xl"
                    >
                        <h4 className="text-sm font-bold text-white mb-2 italic">Security Tip</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Always keep your mobile number and email updated to receive important payout notifications and account security alerts.
                            Never share your password with anyone.
                        </p>
                    </motion.div>
                </div>

                {/* Options / Action Panel */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white tracking-tight px-2">Account Management</h3>

                    <div className="glass p-6 space-y-4">
                        <ActionButton
                            icon={Edit3}
                            label="Edit Profile Details"
                            variant="secondary"
                            onClick={() => console.log('Edit Profile')}
                        />
                        <ActionButton
                            icon={Lock}
                            label="Change Security Password"
                            variant="secondary"
                            onClick={() => console.log('Change Password')}
                        />
                        <div className="pt-2">
                            <ActionButton
                                icon={ShieldCheck}
                                label="KYC Verification"
                                variant="outline-orange"
                                onClick={() => console.log('KYC')}
                            />
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Security Level</span>
                                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Strong</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '85%' }}
                                    className="h-full bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Referral Card (Refined Version) */}
                    <div className="glass-dark border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden group cursor-pointer shadow-2xl transition-all hover:border-orange-500/20">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Referral Link</p>
                                <div className="p-2 bg-orange-500/10 rounded-lg">
                                    <ExternalLink size={14} className="text-orange-500" />
                                </div>
                            </div>

                            <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 flex items-center justify-between group-hover:bg-white/[0.05] transition-colors">
                                <span className="text-white font-black text-sm tracking-widest">{user?.referralCode || 'N/A'}</span>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(user?.referralCode || '');
                                        alert('Code copied!');
                                    }}
                                    className="text-[10px] font-bold text-orange-500 hover:text-orange-400 uppercase tracking-widest"
                                >
                                    Copy
                                </button>
                            </div>

                            <p className="mt-4 text-[10px] text-gray-500 leading-relaxed font-medium">
                                Share this code with your friends to earn up to <b>15% direct commission</b>.
                            </p>
                        </div>
                        {/* Subtle Decorative Gradient */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
