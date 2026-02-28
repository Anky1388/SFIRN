import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  color: string;
  description?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, unit, icon: Icon, color, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        {unit && <span className="text-sm font-medium text-gray-500">{unit}</span>}
      </div>
      {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
    </div>
  );
};
