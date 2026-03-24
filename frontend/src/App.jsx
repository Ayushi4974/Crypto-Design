import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './views/Dashboard';
import GenealogyTree from './components/GenealogyTree';
import MyProfile from './views/MyProfile';
import ReferralLinkPage from './views/ReferralLink';
import MyTeam from './views/MyTeam';
import IncomeEarnings from './views/IncomeEarnings';
import Transactions from './views/Transactions';
import Support from './views/Support';
import Wallet from './views/Wallet';
import Withdraw from './views/Withdraw';
import PackagesUpdate from './views/PackagesUpdate';
import Packages from './components/Packages';
import ProfilePanel from './components/ProfilePanel';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './views/Login';
import Register from './views/Register';
import Landing from './views/Landing';
import API from './utils/api';

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('landing'); // 'landing', 'login', or 'register'
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await API.get('/auth/me');
          setUser(res.data.data);
        } catch (err) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuthMode('landing');
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    if (authMode === 'landing') {
      return <Landing onGetStarted={(mode) => setAuthMode(mode)} />;
    }
    return authMode === 'login' ? (
      <Login onLoginSuccess={setUser} toggleAuth={() => setAuthMode('register')} />
    ) : (
      <Register onLoginSuccess={setUser} toggleAuth={() => setAuthMode('login')} />
    );
  }

  return (
    <div className="flex h-screen bg-[#0a0a0c] overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar 
          tabTitle={activeTab} 
          user={user} 
          toggleProfile={() => setIsProfileOpen(!isProfileOpen)} 
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              {activeTab === 'Dashboard' && <Dashboard setActiveTab={setActiveTab} user={user} />}
              {activeTab === 'Referral Link' && <ReferralLinkPage user={user} />}
              {activeTab === 'My Team' && <MyTeam user={user} />}
              {activeTab === 'Income / Earnings' && <IncomeEarnings user={user} />}
              {activeTab === 'Genealogy Tree' && <GenealogyTree user={user} />}
              {activeTab === 'Packages / Upgrade' && <PackagesUpdate user={user} />}
              {activeTab === 'Transactions' && <Transactions user={user} />}
              {activeTab === 'Wallet' && <Wallet user={user} />}
              {activeTab === 'Withdraw' && <Withdraw user={user} />}
              {activeTab === 'Support' && <Support user={user} />}
              {activeTab === 'My Profile' && <MyProfile user={user} />}
              {!['Dashboard', 'Referral Link', 'My Team', 'Income / Earnings', 'Genealogy Tree', 'Packages / Upgrade', 'Transactions', 'Wallet', 'Withdraw', 'Support', 'My Profile'].includes(activeTab) && (
                <div className="flex items-center justify-center h-[60vh]">
                  <h2 className="text-3xl font-bold text-white/10">{activeTab} Section coming soon</h2>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Right Profile Panel (Desktop only for 3-column) */}
      <div className="hidden xl:block">
        <ProfilePanel user={user} />
      </div>

      {/* Mobile Profile Drawer */}
      <AnimatePresence>
        {isProfileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] xl:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full z-[51] xl:hidden"
            >
              <ProfilePanel user={user} isMobile onClose={() => setIsProfileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
