import React, { useState } from 'react';
import { X, Sparkles, AlertCircle, ArrowRight, CheckCircle2, Stethoscope, TestTube2 } from 'lucide-react';
import { TabType } from '../../types';

interface SymptomCheckerModalProps {
  onClose: () => void;
  onNavigateTab: (tab: TabType) => void;
}

export const SymptomCheckerModal: React.FC<SymptomCheckerModalProps> = ({
  onClose,
  onNavigateTab,
}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Fever', 'Fatigue']);
  const [duration, setDuration] = useState('2-3 days');
  const [evaluated, setEvaluated] = useState(false);

  const symptomList = [
    'Fever',
    'Dry Cough',
    'Body Ache / Chills',
    'Fatigue',
    'Headache',
    'Chest Tightness',
    'Nausea / Acidity',
    'Sore Throat',
    'Joint Pain'
  ];

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-100">
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Clinical Symptom Triage</h3>
              <p className="text-[10px] text-slate-400">Personalized Health Assessment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto no-scrollbar space-y-4 text-xs bg-[#f8f9ff]">
          {!evaluated ? (
            <>
              <div>
                <label className="font-bold text-slate-800 text-xs block mb-2">
                  What symptoms are you experiencing today?
                </label>
                <div className="flex flex-wrap gap-2">
                  {symptomList.map((s) => {
                    const isSelected = selectedSymptoms.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSymptom(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#006388] text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 text-xs block">Duration of symptoms</label>
                <div className="grid grid-cols-3 gap-2">
                  {['< 24 Hours', '2-3 days', 'More than a week'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`p-2 rounded-xl border text-center text-[11px] font-bold transition-all ${
                        duration === d
                          ? 'border-[#007dab] bg-[#eff4ff] text-[#006388]'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>If you have severe breathlessness, chest pain, or fainting, call 108 immediately.</span>
              </div>

              <button
                type="button"
                onClick={() => setEvaluated(true)}
                className="w-full py-2.5 rounded-full bg-[#006388] text-white font-bold text-xs shadow-md hover:bg-[#007dab] active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Analyze Symptoms</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-emerald-200 space-y-1.5 text-emerald-950">
                <span className="text-[10px] font-extrabold uppercase text-emerald-700 block">Assessment Result</span>
                <h4 className="text-sm font-bold">Mild Acute Viral Illness or Tropical Fever</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Your symptoms of fever and fatigue lasting {duration} suggest a seasonal viral syndrome or early dengue/flu. Medical consultation and basic blood work is advised.
                </p>
              </div>

              {/* Recommended Next Actions */}
              <div className="space-y-2">
                <h5 className="font-bold text-slate-800 text-xs">Recommended Clinical Next Steps:</h5>

                <div
                  onClick={() => {
                    onClose();
                    onNavigateTab('doctors');
                  }}
                  className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs cursor-pointer hover:border-[#007dab] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#006388] flex items-center justify-center">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="font-bold text-xs text-slate-900">Consult General Physician</h6>
                      <p className="text-[10px] text-slate-500">Dr. Rajesh Varma available today • ₹500</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>

                <div
                  onClick={() => {
                    onClose();
                    onNavigateTab('diagnostics');
                  }}
                  className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs cursor-pointer hover:border-[#007dab] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-emerald-700 flex items-center justify-center">
                      <TestTube2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h6 className="font-bold text-xs text-slate-900">Book Fever Profile (CBC + Dengue + Malaria)</h6>
                      <p className="text-[10px] text-slate-500">Reports in 4 hours • Free home pickup</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEvaluated(false)}
                className="w-full py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Re-assess Symptoms
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
