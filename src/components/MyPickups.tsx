import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, CheckCircle2, Navigation, Clock, Utensils, Calendar } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const MyPickups: React.FC = () => {
  const pickups = [
    { id: '1', institution: 'BITS Pilani Mess-1', qty: '12.5kg', time: '12:45 PM', date: 'Today', status: 'In Transit' },
    { id: '2', institution: 'Hotel Taj Palace', qty: '15.0kg', time: '10:30 AM', date: 'Today', status: 'Completed' },
    { id: '3', institution: 'IIT Delhi Hostel-C', qty: '8.2kg', time: 'Yesterday', date: 'March 20', status: 'Completed' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-3">
            <ClipboardList className="w-10 h-10 text-emerald-600" />
            My Pickups
          </h1>
          <p className="text-slate-500 font-medium font-bold">Manage and track your active and past food collections.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-all">
          <Calendar className="w-5 h-5" />
          Schedule Pickup
        </button>
      </div>

      <div className="space-y-4">
        {pickups.map((pickup, idx) => (
          <GlassCard key={pickup.id} className="bg-white border-slate-100 shadow-xl overflow-visible hover:shadow-2xl transition-all duration-500 group">
             <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6 flex-1">
                   <div className={`p-4 rounded-2xl ${pickup.status === 'In Transit' ? 'bg-blue-500 text-white animate-pulse' : 'bg-emerald-500 text-white'}`}>
                      <Utensils className="w-8 h-8" />
                   </div>
                   <div>
                      <h3 className="font-black text-slate-800 text-xl">{pickup.institution}</h3>
                      <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        {pickup.date} • {pickup.time}
                      </p>
                   </div>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto">
                   <div className="text-center px-6 border-x border-slate-100 hidden sm:block">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Quantity</p>
                      <p className="text-lg font-black text-slate-800">{pickup.qty}</p>
                   </div>

                   <div className="flex items-center gap-3 flex-1 md:flex-none justify-end">
                      <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        pickup.status === 'In Transit' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        {pickup.status}
                      </span>
                      {pickup.status === 'In Transit' ? (
                        <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-slate-900/10">
                           <Navigation className="w-5 h-5" />
                        </button>
                      ) : (
                        <div className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/10">
                           <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
