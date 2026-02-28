import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  History,
  Settings,
  LogOut,
  Utensils,
  Map as MapIcon,
  Bell,
  UserCircle,
  BookOpen,
  PlusSquare,
  Clock
} from 'lucide-react';
import { getCurrentMealSlot, format24hTime } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSignOut: () => void;
  role: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onSignOut, role }) => {
  const [currentSlot, setCurrentSlot] = useState(getCurrentMealSlot());
  const [currentTime, setCurrentTime] = useState(format24hTime(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlot(getCurrentMealSlot());
      setCurrentTime(format24hTime(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ];

    if (role === 'mess_owner' || role === 'admin') {
      const adminItems = role === 'admin' ? [
        { id: 'users', label: 'User Management', icon: Users },
      ] : [];

      return [
        ...baseItems,
        { id: 'menu-manager', label: 'Meal Menu', icon: PlusSquare },
        { id: 'attendance', label: 'Attendance Logs', icon: Users },
        { id: 'meal-log', label: 'Meal Prep Log', icon: Utensils },
        { id: 'ngos', label: 'NGO Network', icon: MapIcon },
        ...adminItems,
        { id: 'history', label: 'Impact History', icon: History },
      ];
    }

    if (role === 'ngo_rep') {
      return [
        ...baseItems,
        { id: 'alerts', label: 'Food Alerts', icon: Bell },
        { id: 'pickups', label: 'My Pickups', icon: ClipboardList },
        { id: 'history', label: 'Donation History', icon: History },
      ];
    }

    if (role === 'student' || role === 'teacher') {
      return [
        ...baseItems,
        { id: 'check-in', label: 'Meal Check-in', icon: role === 'teacher' ? BookOpen : UserCircle },
        { id: 'menu-view', label: 'Today\'s Menu', icon: Utensils },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white/10 backdrop-blur-2xl border-r border-white/20 h-screen sticky top-0 flex flex-col z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10 group">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-500">
            <Utensils className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-800 tracking-tighter block leading-none">SFIRN</span>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{role?.replace('_', ' ')}</span>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 translate-x-1'
                    : 'text-slate-500 hover:bg-white/60 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        {/* Real-time 24h Time Sync Indicator in Sidebar */}
        <div className="px-4 py-3 bg-slate-900 rounded-2xl border border-white/10 flex flex-col gap-1 shadow-2xl">
           <div className="flex items-center justify-between">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Clock</p>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           </div>
           <p className="text-xl font-black text-white tracking-tighter">{currentTime}</p>
           <div className="pt-2 mt-2 border-t border-white/5 flex items-center gap-2">
              <div className="p-1 bg-emerald-500/20 rounded text-emerald-400">
                 <Clock className="w-3 h-3" />
              </div>
              <p className="text-[10px] font-bold text-slate-300 capitalize">{currentSlot} Active</p>
           </div>
        </div>

        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
            activeTab === 'settings' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-white/60'
          }`}
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>

        <div className="pt-4 border-t border-slate-200/50">
          <button
            onClick={onSignOut}
            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 w-full group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
