import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle, XCircle, Search, Plus, Map as MapIcon, List, Trash2, Navigation } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { NGOMap } from './NGOMap';
import { motion, AnimatePresence } from 'framer-motion';

interface NGO {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  distance: string;
  active: boolean;
  capacity: string;
  lat: number;
  lng: number;
}

export const NGOList: React.FC = () => {
  const [view, setView] = useState<'list' | 'map'>('map');
  const [ngos, setNgos] = useState<NGO[]>([
    { id: '1', name: 'Annakshetra Foundation', contact: 'Rahul Sharma', phone: '+91 98765 43210', email: 'rahul@annakshetra.org', distance: '1.2km', active: true, capacity: '50kg', lat: 28.6139, lng: 77.2090 },
    { id: '2', name: 'Robin Hood Army', contact: 'Priya Verma', phone: '+91 87654 32109', email: 'delhi@robinhoodarmy.com', distance: '2.8km', active: true, capacity: '30kg', lat: 28.6324, lng: 77.2187 },
    { id: '3', name: 'Roti Bank Shelter', contact: 'Amit Patel', phone: '+91 76543 21098', email: 'info@rotibank.org', distance: '4.1km', active: true, capacity: '80kg', lat: 28.6129, lng: 77.2295 },
    { id: '4', name: 'City Night Shelter', contact: 'Suresh Kumar', phone: '+91 65432 10987', email: 'suresh@cityshelter.org', distance: '6.5km', active: false, capacity: '100kg', lat: 28.6448, lng: 77.2167 },
  ]);

  const removeNGO = (id: string) => {
    setNgos(ngos.filter(ngo => ngo.id !== id));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-3">
            <MapIcon className="w-10 h-10 text-emerald-600" />
            NGO Network
          </h1>
          <p className="text-slate-500 font-medium">Coordinate redistribution with verified partners.</p>
        </div>

        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
          <button
            onClick={() => setView('map')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              view === 'map' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            Map View
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              view === 'list' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <List className="w-4 h-4" />
            List View
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'map' ? (
          <motion.div
            key="map"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="h-[650px] rounded-[40px] overflow-hidden border-8 border-white shadow-2xl relative"
          >
            <NGOMap />
            <div className="absolute top-6 left-6 z-[1000] space-y-3">
               <GlassCard className="py-3 px-5 border-none shadow-xl bg-slate-900/80 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">4 Active Partners Nearby</span>
                  </div>
               </GlassCard>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-6"
          >
            <div className="relative mb-8">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search NGOs by name, capacity, or location..."
                className="w-full pl-16 pr-6 py-5 bg-white rounded-[32px] border border-slate-100 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/20 outline-none transition-all font-bold text-slate-700"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ngos.map((ngo) => (
                <GlassCard key={ngo.id} className="bg-white border-slate-100 shadow-md group hover:shadow-xl transition-all duration-500">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl flex items-center justify-center text-emerald-600 font-black text-2xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                        {ngo.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-800 text-xl group-hover:text-emerald-600 transition-colors">{ngo.name}</h3>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
                          <MapPin className="w-3.5 h-3.5" />
                          {ngo.distance} away
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <button
                        onClick={() => removeNGO(ngo.id)}
                        className="p-3 bg-rose-50 text-rose-400 rounded-2xl hover:bg-rose-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
                       >
                         <Trash2 className="w-5 h-5" />
                       </button>
                       {ngo.active ? (
                        <span className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-tighter">
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-100 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-tighter">
                          <XCircle className="w-3 h-3" />
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/50 hover:bg-white transition-colors">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-emerald-500 transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-600">{ngo.phone}</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/50 hover:bg-white transition-colors">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-emerald-500 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-600">{ngo.email}</span>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Capacity</p>
                      <p className="font-black text-slate-800 text-lg">{ngo.capacity} <span className="text-xs font-bold text-slate-400">per trip</span></p>
                    </div>
                    <div className="flex gap-3">
                       <button className="px-6 py-3 text-xs font-black text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all uppercase tracking-widest">
                         Details
                       </button>
                       <button className="px-6 py-3 text-xs font-black text-emerald-600 bg-emerald-50 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all uppercase tracking-widest shadow-lg shadow-emerald-500/5">
                         History
                       </button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <button className="w-full mt-8 p-6 border-4 border-dashed border-slate-100 rounded-[40px] text-slate-400 hover:text-emerald-500 hover:border-emerald-500/20 hover:bg-emerald-50/10 transition-all flex flex-col items-center gap-3 group">
               <div className="p-4 bg-slate-50 rounded-full group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                  <Plus className="w-8 h-8" />
               </div>
               <span className="font-black text-lg">Add New NGO Partner</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
