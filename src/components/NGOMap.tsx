import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { GlassCard } from './GlassCard';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';

// Custom 3D-styled marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Location pin icon
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

interface NGO {
  id: string;
  name: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  address: string;
  capacity: string;
}

const ngos: NGO[] = [
  { id: '1', name: 'Annakshetra Foundation', lat: 28.6139, lng: 77.2090, phone: '+91 98765 43210', email: 'rahul@annakshetra.org', address: 'Delhi Gate, New Delhi', capacity: '50kg' },
  { id: '2', name: 'Robin Hood Army', lat: 28.6324, lng: 77.2187, phone: '+91 87654 32109', email: 'delhi@robinhoodarmy.com', address: 'Connaught Place, New Delhi', capacity: '30kg' },
  { id: '3', name: 'Roti Bank Shelter', lat: 28.6129, lng: 77.2295, phone: '+91 76543 21098', email: 'info@rotibank.org', address: 'India Gate, New Delhi', capacity: '80kg' },
];

export const NGOMap: React.FC = () => {
  const center: [number, number] = [28.6139, 77.2090]; // Delhi center

  return (
    <div className="h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative">
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {ngos.map((ngo) => (
          <Marker key={ngo.id} position={[ngo.lat, ngo.lng]} icon={customIcon}>
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <h3 className="font-black text-slate-800 text-base mb-2">{ngo.name}</h3>
                <div className="space-y-1.5 mb-4">
                  <p className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Phone className="w-3 h-3 text-emerald-500" /> {ngo.phone}
                  </p>
                  <p className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Mail className="w-3 h-3 text-emerald-500" /> {ngo.email}
                  </p>
                  <p className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <MapPin className="w-3 h-3 text-emerald-500" /> {ngo.address}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase">Capacity</p>
                      <p className="text-xs font-black text-slate-800">{ngo.capacity}</p>
                   </div>
                   <button className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20">
                      <Navigation className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Info Card */}
      <div className="absolute bottom-6 right-6 z-[1000] w-64 pointer-events-none">
        <GlassCard className="bg-slate-900/90 text-white border-white/10 p-4">
          <h4 className="font-black text-sm mb-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Network
          </h4>
          <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
            Click on any marker to view NGO contact details and redistribution capacity.
          </p>
        </GlassCard>
      </div>
    </div>
  );
};
