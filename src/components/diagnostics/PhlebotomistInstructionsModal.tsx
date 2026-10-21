import React, { useState } from 'react';
import { PhlebotomistInstructions } from '../../types';
import {
  X,
  Building,
  PhoneCall,
  BellRing,
  VolumeX,
  Camera,
  ShieldAlert,
  Sparkles,
  Check,
  CheckCircle2
} from 'lucide-react';

interface PhlebotomistInstructionsModalProps {
  initialInstructions?: PhlebotomistInstructions;
  onSave: (instructions: PhlebotomistInstructions) => void;
  onClose: () => void;
}

export const PhlebotomistInstructionsModal: React.FC<PhlebotomistInstructionsModalProps> = ({
  initialInstructions,
  onSave,
  onClose,
}) => {
  const [flatNumber, setFlatNumber] = useState(initialInstructions?.flatNumber || '402, 4th Floor');
  const [buildingName, setBuildingName] = useState(initialInstructions?.buildingName || 'Sobha Lavender Heights, 12th Main Road');
  const [gateCode, setGateCode] = useState(initialInstructions?.gateCode || 'Gate 2 - Tower B');
  const [arrivalPreference, setArrivalPreference] = useState<'call_before' | 'ring_bell' | 'silent_arrival'>(
    initialInstructions?.arrivalPreference || 'call_before'
  );
  const [petAlert, setPetAlert] = useState(initialInstructions?.petAlert ?? true);
  const [sanitizedTray, setSanitizedTray] = useState(initialInstructions?.sanitizedTrayRequired ?? true);
  const [notes, setNotes] = useState(initialInstructions?.notes || 'Please buzz intercom 402. Our Golden Retriever is friendly and secured.');
  const [photoUploaded, setPhotoUploaded] = useState(true);

  const handleSave = () => {
    onSave({
      flatNumber,
      buildingName,
      gateCode,
      arrivalPreference,
      petAlert,
      sanitizedTrayRequired: sanitizedTray,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Delivery & Entry Instructions</h3>
            <p className="text-[11px] text-slate-500">Helps Ramesh reach your exact doorstep smoothly</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <div className="p-4 overflow-y-auto no-scrollbar space-y-4 text-xs bg-[#f8f9ff]">
          {/* Building & Flat Address */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <Building className="w-4 h-4 text-[#007dab]" />
              Building & Apartment Details
            </h4>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Flat / House Number</label>
              <input
                type="text"
                value={flatNumber}
                onChange={(e) => setFlatNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-[#007dab]"
                placeholder="e.g. Flat 402, 4th Floor"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Apartment / Society Name</label>
              <input
                type="text"
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-[#007dab]"
                placeholder="e.g. Sobha Lavender, 12th Main Road"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Gate Pass / Security Code (Optional)</label>
              <input
                type="text"
                value={gateCode}
                onChange={(e) => setGateCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-[#007dab]"
                placeholder="e.g. MyGate passcode or Tower B Gate"
              />
            </div>
          </div>

          {/* Arrival Preference */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <h4 className="font-bold text-slate-900 text-xs">When Phlebotomist Arrives:</h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setArrivalPreference('call_before')}
                className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                  arrivalPreference === 'call_before'
                    ? 'border-[#007dab] bg-[#eff4ff] text-[#006388] font-bold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <PhoneCall className="w-4 h-4 text-[#007dab]" />
                <span className="text-[10px] leading-tight">Call on Arrival</span>
              </button>

              <button
                type="button"
                onClick={() => setArrivalPreference('ring_bell')}
                className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                  arrivalPreference === 'ring_bell'
                    ? 'border-[#007dab] bg-[#eff4ff] text-[#006388] font-bold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <BellRing className="w-4 h-4 text-[#007dab]" />
                <span className="text-[10px] leading-tight">Ring Doorbell</span>
              </button>

              <button
                type="button"
                onClick={() => setArrivalPreference('silent_arrival')}
                className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                  arrivalPreference === 'silent_arrival'
                    ? 'border-[#007dab] bg-[#eff4ff] text-[#006388] font-bold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <VolumeX className="w-4 h-4 text-[#007dab]" />
                <span className="text-[10px] leading-tight">Silent / Baby Asleep</span>
              </button>
            </div>
          </div>

          {/* Special Toggles: Pet alert & Sanitized Tray */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Pet at Home Alert</h5>
                  <p className="text-[10px] text-slate-500">Alerts phlebotomist to avoid surprise entry</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={petAlert}
                onChange={(e) => setPetAlert(e.target.checked)}
                className="w-5 h-5 accent-[#007dab] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Sanitized Bedside Tray</h5>
                  <p className="text-[10px] text-slate-500">Pre-sterilized tray set for drawing sample</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={sanitizedTray}
                onChange={(e) => setSanitizedTray(e.target.checked)}
                className="w-5 h-5 accent-[#007dab] rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Building Photo / Landmark Photo Upload */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <Camera className="w-4 h-4 text-[#007dab]" />
              Building Entrance or Landmark Photo
            </h4>
            {photoUploaded ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-800 text-[11px] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Tower B - Main Entrance Gate Photo Added</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPhotoUploaded(false)}
                  className="text-[10px] text-slate-400 hover:text-rose-600 underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPhotoUploaded(true)}
                className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-[#007dab] hover:text-[#007dab] flex flex-col items-center justify-center gap-1 transition-all"
              >
                <Camera className="w-5 h-5 text-slate-400" />
                <span className="text-[11px] font-medium">Take or Upload Building Photo</span>
              </button>
            )}
          </div>

          {/* Notes for Collector */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 block">Custom Note for Ramesh</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
              placeholder="e.g. Leave sample tubes on study table, buzz intercom 402..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors text-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-full bg-[#006388] text-white text-xs font-bold hover:bg-[#007dab] transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Save Instructions</span>
          </button>
        </div>
      </div>
    </div>
  );
};
