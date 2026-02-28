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

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showInsights, setShowInsights] = useState(false);

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (role === 'student' || role === 'teacher') {
      setActiveTab('check-in');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setActiveTab('dashboard');
    setShowInsights(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (showInsights) {
      return <Insights onBack={() => setShowInsights(false)} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onViewInsights={() => setShowInsights(true)} userRole={userRole || ''} />;
      case 'attendance':
        return <AttendanceForm />;
      case 'meal-log':
        return <MealLogForm />;
      case 'history':
        return <History />;
      case 'ngos':
        return <NGOList />;
      case 'check-in':
        return <MealCheckIn userRole={userRole || 'student'} />;
      case 'menu-manager':
        return <MenuManager />;
      case 'menu-view':
        return <MenuView />;
      case 'alerts':
        return <NGOAlerts />;
      case 'pickups':
        return <MyPickups />;
      case 'settings':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-500">System configuration and profile management</p>
            <div className="mt-8 p-12 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 font-bold">
              Settings module is under development.
            </div>
          </div>
        );
      default:
        return <Dashboard onViewInsights={() => setShowInsights(true)} userRole={userRole || ''} />;
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
        role={userRole}
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
