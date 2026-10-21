import React, { useState } from 'react';
import { Doctor, HospitalBed, Appointment } from '../../types';
import {
  Search,
  Filter,
  Star,
  CheckCircle2,
  Calendar,
  Video,
  Building,
  Phone,
  AlertCircle,
  Truck,
  Clock,
  Sparkles,
  MapPin,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface DoctorFinderProps {
  doctors: Doctor[];
  hospitals: HospitalBed[];
  onBookAppointment: (appointment: Omit<Appointment, 'id' | 'tokenNumber'>) => void;
  onOpenEmergencyModal: () => void;
  currentLocation: string;
}

export const DoctorFinder: React.FC<DoctorFinderProps> = ({
  doctors,
  hospitals,
  onBookAppointment,
  onOpenEmergencyModal,
  currentLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'clinic' | 'video'>('all');
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState<'Today' | 'Tomorrow' | 'Day After'>('Today');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('04:30 PM');
  const [consultMode, setConsultMode] = useState<'clinic' | 'video'>('clinic');
  const [activeView, setActiveView] = useState<'doctors' | 'hospitals'>('doctors');

  const specialties = [
    { id: 'all', label: 'All Specialties' },
    { id: 'Cardiologist', label: 'Cardiology' },
    { id: 'General Physician', label: 'General Medicine' },
    { id: 'Pediatrician', label: 'Pediatrics' },
    { id: 'Orthopedic Surgeon', label: 'Orthopedics' },
    { id: 'Dermatologist', label: 'Dermatology' },
    { id: 'Neurologist', label: 'Neurology' },
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialty = selectedSpecialty === 'all' || doc.specialty === selectedSpecialty;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode =
      filterMode === 'all' ||
      (filterMode === 'clinic' && doc.inClinic) ||
      (filterMode === 'video' && doc.videoConsult);
    return matchesSpecialty && matchesSearch && matchesMode;
  });

  const handleConfirmBooking = () => {
    if (!selectedDoctorForBooking) return;
    onBookAppointment({
      doctorId: selectedDoctorForBooking.id,
      doctorName: selectedDoctorForBooking.name,
      specialty: selectedDoctorForBooking.specialty,
      doctorAvatar: selectedDoctorForBooking.avatar,
      hospital: selectedDoctorForBooking.hospital,
      date: bookingDate,
      timeSlot: selectedTimeSlot,
      mode: consultMode,
      fee: selectedDoctorForBooking.consultationFee,
      status: 'confirmed',
    });
    setSelectedDoctorForBooking(null);
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-[#f8f9ff]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-4 py-2.5 border-b border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-sm font-bold text-slate-900">Doctors & Hospital Beds</h1>
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#007dab]" />
            Verified OPD & ICU in {currentLocation}
          </p>
        </div>

        {/* View Toggle: Doctors vs Hospital ICU Beds */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200">
          <button
            onClick={() => setActiveView('doctors')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
              activeView === 'doctors'
                ? 'bg-white text-[#006388] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Doctors
          </button>
          <button
            onClick={() => setActiveView('hospitals')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 ${
              activeView === 'hospitals'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-rose-600'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            ICU Beds
          </button>
        </div>
      </div>

      <div className="px-4 pt-3 space-y-4">
        {/* Urgent Bed & Ambulance Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-red-600 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0">
              <Truck className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold leading-tight">Need an Ambulance or Urgent Bed?</h3>
              </div>
              <p className="text-[11px] text-rose-100 mt-0.5">
                19 ICU beds & 44 Oxygen beds live in 5km radius
              </p>
            </div>
          </div>
          <button
            onClick={onOpenEmergencyModal}
            className="px-3 py-1.5 rounded-full bg-white text-rose-700 text-xs font-extrabold shadow-sm active:scale-95 transition-transform flex-shrink-0"
          >
            Emergency 108
          </button>
        </div>

        {activeView === 'doctors' ? (
          <>
            {/* Search Box */}
            <div className="relative">
              <div className="flex items-center w-full h-11 px-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <Search className="w-4 h-4 text-[#007dab] mr-2.5 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctor name, specialty, or clinic..."
                  className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Specialty Pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {specialties.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedSpecialty === spec.id
                      ? 'bg-[#006388] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {spec.label}
                </button>
              ))}
            </div>

            {/* Consultation Mode Filter */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                Showing {filteredDoctors.length} Specialists
              </span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 text-[11px]">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`px-2 py-0.5 rounded-lg font-semibold ${
                    filterMode === 'all' ? 'bg-[#eff4ff] text-[#006388]' : 'text-slate-500'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterMode('clinic')}
                  className={`px-2 py-0.5 rounded-lg font-semibold ${
                    filterMode === 'clinic' ? 'bg-[#eff4ff] text-[#006388]' : 'text-slate-500'
                  }`}
                >
                  In-Clinic
                </button>
                <button
                  onClick={() => setFilterMode('video')}
                  className={`px-2 py-0.5 rounded-lg font-semibold ${
                    filterMode === 'video' ? 'bg-[#eff4ff] text-[#006388]' : 'text-slate-500'
                  }`}
                >
                  Video Call
                </button>
              </div>
            </div>

            {/* Doctor Cards List */}
            <div className="space-y-3">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-xs"
                      />
                      <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">{doc.name}</h3>
                          <p className="text-[11px] font-bold text-[#006388]">{doc.specialty}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{doc.qualifications}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-slate-900">₹{doc.consultationFee}</span>
                          <span className="text-[10px] text-slate-400 block">per consult</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">{doc.hospital}</span>
                        <span>•</span>
                        <span>{doc.distance}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating, Experience & Next Available Tag */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 stroke-none" />
                        {doc.rating}
                      </span>
                      <span className="text-slate-400 font-normal">({doc.reviewsCount})</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600 font-medium">{doc.experience} yrs exp</span>
                    </div>

                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {doc.nextAvailable}
                    </span>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      {doc.inClinic && (
                        <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-500" />
                          Clinic Visit
                        </span>
                      )}
                      {doc.videoConsult && (
                        <span className="bg-sky-50 text-[#006388] px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                          <Video className="w-3 h-3 text-[#007dab]" />
                          Video Call
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedDoctorForBooking(doc)}
                      className="px-4 py-1.5 rounded-full bg-[#006388] text-white text-xs font-bold hover:bg-[#007dab] active:scale-95 transition-all shadow-xs"
                    >
                      Book Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Live Hospital ICU Bed Tracker */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Hospital & ICU Beds Near You ({hospitals.length})
              </h2>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                Live State Health Portal Sync
              </span>
            </div>

            {hospitals.map((hosp) => (
              <div
                key={hosp.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{hosp.name}</h3>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#007dab]" />
                      {hosp.area} • {hosp.distance}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                    ★ {hosp.rating}
                  </span>
                </div>

                <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  {hosp.emergencyTraumaLevel}
                </div>

                {/* Live Bed Count Badges */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                    <span className="text-sm font-extrabold text-emerald-800 block">{hosp.icuBedsAvailable}</span>
                    <span className="text-[10px] font-semibold text-emerald-700">ICU Beds Free</span>
                  </div>
                  <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                    <span className="text-sm font-extrabold text-blue-800 block">{hosp.oxygenBedsAvailable}</span>
                    <span className="text-[10px] font-semibold text-blue-700">Oxygen Beds</span>
                  </div>
                  <div className="p-2 rounded-xl bg-purple-50 border border-purple-100">
                    <span className="text-sm font-extrabold text-purple-800 block">{hosp.ventilatorBedsAvailable}</span>
                    <span className="text-[10px] font-semibold text-purple-700">Ventilators</span>
                  </div>
                </div>

                {/* Direct Emergency Call */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Total capacity: {hosp.totalBeds} beds</span>
                  <a
                    href={`tel:${hosp.ambulanceHelpline}`}
                    className="px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Bed Desk</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctor Slot Booking Modal */}
      {selectedDoctorForBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100">
            {/* Modal Header */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Book Doctor Appointment</h3>
                <p className="text-[10px] text-slate-500">Instant confirmed token & reminders</p>
              </div>
              <button
                onClick={() => setSelectedDoctorForBooking(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto no-scrollbar space-y-4 text-xs bg-[#f8f9ff]">
              {/* Doctor Brief */}
              <div className="p-3 rounded-2xl bg-white border border-slate-100 flex items-center gap-3">
                <img
                  src={selectedDoctorForBooking.avatar}
                  alt={selectedDoctorForBooking.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{selectedDoctorForBooking.name}</h4>
                  <p className="text-[#006388] font-semibold text-[11px]">{selectedDoctorForBooking.specialty}</p>
                  <p className="text-slate-400 text-[10px]">{selectedDoctorForBooking.hospital}</p>
                </div>
              </div>

              {/* Consultation Type */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 text-xs block">Choose Consultation Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConsultMode('clinic')}
                    className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                      consultMode === 'clinic'
                        ? 'border-[#007dab] bg-[#eff4ff] text-[#006388] font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <Building className="w-4 h-4 text-[#007dab]" />
                    <span className="text-[11px]">In-Clinic Visit</span>
                    <span className="text-[10px] text-slate-400 font-normal">At {selectedDoctorForBooking.hospital.split(',')[0]}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultMode('video')}
                    className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                      consultMode === 'video'
                        ? 'border-[#007dab] bg-[#eff4ff] text-[#006388] font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <Video className="w-4 h-4 text-[#007dab]" />
                    <span className="text-[11px]">Video Consultation</span>
                    <span className="text-[10px] text-slate-400 font-normal">HD Teleconsult on App</span>
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 text-xs block">Select Date</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Today', 'Tomorrow', 'Day After'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setBookingDate(d)}
                      className={`py-2 rounded-xl border text-center text-xs font-bold transition-all ${
                        bookingDate === d
                          ? 'border-[#007dab] bg-[#006388] text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800 text-xs block">Available Time Slots</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    ...selectedDoctorForBooking.slots.morning,
                    ...selectedDoctorForBooking.slots.afternoon,
                    ...selectedDoctorForBooking.slots.evening,
                  ].slice(0, 6).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-1 rounded-xl border text-center text-[11px] font-bold transition-all ${
                        selectedTimeSlot === slot
                          ? 'border-[#007dab] bg-[#eff4ff] text-[#006388]'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee Summary */}
              <div className="p-3 rounded-2xl bg-white border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-[11px] block">Consultation Fee</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Includes free follow-up for 7 days</span>
                </div>
                <span className="text-base font-extrabold text-slate-900">₹{selectedDoctorForBooking.consultationFee}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedDoctorForBooking(null)}
                className="flex-1 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="flex-1 py-2.5 rounded-full bg-[#006388] text-white text-xs font-bold text-center hover:bg-[#007dab] shadow-md active:scale-95 transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
