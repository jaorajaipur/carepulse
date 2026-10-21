import React, { useState } from 'react';
import {
  X,
  Upload,
  Camera,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  FileText,
  User,
  MapPin
} from 'lucide-react';

interface PrescriptionUploadModalProps {
  onClose: () => void;
  onUploadSuccess: () => void;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  onClose,
  onUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600'
  );
  const [patientName, setPatientName] = useState('Arjun Sharma');
  const [patientAge, setPatientAge] = useState('32');
  const [orderNotes, setOrderNotes] = useState('Please provide generic alternatives where approved to save costs.');
  const [allowGenericSubstitution, setAllowGenericSubstitution] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);

  const handleSimulateUpload = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
      onUploadSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Upload Doctor's Prescription</h3>
            <p className="text-[11px] text-slate-500">Government compliant • Licensed Pharmacist Verification</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto no-scrollbar space-y-4 text-xs bg-[#f8f9ff]">
          {/* Upload Area / Image Preview */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <Camera className="w-4 h-4 text-[#007dab]" />
              Prescription Photo / PDF
            </h4>

            {selectedFile ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-44 flex items-center justify-center group">
                <img
                  src={selectedFile}
                  alt="Prescription preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="px-3 py-1.5 rounded-full bg-white text-slate-800 text-xs font-bold shadow-md"
                  >
                    Change Image
                  </button>
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Prescription Attached
                </div>
              </div>
            ) : (
              <div
                onClick={() => setSelectedFile('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600')}
                className="w-full h-36 border-2 border-dashed border-cyan-300 rounded-2xl bg-[#eff4ff]/50 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-[#eff4ff] transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#007dab]">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#006388]">Tap to upload prescription</span>
                <span className="text-[10px] text-slate-400">Supports JPG, PNG or PDF up to 10MB</span>
              </div>
            )}
          </div>

          {/* AI OCR & Pharmacist Pipeline Card */}
          {analyzed && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  AI OCR Extracted & Verified
                </span>
                <span className="text-[10px] font-bold text-emerald-800">4 Medicines Found</span>
              </div>

              <div className="text-[11px] text-emerald-900 space-y-1">
                <p className="font-semibold">Doctor: Dr. Ananya Sen, MD, DM • Manipal Hospital</p>
                <p className="text-slate-600 text-[10px]">
                  Medications: Telmisartan 40mg, Metformin 500mg SR, Atorvastatin 10mg, Pantoprazole 40mg
                </p>
              </div>

              <div className="pt-1.5 border-t border-emerald-200/60 flex items-center justify-between text-[10px]">
                <span className="text-emerald-700 font-medium">Assigned to: Pharm. Priya Nair, M.Pharm</span>
                <span className="font-bold text-emerald-800">Reg #KA-48192</span>
              </div>
            </div>
          )}

          {/* Patient Details */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <User className="w-4 h-4 text-[#007dab]" />
              Patient Details
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Age & Gender</label>
                <input
                  type="text"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                  placeholder="32, Male"
                />
              </div>
            </div>

            {/* Generic Switch Option */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <h5 className="font-bold text-slate-800 text-xs">Allow Generic Substitutes</h5>
                <p className="text-[10px] text-emerald-700">Can save up to ₹358 on this order</p>
              </div>
              <input
                type="checkbox"
                checked={allowGenericSubstitution}
                onChange={(e) => setAllowGenericSubstitution(e.target.checked)}
                className="w-5 h-5 accent-[#007dab] rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Notes for Pharmacist */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 block">Notes or Instructions for Pharmacist</label>
            <textarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              rows={2}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
              placeholder="e.g. Please send generic substitutes or sugar-free syrup..."
            />
          </div>
        </div>

        {/* Footer Actions */}
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
            onClick={handleSimulateUpload}
            disabled={isAnalyzing}
            className="flex-1 py-2.5 rounded-full bg-[#006388] text-white text-xs font-bold hover:bg-[#007dab] transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
          >
            {isAnalyzing ? (
              <span>Reviewing Prescription...</span>
            ) : (
              <span>Proceed to Pharmacist Review</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
