import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AttendanceForm } from './components/AttendanceForm';
import { MealLogForm } from './components/MealLogForm';
import { History } from './components/History';
import { NGOList } from './components/NGOList';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'attendance':
        return <AttendanceForm />;
      case 'meal-log':
        return <MealLogForm />;
      case 'history':
        return <History />;
      case 'ngos':
        return <NGOList />;
      case 'settings':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-500">System configuration and profile management</p>
            <div className="mt-8 p-12 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
              Settings module is under development.
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
