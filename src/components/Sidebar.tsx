import React from 'react';
import { LayoutDashboard, ClipboardList, Users, History, Settings, LogOut, Utensils } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: Users },
    { id: 'meal-log', label: 'Meal Logging', icon: Utensils },
    { id: 'history', label: 'History', icon: History },
    { id: 'ngos', label: 'NGO Network', icon: ClipboardList },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Utensils className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">SFIRN</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors w-full">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
