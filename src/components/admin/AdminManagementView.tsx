import React, { useState } from 'react';
import { Medicine, DiagnosticPackage, Doctor } from '../../types';
import {
  Plus,
  Trash2,
  Edit2,
  Database,
  CloudUpload,
  CheckCircle2,
  AlertCircle,
  Pill,
  TestTube2,
  Stethoscope,
  X,
  Upload,
  Image as ImageIcon,
  DollarSign,
  Tag,
  Building,
  Star,
  Clock,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface AdminManagementViewProps {
  medicines: Medicine[];
  packages: DiagnosticPackage[];
  doctors: Doctor[];
  onAddMedicine: (med: Medicine) => Promise<void> | void;
  onDeleteMedicine: (id: string) => Promise<void> | void;
  onAddPackage: (pkg: DiagnosticPackage) => Promise<void> | void;
  onDeletePackage: (id: string) => Promise<void> | void;
  onAddDoctor: (doc: Doctor) => Promise<void> | void;
  onDeleteDoctor: (id: string) => Promise<void> | void;
  onSeedToFirestore?: () => Promise<void>;
  isSyncing?: boolean;
  onClose: () => void;
}

export const AdminManagementView: React.FC<AdminManagementViewProps> = ({
  medicines,
  packages,
  doctors,
  onAddMedicine,
  onDeleteMedicine,
  onAddPackage,
  onDeletePackage,
  onAddDoctor,
  onDeleteDoctor,
  onSeedToFirestore,
  isSyncing = false,
  onClose,
}) => {
  const [activeSection, setActiveSection] = useState<'medicines' | 'packages' | 'doctors'>('medicines');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states for Medicine
  const [medName, setMedName] = useState('');
  const [medBrand, setMedBrand] = useState('');
  const [medComposition, setMedComposition] = useState('');
  const [medCategory, setMedCategory] = useState('Pain Relief & Fever');
  const [medPrice, setMedPrice] = useState('120');
  const [medOriginalPrice, setMedOriginalPrice] = useState('150');
  const [medPackSize, setMedPackSize] = useState('Strip of 10 Tablets');
  const [medRequiresRx, setMedRequiresRx] = useState(false);
  const [medImage, setMedImage] = useState('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300');
  const [medDosage, setMedDosage] = useState('1 tablet twice daily after meals');

  // Form states for Diagnostic Package
  const [pkgTitle, setPkgTitle] = useState('');
  const [pkgTagline, setPkgTagline] = useState('');
  const [pkgCategory, setPkgCategory] = useState<'fullbody' | 'diabetes' | 'cardiac' | 'thyroid' | 'vitamin' | 'fever' | 'senior'>('fullbody');
  const [pkgTestCount, setPkgTestCount] = useState('24');
  const [pkgParametersStr, setPkgParametersStr] = useState('Complete Blood Count (CBC), Lipid Profile, Liver Function Test');
  const [pkgPrice, setPkgPrice] = useState('799');
  const [pkgOriginalPrice, setPkgOriginalPrice] = useState('1800');
  const [pkgFasting, setPkgFasting] = useState('10');
  const [pkgReportHours, setPkgReportHours] = useState('6');
  const [pkgSampleType, setPkgSampleType] = useState('Blood & Urine');
  const [pkgLab, setPkgLab] = useState('Apollo Diagnostics & NABL Labs');

  // Form states for Doctor
  const [docName, setDocName] = useState('');
  const [docSpecialty, setDocSpecialty] = useState('General Physician');
  const [docQual, setDocQual] = useState('MBBS, MD');
  const [docExp, setDocExp] = useState('10');
  const [docHospital, setDocHospital] = useState('Apollo Clinic, Indiranagar');
  const [docFee, setDocFee] = useState('600');
  const [docAvatar, setDocAvatar] = useState('/assets/stitch/male_doctor.png');
  const [docAbout, setDocAbout] = useState('Compassionate physician specialized in preventive health.');

  const handleCreateMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName) return;
    const price = Number(medPrice) || 99;
    const origPrice = Number(medOriginalPrice) || price * 1.25;
    const discount = Math.round(((origPrice - price) / origPrice) * 100);

    const newMed: Medicine = {
      id: `med-${Date.now()}`,
      name: medName,
      brand: medBrand || 'CarePulse Essentials',
      composition: medComposition || medName,
      category: medCategory,
      packSize: medPackSize,
      price,
      originalPrice: origPrice,
      discountPercent: Math.max(0, discount),
      requiresPrescription: medRequiresRx,
      deliveryTime: '15 mins',
      stockStatus: 'in_stock',
      image: medImage,
      dosageRecommendation: medDosage,
    };

    await onAddMedicine(newMed);
    setShowAddForm(false);
    setMedName('');
    setMedComposition('');
  };

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgTitle) return;
    const price = Number(pkgPrice) || 699;
    const origPrice = Number(pkgOriginalPrice) || price * 2;
    const discount = Math.round(((origPrice - price) / origPrice) * 100);
    const paramList = pkgParametersStr.split(',').map((p) => p.trim()).filter(Boolean);

    const newPkg: DiagnosticPackage = {
      id: `pkg-${Date.now()}`,
      title: pkgTitle,
      tagline: pkgTagline || 'Diagnostic screening package with home collection',
      category: pkgCategory,
      testCount: Number(pkgTestCount) || paramList.length,
      parameters: paramList.length > 0 ? paramList : ['Complete Blood Profile', 'Metabolic Panel'],
      popularFor: 'Routine checkup & preventive screening',
      fastingHours: Number(pkgFasting) || 0,
      reportTimeHours: Number(pkgReportHours) || 6,
      sampleType: pkgSampleType,
      price,
      originalPrice: origPrice,
      discountPercent: Math.max(0, discount),
      accreditedLab: pkgLab,
      homeCollectionFree: true,
      tags: ['NABL Certified', 'Free Home Collection', 'Fast Report'],
    };

    await onAddPackage(newPkg);
    setShowAddForm(false);
    setPkgTitle('');
    setPkgTagline('');
  };

  const handleCreateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName) return;

    const newDoc: Doctor = {
      id: `doc-${Date.now()}`,
      name: docName.startsWith('Dr.') ? docName : `Dr. ${docName}`,
      specialty: docSpecialty,
      subSpecialty: `${docSpecialty} Consultant`,
      experience: Number(docExp) || 8,
      qualifications: docQual,
      rating: 4.9,
      reviewsCount: 150,
      hospital: docHospital,
      distance: '1.8 km',
      consultationFee: Number(docFee) || 600,
      nextAvailable: 'Today, 05:00 PM',
      avatar: docAvatar,
      about: docAbout,
      languages: ['English', 'Hindi', 'Kannada'],
      inClinic: true,
      videoConsult: true,
      slots: {
        morning: ['10:00 AM', '11:00 AM'],
        afternoon: ['02:30 PM', '03:30 PM'],
        evening: ['05:00 PM', '06:00 PM'],
      },
    };

    await onAddDoctor(newDoc);
    setShowAddForm(false);
    setDocName('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-[#006388] to-[#007dab] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">CarePulse Admin Studio</h3>
              <p className="text-[10px] text-cyan-100">Live Inventory & Firestore Database Manager</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sync Status & Seed Action Bar */}
        <div className="px-4 py-2.5 bg-[#eff4ff] border-b border-[#dce9ff] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#006388] font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Firestore Connected</span>
          </div>

          {onSeedToFirestore && (
            <button
              onClick={onSeedToFirestore}
              disabled={isSyncing}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#007dab]/30 text-[#006388] text-[10px] font-bold hover:bg-white/90 active:scale-95 transition-all shadow-xs"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Catalog to Cloud'}</span>
            </button>
          )}
        </div>

        {/* Entity Tabs (Medicines / Tests / Doctors) */}
        <div className="px-4 pt-2.5 flex items-center gap-1.5 border-b border-slate-100 bg-white">
          <button
            onClick={() => {
              setActiveSection('medicines');
              setShowAddForm(false);
            }}
            className={`flex-1 py-2 text-center text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeSection === 'medicines'
                ? 'border-[#007dab] text-[#006388]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Meds ({medicines.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveSection('packages');
              setShowAddForm(false);
            }}
            className={`flex-1 py-2 text-center text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeSection === 'packages'
                ? 'border-[#007dab] text-[#006388]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <TestTube2 className="w-3.5 h-3.5" />
            <span>Tests ({packages.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveSection('doctors');
              setShowAddForm(false);
            }}
            className={`flex-1 py-2 text-center text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeSection === 'doctors'
                ? 'border-[#007dab] text-[#006388]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctors ({doctors.length})</span>
          </button>
        </div>

        {/* Content Container */}
        <div className="p-4 overflow-y-auto no-scrollbar space-y-3.5 flex-1 bg-[#f8f9ff]">
          {/* Action to Toggle Add New Form */}
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-2.5 rounded-2xl bg-white border-2 border-dashed border-[#007dab]/40 text-[#006388] text-xs font-bold hover:bg-[#eff4ff] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>
                Add New {activeSection === 'medicines' ? 'Medicine' : activeSection === 'packages' ? 'Diagnostic Test' : 'Doctor'}
              </span>
            </button>
          ) : (
            /* Create Form Card */
            <div className="p-3.5 rounded-2xl bg-white border border-[#007dab]/30 shadow-md space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#007dab]" />
                  Add New {activeSection === 'medicines' ? 'Medicine' : activeSection === 'packages' ? 'Diagnostic Test' : 'Doctor'}
                </h4>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>

              {/* MEDICINE FORM */}
              {activeSection === 'medicines' && (
                <form onSubmit={handleCreateMedicine} className="space-y-2.5 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Medicine Name</label>
                    <input
                      type="text"
                      required
                      value={medName}
                      onChange={(e) => setMedName(e.target.value)}
                      placeholder="e.g. Amoxicillin 500mg"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Brand</label>
                      <input
                        type="text"
                        value={medBrand}
                        onChange={(e) => setMedBrand(e.target.value)}
                        placeholder="e.g. Cipla / Sun Pharma"
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Category</label>
                      <select
                        value={medCategory}
                        onChange={(e) => setMedCategory(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                      >
                        <option value="Pain Relief & Fever">Pain Relief & Fever</option>
                        <option value="Diabetes Care">Diabetes Care</option>
                        <option value="Cardiac & BP">Cardiac & BP</option>
                        <option value="Vitamins & Immunity">Vitamins & Immunity</option>
                        <option value="Gastroenterology">Gastroenterology</option>
                        <option value="Antibiotics">Antibiotics</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Selling Price (₹)</label>
                      <input
                        type="number"
                        required
                        value={medPrice}
                        onChange={(e) => setMedPrice(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Original MRP (₹)</label>
                      <input
                        type="number"
                        value={medOriginalPrice}
                        onChange={(e) => setMedOriginalPrice(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Image URL</label>
                    <input
                      type="text"
                      value={medImage}
                      onChange={(e) => setMedImage(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold text-slate-700">Requires Prescription (Rx)</span>
                    <input
                      type="checkbox"
                      checked={medRequiresRx}
                      onChange={(e) => setMedRequiresRx(e.target.checked)}
                      className="w-4 h-4 accent-[#007dab] rounded"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-full bg-[#006388] text-white text-xs font-bold hover:bg-[#007dab] shadow-md mt-1"
                  >
                    Save Medicine
                  </button>
                </form>
              )}

              {/* DIAGNOSTIC PACKAGE FORM */}
              {activeSection === 'packages' && (
                <form onSubmit={handleCreatePackage} className="space-y-2.5 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Package Title</label>
                    <input
                      type="text"
                      required
                      value={pkgTitle}
                      onChange={(e) => setPkgTitle(e.target.value)}
                      placeholder="e.g. Executive Cardiac & Cholesterol Panel"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Short Description / Tagline</label>
                    <input
                      type="text"
                      value={pkgTagline}
                      onChange={(e) => setPkgTagline(e.target.value)}
                      placeholder="e.g. 36 parameter test checking lipid profile and liver"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Category</label>
                      <select
                        value={pkgCategory}
                        onChange={(e) => setPkgCategory(e.target.value as any)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                      >
                        <option value="fullbody">Full Body</option>
                        <option value="cardiac">Cardiac</option>
                        <option value="diabetes">Diabetes</option>
                        <option value="thyroid">Thyroid</option>
                        <option value="vitamin">Vitamin</option>
                        <option value="senior">Senior Care</option>
                        <option value="fever">Fever</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Test Count</label>
                      <input
                        type="number"
                        value={pkgTestCount}
                        onChange={(e) => setPkgTestCount(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Offer Price (₹)</label>
                      <input
                        type="number"
                        required
                        value={pkgPrice}
                        onChange={(e) => setPkgPrice(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Original MRP (₹)</label>
                      <input
                        type="number"
                        value={pkgOriginalPrice}
                        onChange={(e) => setPkgOriginalPrice(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Parameters (Comma separated)</label>
                    <textarea
                      rows={2}
                      value={pkgParametersStr}
                      onChange={(e) => setPkgParametersStr(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-full bg-[#006388] text-white text-xs font-bold hover:bg-[#007dab] shadow-md mt-1"
                  >
                    Save Lab Package
                  </button>
                </form>
              )}

              {/* DOCTOR FORM */}
              {activeSection === 'doctors' && (
                <form onSubmit={handleCreateDoctor} className="space-y-2.5 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Doctor Full Name</label>
                    <input
                      type="text"
                      required
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}
                      placeholder="e.g. Dr. Ramesh Gupta"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Specialty</label>
                      <select
                        value={docSpecialty}
                        onChange={(e) => setDocSpecialty(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                      >
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="General Physician">General Physician</option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Neurologist">Neurologist</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Experience (Years)</label>
                      <input
                        type="number"
                        value={docExp}
                        onChange={(e) => setDocExp(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Consultation Fee (₹)</label>
                      <input
                        type="number"
                        required
                        value={docFee}
                        onChange={(e) => setDocFee(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Hospital / Clinic</label>
                      <input
                        type="text"
                        value={docHospital}
                        onChange={(e) => setDocHospital(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Avatar Image URL</label>
                    <input
                      type="text"
                      value={docAvatar}
                      onChange={(e) => setDocAvatar(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#007dab]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-full bg-[#006388] text-white text-xs font-bold hover:bg-[#007dab] shadow-md mt-1"
                  >
                    Save Doctor
                  </button>
                </form>
              )}
            </div>
          )}

          {/* LIST CURRENT ITEMS */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Current {activeSection === 'medicines' ? 'Medicines' : activeSection === 'packages' ? 'Lab Packages' : 'Doctors'} List
            </h4>

            {activeSection === 'medicines' &&
              medicines.map((m) => (
                <div
                  key={m.id}
                  className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-xs flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={m.image} alt={m.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-900 truncate">{m.name}</p>
                      <p className="text-[10px] text-slate-400">{m.category} • ₹{m.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteMedicine(m.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

            {activeSection === 'packages' &&
              packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-xs flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-slate-900 truncate">{pkg.title}</p>
                    <p className="text-[10px] text-slate-400">{pkg.testCount} parameters • ₹{pkg.price}</p>
                  </div>
                  <button
                    onClick={() => onDeletePackage(pkg.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete package"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

            {activeSection === 'doctors' &&
              doctors.map((d) => (
                <div
                  key={d.id}
                  className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-xs flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={d.avatar} alt={d.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-900 truncate">{d.name}</p>
                      <p className="text-[10px] text-slate-400">{d.specialty} • ₹{d.consultationFee}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteDoctor(d.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete doctor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">All changes instantly sync to App & Firestore</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#006388] text-white text-xs font-bold hover:bg-[#007dab] shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
