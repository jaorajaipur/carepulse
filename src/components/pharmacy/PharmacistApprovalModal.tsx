import React, { useState } from 'react';
import { PrescriptionReview } from '../../types';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  TrendingDown,
  Sun,
  Sunset,
  Moon,
  Coffee,
  Check,
  ShoppingBag,
  HelpCircle
} from 'lucide-react';

interface PharmacistApprovalModalProps {
  review: PrescriptionReview;
  onClose: () => void;
  onApproveAndAddToCart: (totalAmount: number, itemsCount: number) => void;
}

export const PharmacistApprovalModal: React.FC<PharmacistApprovalModalProps> = ({
  review,
  onClose,
  onApproveAndAddToCart,
}) => {
  const [useGenerics, setUseGenerics] = useState(true);

  // Compute pricing
  const brandedTotal = review.medications.reduce((sum, m) => sum + m.price, 0);
  const genericTotal = review.medications.reduce((sum, m) => {
    return sum + (m.genericSavingsAvailable && m.genericPrice ? m.genericPrice : m.price);
  }, 0);
  const savings = brandedTotal - genericTotal;
  const currentTotal = useGenerics ? genericTotal : brandedTotal;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Pharmacist Consultation & Cart Approval</h3>
            <p className="text-[11px] text-slate-500">Verified by Clinical Pharmacist</p>
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
          {/* Pharmacist Profile Card */}
          <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={review.pharmacist?.avatar || '/assets/stitch/female_pharmacist.png'}
                  alt={review.pharmacist?.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900">{review.pharmacist?.name}</h4>
                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded">
                    Clinical Review Approved
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">{review.pharmacist?.credentials}</p>
                <p className="text-[10px] text-[#006388] font-semibold">{review.pharmacist?.regNumber}</p>
              </div>
            </div>
          </div>

          {/* Generic Substitution Savings Toggle */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                ₹
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-950">Switch to Generic Equivalents</h4>
                <p className="text-[10px] text-emerald-800">
                  Save <span className="font-extrabold text-emerald-700">₹{savings}</span> with 100% bio-equivalent Jan Aushadhi generics
                </p>
              </div>
            </div>
            <button
              onClick={() => setUseGenerics(!useGenerics)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                useGenerics ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {useGenerics ? 'Applied' : 'Apply'}
            </button>
          </div>

          {/* Prescribed Medications & Dosages */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs flex items-center justify-between">
              <span>Prescribed Medications ({review.medications.length})</span>
              <span className="text-[10px] text-slate-400 font-normal">30-day course</span>
            </h4>

            <div className="space-y-2 divide-y divide-slate-100">
              {review.medications.map((med, idx) => (
                <div key={idx} className="pt-2 first:pt-0 flex items-start justify-between gap-2">
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">
                      {useGenerics && med.genericSavingsAvailable && med.genericName
                        ? med.genericName
                        : med.name}
                    </h5>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                      <span className="font-semibold text-[#006388]">{med.dosage}</span>
                      <span>•</span>
                      <span>{med.timing} ({med.mealRelation})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900">
                      ₹{useGenerics && med.genericSavingsAvailable && med.genericPrice ? med.genericPrice : med.price}
                    </span>
                    {useGenerics && med.genericSavingsAvailable && med.genericPrice && (
                      <span className="text-[9px] text-slate-400 line-through block">₹{med.price}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Dosage Timeline Schedule */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#007dab]" />
              Daily Dosage Timeline Schedule
            </h4>

            <div className="grid grid-cols-3 gap-2">
              {/* Morning */}
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 flex flex-col justify-between min-h-[85px]">
                <div>
                  <div className="flex items-center gap-1 text-amber-800 font-bold text-[10px] mb-1">
                    <Sun className="w-3 h-3 text-amber-600" />
                    <span>Morning</span>
                  </div>
                  <p className="text-[9px] text-slate-700 font-medium">Pan 40 (Before food)</p>
                  <p className="text-[9px] text-slate-700 font-medium mt-0.5">Telma 40 (After food)</p>
                </div>
                <span className="text-[9px] font-bold text-amber-700 mt-1">08:00 AM</span>
              </div>

              {/* Evening / Dinner */}
              <div className="p-2 rounded-xl bg-orange-50 border border-orange-100 flex flex-col justify-between min-h-[85px]">
                <div>
                  <div className="flex items-center gap-1 text-orange-800 font-bold text-[10px] mb-1">
                    <Sunset className="w-3 h-3 text-orange-600" />
                    <span>Evening</span>
                  </div>
                  <p className="text-[9px] text-slate-700 font-medium">Glycomet SR (With dinner)</p>
                </div>
                <span className="text-[9px] font-bold text-orange-700 mt-1">08:30 PM</span>
              </div>

              {/* Night / Bedtime */}
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100 flex flex-col justify-between min-h-[85px]">
                <div>
                  <div className="flex items-center gap-1 text-indigo-800 font-bold text-[10px] mb-1">
                    <Moon className="w-3 h-3 text-indigo-600" />
                    <span>Bedtime</span>
                  </div>
                  <p className="text-[9px] text-slate-700 font-medium">Atorva 10 (Water)</p>
                </div>
                <span className="text-[9px] font-bold text-indigo-700 mt-1">10:30 PM</span>
              </div>
            </div>
          </div>

          {/* Payment & Savings Summary */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
            <div className="flex justify-between text-slate-500 text-xs">
              <span>Items Total (Branded MRP)</span>
              <span>₹{brandedTotal}</span>
            </div>
            {useGenerics && savings > 0 && (
              <div className="flex justify-between text-emerald-700 text-xs font-semibold">
                <span>Generic Equivalence Savings</span>
                <span>- ₹{savings}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500 text-xs">
              <span>Express 15-Min Delivery</span>
              <span className="text-emerald-600 font-semibold">FREE</span>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between text-slate-900 text-sm font-extrabold">
              <span>Total Payable</span>
              <span>₹{currentTotal}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors text-center"
          >
            Modify
          </button>
          <button
            type="button"
            onClick={() => onApproveAndAddToCart(currentTotal, review.medications.length)}
            className="flex-1 py-2.5 rounded-full bg-[#006388] text-white text-xs font-bold hover:bg-[#007dab] transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Approve & Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
