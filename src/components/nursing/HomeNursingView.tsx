import React, { useState } from 'react';
import { HomeNurse, MedicalEquipment } from '../../types';
import {
  HeartPulse,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Truck,
  PhoneCall,
  UserCheck,
  Calendar,
  Sparkles,
  ChevronRight,
  PackageCheck
} from 'lucide-react';

interface HomeNursingViewProps {
  nurses: HomeNurse[];
  equipment: MedicalEquipment[];
  onBookNurse: (nurse: HomeNurse) => void;
  onRentEquipment: (item: MedicalEquipment) => void;
  currentLocation: string;
}

export const HomeNursingView: React.FC<HomeNursingViewProps> = ({
  nurses,
  equipment,
  onBookNurse,
  onRentEquipment,
  currentLocation,
}) => {
  const [selectedVertical, setSelectedVertical] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<'nurses' | 'equipment'>('nurses');

  const verticals = [
    { id: 'all', label: 'All Services' },
    { id: 'Critical Care ICU Nurse', label: 'ICU Bedside Nurse' },
    { id: 'Elderly Care Specialist', label: 'Elderly & Dementia' },
    { id: 'Home Physiotherapist', label: 'Physiotherapy' },
    { id: 'Post-Op Nurse', label: 'Post-Op Recovery' },
  ];

  const filteredNurses = nurses.filter(
    (n) => selectedVertical === 'all' || n.role === selectedVertical
  );

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-[#f8f9ff]">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-4 py-2.5 border-b border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-bold text-slate-900">Home Nursing & Elder Care</h1>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-indigo-100 text-indigo-800">
              Police & Medical Verified
            </span>
          </div>
          <p className="text-[11px] text-slate-500">12h/24h Bedside care & equipment rental in {currentLocation}</p>
        </div>

        {/* Section Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200">
          <button
            onClick={() => setSelectedTab('nurses')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
              selectedTab === 'nurses'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Nurses
          </button>
          <button
            onClick={() => setSelectedTab('equipment')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
              selectedTab === 'equipment'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Equipment
          </button>
        </div>
      </div>

      <div className="px-4 pt-3 space-y-4">
        {/* Quality & Safety Guarantee Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-700 to-purple-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold leading-tight">Certified Clinical Staffing</h3>
              <p className="text-[11px] text-indigo-100 mt-0.5">
                B.Sc / GNM certified with background check & emergency backup nurse
              </p>
            </div>
          </div>
          <button
            onClick={() => alert("Care Manager Assistance: A senior clinical supervisor will call you within 15 minutes to assess patient needs.")}
            className="px-3 py-1.5 rounded-full bg-white text-indigo-900 text-xs font-bold shadow-xs active:scale-95 transition-transform flex-shrink-0"
          >
            Consult Manager
          </button>
        </div>

        {selectedTab === 'nurses' ? (
          <>
            {/* Care Verticals Pills */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Care Vertical</h2>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {verticals.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVertical(v.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      selectedVertical === v.id
                        ? 'bg-indigo-700 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Nurses List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Verified Specialists ({filteredNurses.length})
                </h3>
                <span className="text-[11px] text-indigo-700 font-semibold">Immediate Dispatch</span>
              </div>

              {filteredNurses.map((nurse) => (
                <div
                  key={nurse.id}
                  className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={nurse.avatar}
                        alt={nurse.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-xs"
                      />
                      <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{nurse.name}</h4>
                          <p className="text-[11px] font-bold text-indigo-700">{nurse.role}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{nurse.qualifications}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs font-extrabold text-slate-900">₹{nurse.dailyShiftRate}</span>
                          <span className="text-[10px] text-slate-400 block">/ 12h shift</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 mt-1.5 text-[11px]">
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 stroke-none" />
                          {nurse.rating}
                        </span>
                        <span className="text-slate-400">({nurse.reviewsCount})</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-600 font-medium">{nurse.experienceYears} yrs exp</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500 truncate">{nurse.languages.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {nurse.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[10px] font-medium text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action footer */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Free in-person trial day
                    </span>
                    <button
                      onClick={() => onBookNurse(nurse)}
                      className="px-4 py-1.5 rounded-full bg-indigo-700 text-white text-xs font-bold hover:bg-indigo-800 active:scale-95 transition-all shadow-xs"
                    >
                      Book Nurse
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Medical Equipment Rental Section */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Medical Equipment for Rent & Sale ({equipment.length})
              </h3>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Truck className="w-3 h-3" />
                Delivered in 2-4 Hours
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {equipment.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700">
                            {item.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-2">{item.name}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{item.brand}</p>
                        </div>
                      </div>

                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="text-xs font-extrabold text-slate-900">₹{item.monthlyRentalPrice}/mo</span>
                        <span className="text-[10px] text-slate-400">or Buy: ₹{item.purchasePrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specs list */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1 text-[10px] text-slate-600">
                    {item.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Rental action */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-medium">Refundable Deposit: ₹{item.depositAmount}</span>
                    <button
                      onClick={() => onRentEquipment(item)}
                      className="px-4 py-1.5 rounded-full bg-indigo-700 text-white text-xs font-bold hover:bg-indigo-800 active:scale-95 transition-all shadow-xs"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
