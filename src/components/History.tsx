import React, { useState } from 'react';
import { History as HistoryIcon, Download, Filter, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const History: React.FC = () => {
  const [exporting, setExporting] = useState(false);

  const historyData = [
    { date: '2024-03-20', meal: 'Lunch', attendance: 342, surplus: '12.5kg', redistributed: '10.0kg', status: 'Completed' },
    { date: '2024-03-20', meal: 'Breakfast', attendance: 290, surplus: '4.2kg', redistributed: '0.0kg', status: 'Wasted' },
    { date: '2024-03-19', meal: 'Dinner', attendance: 315, surplus: '15.8kg', redistributed: '15.8kg', status: 'Completed' },
    { date: '2024-03-19', meal: 'Lunch', attendance: 350, surplus: '18.2kg', redistributed: '15.0kg', status: 'Completed' },
    { date: '2024-03-18', meal: 'Dinner', attendance: 320, surplus: '9.5kg', redistributed: '8.0kg', status: 'Completed' },
  ];

  const handleExport = () => {
    setExporting(true);

    // Logic to export CSV
    const headers = "Date,Meal,Attendance,Surplus,Redistributed,Status\n";
    const csvContent = historyData.map(row =>
      `${row.date},${row.meal},${row.attendance},${row.surplus},${row.redistributed},${row.status}`
    ).join("\n");

    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `sfirn_history_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => setExporting(false), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-3">
            <HistoryIcon className="w-10 h-10 text-emerald-600" />
            Impact History
          </h1>
          <p className="text-slate-500 font-medium">Analyze and download past redistribution and surplus logs.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-5 h-5" />
            Filter
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-white transition-all shadow-lg overflow-hidden relative group ${
              exporting ? 'bg-emerald-500' : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            <AnimatePresence mode="wait">
              {exporting ? (
                <motion.div
                  key="done"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Downloaded
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  Export CSV
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date & Meal</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Attendance</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Surplus Generated</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Redistributed</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {historyData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="font-black text-slate-800">{row.date}</span>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{row.meal}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-slate-600">{row.attendance}</td>
                <td className="px-8 py-6 text-sm font-black text-rose-500">{row.surplus}</td>
                <td className="px-8 py-6 text-sm font-black text-emerald-600">{row.redistributed}</td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm ${
                    row.status === 'Completed'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-slate-200 group-hover:text-emerald-500 transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
