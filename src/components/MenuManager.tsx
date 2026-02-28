import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Utensils,
  Plus,
  Trash2,
  Calendar as CalendarIcon,
  Save,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  FileUp
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { MealType } from '../types';

interface MenuItem {
  id: string;
  name: string;
  category: string;
}

interface DailyMenu {
  breakfast: MenuItem[];
  lunch: MenuItem[];
  dinner: MenuItem[];
}

interface WeeklyMenu {
  [date: string]: DailyMenu;
}

export const MenuManager: React.FC = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('lunch');

  // Weekly Menu State
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu>(() => {
    const saved = localStorage.getItem('sfirn_published_menu');
    return saved ? JSON.parse(saved) : daysOfWeek.reduce((acc, day) => ({
      ...acc,
      [day]: { breakfast: [], lunch: [], dinner: [] }
    }), {});
  });

  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Main');
  const [saved, setSaved] = useState(false);

  const currentDay = daysOfWeek[selectedDayIndex];
  const currentItems = weeklyMenu[currentDay][selectedMeal];

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: newItemName,
        category: newItemCategory
      };

      setWeeklyMenu(prev => ({
        ...prev,
        [currentDay]: {
          ...prev[currentDay],
          [selectedMeal]: [...prev[currentDay][selectedMeal], newItem]
        }
      }));
      setNewItemName('');
    }
  };

  const removeItem = (id: string) => {
    setWeeklyMenu(prev => ({
      ...prev,
      [currentDay]: {
        ...prev[currentDay],
        [selectedMeal]: prev[currentDay][selectedMeal].filter(item => item.id !== id)
      }
    }));
  };

  const handleSaveWeekly = () => {
    localStorage.setItem('sfirn_published_menu', JSON.stringify(weeklyMenu));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    // Trigger a storage event for other tabs/components to update
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-3">
            <LayoutGrid className="w-10 h-10 text-emerald-600" />
            Weekly Menu Planner
          </h1>
          <p className="text-slate-500 font-medium">Configure all 21 meals for the upcoming week in one place.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <FileUp className="w-5 h-5" />
          Bulk Upload (CSV)
        </button>
      </div>

      {/* 3D Day Selector */}
      <div className="flex overflow-x-auto gap-4 mb-8 pb-4 no-scrollbar">
        {daysOfWeek.map((day, idx) => (
          <button
            key={day}
            onClick={() => setSelectedDayIndex(idx)}
            className={`flex-shrink-0 min-w-[140px] p-5 rounded-3xl border transition-all duration-500 relative overflow-hidden group ${
              selectedDayIndex === idx
                ? 'bg-slate-900 border-transparent shadow-2xl shadow-slate-900/40 scale-105'
                : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-500/30'
            }`}
          >
            <div className={`absolute top-0 left-0 w-full h-1 ${selectedDayIndex === idx ? 'bg-emerald-500' : 'bg-transparent'}`} />
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${selectedDayIndex === idx ? 'text-emerald-500' : 'text-slate-400'}`}>
              Day {idx + 1}
            </p>
            <p className={`text-lg font-black ${selectedDayIndex === idx ? 'text-white' : 'text-slate-800'}`}>
              {day}
            </p>
            <div className={`mt-3 flex gap-1 ${selectedDayIndex === idx ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-2 h-2 rounded-full ${weeklyMenu[day].breakfast.length ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              <div className={`w-2 h-2 rounded-full ${weeklyMenu[day].lunch.length ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              <div className={`w-2 h-2 rounded-full ${weeklyMenu[day].dinner.length ? 'bg-emerald-500' : 'bg-slate-200'}`} />
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Meal Slot Sidebar */}
        <div className="space-y-4">
          <GlassCard className="bg-slate-900 text-white border-none">
            <h3 className="font-black text-lg mb-6 flex items-center gap-3">
              <CalendarIcon className="w-5 h-5 text-emerald-400" />
              Select Meal
            </h3>
            <div className="space-y-3">
              {(['breakfast', 'lunch', 'dinner'] as MealType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedMeal(type)}
                  className={`w-full p-4 rounded-2xl font-bold text-sm capitalize transition-all border flex items-center justify-between group ${
                    selectedMeal === type
                      ? 'bg-emerald-600 border-transparent text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Utensils className={`w-4 h-4 ${selectedMeal === type ? 'text-white' : 'text-emerald-500'}`} />
                    {type}
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    selectedMeal === type ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {weeklyMenu[currentDay][type].length}
                  </span>
                </button>
              ))}
            </div>
          </GlassCard>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
             <h4 className="font-black text-xs text-emerald-700 uppercase tracking-widest mb-2">Smart Assist</h4>
             <p className="text-sm font-bold text-slate-600 leading-tight">
                Planning for <span className="text-emerald-600">{currentDay}'s {selectedMeal}</span>. We recommend high-protein items based on student feedback.
             </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <GlassCard className="bg-white border-slate-100 min-h-[500px] flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="font-black text-2xl text-slate-800 capitalize">
                    {selectedMeal} Menu
                  </h3>
                  <p className="text-sm font-bold text-slate-400">{currentDay} Plan</p>
               </div>
               <div className="flex gap-2">
                 <button
                  onClick={() => setSelectedDayIndex(prev => Math.max(0, prev - 1))}
                  className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                 >
                   <ChevronLeft className="w-5 h-5" />
                 </button>
                 <button
                  onClick={() => setSelectedDayIndex(prev => Math.min(6, prev + 1))}
                  className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                 >
                   <ChevronRight className="w-5 h-5" />
                 </button>
               </div>
            </div>

            {/* Input Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
               <input
                 type="text"
                 value={newItemName}
                 onChange={(e) => setNewItemName(e.target.value)}
                 onKeyPress={(e) => e.key === 'Enter' && addItem()}
                 placeholder="Add dish to this meal..."
                 className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold"
               />
               <div className="flex gap-2">
                 <select
                   value={newItemCategory}
                   onChange={(e) => setNewItemCategory(e.target.value)}
                   className="bg-slate-50 border border-slate-100 rounded-2xl px-6 text-slate-600 font-bold outline-none appearance-none cursor-pointer"
                 >
                   <option>Main</option>
                   <option>Rice</option>
                   <option>Side</option>
                   <option>Sweet</option>
                 </select>
                 <button
                   onClick={addItem}
                   className="bg-emerald-600 text-white px-6 rounded-2xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20"
                 >
                   <Plus className="w-6 h-6" />
                 </button>
               </div>
            </div>

            {/* List */}
            <div className="flex-1 space-y-3">
              <AnimatePresence mode="popLayout">
                {currentItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Utensils className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{item.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {currentItems.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-300">
                   <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <Utensils className="w-10 h-10" />
                   </div>
                   <p className="font-bold">No items for this meal.</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
               <button
                 onClick={handleSaveWeekly}
                 className={`w-full py-5 rounded-3xl font-black text-white transition-all flex items-center justify-center gap-3 shadow-2xl ${
                   saved ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-slate-900 shadow-slate-900/40'
                 }`}
               >
                 {saved ? (
                   <>
                     <CheckCircle2 className="w-6 h-6" />
                     Full Weekly Menu Published!
                   </>
                 ) : (
                   <>
                     <Save className="w-6 h-6" />
                     Save & Publish Weekly Menu
                   </>
                 )}
               </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
