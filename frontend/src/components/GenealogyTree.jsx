import React, { useState, useEffect } from 'react';
import {
    ChevronDown,
    ChevronRight,
    Search,
    User,
    Users,
    ShieldCheck,
    Mail,
    Calendar,
    Zap,
    GitBranch,
    Target,
    ArrowRightCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../utils/api';

const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center p-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors group">
        <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mr-3 group-hover:scale-110 transition-transform">
            <Icon size={16} />
        </div>
        <div className="flex-1">
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">{label}</p>
            <p className="text-xs font-bold text-white tracking-wide">{value}</p>
        </div>
    </div>
);

const MemberNode = ({ member, depth = 0, onSelect, selectedId, searchQuery }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = member.children && member.children.length > 0;
    const isSelected = selectedId === member.name;
    const isMatch = searchQuery && member.name.toLowerCase().includes(searchQuery.toLowerCase());

    return (
        <div className="flex flex-col relative">
            <div className="flex items-center relative group">
                {depth > 0 && (
                    <div className="w-8 h-px bg-white/10 relative shrink-0">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-orange-500/50" />
                    </div>
                )}

                <motion.div
                    onClick={() => onSelect(member)}
                    className={`
            relative z-10 flex items-center space-x-3 p-3 rounded-2xl glass mb-3 w-64 cursor-pointer border transition-all duration-300
            ${isSelected ? 'border-orange-500 bg-orange-500/5 shadow-lg shadow-orange-500/10 scale-[1.02]' : 'border-white/5 hover:border-orange-500/20 hover:bg-white/[0.04]'}
            ${isMatch ? 'ring-1 ring-orange-500/50 shadow-md shadow-orange-500/5' : ''}
          `}
                >
                    <div className="relative shrink-0">
                        <div className={`w-8 h-8 rounded-lg p-[1px] bg-gradient-to-br ${depth === 0 ? 'from-orange-500 to-amber-500' : 'from-gray-700 to-gray-800'}`}>
                            <div className="w-full h-full rounded-[7px] bg-[#0a0a0c] flex items-center justify-center overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${member.name}&background=141417&color=fff&bold=true&size=100`} alt={member.name} />
                            </div>
                        </div>
                        {member.active && (
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0a0a0c]" />
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate leading-none">{member.name}</h4>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1.5">{member.rank}</p>
                    </div>

                    {hasChildren && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                            className={`p-1 hover:bg-white/5 rounded-lg transition-all ${isExpanded ? 'text-orange-500' : 'text-gray-500'}`}
                        >
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                    )}
                </motion.div>
            </div>

            <AnimatePresence>
                {isExpanded && hasChildren && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-6 border-l border-white/5 pl-4"
                    >
                        {member.children.map((child, i) => (
                            <MemberNode
                                key={i}
                                member={child}
                                depth={depth + 1}
                                onSelect={onSelect}
                                selectedId={selectedId}
                                searchQuery={searchQuery}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const GenealogyTree = ({ user }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTree = async () => {
            try {
                const res = await API.get('/users/referrals');
                const referrals = res.data.data;
                
                // Construct a simple one-level tree for now with the logged-in user as root
                const root = {
                    name: user?.name || 'You',
                    rank: user?.rank || 'Bronze',
                    teamSize: user?.totalTeam || referrals.length,
                    active: true,
                    isRoot: true,
                    _id: user?._id,
                    children: referrals.map(ref => ({
                        name: ref.name,
                        rank: ref.rank || 'Bronze',
                        teamSize: 0, // We'd need deeper fetching for this
                        active: true,
                        _id: ref._id,
                        email: ref.email,
                        createdAt: ref.createdAt
                    }))
                };
                
                setTreeData(root);
                setSelectedMember(root);
            } catch (err) {
                console.error('Failed to fetch genealogy data', err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchTree();
    }, [user]);

    if (loading || !treeData) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-10 h-10 border-4 border-orange-500/10 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Genealogy Tree</h2>
                    <p className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-widest text-[10px]">Network Level Visualization</p>
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search member..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl py-2.5 pl-11 pr-4 text-xs text-white focus:border-orange-500/50 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-hidden">
                {/* Left Side: The Tree */}
                <div className="lg:col-span-8 glass border border-white/5 rounded-3xl p-8 overflow-auto custom-scrollbar relative min-h-[400px]">
                    <div className="absolute top-6 right-6 hidden md:flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <Zap size={14} className="text-orange-500" />
                        <span>Active Network Stream</span>
                    </div>
                    <div className="min-w-fit pt-2">
                        <MemberNode
                            member={treeData}
                            onSelect={setSelectedMember}
                            selectedId={selectedMember?.name}
                            searchQuery={searchQuery}
                        />
                    </div>
                </div>

                {/* Right Side: Inline Member Details */}
                <div className="lg:col-span-4 min-w-[320px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedMember?.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass border border-white/5 rounded-3xl p-8 h-full flex flex-col items-center"
                        >
                            <div className="relative mb-6">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 shadow-xl shadow-orange-500/10">
                                    <div className="w-full h-full rounded-[22px] bg-[#0a0a0c] flex items-center justify-center overflow-hidden">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${selectedMember?.name}&size=200&background=141417&color=fff&bold=true`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                {selectedMember?.active && (
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#0a0a0c] shadow-lg shadow-green-500/20" />
                                )}
                            </div>

                            <h3 className="text-xl font-black text-white tracking-tight leading-none text-center">{selectedMember?.name}</h3>
                            <p className="text-orange-500 font-bold text-[10px] uppercase tracking-widest mt-2">{selectedMember?.rank} Tier</p>

                            <div className="w-full mt-8 space-y-3">
                                <DetailItem icon={ShieldCheck} label="Account ID" value={selectedMember?._id?.slice(-8).toUpperCase() || '#MLM-XXXX'} />
                                <DetailItem icon={Users} label="Team Size" value={`${selectedMember?.teamSize || 0} Members`} />
                                <DetailItem icon={Mail} label="Email Address" value={selectedMember?.email || 'N/A'} />
                                <DetailItem icon={Calendar} label="Joining Date" value={selectedMember?.createdAt ? new Date(selectedMember.createdAt).toLocaleDateString() : 'N/A'} />
                            </div>

                            <div className="w-full mt-8 pt-6 border-t border-white/5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Status</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${selectedMember?.active ? 'text-green-500' : 'text-red-500'}`}>
                                        {selectedMember?.active ? 'Active Node' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: selectedMember?.active ? '100%' : '20%' }}
                                        className={`h-full ${selectedMember?.active ? 'bg-green-500' : 'bg-red-500'}`}
                                    />
                                </div>
                                <button className="w-full py-4 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border border-orange-500/20 font-bold text-[10px] rounded-2xl transition-all uppercase tracking-widest flex items-center justify-center space-x-2">
                                    <span>Detailed Analytics</span>
                                    <ArrowRightCircle size={14} />
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default GenealogyTree;
