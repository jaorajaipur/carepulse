import React, { useState, useEffect } from 'react';
import { PhlebotomistTracker } from '../../types';
import {
  X,
  Phone,
  MessageSquare,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Thermometer,
  FileText,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface PhlebotomistTrackingModalProps {
  tracker: PhlebotomistTracker;
  onClose: () => void;
  onOpenInstructions: () => void;
}

export const PhlebotomistTrackingModal: React.FC<PhlebotomistTrackingModalProps> = ({
  tracker,
  onClose,
  onOpenInstructions,
}) => {
  const [eta, setEta] = useState(tracker.etaMinutes);
  const [distance, setDistance] = useState(tracker.distanceKm);
  const [isCalling, setIsCalling] = useState(false);

  // Simulate smooth GPS updates
  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
      setDistance((prev) => (prev > 0.3 ? Number((prev - 0.1).toFixed(1)) : 0.2));
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleCall = () => {
    setIsCalling(true);
    setTimeout(() => {
      alert(`Connecting call to Phlebotomist ${tracker.name} (${tracker.phone})...\n"Hello! I am near 100ft road junction, arriving in ${eta} minutes."`);
      setIsCalling(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#f8f9ff] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100">
        {/* Top Header */}
        <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <div>
              <h3 className="text-xs font-bold text-slate-900 leading-tight">Live Sample Collection Tracking</h3>
              <p className="text-[10px] text-slate-400">Order #{tracker.orderId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Simulated GPS Map Canvas */}
        <div className="relative h-60 bg-slate-200 overflow-hidden flex-shrink-0">
          {/* Custom SVG Map Representation */}
          <svg className="w-full h-full object-cover" viewBox="0 0 400 240" fill="none">
            {/* Map Roads & Blocks */}
            <rect width="400" height="240" fill="#e2e8f0" />
            
            {/* Green parks */}
            <rect x="20" y="20" width="80" height="60" rx="8" fill="#dcfce7" />
            <rect x="280" y="140" width="100" height="70" rx="8" fill="#dcfce7" />
            
            {/* Residential blocks */}
            <rect x="130" y="30" width="70" height="50" rx="6" fill="#f1f5f9" />
            <rect x="220" y="25" width="80" height="60" rx="6" fill="#f1f5f9" />
            <rect x="40" y="130" width="90" height="70" rx="6" fill="#f1f5f9" />

            {/* Roads */}
            <path d="M 0 100 Q 150 90 220 110 T 400 100" stroke="#cbd5e1" strokeWidth="20" fill="none" />
            <path d="M 0 100 Q 150 90 220 110 T 400 100" stroke="#ffffff" strokeWidth="16" fill="none" />

            <path d="M 170 0 L 170 240" stroke="#ffffff" strokeWidth="14" fill="none" />
            <path d="M 280 0 L 280 240" stroke="#ffffff" strokeWidth="12" fill="none" />
            <path d="M 60 0 L 60 240" stroke="#cbd5e1" strokeWidth="10" fill="none" />
            <path d="M 60 0 L 60 240" stroke="#ffffff" strokeWidth="8" fill="none" />

            {/* Active Route Path */}
            <path
              d="M 120 100 L 170 105 L 170 170 L 250 170 L 250 140"
              stroke="#007dab"
              strokeWidth="5"
              strokeDasharray="6 6"
              className="animate-pulse"
              fill="none"
            />

            {/* Destination Point (Home) */}
            <g transform="translate(250, 140)">
              <circle r="14" fill="#10B981" opacity="0.2" className="animate-ping" />
              <circle r="9" fill="#10B981" />
              <path d="M -4 -1 L 0 -5 L 4 -1 L 4 4 L -4 4 Z" fill="#ffffff" />
            </g>

            {/* Moving Phlebotomist Vehicle Marker */}
            <g transform="translate(155, 102)">
              <circle r="18" fill="#006388" opacity="0.25" className="animate-pulse" />
              <circle r="12" fill="#006388" stroke="#ffffff" strokeWidth="2.5" />
              <circle r="4" fill="#ffffff" />
            </g>

            {/* Street labels */}
            <text x="60" y="92" fontSize="9" fontWeight="600" fill="#64748b">100ft Road</text>
            <text x="178" y="50" fontSize="9" fontWeight="600" fill="#64748b">12th Main</text>
            <text x="255" y="132" fontSize="9" fontWeight="700" fill="#0f172a">Home (Flat 402)</text>
          </svg>

          {/* Floating Live Telemetry Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-3">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Estimated Arrival</span>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-extrabold text-[#006388]">{eta} mins</span>
                <span className="text-[10px] text-slate-500 font-medium">({distance} km away)</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#006388] flex items-center justify-center">
              <Navigation className="w-4 h-4 transform rotate-45" />
            </div>
          </div>

          {/* Cold-Chain Temp Verification Tag */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md border border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-emerald-700">
            <Thermometer className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kit Temp: {tracker.temperatureKit}</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-xl text-[10px] font-semibold text-white">
            {tracker.vehicleNumber}
          </div>
        </div>

        {/* Details & Action Sheet */}
        <div className="p-4 overflow-y-auto no-scrollbar space-y-3.5 flex-1 bg-[#f8f9ff]">
          {/* Phlebotomist Profile Card */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={tracker.avatar}
                  alt={tracker.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white">
                  <ShieldCheck className="w-3 h-3" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900">{tracker.name}</h4>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 rounded">
                    ★ {tracker.rating}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{tracker.role}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                  <span>{tracker.collectionsCount}+ collections</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">Vaccinated & Sanitized</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={handleCall}
                disabled={isCalling}
                className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center shadow-sm transition-all"
                title="Call Phlebotomist"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert(`Opening secure chat with ${tracker.name}...`)}
                className="w-9 h-9 rounded-full bg-sky-100 hover:bg-sky-200 active:scale-95 text-[#006388] flex items-center justify-center transition-all"
                title="Send Message"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Entry Instructions Trigger Button */}
          <div
            onClick={onOpenInstructions}
            className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 shadow-xs cursor-pointer hover:border-amber-300 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Gate & Entry Instructions</h4>
                <p className="text-[11px] text-slate-500">
                  {tracker.entryInstructions?.flatNumber} • {tracker.entryInstructions?.arrivalPreference === 'call_before' ? 'Call on arrival' : 'Ring bell'}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-700 underline">Edit</span>
          </div>

          {/* Collection Preparation Checklist */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#007dab]" />
              Doorstep Preparation Checklist
            </h4>
            <div className="space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Keep 1 glass of plain water for easy vein sampling.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Fasting requirement: 10-12 hours for Blood Sugar & Lipid Profile.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Ramesh carries a single-use sterile disposable vacutainer needle.</span>
              </div>
            </div>
          </div>

          {/* Sample Progress Steps */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <h4 className="text-xs font-bold text-slate-800 mb-2.5">Collection Status Progress</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-800">Phlebotomist Assigned</p>
                  <p className="text-[10px] text-slate-400">07:10 AM • Sealed kit prepared</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#006388] text-white flex items-center justify-center text-[10px] font-bold animate-pulse">2</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#006388]">On The Way (14 mins)</p>
                  <p className="text-[10px] text-slate-500">Passing Indiranagar 100ft road</p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">3</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-700">Sample Collection & Barcoding</p>
                  <p className="text-[10px] text-slate-400">At your doorstep</p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">4</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-700">NABL Lab Processing & Report</p>
                  <p className="text-[10px] text-slate-400">Digital PDF in 6 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={() => alert("Reschedule: You can move this slot to tomorrow morning 07:00 AM without any cancellation penalty.")}
            className="flex-1 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all text-center"
          >
            Reschedule
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full bg-[#006388] text-xs font-bold text-white hover:bg-[#007dab] active:scale-95 transition-all text-center shadow-xs"
          >
            Done Tracking
          </button>
        </div>
      </div>
    </div>
  );
};
