import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Utensils, Calendar as CalendarIcon, Send, CheckCircle2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { getCurrentMealSlot } from '../lib/utils';

interface MealCheckInProps {
  userRole: string;
}

export const MealCheckIn: React.FC<MealCheckInProps> = ({ userRole }) => {
  const [status, setStatus] = useState<'pending' | 'present' | 'absent'>('pending');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentMealSlot, setCurrentMealSlot] = useState(getCurrentMealSlot());

  // Real-time Meal Slot Synchronization
  useEffect(() => {
    const updateSlot = () => {
      setCurrentMealSlot(getCurrentMealSlot());
    };

    const timer = setInterval(updateSlot, 60000); // Sync every minute
    return () => clearInterval(timer);
  }, []);

  const handleAttendance = (value: 'present' | 'absent') => {
    if (!isSubmitted) {
      setStatus(value);
    }
  };

  const handleSubmit = () => {
    if (status === 'pending') return;

    setLoading(true);

    setTimeout(() => {
      const attendanceData = {
        role: userRole,
        status: status,
        timestamp: new Date().toISOString(),
        mealSlot: currentMealSlot
      };

      const existingLogs = JSON.parse(localStorage.getItem('sfirn_attendance_sync') || '[]');
      localStorage.setItem('sfirn_attendance_sync', JSON.stringify([...existingLogs, attendanceData]));

      window.dispatchEvent(new Event('storage'));

      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const mealSlots = [
    { name: 'Breakfast', time: '08:00 - 09:30', id: 'breakfast' },
    { name: 'Lunch', time: '12:30 - 14:00', id: 'lunch' },
    { name: 'Dinner', time: '19:30 - 21:00', id: 'dinner' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
          {userRole === 'teacher' ? 'Faculty Meal Check-in' : 'Student Meal Check-in'}
        </h1>
        <p className="text-slate-600 font-semibold">Confirm your attendance for the <span className="text-emerald-600 uppercase font-black">{currentMealSlot}</span> slot.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="border-emerald-500/20 bg-white/90 shadow-2xl overflow-visible">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 rounded-2xl shadow-inner border border-emerald-100">
                  <CalendarIcon className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Today's Date</p>
                  <p className="text-xl font-black text-slate-900 leading-none mt-1">{today}</p>
                </div>
              </div>
              <div className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-tighter shadow-lg transition-all ${
                isSubmitted ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-900 text-white shadow-slate-900/20'
              }`}>
                {isSubmitted ? 'Response Logged' : `${currentMealSlot} slot Active`}
              </div>
            </div>

            <div className="bg-slate-50/50 rounded-[40px] p-10 border border-slate-100 shadow-inner relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <p className="text-center text-slate-400 font-black mb-8 uppercase tracking-[0.2em] text-xs">
                      Confirm presence for {currentMealSlot}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mb-10">
                      <button
                        onClick={() => handleAttendance('present')}
                        className={`flex-1 group relative p-8 rounded-[32px] border-2 transition-all duration-500 ${
                          status === 'present'
                            ? 'bg-emerald-600 border-transparent shadow-2xl shadow-emerald-600/30 scale-105'
                            : 'bg-white border-slate-100 hover:border-emerald-500/30'
                        }`}
                      >
                        <div className="relative z-10 flex flex-col items-center gap-4">
                          <CheckCircle className={`w-12 h-12 ${status === 'present' ? 'text-white' : 'text-emerald-500'}`} />
                          <span className={`text-xl font-black ${status === 'present' ? 'text-white' : 'text-slate-900'}`}>I'll be there</span>
                        </div>
                      </button>

                      <button
                        onClick={() => handleAttendance('absent')}
                        className={`flex-1 group relative p-8 rounded-[32px] border-2 transition-all duration-500 ${
                          status === 'absent'
                            ? 'bg-rose-600 border-transparent shadow-2xl shadow-rose-600/30 scale-105'
                            : 'bg-white border-slate-100 hover:border-rose-500/30'
                        }`}
                      >
                        <div className="relative z-10 flex flex-col items-center gap-4">
                          <XCircle className={`w-12 h-12 ${status === 'absent' ? 'text-white' : 'text-rose-500'}`} />
                          <span className={`text-xl font-black ${status === 'absent' ? 'text-white' : 'text-slate-900'}`}>Skip this meal</span>
                        </div>
                      </button>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={status === 'pending' || loading}
                      className={`w-full py-6 rounded-[32px] font-black text-white text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
                        status === 'pending' ? 'bg-slate-200 cursor-not-allowed shadow-none' :
                        loading ? 'bg-slate-800' : 'bg-slate-900 hover:bg-emerald-600 shadow-slate-900/20 hover:shadow-emerald-600/20'
                      }`}
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          Confirm for {currentMealSlot}
                        </>
                      )}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-10"
                  >
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner border border-emerald-200">
                       <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-2 text-center">Confirmed!</h3>
                    <p className="text-slate-500 font-bold text-center max-w-sm">
                      Your response for <span className="text-emerald-600 font-black">{currentMealSlot}</span> has been synced with the Mess Owner.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 text-emerald-600 font-black uppercase tracking-widest text-xs hover:underline"
                    >
                      Change Status
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="bg-white/90 border-white shadow-xl">
            <h3 className="font-black text-xl text-slate-800 mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-emerald-600" />
              Meal Slots
            </h3>
            <div className="space-y-3">
              {mealSlots.map((slot) => {
                const isActive = currentMealSlot === slot.id;
                return (
                  <div
                    key={slot.id}
                    className={`p-5 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-emerald-50 border-emerald-200 shadow-inner'
                        : 'bg-transparent border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                        <span className={`font-black text-sm ${isActive ? 'text-emerald-900' : 'text-slate-600'}`}>
                          {slot.name}
                        </span>
                      </div>
                      {isActive && (
                        <span className="text-[9px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-1 font-bold ${isActive ? 'text-emerald-800' : 'text-slate-500'}`}>
                      {slot.time}
                    </p>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <div className="p-8 rounded-[32px] bg-emerald-600 text-white shadow-2xl shadow-emerald-600/30 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="p-3 bg-white/20 rounded-2xl w-fit mb-5 backdrop-blur-md border border-white/20">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-black text-xl mb-3 tracking-tight">Eco Impact</h4>
              <p className="text-emerald-50 text-sm font-medium leading-relaxed font-bold">
                Confirming attendance helps us redirect edible surplus to our 12+ partner NGOs.
              </p>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
