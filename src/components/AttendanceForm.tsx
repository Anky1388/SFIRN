import React, { useState, useEffect } from 'react';
import { Users, Calendar, Clock, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
import { MealType } from '../types';
import { GlassCard } from './GlassCard';
import { MEAL_SCHEDULE } from '../lib/utils';

export const AttendanceForm: React.FC = () => {
  const [syncedLogs, setSyncedLogs] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<MealType>('lunch');

  // Real-time synchronization logic
  useEffect(() => {
    const loadLogs = () => {
      const saved = localStorage.getItem('sfirn_attendance_sync');
      if (saved) {
        setSyncedLogs(JSON.parse(saved).reverse());
      }
    };

    loadLogs();
    window.addEventListener('storage', loadLogs);
    return () => window.removeEventListener('storage', loadLogs);
  }, []);

  // Calculate real-time counts for the selected slot
  const currentSlotLogs = syncedLogs.filter(log =>
    log.mealSlot === selectedSlot &&
    new Date(log.timestamp).toDateString() === new Date().toDateString()
  );

  const stats = {
    totalPresent: currentSlotLogs.filter(l => l.status === 'present').length,
    totalAbsent: currentSlotLogs.filter(l => l.status === 'absent').length,
    lastUpdate: currentSlotLogs.length > 0 ? new Date(currentSlotLogs[0].timestamp).toLocaleTimeString() : 'No data'
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2 flex items-center gap-3">
            <UserCheck className="w-10 h-10 text-emerald-600" />
            Attendance Intelligence
          </h1>
          <p className="text-slate-500 font-bold">Real-time synchronization with student & faculty meal check-ins.</p>
        </div>
        <div className="px-6 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-xl flex items-center gap-3">
           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Live Sync Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <GlassCard className="bg-emerald-600 text-white border-none shadow-emerald-600/20">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-60">Total Opt-ins</p>
           <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black">{stats.totalPresent}</h2>
              <span className="text-sm font-bold opacity-80">Students</span>
           </div>
           <p className="text-xs font-bold mt-4 text-emerald-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Ready for {selectedSlot}
           </p>
        </GlassCard>

        <GlassCard className="bg-slate-900 text-white border-none shadow-2xl">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-40">Total Opt-outs</p>
           <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black">{stats.totalAbsent}</h2>
              <span className="text-sm font-bold opacity-60">Skipping</span>
           </div>
           <p className="text-xs font-bold mt-4 text-slate-400">Decision helps reduce surplus</p>
        </GlassCard>

        <GlassCard className="bg-white border-white shadow-xl flex flex-col justify-center">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Sync Status</p>
           <p className="text-lg font-black text-slate-800">Last update at {stats.lastUpdate}</p>
           <div className="mt-4 flex gap-2">
              {(['breakfast', 'lunch', 'snacks', 'dinner'] as MealType[]).map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${
                    selectedSlot === slot ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {slot[0]}
                </button>
              ))}
           </div>
        </GlassCard>
      </div>

      <GlassCard className="bg-white/90 border-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
           <h3 className="font-black text-2xl text-slate-900">Real-time Check-in Log</h3>
           <div className="flex gap-2">
              <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase">{currentSlotLogs.length} Responses Today</span>
           </div>
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto no-scrollbar pr-2">
          {currentSlotLogs.length > 0 ? currentSlotLogs.map((log, idx) => (
            <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 rounded-[24px] border border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
               <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-lg ${
                    log.status === 'present' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}>
                    {log.status === 'present' ? <CheckCircle2 className="w-6 h-6" /> : <Users className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-lg">
                      {log.role.replace('_', ' ').toUpperCase()} • {log.status === 'present' ? 'Will Attend' : 'Will Skip'}
                    </p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(log.timestamp).toLocaleTimeString()}</p>
                  </div>
               </div>
               <button className="p-3 text-slate-200 group-hover:text-emerald-600 transition-colors">
                  <ChevronRight className="w-6 h-6" />
               </button>
            </div>
          )) : (
            <div className="text-center py-20 flex flex-col items-center gap-4 text-slate-300">
               <Users className="w-16 h-16 opacity-20" />
               <p className="font-black uppercase tracking-widest text-sm">No live responses for {selectedSlot} yet.</p>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};
