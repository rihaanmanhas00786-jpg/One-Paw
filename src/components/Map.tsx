import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../types';
import { MARKER_ICONS } from '../utils/icons';
import { Navigation, MapPin } from 'lucide-react';

interface MapProps {
  locations: Location[];
  selectedLocation: Location | null;
  userPos: [number, number] | null;
  onMarkerClick: (loc: Location) => void;
}

const MapController = ({ loc }: { loc: Location | null }) => {
  const map = useMap();
  useEffect(() => {
    if (loc) {
      map.flyTo([loc.lat, loc.lng], 16, { animate: true, duration: 1.5 });
    }
  }, [loc, map]);
  return null;
};

const MapComponent: React.FC<MapProps> = ({ locations, selectedLocation, userPos, onMarkerClick }) => {
  
  const handleNavigate = (loc: Location) => {
    // RESTORED: Flexible Search Query
    // This tells Google: "Find this specific clinic name in Srinagar"
    // It opens the official Google Business page with photos and reviews.
    const query = encodeURIComponent(`${loc.name}, ${loc.address}, Srinagar`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  return (
    <MapContainer center={[34.0837, 74.7973]} zoom={12} zoomControl={false} className="h-full w-full">
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      <ZoomControl position="bottomright" />
      
      <MapController loc={selectedLocation} />
      
      {userPos && <Marker position={userPos} icon={MARKER_ICONS.user} />}

      {locations.map((loc) => (
        <Marker 
          key={loc.id} 
          position={[loc.lat, loc.lng]} 
          icon={MARKER_ICONS[loc.category] || MARKER_ICONS.private_vet}
          eventHandlers={{ click: () => onMarkerClick(loc) }}
        >
          <Popup className="custom-popup">
            <div className="bg-white overflow-hidden rounded-xl w-[260px]">
              <div className={`p-4 ${loc.isGovernment ? 'bg-red-600' : 'bg-blue-600'} text-white`}>
                <h3 className="font-bold text-base leading-tight">{loc.name}</h3>
                <p className="text-[10px] font-black uppercase opacity-75 mt-1">
                   {loc.isGovernment ? 'Govt Hospital' : 'Pet Facility'}
                </p>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-2 text-xs text-slate-500 italic">
                  <MapPin size={14} className="shrink-0" />
                  <span>{loc.address}, Srinagar</span>
                </div>
                
                <button 
                  onClick={() => handleNavigate(loc)}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 hover:bg-black transition-all shadow-md active:scale-95"
                >
                  <Navigation size={14} fill="white"/> VIEW ON GOOGLE MAPS
                </button>
                
                <p className="text-[8px] text-center text-slate-300 font-mono tracking-widest">
                  VERIFIED ONEPAW DATA
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;