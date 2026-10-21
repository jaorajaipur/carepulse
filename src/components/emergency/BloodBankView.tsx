import React, { useState } from 'react';
import { BloodBank, BloodDonor } from '../../types';
import {
  Droplet,
  Phone,
  AlertCircle,
  MapPin,
  Clock,
  ShieldCheck,
  UserCheck,
  Send,
  Plus,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface BloodBankViewProps {
  bloodBanks: BloodBank[];
  donors: BloodDonor[];
  currentLocation: string;
}

export const BloodBankView: React.FC<BloodBankViewProps> = ({
  bloodBanks,
  donors,
  currentLocation,
}) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('O+');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorGroup, setDonorGroup] = useState('O+');

  const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  const filteredDonors = donors.filter(
    (d) => selectedBloodGroup === 'all' || d.bloodGroup === selectedBloodGroup
  );

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorPhone) return;
    setRegisterSuccess(true);
    setTimeout(() => {
      setShowRegisterModal(false);
      setRegisterSuccess(false);
      alert(`Thank you ${donorName}! You are now registered as an emergency ${donorGroup} voluntary donor on CarePulse.`);
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-[#f8f9ff]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-4 py-2.5 border-b border-rose-100 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-bold text-slate-900">Emergency Blood Bank & Donors</h1>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-rose-100 text-[#ba1a1a] flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
              Live Sync
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Real-time certified units & voluntary donors in {currentLocation}</p>
        </div>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#ba1a1a] text-xs font-bold active:scale-95 transition-transform"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Register Donor</span>
        </button>
      </div>

      <div className="px-4 pt-3 space-y-4">
        {/* Urgent Request Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0">
              <Droplet className="w-6 h-6 fill-white stroke-none animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-bold leading-tight">Need Blood Urgently?</h3>
              <p className="text-[11px] text-rose-100 mt-0.5">
                Broadcast an emergency alert to 140+ voluntary donors within 5 km
              </p>
            </div>
          </div>
          <button
            onClick={() => alert(`SOS Emergency Alert broadcasted for ${selectedBloodGroup} blood across Bengaluru blood banks and nearby donors.`)}
            className="px-3.5 py-1.5 rounded-full bg-white text-rose-700 text-xs font-extrabold shadow-sm active:scale-95 transition-transform flex-shrink-0"
          >
            Broadcast SOS
          </button>
        </div>

        {/* Blood Group Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Blood Group</h2>
            <span className="text-[11px] text-rose-700 font-bold">Currently: {selectedBloodGroup}</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {bloodGroups.map((group) => {
              const isSelected = selectedBloodGroup === group;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedBloodGroup(group)}
                  className={`py-2 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-[#ba1a1a] border-[#ba1a1a] text-white font-extrabold shadow-sm scale-[1.02]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-rose-300 font-bold'
                  }`}
                >
                  <span className="text-sm">{group}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Verified Blood Banks Inventory */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Blood Banks ({bloodBanks.length})
            </h3>
            <span className="text-[11px] text-slate-400">NACO & Red Cross certified</span>
          </div>

          {bloodBanks.map((bank) => {
            const units = bank.stock[selectedBloodGroup] || 0;

            return (
              <div
                key={bank.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{bank.name}</h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#ba1a1a]" />
                      {bank.area} • {bank.distanceKm} km away
                    </p>
                  </div>

                  {/* Available Units Badge */}
                  <div className="px-2.5 py-1 rounded-xl bg-rose-50 border border-rose-100 text-center flex-shrink-0">
                    <span className="text-sm font-extrabold text-[#ba1a1a] block leading-tight">{units}</span>
                    <span className="text-[9px] font-bold text-rose-700">Units {selectedBloodGroup}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 truncate">{bank.address}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 text-[10px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {bank.lastUpdated}
                  </span>

                  <a
                    href={`tel:${bank.helpline}`}
                    className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Blood Bank</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nearby Voluntary Donors */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Nearby Voluntary Donors ({filteredDonors.length})
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold">100% Eligible</span>
          </div>

          <div className="space-y-2.5">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="p-3 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-[#ba1a1a] font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                    {donor.bloodGroup}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{donor.name}</h4>
                      {donor.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {donor.area} • {donor.distanceKm} km away
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-slate-500">
                      <span>Last donated {donor.lastDonationDaysAgo} days ago</span>
                      <span>•</span>
                      <span className="font-semibold text-emerald-700">{donor.availability}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`tel:${donor.phone}`}
                  className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all flex-shrink-0"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Register as Donor Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-100">
            <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Register as a Life Saver</h3>
                <p className="text-[11px] text-slate-500">Help save lives in emergency hospital alerts</p>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegister} className="p-4 space-y-3.5 text-xs bg-[#f8f9ff]">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Mobile Number (For Emergency Alerts)</label>
                <input
                  type="tel"
                  required
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Select Your Blood Group</label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodGroups.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setDonorGroup(g)}
                      className={`py-1.5 rounded-xl border text-center font-bold text-xs transition-all ${
                        donorGroup === g
                          ? 'bg-[#ba1a1a] text-white border-[#ba1a1a]'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-[11px] text-rose-900 space-y-1">
                <p className="font-semibold">Donor Eligibility Criteria:</p>
                <p>• Age 18–65 years • Weight &gt; 45 kg</p>
                <p>• Last blood donation must be &gt; 90 days ago</p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={registerSuccess}
                  className="w-full py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  {registerSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Registered Successfully!</span>
                    </>
                  ) : (
                    <span>Register as Emergency Donor</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
