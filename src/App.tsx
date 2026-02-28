import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AttendanceForm } from './components/AttendanceForm';
import { MealLogForm } from './components/MealLogForm';
import { History } from './components/History';
import { NGOList } from './components/NGOList';
import { Login } from './components/Login';
import { MealCheckIn } from './components/MealCheckIn';
import { MenuManager } from './components/MenuManager';
import { MenuView } from './components/MenuView';
import { Insights } from './components/Insights';
import { NGOAlerts } from './components/NGOAlerts';
import { MyPickups } from './components/MyPickups';
import { Settings } from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);
  const [showInsights, setShowInsights] = useState(false);

  const handleLogin = (role: string, email: string) => {
    // Look up user in simulated database to get real name
    const users = JSON.parse(localStorage.getItem('sfirn_users') || '[]');
    const matchedUser = users.find((u: any) => u.email === email && u.role === role);

    const name = matchedUser ? matchedUser.fullName :
                 email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    setUser({ name, email, role });
    setIsAuthenticated(true);
    if (role === 'student' || role === 'teacher') {
      setActiveTab('check-in');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActiveTab('dashboard');
    setShowInsights(false);
  };

  if (!isAuthenticated || !user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (showInsights) {
      return <Insights onBack={() => setShowInsights(false)} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onViewInsights={() => setShowInsights(true)} userRole={user.role} />;
      case 'attendance':
        return <AttendanceForm />;
      case 'meal-log':
        return <MealLogForm />;
      case 'history':
        return <History />;
      case 'ngos':
        return <NGOList />;
      case 'check-in':
        return <MealCheckIn userRole={user.role} />;
      case 'menu-manager':
        return <MenuManager />;
      case 'menu-view':
        return <MenuView />;
      case 'alerts':
        return <NGOAlerts />;
      case 'pickups':
        return <MyPickups />;
      case 'settings':
        return <Settings userRole={user.role} userProfile={{name: user.name, email: user.email}} />;
      default:
        return <Dashboard onViewInsights={() => setShowInsights(true)} userRole={user.role} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans overflow-hidden">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <Sidebar
        activeTab={showInsights ? 'dashboard' : activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setShowInsights(false);
        }}
        onSignOut={handleSignOut}
        role={user.role}
      />

      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-[1600px] mx-auto min-h-screen pb-12">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
