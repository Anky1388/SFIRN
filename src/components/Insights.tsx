import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, PieChart, BarChart2, Droplets, Wind, Globe, ArrowLeft, Leaf, Download, CheckCircle2, Loader2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { SurplusChart } from './SurplusChart';

interface InsightsProps {
  onBack: () => void;
}

export const Insights: React.FC<InsightsProps> = ({ onBack }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleGeneratePDF = () => {
    setIsGenerating(true);

    // Simulate complex PDF generation logic
    setTimeout(() => {
      const content = `
        SFIRN SUSTAINABILITY REPORT - MARCH 2024
        ---------------------------------------
        Institution: Central Campus Mess
        Total Food Redistributed: 150kg
        Meals Served: 428
        CO2 Emissions Avoided: 375kg
        Water Saved: 12,450 Liters
        Methane Reduction: 42.8kg
        ---------------------------------------
        Status: VERIFIED BY SFIRN AI
      `;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SFIRN_Impact_Report_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setIsGenerating(false);
      setIsDone(true);
      setTimeout(() => setIsDone(false), 3000);
    }, 2500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Environmental Insights</h1>
          <p className="text-slate-500 font-medium font-bold">Deep dive into your sustainability metrics and social impact.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Detailed Impact Metrics */}
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="bg-white border-white shadow-xl overflow-visible">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-2xl text-slate-800">Surplus Efficiency</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase">Real-time Data</span>
              </div>
            </div>
            <div className="h-[400px]">
              <SurplusChart />
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="bg-slate-900 text-white border-none shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-black text-lg">Water Savings</h4>
              </div>
              <p className="text-4xl font-black mb-2">12,450 <span className="text-lg text-emerald-400">Liters</span></p>
              <p className="text-slate-400 text-sm leading-relaxed font-bold">
                By redistributing 150kg of food this month, you've saved the equivalent of 62 standard bathtubs of water used in production.
              </p>
            </GlassCard>

            <GlassCard className="bg-slate-900 text-white border-none shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/20">
                  <Wind className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-black text-lg">Methane Reduction</h4>
              </div>
              <p className="text-4xl font-black mb-2">42.8 <span className="text-lg text-blue-400">kg CH4</span></p>
              <p className="text-slate-400 text-sm leading-relaxed font-bold">
                Prevented from being released into the atmosphere by keeping edible food out of landfills.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Right: Social & Sustainability Summary */}
        <div className="space-y-8">
          <GlassCard className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-none shadow-2xl shadow-emerald-500/20">
            <div className="flex flex-col items-center text-center py-6">
               <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 mb-6 animate-bounce">
                  <Globe className="w-12 h-12" />
               </div>
               <h3 className="font-black text-2xl mb-2">Global Impact</h3>
               <p className="text-emerald-50 text-sm font-medium leading-relaxed px-4 font-bold">
                 Your institution is in the <span className="underline italic text-white">top 5%</span> of surplus redistributors in the region.
               </p>
            </div>
          </GlassCard>

          <GlassCard className="bg-white border-slate-100 shadow-xl">
             <h3 className="font-black text-lg text-slate-800 mb-6 flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-emerald-600" />
               Impact Milestones
             </h3>
             <div className="space-y-6">
                {[
                  { label: '500 Meals Served', progress: 85, icon: Leaf },
                  { label: '1 Ton CO2 Saved', progress: 42, icon: Wind },
                  { label: 'NGO Reach: 20+', progress: 60, icon: Globe },
                ].map((m, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                      <span className="flex items-center gap-2"><m.icon className="w-3 h-3" />{m.label}</span>
                      <span>{m.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${m.progress}%` }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
             </div>
          </GlassCard>

          <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 flex flex-col items-center text-center shadow-inner relative overflow-hidden group">
             <PieChart className="w-12 h-12 text-slate-300 mb-4 group-hover:scale-110 transition-transform duration-500" />
             <h4 className="font-black text-slate-800 text-lg mb-1">Impact Report</h4>
             <p className="text-slate-400 text-xs font-bold mb-6">Download your verified sustainability certificate for this month.</p>

             <button
               onClick={handleGeneratePDF}
               disabled={isGenerating}
               className={`w-full py-5 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl ${
                 isDone ? 'bg-emerald-500 text-white shadow-emerald-500/20' :
                 isGenerating ? 'bg-slate-800 text-white' : 'bg-slate-900 text-white hover:bg-emerald-600 hover:shadow-emerald-600/20'
               }`}
             >
               <AnimatePresence mode="wait">
                 {isGenerating ? (
                   <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                     <Loader2 className="w-5 h-5 animate-spin" /> Processing
                   </motion.div>
                 ) : isDone ? (
                   <motion.div key="done" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2">
                     <CheckCircle2 className="w-5 h-5" /> Downloaded
                   </motion.div>
                 ) : (
                   <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                     <Download className="w-5 h-5" /> Generate PDF
                   </motion.div>
                 )}
               </AnimatePresence>
             </button>
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
