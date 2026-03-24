import React, { useState } from 'react';
import {
    Copy,
    QrCode,
    Share2,
    MousePointer2,
    UserPlus2,
    BarChart3,
    Check,
    Send,
    Twitter,
    Facebook,
    MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatCard = ({ label, value, subValue, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="glass p-6 flex items-center justify-between group hover:border-orange-500/20 transition-all"
    >
        <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{label}</p>
            <h3 className="text-2xl font-black text-white">{value}</h3>
            <p className="text-[10px] text-green-500 font-bold mt-1">{subValue}</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-orange-500/5 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
    </motion.div>
);

const ReferralLinkPage = ({ user }) => {
    const [copied, setCopied] = useState(false);
    const referralCode = user?.referralCode || "GET-STARTED";
    const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socialLinks = [
        { name: 'WhatsApp', icon: MessageCircle, color: 'hover:text-green-500' },
        { name: 'Telegram', icon: Send, color: 'hover:text-blue-500' },
        { name: 'Twitter', icon: Twitter, color: 'hover:text-sky-400' },
        { name: 'Facebook', icon: Facebook, color: 'hover:text-blue-600' },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Referral Program</h2>
                    <p className="text-gray-500 text-sm font-medium mt-1">Invite your network and earn lifetime commissions.</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-orange-500 bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
                    <BarChart3 size={14} />
                    <span className="uppercase tracking-widest">Active Level: Platinum</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Total Clicks"
                    value="1,248"
                    subValue="+12% from last week"
                    icon={MousePointer2}
                    delay={0.1}
                />
                <StatCard
                    label="Total Signups"
                    value="42"
                    subValue="+5 new today"
                    icon={UserPlus2}
                    delay={0.2}
                />
                <StatCard
                    label="Conversion Rate"
                    value="3.4%"
                    subValue="Above average"
                    icon={BarChart3}
                    delay={0.3}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Referral Card */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="glass p-8 relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                        <h3 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center space-x-2">
                            <Share2 size={20} className="text-orange-500" />
                            <span>Your Referral Link</span>
                        </h3>

                        <div className="space-y-6 relative z-10">
                            <div className="p-1.5 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex flex-col sm:flex-row items-center gap-2">
                                <div className="flex-1 px-4 py-3 text-gray-300 font-medium text-sm truncate w-full">
                                    {referralLink}
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-95
                    ${copied ? 'bg-green-500 text-white' : 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600'}
                  `}
                                >
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                                </button>
                            </div>

                            <div className="pt-4">
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">Share via Social Media</p>
                                <div className="flex flex-wrap gap-4">
                                    {socialLinks.map((social) => (
                                        <motion.button
                                            key={social.name}
                                            whileHover={{ y: -5 }}
                                            className={`flex items-center space-x-3 px-5 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-gray-400 font-bold text-xs transition-colors ${social.color}`}
                                        >
                                            <social.icon size={18} />
                                            <span>{social.name}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* QR Code Section */}
                <div className="lg:col-span-5">
                    <div className="glass p-8 flex flex-col items-center text-center h-full">
                        <h3 className="text-xl font-bold text-white mb-6 w-full text-left flex items-center space-x-2">
                            <QrCode size={20} className="text-orange-500" />
                            <span>QR Code</span>
                        </h3>

                        <div className="relative group p-4 bg-white rounded-3xl mb-6 shadow-2xl shadow-orange-500/10 transition-transform hover:scale-105 duration-500">
                            {/* Mock QR Code using a stylized placeholder */}
                            <div className="w-48 h-48 bg-white border-[12px] border-white flex flex-col gap-1 overflow-hidden">
                                {[...Array(8)].map((_, r) => (
                                    <div key={r} className="flex gap-1 h-full">
                                        {[...Array(8)].map((_, c) => (
                                            <div
                                                key={c}
                                                className={`flex-1 ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'} rounded-[2px]`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center p-2 border border-gray-100">
                                    <div className="w-full h-full bg-orange-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-black text-xs italic">M</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 leading-relaxed max-w-[240px]">
                            Download this QR code and share it in your physical marketing or presentations.
                        </p>

                        <button className="mt-6 flex items-center space-x-2 text-orange-500 font-bold text-sm hover:underline">
                            <Copy size={16} />
                            <span>Download PNG</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Info Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-8 glass-orange border border-orange-500/10 rounded-3xl"
            >
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                        <Share2 size={32} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white mb-2 tracking-tight">Earning Tip</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Users who share their referral links on at least **3 different social platforms** see a **250% increase**
                            in their network growth compared to those who don't. Start sharing today!
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ReferralLinkPage;
