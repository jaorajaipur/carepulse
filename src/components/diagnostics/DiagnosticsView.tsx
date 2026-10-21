import React, { useState } from 'react';
import { DiagnosticPackage, AccreditedLab } from '../../types';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  Upload,
  AlertCircle,
  FileText,
  MapPin,
  Sparkles,
  Award
} from 'lucide-react';

interface DiagnosticsViewProps {
  packages: DiagnosticPackage[];
  labs: AccreditedLab[];
  onSelectPackage: (pkg: DiagnosticPackage) => void;
  onOpenPhlebotomistModal: () => void;
  onOpenPrescriptionUpload: () => void;
  currentLocation: string;
}

export const DiagnosticsView: React.FC<DiagnosticsViewProps> = ({
  packages,
  labs,
  onSelectPackage,
  onOpenPhlebotomistModal,
  onOpenPrescriptionUpload,
  currentLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'fullbody', label: 'Full Body' },
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'cardiac', label: 'Heart & Lipid' },
    { id: 'thyroid', label: 'Thyroid' },
    { id: 'vitamin', label: 'Vitamins' },
    { id: 'senior', label: 'Senior Care' },
    { id: 'fever', label: 'Fever & Viral' },
  ];

  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.parameters.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-[#f8f9ff]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-4 py-2.5 border-b border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-bold text-slate-900">Diagnostics & Lab Tests</h1>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800">
              NABL & CAP
            </span>
          </div>
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#007dab]" />
            Free home sample pickup in {currentLocation}
          </p>
        </div>

        <button
          onClick={onOpenPhlebotomistModal}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eff4ff] border border-[#007dab]/30 text-[#006388] text-[11px] font-bold active:scale-95 transition-transform"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Live Tracking</span>
        </button>
      </div>

      <div className="px-4 pt-3 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center w-full h-11 px-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <Search className="w-4 h-4 text-[#007dab] mr-2.5 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tests (e.g. CBC, Lipid, HbA1c, Thyroid)..."
              className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 px-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Prescription Upload Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#006388] to-[#007dab] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold leading-tight">Have a Doctor's Prescription?</h3>
              <p className="text-[11px] text-cyan-100 mt-0.5">Upload prescription & our lab team will add the exact tests</p>
            </div>
          </div>
          <button
            onClick={onOpenPrescriptionUpload}
            className="px-3 py-1.5 rounded-full bg-white text-[#006388] text-xs font-bold shadow-xs active:scale-95 transition-transform flex-shrink-0"
          >
            Upload
          </button>
        </div>

        {/* Category Pills */}
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

        {/* Health Packages List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recommended Diagnostic Packages ({filteredPackages.length})
            </h2>
            <span className="text-[11px] text-[#006388] font-semibold">100% Verified NABL</span>
          </div>

          {filteredPackages.map((pkg) => {
            const isExpanded = expandedPackageId === pkg.id;

            return (
              <div
                key={pkg.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#006388] text-[10px] font-extrabold uppercase tracking-wide">
                      {pkg.testCount} Parameters Tested
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {pkg.discountPercent}% OFF
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900">{pkg.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{pkg.tagline}</p>

                  {/* Highlights Bar */}
                  <div className="mt-2.5 flex flex-wrap gap-2 text-[10px] text-slate-600">
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      <Clock className="w-3 h-3 text-[#007dab]" />
                      Report in {pkg.reportTimeHours}h
                    </span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      <AlertCircle className="w-3 h-3 text-amber-500" />
                      {pkg.fastingHours > 0 ? `${pkg.fastingHours}h Fasting` : 'No Fasting'}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {pkg.sampleType}
                    </span>
                  </div>

                  {/* Expandable Parameters Accordion */}
                  <div className="mt-2.5">
                    <button
                      onClick={() => setExpandedPackageId(isExpanded ? null : pkg.id)}
                      className="text-[11px] font-bold text-[#006388] flex items-center gap-1 hover:underline"
                    >
                      <FileText className="w-3 h-3" />
                      <span>{isExpanded ? 'Hide Test Parameters' : `View all ${pkg.parameters.length} test groups`}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 space-y-1.5 animate-in fade-in duration-200">
                        {pkg.parameters.map((param, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{param}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-extrabold text-slate-900">₹{pkg.price}</span>
                      <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-medium">Free Home Collection</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="px-4 py-2 rounded-full bg-[#006388] text-white text-xs font-bold hover:bg-[#007dab] active:scale-95 transition-all shadow-xs"
                    >
                      Book Home Sample
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compare Accredited NABL Labs Section */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Compare Accredited Labs</h2>
              <p className="text-[11px] text-slate-400">NABL & CAP certified diagnostic partners</p>
            </div>
            <Award className="w-4 h-4 text-[#007dab]" />
          </div>

          <div className="space-y-2.5">
            {labs.map((lab) => (
              <div
                key={lab.id}
                className="p-3 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-[#006388] text-xs">
                    {lab.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900">{lab.name}</h4>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                        ★ {lab.rating}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{lab.turnaroundTime}</p>
                    <div className="flex items-center gap-1 mt-1 text-[9px] text-[#006388] font-bold">
                      {lab.accreditations.map((acc, i) => (
                        <span key={i} className="bg-[#eff4ff] px-1 py-0.2 rounded">
                          {acc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-bold text-slate-900 block">From ₹{lab.packagePrice}</span>
                  <button
                    onClick={() => {
                      const match = packages.find(p => p.accreditedLab.includes(lab.name.split(' ')[0])) || packages[0];
                      onSelectPackage(match);
                    }}
                    className="text-[11px] font-bold text-[#006388] hover:underline mt-0.5 block"
                  >
                    Select Lab →
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
