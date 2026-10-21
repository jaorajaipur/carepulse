import React, { useState } from 'react';
import { X, MapPin, Check, Navigation } from 'lucide-react';

interface LocationPickerModalProps {
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
  onClose: () => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  currentLocation,
  onSelectLocation,
  onClose,
}) => {
  const [customLocation, setCustomLocation] = useState('');

  const commonLocations = [
    'Indiranagar, Bengaluru',
    'Koramangala 4th Block, Bengaluru',
    'HSR Layout Sector 2, Bengaluru',
    'Whitefield Main Road, Bengaluru',
    'Jayanagar 4th Block, Bengaluru',
    'Malleshwaram 8th Cross, Bengaluru',
    'MG Road & CBD, Bengaluru',
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customLocation.trim()) {
      onSelectLocation(customLocation.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-slate-100">
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#007dab]" />
            <h3 className="text-sm font-bold text-slate-900">Choose Delivery & Care Location</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3.5 text-xs bg-[#f8f9ff]">
          {/* Current GPS Button */}
          <button
            onClick={() => {
              onSelectLocation('Indiranagar 100ft Road, Bengaluru (GPS Live)');
              onClose();
            }}
            className="w-full p-3 rounded-2xl bg-[#eff4ff] border border-[#007dab]/30 flex items-center gap-2.5 text-left text-[#006388] font-bold hover:bg-[#dce9ff] transition-all"
          >
            <Navigation className="w-4 h-4 text-[#007dab] flex-shrink-0" />
            <div>
              <span className="block text-xs">Use Current GPS Location</span>
              <span className="text-[10px] font-normal text-slate-500">Auto-detect accurate address & nearest phlebotomists</span>
            </div>
          </button>

          {/* Custom address input */}
          <form onSubmit={handleCustomSubmit} className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 block">Enter Custom Locality / Flat</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder="e.g. JP Nagar Phase 6, Bengaluru"
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#006388] text-white font-bold text-xs hover:bg-[#007dab]"
              >
                Set
              </button>
            </div>
          </form>

          {/* Popular Localities */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
              Popular Bengaluru Neighborhoods
            </span>
            <div className="space-y-1">
              {commonLocations.map((loc) => {
                const isSelected = currentLocation.includes(loc.split(',')[0]);
                return (
                  <button
                    key={loc}
                    onClick={() => {
                      onSelectLocation(loc);
                      onClose();
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#007dab] bg-white text-[#006388] font-bold shadow-xs'
                        : 'border-slate-100 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs truncate">{loc}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#007dab] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
