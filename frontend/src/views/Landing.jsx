import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Shield, 
    Globe, 
    Zap, 
    BarChart3, 
    Lock, 
    Cpu, 
    ArrowRight, 
    ChevronRight, 
    Menu, 
    X, 
    Twitter, 
    Github, 
    MessageSquare,
    ExternalLink,
    Trophy,
    Target
} from 'lucide-react';

// Reusable Components
const SectionHeading = ({ badge, title, subtitle, light = false }) => (
    <div className="text-center mb-16 px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1 mb-6"
        >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.2em]">{badge}</span>
        </motion.div>
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight`}
        >
            {title}
        </motion.h2>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg font-medium"
        >
            {subtitle}
        </motion.p>
    </div>
);

const FeatureCard = ({ icon: Icon, title, desc, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -10 }}
        className="glass p-8 group border border-white/5 hover:border-orange-500/30 transition-all duration-500 relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/10 transition-colors"></div>
        <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-500 shadow-orange-glow">
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">{title}</h3>
        <p className="text-gray-500 leading-relaxed font-medium">{desc}</p>
    </motion.div>
);

const Landing = ({ onGetStarted }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-[#0a0a0c] min-h-screen font-['Outfit'] selection:bg-orange-500/30 selection:text-white overflow-x-hidden">
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0c]/80 backdrop-blur-xl py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-8'}`}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3 group cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-tr from-[#ff8c00] to-[#ff4d00] rounded-xl flex items-center justify-center shadow-orange-glow rotate-3 group-hover:rotate-0 transition-transform">
                            <Shield size={22} className="text-white" />
                        </div>
                        <span className="text-xl font-black text-white tracking-tighter">MLM</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-10 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                        <a href="#about" className="hover:text-orange-500 transition-colors">Vision</a>
                        <a href="#features" className="hover:text-orange-500 transition-colors">Ecosystem</a>
                        <a href="#utility" className="hover:text-orange-500 transition-colors">Utility</a>
                        <a href="#education" className="hover:text-orange-500 transition-colors">Insights</a>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <button 
                            onClick={() => onGetStarted('login')}
                            className="text-white hover:text-orange-500 font-bold text-sm transition-colors"
                        >
                            Log In
                        </button>
                        <button 
                            onClick={() => onGetStarted('register')}
                            className="bg-gradient-to-tr from-[#ff8c00] to-[#ff4d00] text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-orange-glow hover:scale-[1.05] active:scale-[0.95] transition-all"
                        >
                            Get Started
                        </button>
                    </div>

                    <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-[#0a0a0c] border-b border-white/5 p-6 space-y-6 overflow-hidden"
                        >
                            <div className="flex flex-col space-y-4 font-bold text-lg text-white">
                                <a href="#about" onClick={() => setIsMenuOpen(false)}>Vision</a>
                                <a href="#features" onClick={() => setIsMenuOpen(false)}>Ecosystem</a>
                                <a href="#utility" onClick={() => setIsMenuOpen(false)}>Utility</a>
                                <a href="#education" onClick={() => setIsMenuOpen(false)}>Insights</a>
                            </div>
                            <div className="flex flex-col space-y-4 pt-4 border-t border-white/5">
                                <button className="text-white bg-white/5 py-4 rounded-2xl font-bold" onClick={() => onGetStarted('login')}>Sign In</button>
                                <button className="bg-gradient-to-tr from-[#ff8c00] to-[#ff4d00] text-white py-4 rounded-2xl font-black" onClick={() => onGetStarted('register')}>Launch App</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s' }}></div>

                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-8 max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-block bg-white/5 border border-white/10 rounded-full px-5 py-2"
                        >
                            <span className="text-orange-500 font-bold text-[10px] uppercase tracking-widest">✨ The Next Generation of DeFi is Here</span>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter"
                        >
                            Future of <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] to-[#ff4d00]">Digital Wealth.</span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-xl leading-relaxed max-w-lg font-medium"
                        >
                            Experience high-yield opportunities with institutional-grade security. 
                            Fully decentralized MLM network for those who demand excellence.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-6 pt-4"
                        >
                            <button 
                                onClick={() => onGetStarted('register')}
                                className="bg-gradient-to-tr from-[#ff8c00] to-[#ff4d00] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_rgba(255,140,0,0.25)] hover:scale-[1.05] active:scale-[0.95] flex items-center space-x-3 transition-all"
                            >
                                <span>Get Your Invitation</span>
                                <ArrowRight size={20} />
                            </button>
                            <button className="glass border-white/10 text-white px-10 py-5 rounded-2xl font-bold text-sm hover:bg-white/5 transition-all flex items-center space-x-3">
                                <span>Learn More</span>
                            </button>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5"
                        >
                            <div>
                                <p className="text-3xl font-black text-white">$4.2B+</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Volume Locked</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-white">128K+</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">MLM Users</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-green-500">94.2%</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">APR Avg.</p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        {/* Dashboard Mockup */}
                        <div className="glass p-1 border-white/10 rounded-[32px] bg-white/[0.02] shadow-[0_40px_80px_rgba(0,0,0,0.5)] rotate-[-2deg] relative">
                            <div className="bg-[#0f0f12] rounded-[31px] p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500">
                                            <BarChart3 size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Portfolio Summary</p>
                                            <p className="text-xl font-black text-white">$142,500.42</p>
                                        </div>
                                    </div>
                                    <div className="bg-green-500/10 text-green-500 text-[10px] font-black px-2 py-1 rounded-lg">+12.4%</div>
                                </div>
                                <div className="h-40 w-full bg-gradient-to-t from-orange-500/5 to-transparent border-b-2 border-orange-500/20 relative overflow-hidden flex items-end">
                                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path d="M0,80 Q25,20 50,60 T100,20" fill="none" stroke="#ff8c00" strokeWidth="2" />
                                    </svg>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-2xl p-4">
                                        <p className="text-[10px] text-gray-500 mb-1 uppercase font-bold">Total Yield</p>
                                        <p className="text-white font-bold">24.5%</p>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4">
                                        <p className="text-[10px] text-gray-500 mb-1 uppercase font-bold">Safety Score</p>
                                        <p className="text-white font-bold">Elite</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 glass p-5 rounded-2xl border-white/10 shadow-orange-glow"
                        >
                            <Target className="text-orange-500 mb-2" size={24} />
                            <p className="text-xs font-black text-white uppercase tracking-wider">Top Tier</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* About / Vision */}
            <section id="about" className="py-32 px-6">
                <div className="container mx-auto">
                    <SectionHeading 
                        badge="Our Core Vision" 
                        title="Decentralized Network for the Bold" 
                        subtitle="MLM was built with one goal: to provide high-end, institutional-grade tools to builders around the globe."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
                        {[
                            { icon: Lock, title: "Vault Security", desc: "Military-grade encryption and cold storage solutions for your digital wealth." },
                            { icon: Shield, title: "Self Custody", desc: "You remain in full control of your private keys and assets at all times." },
                            { icon: Globe, title: "Global Circle", desc: "Join an international network of professional creators and investors." }
                        ].map((item, i) => (
                            <div key={i} className="glass p-10 border-white/5">
                                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-6 mx-auto md:mx-0 shadow-orange-glow">
                                    <item.icon size={28} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{item.title}</h4>
                                <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Ecosystem */}
            <section id="features" className="py-32 px-6 bg-white/[0.01]">
                <div className="container mx-auto">
                    <SectionHeading 
                        badge="Ecosystem Features" 
                        title="Powerful Suite of Web3 Tools" 
                        subtitle="Everything you need to scale your network and earnings with total transparency."
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: "Lightning Execution", desc: "Real-time sync between your dashboard and the blockchain for instant results." },
                            { icon: BarChart3, title: "Wealth Analytics", desc: "Visualize your growth with deep analytics and referral performance tracking." },
                            { icon: Trophy, title: "Elite Ranking", desc: "Climb the ranks and unlock premium rewards, higher yields, and lower fees." }
                        ].map((feature, i) => (
                            <div key={i} className="glass p-8 group border-white/5 hover:border-orange-500/30 transition-all duration-500">
                                <div className="flex items-center space-x-5 mb-6">
                                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-orange-glow">
                                        <feature.icon size={22} />
                                    </div>
                                    <h5 className="text-xl font-bold text-white tracking-tight">{feature.title}</h5>
                                </div>
                                <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="glass p-12 md:p-20 text-center relative overflow-hidden bg-gradient-to-br from-[#141417] to-[#0a0a0c]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
                        
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Ready to join the <span className="text-orange-500">MLM?</span></h2>
                        <p className="text-gray-400 max-w-xl mx-auto text-lg mb-12 font-medium">Be part of the exclusive loop. Connect your first wallet and start your journey today.</p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button 
                                onClick={() => onGetStarted('register')}
                                className="bg-gradient-to-tr from-[#ff8c00] to-[#ff4d00] text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-orange-glow hover:scale-[1.05] transition-all"
                            >
                                Register Account
                            </button>
                            <button 
                                onClick={() => onGetStarted('login')}
                                className="glass border-white/10 text-white px-12 py-5 rounded-2xl font-bold text-sm hover:bg-white/5 transition-all"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-white/5">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center space-x-3 group cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-tr from-[#ff8c00] to-[#ff4d00] rounded-lg flex items-center justify-center shadow-orange-glow">
                            <Shield size={18} className="text-white" />
                        </div>
                        <span className="text-lg font-black text-white tracking-tighter">MLM</span>
                    </div>

                    <div className="flex space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Vision</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    </div>

                    <div className="flex space-x-4">
                        {[Twitter, Github, MessageSquare].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 hover:text-orange-500 transition-all">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="text-center mt-12">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">&copy; 2026 MLM Worldwide. Empowering Digital Builders.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
