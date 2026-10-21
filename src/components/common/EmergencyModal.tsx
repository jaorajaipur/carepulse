import React from 'react';
import { X, Phone, Truck, AlertCircle, ShieldAlert, HeartPulse, MapPin } from 'lucide-react';
import { TabType } from '../../types';

interface EmergencyModalProps {
  onClose: () => void;
  onNavigateTab: (tab: TabType) => void;
  currentLocation: string;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  onClose,
  onNavigateTab,
  currentLocation,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-rose-200">
        <div className="px-4 py-3.5 bg-gradient-to-r from-red-600 to-rose-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-white animate-bounce" />
            <div>
              <h3 className="text-sm font-bold text-white">24/7 Medical Emergency Response</h3>
              <p className="text-[10px] text-rose-100">Direct dispatch in {currentLocation}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto no-scrollbar space-y-3.5 text-xs bg-[#fff5f5]">
          {/* Quick 108 Call */}
          <div className="p-3.5 rounded-2xl bg-white border border-rose-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-rose-700 block">Toll-Free Government Hotline</span>
                <h4 className="text-base font-extrabold text-slate-900">National Ambulance 108</h4>
                <p className="text-[11px] text-slate-500">Free 24x7 Emergency Paramedic & Trauma Dispatch</p>
              </div>
              <a
                href="tel:108"
                className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white flex items-center justify-center shadow-md transition-all flex-shrink-0"
              >
                <Phone className="w-6 h-6 animate-pulse" />
              </a>
            </div>
          </div>

          {/* GPS Tracking Ambulance Nearby */}
          <div className="p-3 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-rose-600" />
                Live Nearest ALS Ambulance
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold animate-pulse">
                ETA 7 Mins
              </span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <p>Vehicle: Advanced Cardiac Life Support (ALS) • KA-04-AMB-2018</p>
              <p>Staff: ICU trained paramedic + ventilator equipped</p>
            </div>
            <button
              onClick={() => alert("Dispatching nearest CarePulse Rapid ALS Ambulance to " + currentLocation + ". Estimated arrival in 7 minutes.")}
              className="w-full py-2 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-xs hover:bg-rose-700 active:scale-95 transition-all"
            >
              Request Rapid Dispatch to My Location
            </button>
          </div>

          {/* Major Hospital Emergency Trauma Desks */}
          <div className="p-3.5 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-2">
            <h4 className="text-xs font-bold text-slate-900">Hospital Emergency Trauma Hotlines</h4>
            <div className="space-y-2 divide-y divide-slate-100">
              <div className="pt-1.5 first:pt-0 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Apollo Emergency (1066)</h5>
                  <p className="text-[10px] text-slate-500">Cardiac & Acute Stroke Hotline</p>
                </div>
                <a
                  href="tel:1066"
                  className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold hover:bg-rose-200"
                >
                  Call 1066
                </a>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Manipal Hospital Emergency</h5>
                  <p className="text-[10px] text-slate-500">+91 80 2502 4444 • HAL Airport Rd</p>
                </div>
                <a
                  href="tel:+918025024444"
                  className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold hover:bg-rose-200"
                >
                  Call Desk
                </a>
              </div>
            </div>
          </div>

          {/* Quick Jump to Blood Bank or ICU Bed Tracker */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateTab('bloodbank');
              }}
              className="p-2.5 rounded-xl bg-white border border-rose-200 text-center flex flex-col items-center gap-1 hover:bg-rose-50"
            >
              <HeartPulse className="w-4 h-4 text-rose-600" />
              <span className="font-bold text-[11px] text-slate-800">Live Blood Bank</span>
              <span className="text-[10px] text-slate-400">Find O+, A+, B+ units</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateTab('doctors');
              }}
              className="p-2.5 rounded-xl bg-white border border-rose-200 text-center flex flex-col items-center gap-1 hover:bg-rose-50"
            >
              <Truck className="w-4 h-4 text-rose-600" />
              <span className="font-bold text-[11px] text-slate-800">ICU Bed Tracker</span>
              <span className="text-[10px] text-slate-400">Live hospital beds</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
