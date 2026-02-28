import React from 'react';
import { KPICard } from './KPICard';
import { Leaf, Utensils, Award, AlertTriangle, TrendingDown } from 'lucide-react';
import { SurplusChart } from './SurplusChart';

export const Dashboard: React.FC = () => {
  // Mock data for initial UI
  const stats = {
    todaySurplus: 12.5,
    co2Avoided: 31.25,
    mealsServed: 35,
    sustainabilityScore: 84,
    grade: 'Gold'
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Operational Dashboard</h1>
          <p className="text-gray-500">Real-time impact and surplus monitoring</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-sm font-medium text-gray-600">System Live</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Today's Surplus"
          value={stats.todaySurplus}
          unit="kg"
          icon={AlertTriangle}
          color="bg-amber-100"
          description="Total edible food available"
        />
        <KPICard
          title="CO2 Avoided"
          value={stats.co2Avoided}
          unit="kg"
          icon={Leaf}
          color="bg-emerald-100"
          description="Emissions prevented today"
        />
        <KPICard
          title="Meals Served"
          value={stats.mealsServed}
          unit="portions"
          icon={Utensils}
          color="bg-blue-100"
          description="Estimated people fed"
        />
        <KPICard
          title="Sustainability Score"
          value={stats.sustainabilityScore}
          unit="/ 100"
          icon={Award}
          color="bg-purple-100"
          description={`Grade: ${stats.grade}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 h-[450px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800">Surplus Trend (Last 7 Days)</h3>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Redistributed
                </span>
                <span className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div> Surplus
                </span>
              </div>
            </div>
            <div className="flex-1">
               <SurplusChart />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6">Prediction for Tomorrow</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                 { meal: 'Breakfast', pred: '8.2kg', action: 'Standard' },
                 { meal: 'Lunch', pred: '19.5kg', action: 'Reduce Dal 15%' },
                 { meal: 'Dinner', pred: '11.3kg', action: 'Standard' }
               ].map((item, idx) => (
                 <div key={idx} className="p-4 rounded-xl border border-gray-50 bg-gray-50/50">
                    <p className="text-xs font-semibold text-gray-400 uppercase">{item.meal}</p>
                    <p className="text-xl font-bold text-emerald-600 mt-1">{item.pred}</p>
                    <p className="text-xs text-gray-500 mt-2">Action: <span className="text-gray-700 font-medium">{item.action}</span></p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6">Active NGO Alerts</h3>
            <div className="space-y-4">
               {[
                 { ngo: 'Annakshetra Foundation', dist: '1.2km', qty: '12kg', status: 'Pending' },
                 { ngo: 'Robin Hood Army', dist: '2.8km', qty: '5kg', status: 'Confirmed' }
               ].map((alert, idx) => (
                 <div key={idx} className="flex flex-col p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800 text-sm">{alert.ngo}</h4>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        alert.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                      }`}>{alert.status}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Distance: {alert.dist}</span>
                      <span>Quantity: {alert.qty}</span>
                    </div>
                 </div>
               ))}
               <button className="w-full py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                 View All Alerts
               </button>
            </div>
          </div>

          <div className="bg-emerald-600 rounded-xl p-6 text-white overflow-hidden relative">
             <div className="relative z-10">
               <h3 className="font-bold text-lg mb-2">Sustainability Tip</h3>
               <p className="text-emerald-100 text-sm mb-4 leading-relaxed">
                 Reducing your surplus by just 5% this week could save enough water to fill an Olympic swimming pool.
               </p>
               <button className="bg-white text-emerald-600 px-4 py-2 rounded-lg text-sm font-bold">
                 View Insights
               </button>
             </div>
             <TrendingDown className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
};
