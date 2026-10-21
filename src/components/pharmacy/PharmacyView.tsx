import React, { useState } from 'react';
import { Medicine, CartItem } from '../../types';
import {
  Search,
  Upload,
  Zap,
  CheckCircle2,
  Plus,
  Minus,
  Pill,
  ShoppingBag,
  FileCheck2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

interface PharmacyViewProps {
  medicines: Medicine[];
  onAddToCart: (medicine: Medicine) => void;
  onOpenPrescriptionUpload: () => void;
  onOpenPharmacistApproval: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const PharmacyView: React.FC<PharmacyViewProps> = ({
  medicines,
  onAddToCart,
  onOpenPrescriptionUpload,
  onOpenPharmacistApproval,
  onOpenCart,
  cartCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Medicines' },
    { id: 'Diabetes Care', label: 'Diabetes' },
    { id: 'Cardiac & BP', label: 'Heart & BP' },
    { id: 'Pain Relief & Fever', label: 'Pain & Fever' },
    { id: 'Vitamins & Immunity', label: 'Vitamins' },
    { id: 'Gastroenterology', label: 'Digestion' },
    { id: 'Antibiotics', label: 'Antibiotics' },
  ];

  const filteredMedicines = medicines.filter((med) => {
    const matchesCat = selectedCategory === 'all' || med.category === selectedCategory;
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-[#f8f9ff]">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-4 py-2.5 border-b border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-bold text-slate-900">CarePulse Pharmacy</h1>
            <span className="flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[9px] font-extrabold bg-amber-100 text-amber-800">
              <Zap className="w-2.5 h-2.5 fill-amber-500 stroke-none" />
              15-Min Delivery
            </span>
          </div>
          <p className="text-[11px] text-slate-500">100% Genuine Medicines • Pharmacist Verified</p>
        </div>

        <button
          onClick={onOpenCart}
          className="relative w-9 h-9 rounded-full bg-[#eff4ff] text-[#006388] flex items-center justify-center hover:bg-[#dce9ff] transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f97356] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="px-4 pt-3 space-y-4">
        {/* Prescription Upload Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#006388] to-[#007dab] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold leading-tight">Order with Doctor's Rx</h3>
              <p className="text-[11px] text-cyan-100 mt-0.5">Clinical pharmacist Priya Nair verifies and sets dosage</p>
            </div>
          </div>
          <button
            onClick={onOpenPrescriptionUpload}
            className="px-3.5 py-1.5 rounded-full bg-white text-[#006388] text-xs font-bold shadow-xs active:scale-95 transition-transform flex-shrink-0"
          >
            Upload Rx
          </button>
        </div>

        {/* Pharmacist Consultation & Approval Banner (Matches Stitch Screen) */}
        <div
          onClick={onOpenPharmacistApproval}
          className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-[0_2px_10px_rgba(16,185,129,0.06)] cursor-pointer hover:border-emerald-300 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img
                src="/assets/stitch/female_pharmacist.png"
                alt="Pharmacist Priya Nair"
                className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white">
                <CheckCircle2 className="w-3 h-3" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-slate-900">Pharm. Priya Nair, M.Pharm</h4>
                <span className="text-[9px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                  Clinical Review Ready
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Your monthly cardiac & diabetes refill schedule is approved
              </p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center w-full h-11 px-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <Search className="w-4 h-4 text-[#007dab] mr-2.5 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicine brand or generic composition..."
              className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#006388] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Medicines Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Frequently Ordered Medicines ({filteredMedicines.length})
            </h2>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3 fill-amber-500 stroke-none" />
              Express 15m
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {filteredMedicines.map((med) => (
              <div
                key={med.id}
                className="p-3 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex gap-3 items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={med.image}
                    alt={med.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{med.name}</h4>
                      {med.requiresPrescription && (
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1 py-0.2 rounded flex-shrink-0">
                          Rx Required
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{med.packSize} • {med.brand}</p>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 italic">{med.dosageRecommendation}</p>

                    {/* Generic Alternative Cost Savings badge */}
                    {med.genericAlternative && (
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                        <TrendingDown className="w-3 h-3" />
                        <span>Generic option: save ₹{med.genericAlternative.savings}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right flex-shrink-0 flex flex-col items-end gap-1.5">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-extrabold text-slate-900">₹{med.price}</span>
                      <span className="text-[10px] text-slate-400 line-through">₹{med.originalPrice}</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 block">{med.discountPercent}% OFF</span>
                  </div>

                  <button
                    onClick={() => onAddToCart(med)}
                    className="px-3 py-1 rounded-full bg-[#eff4ff] text-[#006388] text-xs font-bold hover:bg-[#dce9ff] active:scale-95 transition-all flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
