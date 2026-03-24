import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import API from '../utils/api';

const Login = ({ onLoginSuccess, toggleAuth }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await API.post('/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            onLoginSuccess(res.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0c] relative overflow-hidden font-['Outfit']">
            {/* Animated Background Orbs */}
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Geometric Accents */}
            <div className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full opacity-20"></div>
            <div className="absolute bottom-40 left-10 w-32 h-32 border border-orange-500/10 rounded-full opacity-20"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[440px] relative z-10"
            >
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block"
                    >
                        <div className="w-20 h-20 bg-gradient-to-tr from-[#ff8c00] to-[#ffb347] rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-[0_20px_40px_rgba(255,140,0,0.3)] rotate-3 hover:rotate-0 transition-transform duration-500">
                            <ShieldCheck size={40} className="text-white" />
                        </div>
                    </motion.div>
                    <motion.h2 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-extrabold text-white mb-3 tracking-tight"
                    >
                        Welcome <span className="text-[#ff8c00]">Back</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-400 font-medium"
                    >
                        Enter your credentials to access your dashboard
                    </motion.p>
                </div>

                {/* Main Card */}
                <div className="glass border border-white/10 p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                    {/* Subtle inner glow */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
                    
                    {error && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm mb-8 text-center font-semibold"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[2px] pl-1">Email Address</label>
                            <div className="relative group/input">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-[#ff8c00] transition-colors">
                                    <Mail size={20} />
                                </div>
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#ff8c00]/50 focus:bg-[#ff8c00]/[0.02] transition-all duration-300 placeholder:text-gray-600"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[2px]">Password</label>
                                <button type="button" className="text-[11px] font-bold text-[#ff8c00] hover:text-white transition-colors uppercase tracking-[1px]">Forgot?</button>
                            </div>
                            <div className="relative group/input">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-[#ff8c00] transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white outline-none focus:border-[#ff8c00]/50 focus:bg-[#ff8c00]/[0.02] transition-all duration-300 placeholder:text-gray-600"
                                    placeholder="••••••••"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full relative group overflow-hidden bg-[#ff8c00] text-white font-bold py-4 rounded-2xl shadow-[0_10px_30px_rgba(255,140,0,0.3)] flex items-center justify-center space-x-3 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <span className="relative z-10">{loading ? 'Verifying Account...' : 'Continue to Dashboard'}</span>
                            {!loading && <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-gray-400 text-sm font-medium">
                            Don't have an account yet?{' '}
                            <button 
                                onClick={toggleAuth} 
                                className="text-[#ff8c00] font-bold hover:text-white transition-colors ml-1"
                            >
                                Register Now
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer Quote */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-[11px] text-gray-600 mt-8 uppercase tracking-[3px] font-bold"
                >
                    Secured by Enterprise Grade Encryption
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;

