import React, { useState } from 'react';
import { Users, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { MealType } from '../types';

export const AttendanceForm: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [count, setCount] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging attendance:', { date, mealType, count });
    // In a real app, this would call an API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Attendance Data Collection</h1>
        <p className="text-gray-500">Log student/staff headcount for accurate predictions</p>
      </div>

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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              Attendance Count
            </label>
            <input
              type="number"
              required
              min="1"
              placeholder="Enter number of people"
              value={count || ''}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
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
                Data Logged Successfully
              </>
            ) : (
              'Save Attendance Log'
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-4">
           <div className="p-2 bg-blue-100 rounded-lg h-fit text-blue-600">
              <Users className="w-5 h-5" />
           </div>
           <div>
              <p className="text-xs font-bold text-blue-800 uppercase">Avg Attendance</p>
              <p className="text-lg font-bold text-blue-900">342</p>
              <p className="text-xs text-blue-600">Last 7 days</p>
           </div>
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-4">
           <div className="p-2 bg-amber-100 rounded-lg h-fit text-amber-600">
              <Calendar className="w-5 h-5" />
           </div>
           <div>
              <p className="text-xs font-bold text-amber-800 uppercase">Consistency</p>
              <p className="text-lg font-bold text-amber-900">98%</p>
              <p className="text-xs text-amber-600">Reporting rate</p>
           </div>
        </div>
      </div>
    </div>
  );
};
