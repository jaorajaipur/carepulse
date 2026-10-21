import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
  Medicine,
  DiagnosticPackage,
  Doctor,
  HomeNurse,
  MedicalEquipment,
  BloodBank,
  BloodDonor
} from '../../types';
import {
  Plus,
  Trash2,
  Database,
  Pill,
  TestTube2,
  Stethoscope,
  X,
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  HeartPulse,
  Droplet,
  ExternalLink,
  Table,
  Eye
} from 'lucide-react';

interface AdminManagementViewProps {
  medicines: Medicine[];
  packages: DiagnosticPackage[];
  doctors: Doctor[];
  nurses?: HomeNurse[];
  equipment?: MedicalEquipment[];
  bloodBanks?: BloodBank[];
  donors?: BloodDonor[];
  onAddMedicine: (med: Medicine) => Promise<void> | void;
  onDeleteMedicine: (id: string) => Promise<void> | void;
  onBulkAddMedicines?: (meds: Medicine[]) => Promise<void> | void;
  onAddPackage: (pkg: DiagnosticPackage) => Promise<void> | void;
  onDeletePackage: (id: string) => Promise<void> | void;
  onBulkAddPackages?: (pkgs: DiagnosticPackage[]) => Promise<void> | void;
  onAddDoctor: (doc: Doctor) => Promise<void> | void;
  onDeleteDoctor: (id: string) => Promise<void> | void;
  onBulkAddDoctors?: (docs: Doctor[]) => Promise<void> | void;
  onBulkAddNurses?: (nurses: HomeNurse[]) => Promise<void> | void;
  onBulkAddEquipment?: (equip: MedicalEquipment[]) => Promise<void> | void;
  onBulkAddBloodBanks?: (banks: BloodBank[]) => Promise<void> | void;
  onBulkAddDonors?: (donors: BloodDonor[]) => Promise<void> | void;
  onSeedToFirestore?: () => Promise<void>;
  isSyncing?: boolean;
  onClose: () => void;
}

type ImportCategory = 'doctors' | 'packages' | 'medicines' | 'home_care' | 'blood_bank';

export const AdminManagementView: React.FC<AdminManagementViewProps> = ({
  medicines,
  packages,
  doctors,
  nurses = [],
  equipment = [],
  bloodBanks = [],
  donors = [],
  onAddMedicine,
  onDeleteMedicine,
  onBulkAddMedicines,
  onAddPackage,
  onDeletePackage,
  onBulkAddPackages,
  onAddDoctor,
  onDeleteDoctor,
  onBulkAddDoctors,
  onBulkAddNurses,
  onBulkAddEquipment,
  onBulkAddBloodBanks,
  onBulkAddDonors,
  onSeedToFirestore,
  isSyncing = false,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'medicines' | 'packages' | 'doctors' | 'excel_import'>('excel_import');
  const [showAddForm, setShowAddForm] = useState(false);

  // Excel Bulk Import States
  const [selectedCategory, setSelectedCategory] = useState<ImportCategory>('doctors');
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states for manual additions
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

  // Sample templates configuration
  const templateConfig: Record<
    ImportCategory,
    {
      title: string;
      downloadUrl: string;
      fileName: string;
      columns: { key: string; label: string; desc: string; sample: string }[];
    }
  > = {
    doctors: {
      title: 'Doctors Directory Template',
      downloadUrl: '/sample_templates/sample_doctors.csv',
      fileName: 'sample_doctors.csv',
      columns: [
        { key: 'name', label: 'Doctor Name', desc: 'Full doctor name with Dr. prefix', sample: 'Dr. Arvind Krishnan' },
        { key: 'specialty', label: 'Specialty', desc: 'Cardiologist, Dermatologist, etc.', sample: 'Cardiologist' },
        { key: 'qualifications', label: 'Qualifications', desc: 'Degrees & Fellowships', sample: 'MBBS, MD, DM' },
        { key: 'experience', label: 'Experience', desc: 'Years in practice (number)', sample: '15' },
        { key: 'hospital', label: 'Hospital/Clinic', desc: 'Affiliated hospital name & branch', sample: 'Manipal Hospital, Indiranagar' },
        { key: 'consultationFee', label: 'Consult Fee', desc: 'Price in INR (number)', sample: '750' },
        { key: 'image', label: 'Image URL', desc: 'Direct URL to avatar or photo', sample: 'https://images.unsplash.com/... or /assets/stitch/...' },
        { key: 'description', label: 'Description', desc: 'Bio, achievements, areas of focus', sample: 'Senior Interventional Cardiologist...' },
        { key: 'nextAvailable', label: 'Availability', desc: 'Next slot timing text', sample: 'Today, 04:30 PM' },
      ],
    },
    packages: {
      title: 'Lab Test & Diagnostic Packages Template',
      downloadUrl: '/sample_templates/sample_lab_tests.csv',
      fileName: 'sample_lab_tests.csv',
      columns: [
        { key: 'title', label: 'Package Title', desc: 'Name of the test package', sample: 'Comprehensive Metabolic & Liver Panel' },
        { key: 'description', label: 'Description', desc: 'Package summary or clinical overview', sample: 'Measures 32 vital biomarkers...' },
        { key: 'category', label: 'Category', desc: 'fullbody, cardiac, diabetes, thyroid, vitamin, fever, senior', sample: 'fullbody' },
        { key: 'testCount', label: 'Test Count', desc: 'Total number of parameters', sample: '32' },
        { key: 'parameters', label: 'Parameters', desc: 'Comma-separated test names list', sample: 'SGOT, SGPT, Bilirubin, Creatinine' },
        { key: 'price', label: 'Offer Price', desc: 'Discounted price in INR (number)', sample: '799' },
        { key: 'originalPrice', label: 'MRP Price', desc: 'Standard lab MRP (number)', sample: '1800' },
        { key: 'sampleType', label: 'Sample Type', desc: 'Blood, Urine, Swab, etc.', sample: 'Blood & Urine' },
        { key: 'fastingHours', label: 'Fasting (Hours)', desc: '0 for no fasting, or 10-12', sample: '10' },
        { key: 'accreditedLab', label: 'Accredited Lab', desc: 'Name of lab provider', sample: 'Apollo Diagnostics & NABL Labs' },
      ],
    },
    medicines: {
      title: 'Pharmacy Medicines Template',
      downloadUrl: '/sample_templates/sample_pharmacy.csv',
      fileName: 'sample_pharmacy.csv',
      columns: [
        { key: 'name', label: 'Medicine Name', desc: 'Brand name with strength', sample: 'Amoxicillin 500mg (Mox 500)' },
        { key: 'brand', label: 'Brand Manufacturer', desc: 'Pharma manufacturer company', sample: 'Ranbaxy Laboratories' },
        { key: 'composition', label: 'Active Composition', desc: 'Generic molecule name & IP formulation', sample: 'Amoxicillin Trihydrate IP (500mg)' },
        { key: 'category', label: 'Category', desc: 'Antibiotics, Diabetes Care, Cardiac & BP, etc.', sample: 'Antibiotics' },
        { key: 'packSize', label: 'Pack Size', desc: 'Strip, bottle or pack packaging', sample: 'Strip of 10 Capsules' },
        { key: 'price', label: 'Selling Price', desc: 'Discounted selling price (number)', sample: '85' },
        { key: 'originalPrice', label: 'MRP', desc: 'Original package MRP (number)', sample: '108' },
        { key: 'image', label: 'Image URL', desc: 'Product photograph image link', sample: 'https://images.unsplash.com/...' },
        { key: 'description', label: 'Description', desc: 'Dosage instructions & indications', sample: 'Broad spectrum antibiotic for ENT...' },
        { key: 'requiresPrescription', label: 'Rx Required', desc: 'TRUE or FALSE', sample: 'TRUE' },
      ],
    },
    home_care: {
      title: 'Home Care (Nurses & Equipment) Template',
      downloadUrl: '/sample_templates/sample_home_care.csv',
      fileName: 'sample_home_care.csv',
      columns: [
        { key: 'name', label: 'Name / Item', desc: 'Nurse name or Equipment model', sample: 'Sister Anitha Thomas' },
        { key: 'type', label: 'Type', desc: 'Nurse OR Equipment', sample: 'Nurse' },
        { key: 'role_or_category', label: 'Role / Category', desc: 'ICU Nurse, Elderly Care, Oxygen, Beds, Mobility', sample: 'Critical Care ICU Nurse' },
        { key: 'qualifications_or_specs', label: 'Qualifications/Specs', desc: 'Degrees or hardware specifications', sample: 'B.Sc Nursing, Critical Care Cert' },
        { key: 'experience_or_brand', label: 'Experience / Brand', desc: 'Years experience (nurse) or brand (equipment)', sample: '10' },
        { key: 'rate_or_price', label: 'Rate (INR)', desc: 'Daily rate for nurse / Monthly rent for item', sample: '1900' },
        { key: 'image', label: 'Image URL', desc: 'Profile photo or product photo', sample: 'https://images.unsplash.com/...' },
        { key: 'description', label: 'Description', desc: 'Skills, care notes, or equipment details', sample: 'Experienced ICU nurse skilled in tracheostomy...' },
      ],
    },
    blood_bank: {
      title: 'Emergency Blood Bank & Donors Template',
      downloadUrl: '/sample_templates/sample_blood_bank.csv',
      fileName: 'sample_blood_bank.csv',
      columns: [
        { key: 'name', label: 'Name', desc: 'Blood bank center or Voluntary donor name', sample: 'Fortis Hospital Blood Bank' },
        { key: 'type', label: 'Type', desc: 'BloodBank OR Donor', sample: 'BloodBank' },
        { key: 'bloodGroup', label: 'Blood Group', desc: 'O+, O-, A+, A-, B+, B-, AB+, AB-', sample: 'O+' },
        { key: 'units_or_availability', label: 'Units / Status', desc: 'Units in stock (number) or Immediate / On Call', sample: '16' },
        { key: 'area', label: 'Area / Location', desc: 'Neighborhood or hospital branch', sample: 'Cunningham Road, Vasanth Nagar' },
        { key: 'distanceKm', label: 'Distance (KM)', desc: 'Distance in kilometers (number)', sample: '4.2' },
        { key: 'phone', label: 'Helpline / Phone', desc: 'Direct emergency telephone number', sample: '+91 80 4199 4444' },
        { key: 'description', label: 'Description', desc: 'Facility details, accreditations, or donor fitness', sample: '24x7 NABH accredited regional blood center...' },
      ],
    },
  };

  // Handle file selection and parsing (XLSX, XLS, CSV)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessingFile(true);
    setImportStatus(null);

    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (!jsonData || jsonData.length === 0) {
          setImportStatus('No rows found in the uploaded spreadsheet. Please check the file format.');
          setParsedRows([]);
        } else {
          setParsedRows(jsonData);
          setImportStatus(`Successfully parsed ${jsonData.length} row(s). Review below before importing.`);
        }
      } catch (err: any) {
        console.error('Excel parse error:', err);
        setImportStatus(`Error parsing spreadsheet: ${err.message || 'Invalid format'}`);
        setParsedRows([]);
      } finally {
        setIsProcessingFile(false);
      }
    };

    reader.onerror = () => {
      setImportStatus('Failed to read the file.');
      setIsProcessingFile(false);
    };

    reader.readAsBinaryString(file);
  };

  // Commit Parsed Rows into App State and Firestore
  const handleCommitImport = async () => {
    if (parsedRows.length === 0) return;

    try {
      setIsProcessingFile(true);

      if (selectedCategory === 'doctors') {
        const newDoctors: Doctor[] = parsedRows.map((row, idx) => ({
          id: `doc-excel-${Date.now()}-${idx}`,
          name: row.name || `Dr. ${row.Doctor_Name || 'Specialist'}`,
          specialty: row.specialty || row.Specialty || 'General Physician',
          subSpecialty: `${row.specialty || 'General'} Specialist`,
          qualifications: row.qualifications || 'MBBS, MD',
          experience: Number(row.experience) || 8,
          rating: 4.8,
          reviewsCount: Math.floor(80 + Math.random() * 200),
          hospital: row.hospital || 'Apollo Clinic, Bengaluru',
          distance: '2.1 km',
          consultationFee: Number(row.consultationFee || row.fee || row.price) || 600,
          nextAvailable: row.nextAvailable || 'Today, 04:30 PM',
          avatar: row.image || row.avatar || '/assets/stitch/male_doctor.png',
          about: row.description || row.about || 'Certified medical doctor committed to patient wellness.',
          languages: ['English', 'Hindi', 'Kannada'],
          inClinic: true,
          videoConsult: true,
          slots: {
            morning: ['10:00 AM', '11:00 AM'],
            afternoon: ['02:30 PM', '03:30 PM'],
            evening: ['05:00 PM', '06:00 PM'],
          },
        }));

        if (onBulkAddDoctors) {
          await onBulkAddDoctors(newDoctors);
        } else {
          for (const d of newDoctors) {
            await onAddDoctor(d);
          }
        }
        setImportStatus(`🎉 Successfully imported ${newDoctors.length} doctors into the directory!`);
      } else if (selectedCategory === 'packages') {
        const newPackages: DiagnosticPackage[] = parsedRows.map((row, idx) => {
          const rawParams = row.parameters ? String(row.parameters).split(',').map((p) => p.trim()) : ['Complete Biomarker Panel'];
          const price = Number(row.price || row.offerPrice) || 699;
          const originalPrice = Number(row.originalPrice || row.mrp) || price * 1.8;
          const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

          return {
            id: `pkg-excel-${Date.now()}-${idx}`,
            title: row.title || row.name || 'Diagnostic Health Screening',
            tagline: row.description || row.tagline || 'Comprehensive diagnostic testing package',
            category: (row.category || 'fullbody').toLowerCase() as any,
            testCount: Number(row.testCount) || rawParams.length,
            parameters: rawParams,
            popularFor: 'Annual health check, preventive screening',
            fastingHours: Number(row.fastingHours) || 0,
            reportTimeHours: Number(row.reportTimeHours) || 6,
            sampleType: row.sampleType || 'Blood & Urine',
            price,
            originalPrice,
            discountPercent: Math.max(0, discount),
            accreditedLab: row.accreditedLab || 'Apollo Diagnostics & NABL Labs',
            homeCollectionFree: true,
            tags: ['NABL Accredited', 'Free Home Collection', 'Fast Report'],
          };
        });

        if (onBulkAddPackages) {
          await onBulkAddPackages(newPackages);
        } else {
          for (const p of newPackages) {
            await onAddPackage(p);
          }
        }
        setImportStatus(`🎉 Successfully imported ${newPackages.length} diagnostic packages into Lab Tests!`);
      } else if (selectedCategory === 'medicines') {
        const newMedicines: Medicine[] = parsedRows.map((row, idx) => {
          const price = Number(row.price || row.sellingPrice) || 85;
          const origPrice = Number(row.originalPrice || row.mrp) || price * 1.25;
          const discount = Math.round(((origPrice - price) / origPrice) * 100);

          return {
            id: `med-excel-${Date.now()}-${idx}`,
            name: row.name || 'CarePulse Medicine',
            brand: row.brand || 'CarePulse Health',
            composition: row.composition || row.name,
            category: row.category || 'Pain Relief & Fever',
            packSize: row.packSize || 'Strip of 10 Tablets',
            price,
            originalPrice: origPrice,
            discountPercent: Math.max(0, discount),
            requiresPrescription: String(row.requiresPrescription).toLowerCase() === 'true',
            deliveryTime: '15 mins',
            stockStatus: 'in_stock',
            image: row.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300',
            dosageRecommendation: row.description || 'Take as advised by physician.',
          };
        });

        if (onBulkAddMedicines) {
          await onBulkAddMedicines(newMedicines);
        } else {
          for (const m of newMedicines) {
            await onAddMedicine(m);
          }
        }
        setImportStatus(`🎉 Successfully imported ${newMedicines.length} medicines into Pharmacy!`);
      } else if (selectedCategory === 'home_care') {
        const newNurses: HomeNurse[] = [];
        const newEquipment: MedicalEquipment[] = [];

        parsedRows.forEach((row, idx) => {
          const isEquip = String(row.type).toLowerCase().includes('equip');
          if (isEquip) {
            newEquipment.push({
              id: `equip-excel-${Date.now()}-${idx}`,
              name: row.name || 'Medical Equipment',
              brand: row.experience_or_brand || 'Meditech',
              category: (row.role_or_category || 'Mobility') as any,
              monthlyRentalPrice: Number(row.rate_or_price) || 2500,
              purchasePrice: (Number(row.rate_or_price) || 2500) * 8,
              availableForRent: true,
              specs: [row.qualifications_or_specs || 'High precision medical grade'],
              depositAmount: 3000,
              image: row.image || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=300',
              deliveryHours: 2,
            });
          } else {
            newNurses.push({
              id: `nurse-excel-${Date.now()}-${idx}`,
              name: row.name || 'Care Specialist',
              role: (row.role_or_category || 'Critical Care ICU Nurse') as any,
              qualifications: row.qualifications_or_specs || 'B.Sc Nursing',
              experienceYears: Number(row.experience_or_brand) || 6,
              rating: 4.9,
              reviewsCount: 120,
              dailyShiftRate: Number(row.rate_or_price) || 1600,
              avatar: row.image || 'https://images.unsplash.com/photo-1594824813575-f376a91176bc?auto=format&fit=crop&q=80&w=300',
              languages: ['English', 'Hindi', 'Kannada'],
              verifiedBackground: true,
              skills: ['Patient Care', 'Medication Management', 'Bedside Vitals'],
            });
          }
        });

        if (newNurses.length > 0 && onBulkAddNurses) {
          await onBulkAddNurses(newNurses);
        }
        if (newEquipment.length > 0 && onBulkAddEquipment) {
          await onBulkAddEquipment(newEquipment);
        }
        setImportStatus(`🎉 Successfully imported ${newNurses.length} nurse(s) and ${newEquipment.length} equipment item(s)!`);
      } else if (selectedCategory === 'blood_bank') {
        const newBanks: BloodBank[] = [];
        const newDonors: BloodDonor[] = [];

        parsedRows.forEach((row, idx) => {
          const isBank = String(row.type).toLowerCase().includes('bank');
          if (isBank) {
            newBanks.push({
              id: `bb-excel-${Date.now()}-${idx}`,
              name: row.name || 'City Blood Bank',
              area: row.area || 'Indiranagar',
              distanceKm: Number(row.distanceKm) || 2.5,
              open24x7: true,
              helpline: row.phone || '+91 80 2502 4444',
              lastUpdated: 'Just now (Excel import)',
              stock: {
                [row.bloodGroup || 'O+']: Number(row.units_or_availability) || 15,
                'O+': 20,
                'A+': 12,
                'B+': 18,
              },
              address: row.description || row.area || 'Bengaluru',
            });
          } else {
            newDonors.push({
              id: `donor-excel-${Date.now()}-${idx}`,
              name: row.name || 'Voluntary Donor',
              bloodGroup: row.bloodGroup || 'O+',
              distanceKm: Number(row.distanceKm) || 1.8,
              lastDonationDaysAgo: 100,
              verified: true,
              phone: row.phone || '+91 98450 12891',
              area: row.area || 'Indiranagar',
              availability: (row.units_or_availability || 'Immediate') as any,
            });
          }
        });

        if (newBanks.length > 0 && onBulkAddBloodBanks) {
          await onBulkAddBloodBanks(newBanks);
        }
        if (newDonors.length > 0 && onBulkAddDonors) {
          await onBulkAddDonors(newDonors);
        }
        setImportStatus(`🎉 Successfully imported ${newBanks.length} blood bank(s) and ${newDonors.length} donor(s)!`);
      }

      setParsedRows([]);
      setFileName(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      console.error('Import commit error:', err);
      setImportStatus(`Failed during import: ${err.message}`);
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleDownloadSample = () => {
    const config = templateConfig[selectedCategory];
    const link = document.createElement('a');
    link.href = config.downloadUrl;
    link.setAttribute('download', config.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end sm:justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-[#006388] to-[#007dab] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">CarePulse Admin Studio</h3>
              <p className="text-[10px] text-cyan-100">Excel Bulk Uploader & Cloud Inventory</p>
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
        <div className="px-4 py-2 bg-[#eff4ff] border-b border-[#dce9ff] flex items-center justify-between text-xs">
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
              <span>{isSyncing ? 'Syncing...' : 'Sync All to Cloud'}</span>
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="px-3 pt-2 flex items-center gap-1 border-b border-slate-100 bg-white overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              setActiveTab('excel_import');
              setShowAddForm(false);
            }}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'excel_import'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Excel Bulk Upload</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('doctors');
              setShowAddForm(false);
            }}
            className={`px-2.5 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'doctors'
                ? 'border-[#007dab] text-[#006388]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctors ({doctors.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('packages');
              setShowAddForm(false);
            }}
            className={`px-2.5 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'packages'
                ? 'border-[#007dab] text-[#006388]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <TestTube2 className="w-3.5 h-3.5" />
            <span>Tests ({packages.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('medicines');
              setShowAddForm(false);
            }}
            className={`px-2.5 py-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'medicines'
                ? 'border-[#007dab] text-[#006388]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Meds ({medicines.length})</span>
          </button>
        </div>

        {/* TAB 1: EXCEL BULK UPLOADER */}
        {activeTab === 'excel_import' && (
          <div className="p-4 overflow-y-auto no-scrollbar space-y-4 flex-1 bg-[#f8f9ff] text-xs">
            {/* Category Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
                1. Select Category for Excel Upload
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {[
                  { id: 'doctors' as ImportCategory, label: 'Doctors', icon: Stethoscope },
                  { id: 'packages' as ImportCategory, label: 'Lab Tests', icon: TestTube2 },
                  { id: 'medicines' as ImportCategory, label: 'Pharmacy Meds', icon: Pill },
                  { id: 'home_care' as ImportCategory, label: 'Home Nursing', icon: HeartPulse },
                  { id: 'blood_bank' as ImportCategory, label: 'Blood Bank', icon: Droplet },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setParsedRows([]);
                      setFileName(null);
                      setImportStatus(null);
                    }}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      selectedCategory === cat.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <cat.icon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="text-[11px] truncate">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Template Card with Direct Download */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    {templateConfig[selectedCategory].title}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Contains headers, data types, image URLs and description fields
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadSample}
                  className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-xs flex items-center gap-1 active:scale-95 transition-all"
                >
                  <Download className="w-3 h-3" />
                  <span>Download Sample</span>
                </button>
              </div>

              {/* Sample Columns Format Reference Table */}
              <div className="mt-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-600 block mb-1">
                  Expected Column Names & Format:
                </span>
                <div className="max-h-36 overflow-y-auto no-scrollbar border border-slate-100 rounded-xl bg-slate-50">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-slate-200/70 text-slate-700 sticky top-0">
                      <tr>
                        <th className="p-1.5 font-bold">Column</th>
                        <th className="p-1.5 font-bold">Description</th>
                        <th className="p-1.5 font-bold">Sample Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {templateConfig[selectedCategory].columns.map((col, idx) => (
                        <tr key={idx} className="hover:bg-white/60">
                          <td className="p-1.5 font-mono font-bold text-[#006388]">{col.key}</td>
                          <td className="p-1.5 text-slate-600">{col.desc}</td>
                          <td className="p-1.5 font-medium text-slate-800 truncate max-w-[120px]">{col.sample}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Upload Area for .xlsx, .xls, .csv */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <label className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
                2. Upload Your Filled Spreadsheet (.xlsx, .xls, .csv)
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="excel-file-upload"
              />

              <label
                htmlFor="excel-file-upload"
                className="w-full py-5 border-2 border-dashed border-emerald-300 rounded-2xl bg-emerald-50/40 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-emerald-50 transition-all text-center"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-emerald-700">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-950">
                  {fileName ? fileName : 'Tap to Browse or Drop Excel/CSV File'}
                </span>
                <span className="text-[10px] text-slate-500">
                  Supports Microsoft Excel (.xlsx / .xls) and standard comma-separated (.csv)
                </span>
              </label>
            </div>

            {/* Status Message */}
            {importStatus && (
              <div
                className={`p-3 rounded-2xl border text-xs flex items-start gap-2 ${
                  importStatus.includes('Error') || importStatus.includes('Failed')
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{importStatus}</span>
              </div>
            )}

            {/* Parsed Preview Table & Commit Button */}
            {parsedRows.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Pre-Import Verification ({parsedRows.length} Rows)
                    </h4>
                    <p className="text-[10px] text-slate-500">Ready to save into {selectedCategory} and Firestore</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                    Parsed Valid
                  </span>
                </div>

                {/* Micro preview list */}
                <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
                  {parsedRows.slice(0, 5).map((row, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 text-[11px]"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {row.image && (
                          <img
                            src={row.image}
                            alt=""
                            className="w-7 h-7 rounded-lg object-cover flex-shrink-0 border border-slate-200"
                            onError={(e) => {
                              // Fallback on image error
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate">
                            {row.name || row.title || `Item ${idx + 1}`}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {row.description || row.specialty || row.category || 'No description'}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-700 text-xs flex-shrink-0">
                        ₹{row.price || row.consultationFee || row.rate_or_price || row.units_or_availability || 0}
                      </span>
                    </div>
                  ))}

                  {parsedRows.length > 5 && (
                    <p className="text-[10px] text-center text-slate-400 italic">
                      + {parsedRows.length - 5} more items in this sheet
                    </p>
                  )}
                </div>

                {/* Import Confirmation Button */}
                <button
                  type="button"
                  onClick={handleCommitImport}
                  disabled={isProcessingFile}
                  className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Upload className="w-4 h-4" />
                  <span>
                    {isProcessingFile
                      ? 'Importing...'
                      : `Import ${parsedRows.length} Row(s) to Live App & Cloud`}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MEDICINES MANUAL & LIST */}
        {activeTab === 'medicines' && (
          <div className="p-4 overflow-y-auto no-scrollbar space-y-3.5 flex-1 bg-[#f8f9ff] text-xs">
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full py-2.5 rounded-2xl bg-white border-2 border-dashed border-[#007dab]/40 text-[#006388] text-xs font-bold hover:bg-[#eff4ff] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Medicine</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-2xl bg-white border border-[#007dab]/30 shadow-md space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#007dab]" />
                    Add New Medicine
                  </h4>
                  <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                    Cancel
                  </button>
                </div>

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
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Current Inventory ({medicines.length})
              </h4>
              {medicines.map((m) => (
                <div
                  key={m.id}
                  className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-xs flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={m.image} alt={m.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-slate-100" />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-900 truncate">{m.name}</p>
                      <p className="text-[10px] text-slate-400">{m.category} • ₹{m.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteMedicine(m.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PACKAGES MANUAL & LIST */}
        {activeTab === 'packages' && (
          <div className="p-4 overflow-y-auto no-scrollbar space-y-3.5 flex-1 bg-[#f8f9ff] text-xs">
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full py-2.5 rounded-2xl bg-white border-2 border-dashed border-[#007dab]/40 text-[#006388] text-xs font-bold hover:bg-[#eff4ff] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Diagnostic Test Package</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-2xl bg-white border border-[#007dab]/30 shadow-md space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#007dab]" />
                    Add New Lab Package
                  </h4>
                  <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                    Cancel
                  </button>
                </div>

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
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Description / Tagline</label>
                    <input
                      type="text"
                      value={pkgTagline}
                      onChange={(e) => setPkgTagline(e.target.value)}
                      placeholder="e.g. 36 parameter test checking lipid and liver profile"
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
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Diagnostic Packages ({packages.length})
              </h4>
              {packages.map((pkg) => (
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
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DOCTORS MANUAL & LIST */}
        {activeTab === 'doctors' && (
          <div className="p-4 overflow-y-auto no-scrollbar space-y-3.5 flex-1 bg-[#f8f9ff] text-xs">
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full py-2.5 rounded-2xl bg-white border-2 border-dashed border-[#007dab]/40 text-[#006388] text-xs font-bold hover:bg-[#eff4ff] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Doctor</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-2xl bg-white border border-[#007dab]/30 shadow-md space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#007dab]" />
                    Add New Doctor
                  </h4>
                  <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                    Cancel
                  </button>
                </div>

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

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">About Doctor</label>
                    <textarea
                      rows={2}
                      value={docAbout}
                      onChange={(e) => setDocAbout(e.target.value)}
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
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Registered Doctors ({doctors.length})
              </h4>
              {doctors.map((d) => (
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
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Bottom Footer */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">CarePulse Admin Studio • Real-time Cloud Sync</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#006388] text-white text-xs font-bold hover:bg-[#007dab] shadow-xs active:scale-95 transition-all"
          >
            Close Studio
          </button>
        </div>
      </div>
    </div>
  );
};
