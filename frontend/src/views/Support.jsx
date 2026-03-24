import React from 'react';
import {
    MessageSquare,
    Mail,
    Phone,
    FileText,
    ExternalLink,
    ChevronRight,
    LifeBuoy,
    ShieldCheck,
    Send,
    Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

const FAQItem = ({ question, answer }) => (
    <div className="p-6 glass border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all cursor-pointer group">
        <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-white tracking-tight">{question}</h4>
            <ChevronRight size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
        </div>
        <p className="text-xs text-gray-500 leading-relaxed font-medium">{answer}</p>
    </div>
);

const Support = () => {
    const FAQs = [
        { question: "How is my direct income calculated?", answer: "Direct income is calculated as a percentage of the package value purchased by your direct referrals." },
        { question: "When are withdrawals processed?", answer: "Withdrawals are processed every Tuesday and Thursday, often within 24 hours of request." },
        { question: "Can I upgrade my package twice?", answer: "Yes, you can upgrade to a higher tier at any time by paying the difference or full value." },
        { question: "What is the maximum network depth?", answer: "Starter nodes reach 3 levels, while Elite accounts enjoy infinite depth tracking." }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 bg-orange-500/10 text-orange-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-orange-500/20">
                    <LifeBuoy size={12} />
                    <span>Elite Support Hub</span>
                </div>
                <h2 className="text-4xl font-black text-white tracking-tight uppercase tracking-widest leading-none">How can we <span className="text-orange-500">help you?</span></h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-sm font-medium">
                    Access our knowledge base, connect with support engineers, or browse our most frequently asked questions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Options */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2 px-2">
                        <MessageSquare size={20} className="text-orange-500" />
                        <span>Direct Assistance</span>
                    </h3>

                    <div className="p-8 glass-dark border border-white/5 rounded-[2rem] space-y-8">
                        {[
                            { icon: Mail, label: 'Email Support', value: 'help@mlmelite.com', color: 'orange' },
                            { icon: Phone, label: 'Phone Line', value: '+1 (800) 123-ELITE', color: 'blue' },
                            { icon: MessageSquare, label: 'Live Chat', value: 'Active 24/7', color: 'green' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center space-x-5 group cursor-pointer hover:bg-white/5 p-2 -m-2 rounded-2xl transition-all">
                                <div className={`w-12 h-12 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-500 group-hover:scale-110 transition-transform`}>
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{item.label}</p>
                                    <p className="text-sm font-bold text-white tracking-wide">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 glass-orange border border-orange-500/10 rounded-[2rem] relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-3 italic">Priority System</h4>
                            <p className="text-xs text-orange-500/80 leading-relaxed font-bold">
                                Platinum Elite members get average response times under **15 minutes**.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    </div>
                </div>

                {/* FAQ & Knowledge Base */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
                            <FileText size={20} className="text-orange-500" />
                            <span>Knowledge Base</span>
                        </h3>
                        <button className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] flex items-center space-x-2 hover:underline">
                            <span>View All</span>
                            <ExternalLink size={12} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {FAQs.map((faq, i) => (
                            <FAQItem key={i} {...faq} />
                        ))}
                    </div>

                    <div className="pt-4">
                        <div className="p-10 glass border border-white/5 rounded-[2.5rem] relative overflow-hidden bg-gradient-to-br from-[#0a0a0c] to-[#141417]">
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="max-w-md text-center md:text-left space-y-4">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                        <Plus size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">Need to open a Support Ticket?</h3>
                                    <p className="text-sm text-gray-500 font-medium">If you couldn't find your answer, create a ticket and our technical team will reach out to you within the hour.</p>
                                </div>
                                <button className="flex items-center space-x-3 px-10 py-5 bg-orange-500 text-white rounded-2xl shadow-xl shadow-orange-500/20 font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all hover:bg-orange-600">
                                    <Send size={18} />
                                    <span>Initial Trace Ticket</span>
                                </button>
                            </div>
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px] -mr-32 -mb-32 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Support Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-10 border-t border-white/5">
                {[
                    { label: 'Uptime', value: '99.99%', icon: ShieldCheck },
                    { label: 'Resolved', value: '450k+', icon: ShieldCheck },
                    { label: 'Avg Speed', value: '45m', icon: ShieldCheck },
                    { label: 'Satisfaction', value: '4.9/5', icon: ShieldCheck }
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center text-center space-y-2">
                        <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em]">{stat.label}</p>
                        <p className="text-xl font-black text-white">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Support;
