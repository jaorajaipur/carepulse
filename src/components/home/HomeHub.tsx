import React from 'react';
import { TabType, Doctor, DiagnosticPackage } from '../../types';
import {
  Search,
  MapPin,
  ChevronDown,
  Bell,
  Mic,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  TestTube2,
  Pill,
  HeartPulse,
  Droplet,
  Truck,
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface HomeHubProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenPhlebotomistModal: () => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectPackage: (pkg: DiagnosticPackage) => void;
  onOpenSymptomChecker: () => void;
  onOpenEmergencyModal: () => void;
  onOpenAdmin: () => void;
  doctors: Doctor[];
  packages: DiagnosticPackage[];
  currentLocation: string;
  onOpenLocationPicker: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenPrescriptionUpload: () => void;
}

export const HomeHub: React.FC<HomeHubProps> = ({
  onNavigateTab,
  onOpenPhlebotomistModal,
  onSelectDoctor,
  onSelectPackage,
  onOpenSymptomChecker,
  onOpenEmergencyModal,
  onOpenAdmin,
  doctors,
  packages,
  currentLocation,
  onOpenLocationPicker,
  onOpenPrescriptionUpload,
}) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-[#f8f9ff]">
      {/* Top App Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-4 py-2.5 border-b border-slate-100 flex items-center justify-between shadow-[0_1px_6px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#006388] to-[#007dab] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-[#006388] tracking-wider uppercase">CarePulse</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-medium text-slate-500">Live Care Hub</span>
            </div>
            <button
              onClick={onOpenLocationPicker}
              className="flex items-center gap-1 text-left group min-w-0"
            >
              <MapPin className="w-3.5 h-3.5 text-[#007dab] flex-shrink-0" />
              <span className="text-xs font-bold text-slate-800 truncate group-hover:text-[#007dab] transition-colors max-w-[170px]">
                {currentLocation}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Admin Studio Trigger Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#eff4ff] text-[#006388] text-[11px] font-bold border border-slate-200 transition-all shadow-2xs"
            title="Open Admin Studio & Database Manager"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Admin</span>
          </button>
          <button
            onClick={onOpenSymptomChecker}
            className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#006388] flex items-center justify-center hover:bg-[#dce9ff] transition-all"
            title="AI Health Triage"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert("Notifications: No urgent updates. Your ABHA records are synced.")}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center relative hover:bg-slate-200 transition-all"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#f97356]"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            AS
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="px-4 pt-3 space-y-4">
        {/* User Greeting & Status Banner */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-extrabold text-[#0b1c30] tracking-tight">Hello, Arjun</h1>
              <span className="text-xl">👋</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[11px] text-slate-500 font-medium">
                Good morning • Air Quality Good <span className="font-semibold text-emerald-700">(AQI 42)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eff4ff] border border-[#dce9ff] text-[#006388] text-[11px] font-semibold shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ABHA Linked</span>
          </div>
        </div>

        {/* Universal Search Bar */}
        <div className="relative">
          <div
            onClick={() => onNavigateTab('diagnostics')}
            className="flex items-center w-full h-11 px-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_12px_rgba(0,99,136,0.04)] cursor-pointer hover:border-[#007dab] transition-all"
          >
            <Search className="w-4 h-4 text-[#007dab] mr-2.5 flex-shrink-0" />
            <span className="text-xs text-slate-400 font-normal truncate flex-1">
              Search doctors, lab tests, medicines, nursing...
            </span>
            <div className="flex items-center gap-1 pl-1 flex-shrink-0">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <Mic className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Live Active Tracker Card (Real-Time Phlebotomist) */}
        <div
          onClick={onOpenPhlebotomistModal}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#006388] via-[#007dab] to-[#0092c7] p-3.5 text-white shadow-[0_8px_20px_-4px_rgba(0,99,136,0.35)] cursor-pointer transition-transform active:scale-[0.99] group"
        >
          {/* Subtle background waves */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>

          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping"></span>
                Live Sample Pickup
              </span>
              <span className="text-[11px] text-white/80">Order #CP-89421</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3" />
              <span>14 MINS</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/stitch/male_doctor.png"
                alt="Phlebotomist Ramesh"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/60 shadow-md"
              />
              <div>
                <h4 className="text-xs font-bold leading-tight">Ramesh Kumar is on the way</h4>
                <p className="text-[11px] text-cyan-100 mt-0.5">Comprehensive Health Checkup (64 Tests)</p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Quick status bar */}
          <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[10px] text-cyan-100/90 relative z-10">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-300" />
              4.2°C Cold-Chain Kit Sealed
            </span>
            <span className="underline font-semibold">Track Live Map →</span>
          </div>
        </div>

        {/* Care Services Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Explore Care Services</h2>
            <span className="text-[11px] font-semibold text-[#006388]">All 24/7 Available</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {/* 1. Doctors & OPD */}
            <button
              onClick={() => onNavigateTab('doctors')}
              className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-95 group text-center"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-50 to-blue-100 text-[#006388] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform shadow-xs">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Doctors & OPD</span>
              <span className="text-[10px] text-slate-400 mt-0.5">850+ Specialists</span>
            </button>

            {/* 2. Diagnostics */}
            <button
              onClick={() => onNavigateTab('diagnostics')}
              className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-95 group text-center"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-50 to-emerald-100 text-emerald-700 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform shadow-xs">
                <TestTube2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Lab Tests</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Home Pickup</span>
            </button>

            {/* 3. Pharmacy 15-min */}
            <button
              onClick={() => onNavigateTab('pharmacy')}
              className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-95 group text-center relative"
            >
              <span className="absolute -top-1.5 right-2 px-1.5 py-0.2 rounded-full bg-[#f97356] text-white text-[9px] font-extrabold shadow-xs">
                15 MIN
              </span>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-50 to-orange-100 text-orange-600 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform shadow-xs">
                <Pill className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Pharmacy</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Quick Delivery</span>
            </button>

            {/* 4. Home Nursing */}
            <button
              onClick={() => onNavigateTab('nursing')}
              className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-95 group text-center"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-50 to-indigo-100 text-indigo-700 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform shadow-xs">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Home Nursing</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Elder Care & ICU</span>
            </button>

            {/* 5. Live Blood Bank */}
            <button
              onClick={() => onNavigateTab('bloodbank')}
              className="flex flex-col items-center p-3 rounded-2xl bg-white border border-rose-100 shadow-[0_2px_8px_rgba(186,26,26,0.04)] hover:shadow-md transition-all active:scale-95 group text-center relative"
            >
              <span className="absolute -top-1.5 right-2 px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[9px] font-extrabold animate-pulse">
                SOS
              </span>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-50 to-red-100 text-[#ba1a1a] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform shadow-xs">
                <Droplet className="w-5 h-5 fill-[#ba1a1a]" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Blood Bank</span>
              <span className="text-[10px] text-rose-600 font-semibold mt-0.5">Live Stock</span>
            </button>

            {/* 6. Emergency & ICU Beds */}
            <button
              onClick={onOpenEmergencyModal}
              className="flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-95 group text-center"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-50 to-teal-100 text-[#006388] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform shadow-xs">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">Ambulance</span>
              <span className="text-[10px] text-slate-400 mt-0.5">ICU Beds Live</span>
            </button>
          </div>
        </div>

        {/* Prescription Quick Upload Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-cyan-200 flex items-center justify-center text-[#006388] flex-shrink-0">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800">Order with Prescription</h3>
              <p className="text-[11px] text-slate-500">Upload Rx • Pharmacist verifies & sets dosages</p>
            </div>
          </div>
          <button
            onClick={onOpenPrescriptionUpload}
            className="px-3 py-1.5 rounded-full bg-[#006388] text-white text-xs font-bold shadow-sm active:scale-95 transition-transform flex-shrink-0"
          >
            Upload
          </button>
        </div>

        {/* Popular Health Packages Carousel */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Popular Health Packages</h2>
              <p className="text-[11px] text-slate-400">NABL Accredited • Free Home Sample Collection</p>
            </div>
            <button
              onClick={() => onNavigateTab('diagnostics')}
              className="text-xs font-bold text-[#006388] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {packages.slice(0, 3).map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => onSelectPackage(pkg)}
                className="w-72 flex-shrink-0 p-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#006388] text-[10px] font-extrabold uppercase">
                      {pkg.testCount} Tests Included
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {pkg.discountPercent}% OFF
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{pkg.title}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-extrabold text-slate-900">₹{pkg.price}</span>
                      <span className="text-[11px] text-slate-400 line-through">₹{pkg.originalPrice}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">{pkg.accreditedLab}</span>
                  </div>
                  <button className="px-3 py-1 rounded-full bg-[#eff4ff] text-[#006388] text-xs font-bold hover:bg-[#dce9ff] transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Doctors Available Today */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Top Doctors Available Today</h2>
              <p className="text-[11px] text-slate-400">Verified specialists • Clinic & Video appointments</p>
            </div>
            <button
              onClick={() => onNavigateTab('doctors')}
              className="text-xs font-bold text-[#006388] hover:underline"
            >
              See All
            </button>
          </div>

          <div className="space-y-2.5">
            {doctors.slice(0, 2).map((doc) => (
              <div
                key={doc.id}
                onClick={() => onSelectDoctor(doc)}
                className="p-3 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all cursor-pointer flex gap-3"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-xs"
                  />
                  <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 truncate">{doc.name}</h3>
                      <p className="text-[11px] text-[#006388] font-semibold">{doc.specialty}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-bold text-slate-900">₹{doc.consultationFee}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{doc.hospital}</p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/80 text-[11px]">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                      <Star className="w-3 h-3 fill-amber-400 stroke-none" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal">({doc.reviewsCount})</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 font-normal">{doc.experience} yrs</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {doc.nextAvailable}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency SOS Emergency Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0">
              <AlertCircle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-bold leading-tight">24/7 Medical Emergency</h3>
              <p className="text-[11px] text-rose-100 mt-0.5">Instant 108 Ambulance & ICU Bed Coordinator</p>
            </div>
          </div>
          <button
            onClick={onOpenEmergencyModal}
            className="px-3 py-1.5 rounded-full bg-white text-rose-700 text-xs font-extrabold shadow-sm active:scale-95 transition-transform flex-shrink-0"
          >
            Call 108
          </button>
        </div>
      </div>
    </div>
  );
};
