import {
  Doctor,
  HospitalBed,
  DiagnosticPackage,
  AccreditedLab,
  PhlebotomistTracker,
  Medicine,
  PrescriptionReview,
  HomeNurse,
  MedicalEquipment,
  BloodBank,
  BloodDonor,
} from '../types';

export const INITIAL_PHLEBOTOMIST_TRACKER: PhlebotomistTracker = {
  id: 'phleb-101',
  name: 'Ramesh Kumar',
  role: 'Senior Phlebotomist • Certified NABL Collector',
  rating: 4.9,
  collectionsCount: 1240,
  vaccinated: true,
  avatar: '/assets/stitch/male_doctor.png',
  phone: '+91 98450 28192',
  vehicle: 'Hero Electric Optima (EV)',
  vehicleNumber: 'KA-03-EK-9482',
  temperatureKit: '4.2°C Cold-Chain Sealed',
  etaMinutes: 14,
  distanceKm: 2.1,
  scheduledTime: '07:30 AM - 08:00 AM (Fasting Sample)',
  orderId: 'CP-LAB-89421',
  patientName: 'Arjun Sharma (32, M)',
  testNames: [
    'Complete Blood Count (CBC - 24 params)',
    'Lipid Profile (Cholesterol, Triglycerides, HDL/LDL)',
    'Fasting Blood Sugar (FBS)',
    'HbA1c Glycated Hemoglobin',
    'Thyroid Profile (T3, T4, TSH Ultra)'
  ],
  status: 'on_the_way',
  entryInstructions: {
    gateCode: 'Gate 2 - Tower B, Flat 402',
    flatNumber: '402, 4th Floor',
    buildingName: 'Sobha Lavender Heights, 12th Main Road',
    arrivalPreference: 'call_before',
    petAlert: true,
    sanitizedTrayRequired: true,
    notes: 'Please buzz intercom 402. Our Golden Retriever is friendly and secured in the balcony.'
  }
};

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ananya Sen',
    specialty: 'Cardiologist',
    subSpecialty: 'Interventional Cardiology & Preventive Health',
    experience: 16,
    qualifications: 'MBBS, MD, DM (Cardiology), FACC',
    rating: 4.9,
    reviewsCount: 428,
    hospital: 'Manipal Hospital, HAL Airport Rd',
    distance: '2.4 km',
    consultationFee: 700,
    nextAvailable: 'Today, 04:30 PM',
    avatar: 'https://images.unsplash.com/photo-1594824813575-f376a91176bc?auto=format&fit=crop&q=80&w=300',
    about: 'Former Senior Fellow at Cleveland Clinic. Specializes in coronary interventions, hypertension management, preventive heart scans, and lipid disorders.',
    languages: ['English', 'Hindi', 'Bengali', 'Kannada'],
    inClinic: true,
    videoConsult: true,
    slots: {
      morning: ['09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM'],
      afternoon: ['02:00 PM', '02:45 PM', '03:30 PM'],
      evening: ['04:30 PM', '05:15 PM', '06:00 PM', '06:45 PM']
    }
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh Varma',
    specialty: 'General Physician',
    subSpecialty: 'Internal Medicine & Diabetes Care',
    experience: 14,
    qualifications: 'MBBS, MD (Medicine), Fellowship in Diabetology (CMC)',
    rating: 4.8,
    reviewsCount: 612,
    hospital: 'Apollo Clinic, 100ft Rd Indiranagar',
    distance: '1.1 km',
    consultationFee: 500,
    nextAvailable: 'Today, 02:15 PM',
    avatar: '/assets/stitch/male_doctor.png',
    about: 'Extensive expertise in acute seasonal infections, lifestyle disease management, thyroid anomalies, and geriatric wellness consultations.',
    languages: ['English', 'Hindi', 'Telugu', 'Kannada'],
    inClinic: true,
    videoConsult: true,
    slots: {
      morning: ['10:00 AM', '10:30 AM', '11:30 AM'],
      afternoon: ['02:15 PM', '03:00 PM', '03:45 PM'],
      evening: ['05:00 PM', '05:30 PM', '06:15 PM', '07:00 PM']
    }
  },
  {
    id: 'doc-3',
    name: 'Dr. Meera Nambiar',
    specialty: 'Pediatrician',
    subSpecialty: 'Child Growth, Immunization & Neonatology',
    experience: 12,
    qualifications: 'MBBS, DCH, DNB (Pediatrics), MRCPCH (UK)',
    rating: 4.9,
    reviewsCount: 384,
    hospital: 'Cloudnine Hospital, Old Airport Rd',
    distance: '3.1 km',
    consultationFee: 650,
    nextAvailable: 'Today, 05:00 PM',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    about: 'Warm, child-friendly pediatrician renowned for newborn assessments, milestone tracking, allergy management, and adolescent medicine.',
    languages: ['English', 'Malayalam', 'Tamil', 'Hindi'],
    inClinic: true,
    videoConsult: true,
    slots: {
      morning: ['09:00 AM', '09:45 AM', '10:30 AM'],
      afternoon: ['01:30 PM', '02:15 PM'],
      evening: ['05:00 PM', '05:45 PM', '06:30 PM', '07:15 PM']
    }
  },
  {
    id: 'doc-4',
    name: 'Dr. Vikramaditya Rao',
    specialty: 'Orthopedic Surgeon',
    subSpecialty: 'Joint Replacement & Sports Medicine',
    experience: 18,
    qualifications: 'MBBS, MS (Ortho), MCh Orth (Dundee, UK)',
    rating: 4.9,
    reviewsCount: 520,
    hospital: 'Fortis Hospital, Cunningham Rd',
    distance: '4.6 km',
    consultationFee: 800,
    nextAvailable: 'Tomorrow, 10:00 AM',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    about: 'Pioneer in minimally invasive arthroscopic surgeries, knee and hip preservation, spinal disc issues, and complex sports trauma rehabilitation.',
    languages: ['English', 'Kannada', 'Hindi', 'Telugu'],
    inClinic: true,
    videoConsult: false,
    slots: {
      morning: ['10:00 AM', '10:45 AM', '11:30 AM'],
      afternoon: ['03:00 PM', '03:45 PM'],
      evening: ['05:30 PM', '06:15 PM']
    }
  },
  {
    id: 'doc-5',
    name: 'Dr. Kavita Desai',
    specialty: 'Dermatologist',
    subSpecialty: 'Clinical Dermatology & Hair Restoration',
    experience: 9,
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    rating: 4.7,
    reviewsCount: 295,
    hospital: 'Kaya Skin Clinic, Indiranagar',
    distance: '0.8 km',
    consultationFee: 600,
    nextAvailable: 'Today, 03:30 PM',
    avatar: 'https://images.unsplash.com/photo-1594824813575-f376a91176bc?auto=format&fit=crop&q=80&w=300',
    about: 'Evidence-based clinician specializing in stubborn acne, eczema, psoriasis, pediatric skin conditions, and PRP hair treatments.',
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    inClinic: true,
    videoConsult: true,
    slots: {
      morning: ['11:00 AM', '11:30 AM'],
      afternoon: ['03:30 PM', '04:15 PM', '04:45 PM'],
      evening: ['06:00 PM', '06:30 PM', '07:00 PM']
    }
  },
  {
    id: 'doc-6',
    name: 'Dr. Sameer Kulkarni',
    specialty: 'Neurologist',
    subSpecialty: 'Stroke, Epilepsy & Migraine Management',
    experience: 15,
    qualifications: 'MBBS, MD, DM (Neurology), Fellow NIMHANS',
    rating: 4.9,
    reviewsCount: 310,
    hospital: 'Sakra World Hospital, Marathahalli',
    distance: '5.2 km',
    consultationFee: 900,
    nextAvailable: 'Tomorrow, 11:30 AM',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    about: 'NIMHANS alumnus with deep clinical expertise in chronic migraine, peripheral neuropathy, cognitive disorders, and vertigo management.',
    languages: ['English', 'Kannada', 'Marathi', 'Hindi'],
    inClinic: true,
    videoConsult: true,
    slots: {
      morning: ['11:30 AM', '12:15 PM'],
      afternoon: ['02:30 PM', '03:15 PM'],
      evening: ['04:45 PM', '05:30 PM']
    }
  }
];

export const MOCK_HOSPITAL_BEDS: HospitalBed[] = [
  {
    id: 'hosp-1',
    name: 'Manipal Hospital, HAL Airport Road',
    area: 'HAL Airport Road, Kodihalli',
    distance: '2.4 km',
    totalBeds: 600,
    icuBedsAvailable: 5,
    oxygenBedsAvailable: 14,
    ventilatorBedsAvailable: 3,
    emergencyTraumaLevel: 'Level 1 Trauma Center • NABH Accredited',
    ambulanceHelpline: '+91 80 2502 4444',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'hosp-2',
    name: 'Apollo Hospital, Seshadripuram & Bannerghatta',
    area: 'Sheshadripuram, Bengaluru',
    distance: '4.8 km',
    totalBeds: 250,
    icuBedsAvailable: 3,
    oxygenBedsAvailable: 8,
    ventilatorBedsAvailable: 1,
    emergencyTraumaLevel: 'Level 1 Cardiac & Stroke Unit • JCI Certified',
    ambulanceHelpline: '1066',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'hosp-3',
    name: 'Fortis Hospital, Cunningham Road',
    area: 'Cunningham Road, Vasanth Nagar',
    distance: '5.1 km',
    totalBeds: 180,
    icuBedsAvailable: 4,
    oxygenBedsAvailable: 11,
    ventilatorBedsAvailable: 2,
    emergencyTraumaLevel: 'Comprehensive Emergency & Acute Neuro Care',
    ambulanceHelpline: '+91 80 4199 4444',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'hosp-4',
    name: 'Sakra World Hospital',
    area: 'Outer Ring Road, Devarabeesanahalli',
    distance: '6.5 km',
    totalBeds: 350,
    icuBedsAvailable: 7,
    oxygenBedsAvailable: 22,
    ventilatorBedsAvailable: 4,
    emergencyTraumaLevel: 'Japanese Healthcare Standards • Level 1 Trauma',
    ambulanceHelpline: '+91 80 4969 4969',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400'
  }
];

export const MOCK_DIAGNOSTIC_PACKAGES: DiagnosticPackage[] = [
  {
    id: 'pkg-1',
    title: 'CarePulse Platinum Full Body Checkup',
    tagline: 'Comprehensive 84-parameter master health screening with vitals & organ profiles',
    category: 'fullbody',
    testCount: 84,
    parameters: [
      'Complete Hemogram (CBC, ESR, Platelets - 24 tests)',
      'Liver Function Test (LFT - Bilirubin, SGOT, SGPT, ALP, Protein - 11 tests)',
      'Kidney Function Test (KFT - Urea, Creatinine, Uric Acid, eGFR - 8 tests)',
      'Lipid Profile (Total Cholesterol, Triglycerides, HDL, LDL, VLDL - 8 tests)',
      'Cardiac Risk Markers (hs-CRP, Homocysteine, Apolipoprotein - 3 tests)',
      'Thyroid Profile Total (T3, T4, TSH Ultra-sensitive - 3 tests)',
      'Diabetes Screen (HbA1c + Fasting Blood Glucose - 2 tests)',
      'Vitamins (Vitamin D3 25-Hydroxy + Vitamin B12 Cyanocobalamin - 2 tests)',
      'Iron Deficiency Profile (Serum Iron, Ferritin, TIBC - 4 tests)',
      'Complete Urine Examination (Physical, Chemical, Microscopic - 15 tests)',
      'Free Physician Video Tele-Consultation included'
    ],
    popularFor: 'Annual health check, age 30+, chronic fatigue, executive screening',
    fastingHours: 10,
    reportTimeHours: 6,
    sampleType: 'Blood & Urine',
    price: 1499,
    originalPrice: 3800,
    discountPercent: 61,
    accreditedLab: 'Apollo Diagnostics & NABL Labs',
    homeCollectionFree: true,
    tags: ['NABL Accredited', 'Free Home Sample Pickup', 'Report in 6 Hours', 'Doctor Review Included']
  },
  {
    id: 'pkg-2',
    title: 'Advanced Diabetes & Cardiac Care Profile',
    tagline: 'Dual heart and glycemic health index monitoring blood vessels, sugar & lipids',
    category: 'diabetes',
    testCount: 52,
    parameters: [
      'HbA1c (Glycated Hemoglobin with Average Blood Glucose)',
      'Fasting Blood Glucose (FBS)',
      'Post-Prandial Blood Sugar (PPBS - optional add-on)',
      'Extended Lipid Profile with Non-HDL & Atherogenic Index',
      'High Sensitivity C-Reactive Protein (hs-CRP)',
      'Renal / Kidney Panel (Serum Creatinine & Microalbuminuria)',
      'Complete Blood Count (CBC)',
      'Electrolytes (Sodium, Potassium, Chloride)'
    ],
    popularFor: 'Diabetic individuals, family history of heart disease, hypertension',
    fastingHours: 10,
    reportTimeHours: 6,
    sampleType: 'Blood & Spot Urine',
    price: 999,
    originalPrice: 2400,
    discountPercent: 58,
    accreditedLab: 'Dr. Lal PathLabs & Metropolis',
    homeCollectionFree: true,
    tags: ['Fasting Required', 'Diabetic Specialized', 'NABL Certified']
  },
  {
    id: 'pkg-3',
    title: 'Thyroid Total Profile (T3, T4, TSH Ultra)',
    tagline: 'High-precision electrochemiluminescence test for hyper & hypothyroidism',
    category: 'thyroid',
    testCount: 3,
    parameters: [
      'Total Triiodothyronine (T3)',
      'Total Thyroxine (T4)',
      'Thyroid Stimulating Hormone Ultra-sensitive (TSH 3rd Gen)'
    ],
    popularFor: 'Weight fluctuations, hair fall, sluggish metabolism, mood swings',
    fastingHours: 0,
    reportTimeHours: 4,
    sampleType: 'Blood',
    price: 299,
    originalPrice: 650,
    discountPercent: 54,
    accreditedLab: 'Thyrocare Technologies',
    homeCollectionFree: true,
    tags: ['No Fasting Required', 'Same-Day Digital Report', 'Superfast Home Pickup']
  },
  {
    id: 'pkg-4',
    title: 'Essential Vitamin Vitality (Vitamin D3 + B12)',
    tagline: 'Detect deficiency behind bone aches, hair thinning, fatigue & nerve health',
    category: 'vitamin',
    testCount: 2,
    parameters: [
      '25-Hydroxy Vitamin D (Total D2 + D3 by CLIA method)',
      'Vitamin B12 (Cyanocobalamin quantitative serum)'
    ],
    popularFor: 'Work-from-home pros, vegetarian diet, chronic lethargy, tingling sensations',
    fastingHours: 0,
    reportTimeHours: 6,
    sampleType: 'Blood',
    price: 699,
    originalPrice: 1800,
    discountPercent: 61,
    accreditedLab: 'Metropolis Healthcare',
    homeCollectionFree: true,
    tags: ['No Fasting Needed', 'High Accuracy CLIA', 'Free Collection']
  },
  {
    id: 'pkg-5',
    title: 'Comprehensive Senior Citizen Vital Health (60+)',
    tagline: 'Tailored geriatric screening for joint mobility, bone density, organs & prostate/pap',
    category: 'senior',
    testCount: 78,
    parameters: [
      'Complete Hemogram + Peripheral Blood Smear',
      'Liver & Kidney Function Profiles (LFT + KFT)',
      'Calcium, Phosphorus & Alkaline Phosphatase (Bone profile)',
      'Lipid Profile + Cardiac Homocysteine',
      'Diabetes Control Index (HbA1c + Fasting Sugar)',
      'Serum Uric Acid (Gout screening)',
      'PSA (Total Prostate Specific Antigen for Males) / CA-125 (for Females)'
    ],
    popularFor: 'Parents & seniors 55+, arthritis, joint stiffness, overall vitality',
    fastingHours: 12,
    reportTimeHours: 8,
    sampleType: 'Blood & Urine',
    price: 1899,
    originalPrice: 4500,
    discountPercent: 58,
    accreditedLab: 'Apollo Diagnostics',
    homeCollectionFree: true,
    tags: ['Senior Care Specialist Collector', 'Home Bedside Collection', 'Doctor Tele-Review']
  },
  {
    id: 'pkg-6',
    title: 'Fever Profile & Viral Panel (Dengue, Malaria, Typhoid)',
    tagline: 'Emergency same-day acute fever triage panel detecting tropical infections',
    category: 'fever',
    testCount: 18,
    parameters: [
      'Complete Blood Count with Platelet Count & MPV',
      'Dengue NS1 Antigen & IgG/IgM Antibodies',
      'Malaria Antigen (Pv / Pf rapid & smear)',
      'TyphiDot (Salmonella typhi IgM)',
      'Liver Enzymes (SGOT / SGPT)',
      'Urine Routine & Microscopic'
    ],
    popularFor: 'High fever, body chills, monsoon viral illnesses, low platelets',
    fastingHours: 0,
    reportTimeHours: 4,
    sampleType: 'Blood & Urine',
    price: 849,
    originalPrice: 2100,
    discountPercent: 60,
    accreditedLab: 'Dr. Lal PathLabs',
    homeCollectionFree: true,
    tags: ['Urgent 4-Hour Report', 'Platelet Monitoring', 'No Fasting Required']
  }
];

export const MOCK_ACCREDITED_LABS: AccreditedLab[] = [
  {
    id: 'lab-apollo',
    name: 'Apollo Diagnostics',
    rating: 4.8,
    reviews: 14200,
    accreditations: ['NABL', 'CAP Certified', 'ISO 15189'],
    packagePrice: 1499,
    turnaroundTime: 'Reports in 6 hours',
    samplePickupSlots: ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '08:00 AM - 09:00 AM', '09:00 AM - 10:00 AM'],
    features: ['Vacuum Vacutainer Sample Tubes', 'Barcode Tracked at Bedside', 'Cold-chain Temperature Monitored'],
    logo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'lab-lal',
    name: 'Dr. Lal PathLabs',
    rating: 4.7,
    reviews: 18900,
    accreditations: ['NABL', 'CAP Gold', 'NABL Reference Lab'],
    packagePrice: 1549,
    turnaroundTime: 'Reports in 6-8 hours',
    samplePickupSlots: ['06:30 AM - 07:30 AM', '07:30 AM - 08:30 AM', '08:30 AM - 09:30 AM'],
    features: ['70+ Years Trusted Brand', 'Automated Chemistry Analyzers', 'Digital WhatsApp Report Delivery'],
    logo: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'lab-thyrocare',
    name: 'Thyrocare Technologies',
    rating: 4.6,
    reviews: 21400,
    accreditations: ['NABL', 'CAP Accredited'],
    packagePrice: 1299,
    turnaroundTime: 'Reports within 12 hours',
    samplePickupSlots: ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '08:00 AM - 09:00 AM'],
    features: ['Lowest Cost Leader', 'High-Throughput Robotic Lab', 'Pan-India Certified Network'],
    logo: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'lab-metropolis',
    name: 'Metropolis Healthcare',
    rating: 4.8,
    reviews: 9800,
    accreditations: ['NABL', 'CAP USA', 'ILAC-MRA'],
    packagePrice: 1599,
    turnaroundTime: 'Reports in 5-7 hours',
    samplePickupSlots: ['07:00 AM - 08:00 AM', '08:00 AM - 09:00 AM', '10:00 AM - 11:00 AM'],
    features: ['Advanced Molecular Pathology', 'Double-Verified by MD Pathologists', 'Precision Multi-Disciplinary Panels'],
    logo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=120'
  }
];

export const MOCK_MEDICINES: Medicine[] = [
  {
    id: 'med-1',
    name: 'Metformin 500mg SR (Glycomet)',
    brand: 'USV Pvt Ltd',
    composition: 'Metformin Hydrochloride (500mg Sustained Release)',
    category: 'Diabetes Care',
    packSize: 'Strip of 20 Tablets',
    price: 48,
    originalPrice: 62,
    discountPercent: 22,
    requiresPrescription: true,
    deliveryTime: '15 mins',
    stockStatus: 'in_stock',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300',
    dosageRecommendation: '1 tablet once daily with dinner or as advised by physician.',
    genericAlternative: {
      name: 'Jan Aushadhi Metformin 500mg SR',
      price: 16,
      savings: 32
    }
  },
  {
    id: 'med-2',
    name: 'Telmisartan 40mg (Telma 40)',
    brand: 'Glenmark Pharmaceuticals',
    composition: 'Telmisartan IP (40mg)',
    category: 'Cardiac & BP',
    packSize: 'Strip of 15 Tablets',
    price: 112,
    originalPrice: 145,
    discountPercent: 23,
    requiresPrescription: true,
    deliveryTime: '15 mins',
    stockStatus: 'in_stock',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300',
    dosageRecommendation: '1 tablet daily in the morning after breakfast.',
    genericAlternative: {
      name: 'Generic Telmisartan 40mg',
      price: 35,
      savings: 77
    }
  },
  {
    id: 'med-3',
    name: 'Atorvastatin 10mg (Atorva 10)',
    brand: 'Zydus Cadila',
    composition: 'Atorvastatin (10mg)',
    category: 'Cardiac & BP',
    packSize: 'Strip of 15 Tablets',
    price: 98,
    originalPrice: 130,
    discountPercent: 25,
    requiresPrescription: true,
    deliveryTime: '15 mins',
    stockStatus: 'in_stock',
    image: 'https://images.unsplash.com/photo-1550572017-ed261680d220?auto=format&fit=crop&q=80&w=300',
    dosageRecommendation: '1 tablet at bedtime.',
    genericAlternative: {
      name: 'Pradhan Mantri Atorvastatin 10mg',
      price: 28,
      savings: 70
    }
  },
  {
    id: 'med-4',
    name: 'Pantoprazole 40mg + Domperidone 30mg (Pan-D)',
    brand: 'Alkem Laboratories',
    composition: 'Pantoprazole (40mg) + Domperidone (30mg SR)',
    category: 'Gastroenterology',
    packSize: 'Strip of 15 Capsules',
    price: 184,
    originalPrice: 225,
    discountPercent: 18,
    requiresPrescription: true,
    deliveryTime: '15 mins',
    stockStatus: 'in_stock',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=300',
    dosageRecommendation: '1 capsule empty stomach 30 mins before morning breakfast.',
    genericAlternative: {
      name: 'Pantop-D Generic 40/30',
      price: 52,
      savings: 132
    }
  },
  {
    id: 'med-5',
    name: 'Paracetamol 650mg (Dolo 650)',
    brand: 'Micro Labs Ltd',
    composition: 'Paracetamol IP (650mg)',
    category: 'Pain Relief & Fever',
    packSize: 'Strip of 15 Tablets',
    price: 31,
    originalPrice: 35,
    discountPercent: 11,
    requiresPrescription: false,
    deliveryTime: '15 mins',
    stockStatus: 'in_stock',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300',
    dosageRecommendation: 'SOS for fever or headache, maximum 3-4 times a day with 6h gap.'
  },
  {
    id: 'med-6',
    name: 'Vitamin D3 60,000 IU (Uprise-D3 60K)',
    brand: 'Alkem Labs',
    composition: 'Cholecalciferol (60,000 IU Softgel)',
    category: 'Vitamins & Immunity',
    packSize: 'Pack of 4 Capsules',
    price: 125,
    originalPrice: 160,
    discountPercent: 22,
    requiresPrescription: false,
    deliveryTime: '15 mins',
    stockStatus: 'in_stock',
    image: 'https://images.unsplash.com/photo-1550572017-ed261680d220?auto=format&fit=crop&q=80&w=300',
    dosageRecommendation: '1 capsule once a week after a fatty meal (milk/lunch) for 8 weeks.'
  },
  {
    id: 'med-7',
    name: 'Azithromycin 500mg (Azee 500)',
    brand: 'Cipla Ltd',
    composition: 'Azithromycin Dihydrate IP (500mg)',
    category: 'Antibiotics',
    packSize: 'Strip of 5 Tablets',
    price: 119,
    originalPrice: 140,
    discountPercent: 15,
    requiresPrescription: true,
    deliveryTime: '15 mins',
    stockStatus: 'few_left',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300',
    dosageRecommendation: '1 tablet once daily 1 hour before or 2 hours after meals for 3-5 days as prescribed.'
  },
  {
    id: 'med-8',
    name: 'Electral ORS Powder (21.8g Sachet)',
    brand: 'FDC Ltd',
    composition: 'WHO Formula Oral Rehydration Salts',
    category: 'First Aid & Hydration',
    packSize: 'Pack of 5 Sachets',
    price: 95,
    originalPrice: 110,
    discountPercent: 14,
    requiresPrescription: false,
    deliveryTime: '15 mins',
    stockStatus: 'in_stock',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=300',
    dosageRecommendation: 'Mix entire sachet in 1 liter clean drinking water; drink sip-by-sip.'
  }
];

export const INITIAL_PRESCRIPTION_REVIEW: PrescriptionReview = {
  id: 'rx-78192',
  uploadedAt: 'Today, 10:18 AM',
  imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
  patientName: 'Arjun Sharma',
  patientAge: 32,
  doctorName: 'Dr. Ananya Sen, MD, DM',
  hospitalOrClinic: 'Manipal Hospital Cardiology OPD',
  status: 'approved',
  pharmacist: {
    name: 'Pharm. Priya Nair',
    credentials: 'M.Pharm (Clinical Pharmacy), B.Pharm',
    regNumber: 'KA-PHARM-48192 • Karnataka Pharmacy Council',
    avatar: '/assets/stitch/female_pharmacist.png'
  },
  medications: [
    {
      name: 'Telmisartan 40mg (Telma 40)',
      dosage: '1 Tab Daily',
      timing: 'Morning',
      mealRelation: 'After Food',
      durationDays: 30,
      price: 224,
      genericSavingsAvailable: true,
      genericName: 'Telmisartan 40mg (Jan Aushadhi)',
      genericPrice: 70
    },
    {
      name: 'Metformin 500mg SR (Glycomet SR)',
      dosage: '1 Tab Daily',
      timing: 'Evening',
      mealRelation: 'With Food',
      durationDays: 30,
      price: 96,
      genericSavingsAvailable: true,
      genericName: 'Metformin 500mg SR Generic',
      genericPrice: 32
    },
    {
      name: 'Atorvastatin 10mg (Atorva 10)',
      dosage: '1 Tab Daily',
      timing: 'Bedtime',
      mealRelation: 'After Food',
      durationDays: 30,
      price: 196,
      genericSavingsAvailable: true,
      genericName: 'Atorvastatin 10mg Generic',
      genericPrice: 56
    },
    {
      name: 'Pantoprazole 40mg (Pan 40)',
      dosage: '1 Tab Daily',
      timing: 'Morning',
      mealRelation: 'Before Food',
      durationDays: 14,
      price: 130,
      genericSavingsAvailable: false
    }
  ],
  notes: 'Prescription verified with doctor signature and reg number. Generic substitutions can save you ₹358 on your monthly refill.'
};

export const MOCK_HOME_NURSES: HomeNurse[] = [
  {
    id: 'nurse-1',
    name: 'Sister Mary Varghese',
    role: 'Critical Care ICU Nurse',
    qualifications: 'B.Sc Nursing, Advanced ICU & Tracheostomy Certified',
    experienceYears: 9,
    rating: 4.9,
    reviewsCount: 174,
    dailyShiftRate: 1800,
    avatar: 'https://images.unsplash.com/photo-1594824813575-f376a91176bc?auto=format&fit=crop&q=80&w=300',
    languages: ['English', 'Malayalam', 'Hindi', 'Kannada'],
    verifiedBackground: true,
    skills: ['Ventilator Management', 'Tracheostomy Care', 'IV Cannulation', 'Catheterization', 'Bedside Vitals']
  },
  {
    id: 'nurse-2',
    name: 'Nurse Santosh Deshmukh',
    role: 'Post-Op Nurse',
    qualifications: 'GNM, Post-Surgical & Wound Care Specialist',
    experienceYears: 7,
    rating: 4.8,
    reviewsCount: 142,
    dailyShiftRate: 1600,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    languages: ['English', 'Hindi', 'Marathi', 'Kannada'],
    verifiedBackground: true,
    skills: ['Surgical Dressing', 'Suture Removal', 'Pain Pump Monitoring', 'Drain Care', 'DVT Prevention']
  },
  {
    id: 'nurse-3',
    name: 'Sister Kavitha Murthy',
    role: 'Elderly Care Specialist',
    qualifications: 'ANM/GNM, Geriatric Care & Dementia Support',
    experienceYears: 11,
    rating: 4.9,
    reviewsCount: 215,
    dailyShiftRate: 1500,
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300',
    languages: ['Kannada', 'Tamil', 'Telugu', 'English'],
    verifiedBackground: true,
    skills: ['Mobility Support', 'Bed Sore Prevention', 'Ryle\'s Tube Feeding', 'Medication Schedule', 'Gentle Bathing']
  },
  {
    id: 'nurse-4',
    name: 'Dr. Pooja Hegde (PT)',
    role: 'Home Physiotherapist',
    qualifications: 'BPT, MPT (Neuro-Physiotherapy), MIAP',
    experienceYears: 6,
    rating: 4.9,
    reviewsCount: 188,
    dailyShiftRate: 900,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    languages: ['English', 'Kannada', 'Hindi'],
    verifiedBackground: true,
    skills: ['Post-Stroke Neuro Rehab', 'Knee Replacement Mobility', 'Back & Neck Pain', 'Chest Physio']
  }
];

export const MOCK_MEDICAL_EQUIPMENT: MedicalEquipment[] = [
  {
    id: 'equip-1',
    name: 'Philips Respironics EverFlo 5L Oxygen Concentrator',
    brand: 'Philips Healthcare',
    category: 'Oxygen',
    monthlyRentalPrice: 3500,
    purchasePrice: 54000,
    availableForRent: true,
    specs: ['93% ± 3% Continuous Oxygen Purity', '0.5 to 5 LPM Flow', 'Ultra-Quiet <45 dBA', 'Built-in OPI Purity Sensor'],
    depositAmount: 5000,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300',
    deliveryHours: 2
  },
  {
    id: 'equip-2',
    name: 'Motorized 3-Function Hospital ICU Bed with Air Mattress',
    brand: 'Meditech India',
    category: 'Beds',
    monthlyRentalPrice: 4200,
    purchasePrice: 62000,
    availableForRent: true,
    specs: ['Electric Backrest, Knee rest & Height Adjustment', 'Anti-Decubitus Ripple Air Mattress included', 'Collapsible Side Rails', 'Lockable Castor Wheels'],
    depositAmount: 6000,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300',
    deliveryHours: 4
  },
  {
    id: 'equip-3',
    name: 'Ultra-Lightweight Foldable Wheelchair',
    brand: 'Karma Healthcare',
    category: 'Mobility',
    monthlyRentalPrice: 1200,
    purchasePrice: 9500,
    availableForRent: true,
    specs: ['Aircraft Aluminum Frame (11.8 kg)', 'Weight Capacity 115 kg', 'Padded Armrests & Swing-away Footrests', 'Attendant Brakes'],
    depositAmount: 2000,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=300',
    deliveryHours: 2
  },
  {
    id: 'equip-4',
    name: 'ResMed AirCurve 10 VAuto BiPAP Machine',
    brand: 'ResMed Australia',
    category: 'Respiratory',
    monthlyRentalPrice: 4800,
    purchasePrice: 85000,
    availableForRent: true,
    specs: ['Auto-Adjusting Bi-Level Pressure', 'HumidAir Heated Humidifier', 'ClimateLineAir Tubing', 'SD Card Therapy Tracking'],
    depositAmount: 8000,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300',
    deliveryHours: 3
  }
];

export const MOCK_BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb-1',
    name: 'Apollo Hospital Blood Bank',
    area: 'Indiranagar, Bengaluru',
    distanceKm: 2.1,
    open24x7: true,
    helpline: '+91 80 2502 4444',
    lastUpdated: '12 mins ago (Live Sync)',
    stock: {
      'A+': 14,
      'A-': 4,
      'B+': 18,
      'B-': 3,
      'AB+': 8,
      'AB-': 2,
      'O+': 22,
      'O-': 6
    },
    address: '154/11, Opp. IIMB, Bannerghatta Road / 100ft Rd Branch'
  },
  {
    id: 'bb-2',
    name: 'Indian Red Cross Society Blood Centre',
    area: 'Race Course Road, Bengaluru',
    distanceKm: 4.8,
    open24x7: true,
    helpline: '+91 80 2226 8435',
    lastUpdated: '8 mins ago (Live Sync)',
    stock: {
      'A+': 32,
      'A-': 9,
      'B+': 45,
      'B-': 7,
      'AB+': 16,
      'AB-': 5,
      'O+': 54,
      'O-': 12
    },
    address: 'No. 26, Red Cross Bhavan, 1st Main Rd, Race Course Rd'
  },
  {
    id: 'bb-3',
    name: 'Manipal Hospital Regional Blood Centre',
    area: 'HAL Airport Road, Kodihalli',
    distanceKm: 3.2,
    open24x7: true,
    helpline: '+91 80 2502 3333',
    lastUpdated: '19 mins ago (Live Sync)',
    stock: {
      'A+': 9,
      'A-': 2,
      'B+': 14,
      'B-': 1,
      'AB+': 4,
      'AB-': 1,
      'O+': 18,
      'O-': 3
    },
    address: '98, HAL Old Airport Rd, Kodihalli, Bengaluru'
  },
  {
    id: 'bb-4',
    name: 'Rotary Bangalore TTK Blood Bank',
    area: 'New Thippasandra, Indiranagar',
    distanceKm: 1.8,
    open24x7: true,
    helpline: '+91 80 2528 7903',
    lastUpdated: '5 mins ago (Live Sync)',
    stock: {
      'A+': 20,
      'A-': 5,
      'B+': 26,
      'B-': 4,
      'AB+': 11,
      'AB-': 3,
      'O+': 38,
      'O-': 8
    },
    address: 'HAL 3rd Stage, New Thippasandra Main Road'
  }
];

export const MOCK_BLOOD_DONORS: BloodDonor[] = [
  {
    id: 'donor-1',
    name: 'Karthik Ramanathan',
    bloodGroup: 'O+',
    distanceKm: 1.4,
    lastDonationDaysAgo: 110,
    verified: true,
    phone: '+91 98450 12891',
    area: 'Indiranagar 12th Main',
    availability: 'Immediate'
  },
  {
    id: 'donor-2',
    name: 'Shreya Sundaram',
    bloodGroup: 'O-',
    distanceKm: 2.3,
    lastDonationDaysAgo: 135,
    verified: true,
    phone: '+91 97410 44921',
    area: 'Defence Colony, Indiranagar',
    availability: 'Immediate'
  },
  {
    id: 'donor-3',
    name: 'Aditya Hegde',
    bloodGroup: 'B+',
    distanceKm: 1.8,
    lastDonationDaysAgo: 94,
    verified: true,
    phone: '+91 99002 83719',
    area: 'Domlur Layout',
    availability: 'Within 2 Hours'
  },
  {
    id: 'donor-4',
    name: 'Pooja Kashyap',
    bloodGroup: 'A+',
    distanceKm: 2.9,
    lastDonationDaysAgo: 120,
    verified: true,
    phone: '+91 98860 39182',
    area: 'HAL 2nd Stage',
    availability: 'Within 2 Hours'
  },
  {
    id: 'donor-5',
    name: 'Mohammed Rizwan',
    bloodGroup: 'AB-',
    distanceKm: 3.5,
    lastDonationDaysAgo: 160,
    verified: true,
    phone: '+91 99450 78219',
    area: 'Ulsoor Lake Area',
    availability: 'Immediate'
  }
];
