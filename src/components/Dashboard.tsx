import React from 'react';
import { KPICard } from './KPICard';
import { Leaf, Utensils, Award, AlertTriangle, TrendingDown, Users, Heart, GraduationCap, Shield, BookOpen } from 'lucide-react';
import { SurplusChart } from './SurplusChart';
import { GlassCard } from './GlassCard';

interface DashboardProps {
  onViewInsights: () => void;
  userRole: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ onViewInsights, userRole }) => {
  // Logic to get role-specific content and stats
  const getRoleData = () => {
    switch(userRole) {
      case 'mess_owner':
        return {
          title: "Mess Operations Center",
          description: "Real-time tracking of food production and surplus.",
          stats: [
            { title: "Today's Surplus", value: "12.5", unit: "kg", icon: AlertTriangle, color: "bg-amber-100" },
            { title: "Waste Percentage", value: "8.2", unit: "%", icon: TrendingDown, color: "bg-rose-100" },
            { title: "Redistributed", value: "10.0", unit: "kg", icon: Utensils, color: "bg-emerald-100" },
            { title: "Eco Score", value: "84", unit: "/100", icon: Award, color: "bg-purple-100" }
          ]
        };
      case 'ngo_rep':
        return {
          title: "NGO Impact Hub",
          description: "Manage your food pickups and community reach.",
          stats: [
            { title: "Total Received", value: "450", unit: "kg", icon: Heart, color: "bg-rose-100" },
            { title: "Meals Provided", value: "1,285", unit: "portions", icon: Utensils, color: "bg-blue-100" },
            { title: "Active Alerts", value: "3", unit: "pending", icon: AlertTriangle, color: "bg-amber-100" },
            { title: "CO2 Avoided", value: "1.1", unit: "tons", icon: Leaf, color: "bg-emerald-100" }
          ]
        };
      case 'student':
      case 'teacher':
        return {
          title: userRole === 'teacher' ? "Faculty Impact Portal" : "Student Sustainability Portal",
          description: "See how your individual choices save food.",
          stats: [
            { title: "Personal Savings", value: "4.2", unit: "kg", icon: Leaf, color: "bg-emerald-100" },
            { title: "Check-in Rate", value: "95", unit: "%", icon: GraduationCap, color: "bg-blue-100" },
            { title: "Meals Saved", value: "12", unit: "portions", icon: Utensils, color: "bg-amber-100" },
            { title: "Green Points", value: "240", unit: "pts", icon: Award, color: "bg-purple-100" }
          ]
        };
      case 'admin':
        return {
          title: "Global Network Admin",
          description: "High-level overview of the entire redistribution network.",
          stats: [
            { title: "Total Network Surplus", value: "2.4", unit: "tons", icon: Globe, color: "bg-indigo-100" },
            { title: "Total CO2 Saved", value: "6.0", unit: "tons", icon: Leaf, color: "bg-emerald-100" },
            { title: "Active Mess Units", value: "12", unit: "units", icon: Utensils, color: "bg-amber-100" },
            { title: "Partner NGOs", value: "45", unit: "orgs", icon: Heart, color: "bg-rose-100" }
          ]
        };
      default:
        return {
          title: "Operational Dashboard",
          description: "Real-time impact monitoring",
          stats: []
        };
    }
  };

  const roleData = getRoleData();
  const showNGOAlerts = ['admin', 'mess_owner', 'ngo_rep'].includes(userRole);

  return (
    <div className="p-8">
      {/* Role-Specific Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-xl text-white ${
              userRole === 'mess_owner' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' :
              userRole === 'ngo_rep' ? 'bg-rose-500 shadow-lg shadow-rose-500/20' :
              userRole === 'admin' ? 'bg-indigo-500 shadow-lg shadow-indigo-500/20' :
              'bg-blue-500 shadow-lg shadow-blue-500/20'
            }`}>
              {userRole === 'mess_owner' ? <Utensils className="w-5 h-5" /> :
               userRole === 'ngo_rep' ? <Heart className="w-5 h-5" /> :
               userRole === 'admin' ? <Shield className="w-5 h-5" /> :
               userRole === 'teacher' ? <BookOpen className="w-5 h-5" /> :
               <GraduationCap className="w-5 h-5" />}
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{roleData.title}</h1>
          </div>
          <p className="text-slate-500 font-bold ml-12">{roleData.description}</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white shadow-xl flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
            {userRole.replace('_', ' ')} Verified
          </span>
        </div>
      </div>

      {/* Role-Specific KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {roleData.stats.map((s, idx) => (
          <KPICard
            key={idx}
            title={s.title}
            value={s.value}
            unit={s.unit}
            icon={s.icon}
            color={s.color}
            description={`Real-time ${s.title.toLowerCase()}`}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`${showNGOAlerts ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-8`}>
          {/* Main Contextual Chart */}
          <GlassCard className="bg-white border-white shadow-2xl h-[450px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-2xl text-slate-800">
                {userRole === 'ngo_rep' ? 'Pickup Trends' :
                 (userRole === 'student' || userRole === 'teacher') ? 'My Sustainability Journey' :
                 'Surplus & Redistribution Trend'}
              </h3>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  {userRole === 'ngo_rep' ? 'Received' : 'Redistributed'}
                </span>
                <span className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Surplus
                </span>
              </div>
            </div>
            <div className="flex-1">
               <SurplusChart />
            </div>
          </GlassCard>

          {/* Role-Specific Suggestions/Predictions */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl">
            <h3 className="font-black text-2xl text-slate-800 mb-8 flex items-center gap-3">
              {userRole === 'mess_owner' ? 'Tomorrow\'s Cooking Advice' :
               userRole === 'ngo_rep' ? 'Priority Pickup Slots' :
               'Your Contribution Goal'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {(userRole === 'mess_owner' || userRole === 'admin' ? [
                 { label: 'Breakfast', val: '8.2kg', sub: 'Standard' },
                 { label: 'Lunch', val: '19.5kg', sub: 'Reduce Dal 15%' },
                 { label: 'Dinner', val: '11.3kg', sub: 'Standard' }
               ] : userRole === 'ngo_rep' ? [
                 { label: 'Early Slot', val: '12:45 PM', sub: 'Mess-1 (12kg)' },
                 { label: 'Mid Slot', val: '02:30 PM', sub: 'Hotel-A (15kg)' },
                 { label: 'Late Slot', val: '08:15 PM', sub: 'Hostel-C (8kg)' }
               ] : [
                 { label: 'Current Streak', val: '12 Days', sub: 'Top 5%' },
                 { label: 'Next Reward', val: '300 pts', sub: 'Eco-Warrior Badge' },
                 { label: 'Goal Today', val: 'Check-in', sub: 'Save 350g' }
               ]).map((item, idx) => (
                 <div key={idx} className="p-6 rounded-3xl border border-slate-50 bg-slate-50/50 hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-600">{item.label}</p>
                    <p className="text-2xl font-black text-slate-800 mt-2 group-hover:scale-110 origin-left transition-transform">{item.val}</p>
                    <p className="text-xs font-bold text-slate-500 mt-3">{item.sub}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {showNGOAlerts && (
          <div className="space-y-8">
            <GlassCard className="bg-white border-white shadow-2xl">
              <h3 className="font-black text-xl text-slate-800 mb-8 flex items-center gap-3">
                <Bell className="w-6 h-6 text-rose-500 animate-bounce" />
                {userRole === 'ngo_rep' ? 'Incoming Alerts' : 'Active NGO Alerts'}
              </h3>
              <div className="space-y-6">
                 {[
                   { ngo: 'Annakshetra Foundation', dist: '1.2km', qty: '12kg', status: 'Pending' },
                   { ngo: 'Robin Hood Army', dist: '2.8km', qty: '5kg', status: 'Confirmed' }
                 ].map((alert, idx) => (
                   <div key={idx} className="flex flex-col p-5 rounded-3xl border border-slate-50 bg-slate-50/30 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-black text-slate-800 text-sm">{alert.ngo}</h4>
                        <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                          alert.status === 'Confirmed' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                        }`}>{alert.status}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span>{alert.dist} away</span>
                        <span>Qty: {alert.qty}</span>
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-3 text-xs font-black text-emerald-600 hover:text-emerald-500 transition-colors uppercase tracking-widest border-t border-slate-50 mt-4">
                   View Full Feed
                 </button>
              </div>
            </GlassCard>

            <div className="bg-slate-900 rounded-[40px] p-8 text-white overflow-hidden relative group shadow-2xl shadow-slate-900/40">
               <div className="relative z-10">
                 <h3 className="font-black text-xl mb-3">Sustainability Tip</h3>
                 <p className="text-slate-400 text-sm font-bold mb-6 leading-relaxed">
                   {userRole === 'ngo_rep' ?
                     "Optimizing your pickup routes can save up to 15% in fuel costs." :
                     "Reducing your surplus by just 5% this week could save enough water to fill an Olympic swimming pool."}
                 </p>
                 <button
                   onClick={onViewInsights}
                   className="bg-emerald-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-600/30 hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all"
                 >
                   View Impact Report
                 </button>
               </div>
               <TrendingDown className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 group-hover:text-white/10 transition-colors" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Dummy icon for Admin stats
const Globe = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

const Bell = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
