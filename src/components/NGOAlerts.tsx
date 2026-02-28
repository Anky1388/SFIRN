import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, MapPin, Clock, Utensils, CheckCircle2, Navigation, Info, AlertTriangle } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const NGOAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState([
    { id: '1', institution: 'BITS Pilani Mess-1', qty: '12.5kg', items: 'Dal, Rice, Roti', distance: '1.2km', expiry: '2h 15m', status: 'pending' },
    { id: '2', institution: 'IIT Delhi Hostel-C', qty: '8.2kg', items: 'Paneer Gravy, Mix Veg', distance: '2.8km', expiry: '1h 45m', status: 'pending' },
    { id: '3', institution: 'Hotel Taj Palace', qty: '15.0kg', items: 'Biryani, Salads', distance: '4.5km', expiry: '3h 30m', status: 'confirmed' },
  ]);

  const confirmPickup = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, status: 'confirmed' } : alert
    ));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-3">
            <Bell className="w-10 h-10 text-rose-500 animate-swing" />
            Surplus Food Alerts
          </h1>
          <p className="text-slate-500 font-medium font-bold">Real-time redistribution requests from nearby institutions.</p>
        </div>
        <div className="px-5 py-2.5 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
           <span className="text-xs font-black uppercase tracking-widest">3 New Requests</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative group ${alert.status === 'confirmed' ? 'opacity-70' : ''}`}
            >
              <GlassCard className={`border-slate-100 shadow-xl overflow-hidden ${alert.status === 'confirmed' ? 'bg-emerald-50/50' : 'bg-white'}`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${alert.status === 'confirmed' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
                      <Utensils className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 text-lg">{alert.institution}</h3>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {alert.distance} away
                      </p>
                    </div>
                  </div>
                  {alert.status === 'pending' && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-[10px] font-black uppercase">
                       <Clock className="w-3 h-3" />
                       {alert.expiry}
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                   <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Quantity Available</span>
                      <span className="text-xl font-black text-slate-800">{alert.qty}</span>
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {alert.items.split(', ').map(item => (
                       <span key={item} className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-bold text-slate-600 shadow-sm">
                         {item}
                       </span>
                     ))}
                   </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                    <Navigation className="w-4 h-4" />
                    Location
                  </button>
                  {alert.status === 'pending' ? (
                    <button
                      onClick={() => confirmPickup(alert.id)}
                      className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                      Confirm Pickup
                    </button>
                  ) : (
                    <button className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 cursor-default">
                      <CheckCircle2 className="w-4 h-4" />
                      Confirmed
                    </button>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-10 p-6 bg-amber-50 rounded-3xl border border-amber-200 flex items-center gap-6">
         <div className="p-4 bg-white rounded-2xl shadow-sm text-amber-600">
            <AlertTriangle className="w-8 h-8" />
         </div>
         <div>
            <h4 className="font-black text-amber-800 text-lg">Hygiene Note</h4>
            <p className="text-amber-700 text-sm font-medium">All food listed here has been verified as "Edible" by the institution staff. Ensure pickup within the listed expiry time for safety.</p>
         </div>
      </div>
    </div>
  );
};
