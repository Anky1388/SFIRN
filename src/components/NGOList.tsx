import React from 'react';
import { MapPin, Phone, Mail, CheckCircle, XCircle, Search, Plus } from 'lucide-react';

export const NGOList: React.FC = () => {
  const ngos = [
    { id: '1', name: 'Annakshetra Foundation', contact: 'Rahul Sharma', phone: '+91 98765 43210', email: 'rahul@annakshetra.org', distance: '1.2km', active: true, capacity: '50kg' },
    { id: '2', name: 'Robin Hood Army', contact: 'Priya Verma', phone: '+91 87654 32109', email: 'delhi@robinhoodarmy.com', distance: '2.8km', active: true, capacity: '30kg' },
    { id: '3', name: 'Roti Bank Shelter', contact: 'Amit Patel', phone: '+91 76543 21098', email: 'info@rotibank.org', distance: '4.1km', active: true, capacity: '80kg' },
    { id: '4', name: 'City Night Shelter', contact: 'Suresh Kumar', phone: '+91 65432 10987', email: 'suresh@cityshelter.org', distance: '6.5km', active: false, capacity: '100kg' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">NGO Network</h1>
          <p className="text-gray-500">Manage and coordinate with local redistribution partners</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md">
          <Plus className="w-5 h-5" />
          Add New Partner
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search NGOs by name or location..."
          className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ngos.map((ngo) => (
          <div key={ngo.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-xl">
                  {ngo.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-emerald-600 transition-colors">{ngo.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    {ngo.distance} away
                  </div>
                </div>
              </div>
              {ngo.active ? (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase">
                  <CheckCircle className="w-3 h-3" />
                  Active
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-400 rounded-full text-xs font-bold uppercase">
                  <XCircle className="w-3 h-3" />
                  Inactive
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-emerald-50 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                {ngo.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-emerald-50 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                {ngo.email}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Capacity</p>
                <p className="font-bold text-gray-800">{ngo.capacity} per trip</p>
              </div>
              <div className="flex gap-2">
                 <button className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                   Settings
                 </button>
                 <button className="px-4 py-2 text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                   View History
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
