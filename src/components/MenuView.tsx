import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Calendar as CalendarIcon, Info, ChevronRight, Clock } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { MealType } from '../types';
import { getCurrentMealSlot } from '../lib/utils';

export const MenuView: React.FC = () => {
  const [selectedMeal, setSelectedMeal] = useState<MealType>(getCurrentMealSlot());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [publishedMenu, setPublishedMenu] = useState<any>(null);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentDayName = daysOfWeek[((new Date().getDay() + 6) % 7)];

  useEffect(() => {
    const loadMenu = () => {
      const saved = localStorage.getItem('sfirn_published_menu');
      if (saved) {
        const fullMenu = JSON.parse(saved);
        setPublishedMenu(fullMenu[currentDayName] || null);
      }
    };
    loadMenu();
    window.addEventListener('storage', loadMenu);
    return () => window.removeEventListener('storage', loadMenu);
  }, [currentDayName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getMealStatus = (name: string) => {
    const now = new Date();
    const totalMin = now.getHours() * 60 + now.getMinutes();

    const slots = {
      'Breakfast': { start: 480, end: 535 },  // 08:00 - 08:55
      'Lunch': { start: 735, end: 780 },      // 12:15 - 13:00
      'Snacks': { start: 1005, end: 1020 },   // 16:45 - 17:00
      'Dinner': { start: 1200, end: 1260 }    // 20:00 - 21:00
    };

    const slot = slots[name as keyof typeof slots];
    if (totalMin >= slot.start && totalMin <= slot.end) return 'Active';
    if (totalMin < slot.start) return 'Upcoming';
    return 'Passed';
  };

  const today = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentItems = publishedMenu ? publishedMenu[selectedMeal] : [];

  const mealSlotsData = [
    { name: 'Breakfast', time: '08:00 - 08:55', id: 'breakfast' as const },
    { name: 'Lunch', time: '12:15 - 13:00', id: 'lunch' as const },
    { name: 'Snacks', time: '16:45 - 17:00', id: 'snacks' as const },
    { name: 'Dinner', time: '20:00 - 21:00', id: 'dinner' as const },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Today's Meal Menu</h1>
          <p className="text-slate-600 font-bold flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-emerald-600" />
            {today}
          </p>
        </div>
        <div className="px-6 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-xl flex items-center gap-3">
           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
             {selectedMeal} Menu Live
           </span>
        </div>
      </div>

      {/* Manual Selection Allowed for earlier/future slots */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {mealSlotsData.map((slot) => {
          const status = getMealStatus(slot.name);
          const isActive = selectedMeal === slot.id;
          return (
            <button
              key={slot.id}
              onClick={() => setSelectedMeal(slot.id)}
              className={`group relative overflow-hidden p-6 rounded-3xl border-2 transition-all duration-500 ${
                isActive
                  ? 'bg-emerald-600 border-transparent shadow-2xl shadow-emerald-600/30 scale-[1.02]'
                  : 'bg-white border-slate-100 hover:border-emerald-500/20'
              }`}
            >
              <div className="relative z-10 flex flex-col items-center gap-2">
                <Utensils className={`w-6 h-6 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                <span className={`text-sm font-black capitalize ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {slot.name}
                </span>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
                  isActive ? 'bg-white/20 text-white' : status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {status}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GlassCard className="min-h-[500px] border-white bg-white/90 shadow-2xl overflow-visible">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
               <h3 className="font-black text-2xl text-slate-900 flex items-center gap-3">
                 <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-600/20">
                    <Utensils className="w-6 h-6" />
                 </div>
                 {selectedMeal.toUpperCase()} MENU
               </h3>
               <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                 currentItems?.length > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
               }`}>
                 {currentItems?.length > 0 ? 'Menu Published' : 'No Menu Uploaded'}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {currentItems?.length > 0 ? (
                  currentItems.map((item: any, idx: number) => (
                    <motion.div
                      key={item.id || idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-5 bg-white border border-slate-50 rounded-3xl shadow-md hover:shadow-xl transition-all group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-500">
                           <Utensils className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-500" />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{item.name}</p>
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{item.category}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-all" />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center py-20 text-slate-500">
                    <Utensils className="w-12 h-12 mb-4 opacity-20 text-slate-900" />
                    <p className="font-black uppercase tracking-widest text-xs">No items for this slot.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="bg-white/90 border-white shadow-2xl">
             <h3 className="font-black text-xl text-slate-900 mb-6 flex items-center gap-3">
               <Clock className="w-6 h-6 text-emerald-600" />
               Daily Schedule
             </h3>
             <div className="space-y-3">
                {mealSlotsData.map((m, i) => {
                  const status = getMealStatus(m.name);
                  const isActive = status === 'Active';
                  return (
                    <div key={i} className={`p-5 rounded-2xl border transition-all duration-300 ${
                      isActive ? 'bg-emerald-50 border-emerald-200 shadow-inner' : 'bg-transparent border-transparent'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                          }`} />
                          <div>
                            <p className={`font-black text-sm ${isActive ? 'text-emerald-900' : 'text-slate-600'}`}>{m.name}</p>
                            <p className={`text-xs font-bold ${isActive ? 'text-emerald-800' : 'text-slate-500'}`}>{m.time}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-tighter ${
                          isActive ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {status}
                        </span>
                      </div>
                    </div>
                  );
                })}
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
