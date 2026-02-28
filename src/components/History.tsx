import React from 'react';
import { History as HistoryIcon, Download, Filter, ChevronRight } from 'lucide-react';

export const History: React.FC = () => {
  const historyData = [
    { date: '2024-03-20', meal: 'Lunch', attendance: 342, surplus: '12.5kg', redistributed: '10.0kg', status: 'Completed' },
    { date: '2024-03-20', meal: 'Breakfast', attendance: 290, surplus: '4.2kg', redistributed: '0.0kg', status: 'Wasted' },
    { date: '2024-03-19', meal: 'Dinner', attendance: 315, surplus: '15.8kg', redistributed: '15.8kg', status: 'Completed' },
    { date: '2024-03-19', meal: 'Lunch', attendance: 350, surplus: '18.2kg', redistributed: '15.0kg', status: 'Completed' },
    { date: '2024-03-18', meal: 'Dinner', attendance: 320, surplus: '9.5kg', redistributed: '8.0kg', status: 'Completed' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Historical Data</h1>
          <p className="text-gray-500">View and export past meal and redistribution logs</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Meal</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Attendance</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Surplus Generated</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Redistributed</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {historyData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{row.date}</span>
                    <span className="text-xs text-gray-500">{row.meal}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{row.attendance}</td>
                <td className="px-6 py-4 text-sm font-bold text-red-500">{row.surplus}</td>
                <td className="px-6 py-4 text-sm font-bold text-emerald-600">{row.redistributed}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    row.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-300 group-hover:text-emerald-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
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
