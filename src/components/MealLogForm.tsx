import React, { useState } from 'react';
import { Utensils, Calendar, Clock, Weight, Scale, CheckCircle2, AlertTriangle, Leaf } from 'lucide-react';
import { MealType } from '../types';
import { calculateCO2, calculateMeals } from '../lib/utils';

export const MealLogForm: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [preparedKg, setPreparedKg] = useState<number>(0);
  const [leftoverKg, setLeftoverKg] = useState<number>(0);
  const [isEdible, setIsEdible] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState(false);

  const surplusKg = leftoverKg;
  const co2Avoided = calculateCO2(surplusKg);
  const mealsEquivalent = calculateMeals(surplusKg);
  const wastePct = preparedKg > 0 ? (leftoverKg / preparedKg) * 100 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging meal data:', { date, mealType, preparedKg, leftoverKg, isEdible, surplusKg, co2Avoided, mealsEquivalent, wastePct });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Meal Preparation & Leftover Log</h1>
        <p className="text-gray-500">Log daily food production to track impact and trigger redistribution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Meal Type
                  </label>
                  <select
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value as MealType)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Weight className="w-4 h-4 text-emerald-600" />
                    Prepared Food (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    min="0"
                    placeholder="Total kg cooked"
                    value={preparedKg || ''}
                    onChange={(e) => setPreparedKg(parseFloat(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-emerald-600" />
                    Leftover Food (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    min="0"
                    placeholder="Total kg remaining"
                    value={leftoverKg || ''}
                    onChange={(e) => setLeftoverKg(parseFloat(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <input
                  type="checkbox"
                  id="edible"
                  checked={isEdible}
                  onChange={(e) => setIsEdible(e.target.checked)}
                  className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
                />
                <label htmlFor="edible" className="text-sm font-bold text-emerald-800">
                  This leftover food is edible and safe for consumption
                </label>
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                  submitted ? 'bg-emerald-500' : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Meal Log Saved
                  </>
                ) : (
                  'Submit Daily Log'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6">Real-time Impact</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                     <Leaf className="w-4 h-4" />
                   </div>
                   <span className="text-sm font-medium text-gray-500">CO2 Savings</span>
                 </div>
                 <span className="text-lg font-bold text-gray-800">{co2Avoided.toFixed(1)} kg</span>
               </div>

               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                     <Utensils className="w-4 h-4" />
                   </div>
                   <span className="text-sm font-medium text-gray-500">Meals Served</span>
                 </div>
                 <span className="text-lg font-bold text-gray-800">~{mealsEquivalent}</span>
               </div>

               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                     <AlertTriangle className="w-4 h-4" />
                   </div>
                   <span className="text-sm font-medium text-gray-500">Waste Rate</span>
                 </div>
                 <span className={`text-lg font-bold ${wastePct > 15 ? 'text-red-500' : 'text-emerald-500'}`}>
                   {wastePct.toFixed(1)}%
                 </span>
               </div>
            </div>
          </div>

          {surplusKg >= 5 && isEdible && (
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl animate-pulse">
               <div className="flex items-center gap-3 text-amber-800 font-bold mb-2">
                 <AlertTriangle className="w-5 h-5" />
                 NGO Alert Triggered!
               </div>
               <p className="text-sm text-amber-700 leading-relaxed">
                 A surplus of {surplusKg}kg has been detected. Redistribution alerts will be sent to the 3 nearest NGOs in your network.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
