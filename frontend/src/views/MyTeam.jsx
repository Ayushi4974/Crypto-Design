import React, { useState, useEffect } from 'react';
import {
    Users,
    Search,
    Filter,
    ArrowUpDown,
    UserPlus,
    Mail,
    Phone,
    ChevronRight,
    ShieldCheck,
    Zap,
    Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../utils/api';

const MyTeam = () => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await API.get('/users/referrals');
                setTeamData(res.data.data);
            } catch (err) {
                console.error('Failed to fetch team', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    const filteredTeam = teamData.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(search.toLowerCase()) || member.email.toLowerCase().includes(search.toLowerCase());
        if (filter === 'Active') return matchesSearch && member.status === 'active';
        if (filter === 'Inactive') return matchesSearch && member.status === 'inactive';
        return matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-10 h-10 border-4 border-orange-500/10 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">My Team</h2>
                    <p className="text-gray-500 text-sm font-medium mt-1">Manage and track your direct network referrals.</p>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 p-1.5 rounded-2xl border border-white/5">
                    {['All', 'Active', 'Inactive', 'New'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === f
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                    : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {f} Members
                        </button>
                    ))}
                </div>
            </div>

            {/* Search and Advanced Filter */}
            <div className="glass p-4 flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or User ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-orange-500/50 outline-none transition-all"
                    />
                </div>
                <button className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 font-bold text-xs hover:bg-white/10 hover:text-white transition-all whitespace-nowrap">
                    <Filter size={16} />
                    <span>Advanced Filters</span>
                </button>
            </div>

            {/* Team Table */}
            <div className="glass overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">User Details</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Join Date</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Package</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {filteredTeam.map((member, idx) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={member.id}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 flex items-center justify-center text-orange-500 font-bold text-xs border border-orange-500/10 group-hover:scale-110 transition-transform">
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white leading-none">{member.name}</p>
                                                    <p className="text-[11px] text-gray-500 mt-1.5 font-medium">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <Clock size={14} className="text-gray-600" />
                                                <span className="text-xs font-medium">{new Date(member.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${member.package === 'Platinum' ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' :
                                                        member.package === 'Gold' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'bg-gray-400'
                                                    }`} />
                                                <span className="text-xs font-bold text-white uppercase tracking-wider">{member.package}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${member.status === 'active'
                                                    ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                                                }`}>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                                <ChevronRight size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
                {filteredTeam.length === 0 && (
                    <div className="py-20 text-center">
                        <Users className="mx-auto text-gray-700 mb-4" size={48} />
                        <p className="text-gray-500 font-medium">No team members found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Quick Insights Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 glass-dark border border-white/[0.05] rounded-3xl flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Active Ratio</p>
                        <h4 className="text-xl font-black text-white">82.5%</h4>
                    </div>
                </div>
                <div className="p-6 glass-dark border border-white/[0.05] rounded-3xl flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <Zap size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Weekly Growth</p>
                        <h4 className="text-xl font-black text-white">+12 Members</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTeam;
