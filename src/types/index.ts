export type TabType = 'home' | 'doctors' | 'diagnostics' | 'pharmacy' | 'nursing' | 'bloodbank';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subSpecialty?: string;
  experience: number;
  qualifications: string;
  rating: number;
  reviewsCount: number;
  hospital: string;
  distance: string;
  consultationFee: number;
  nextAvailable: string;
  avatar: string;
  about: string;
  languages: string[];
  inClinic: boolean;
  videoConsult: boolean;
  slots: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
}

export interface HospitalBed {
  id: string;
  name: string;
  area: string;
  distance: string;
  totalBeds: number;
  icuBedsAvailable: number;
  oxygenBedsAvailable: number;
  ventilatorBedsAvailable: number;
  emergencyTraumaLevel: string;
  ambulanceHelpline: string;
  rating: number;
  image: string;
}

export interface DiagnosticPackage {
  id: string;
  title: string;
  tagline: string;
  category: 'fullbody' | 'diabetes' | 'cardiac' | 'thyroid' | 'vitamin' | 'fever' | 'senior';
  testCount: number;
  parameters: string[];
  popularFor: string;
  fastingHours: number;
  reportTimeHours: number;
  sampleType: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  accreditedLab: string;
  homeCollectionFree: boolean;
  tags: string[];
}

export interface AccreditedLab {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  accreditations: string[]; // NABL, CAP, ISO
  packagePrice: number;
  turnaroundTime: string;
  samplePickupSlots: string[];
  features: string[];
  logo: string;
}

export interface PhlebotomistTracker {
  id: string;
  name: string;
  role: string;
  rating: number;
  collectionsCount: number;
  vaccinated: boolean;
  avatar: string;
  phone: string;
  vehicle: string;
  vehicleNumber: string;
  temperatureKit: string;
  etaMinutes: number;
  distanceKm: number;
  scheduledTime: string;
  orderId: string;
  patientName: string;
  testNames: string[];
  status: 'assigned' | 'on_the_way' | 'arrived_gate' | 'sample_collected' | 'sample_in_transit' | 'delivered_to_lab';
  entryInstructions?: PhlebotomistInstructions;
}

export interface PhlebotomistInstructions {
  gateCode?: string;
  flatNumber: string;
  buildingName: string;
  arrivalPreference: 'call_before' | 'ring_bell' | 'silent_arrival';
  petAlert: boolean;
  sanitizedTrayRequired: boolean;
  landmarkPhoto?: string;
  notes?: string;
}

export interface Medicine {
  id: string;
  name: string;
  brand: string;
  composition: string;
  category: string;
  packSize: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  requiresPrescription: boolean;
  deliveryTime: string; // "15 mins"
  stockStatus: 'in_stock' | 'few_left' | 'out_of_stock';
  image: string;
  dosageRecommendation: string;
  genericAlternative?: {
    name: string;
    price: number;
    savings: number;
  };
}

export interface PrescriptionReview {
  id: string;
  uploadedAt: string;
  imageUrl: string;
  patientName: string;
  patientAge: number;
  doctorName: string;
  hospitalOrClinic: string;
  status: 'uploading' | 'under_review' | 'approved' | 'action_needed';
  pharmacist?: {
    name: string;
    credentials: string;
    regNumber: string;
    avatar: string;
  };
  medications: {
    name: string;
    dosage: string;
    timing: 'Morning' | 'Afternoon' | 'Evening' | 'Bedtime' | 'Twice daily';
    mealRelation: 'Before Food' | 'After Food' | 'With Food';
    durationDays: number;
    price: number;
    genericSavingsAvailable?: boolean;
    genericName?: string;
    genericPrice?: number;
  }[];
  notes: string;
}

export interface HomeNurse {
  id: string;
  name: string;
  role: 'Critical Care ICU Nurse' | 'Elderly Care Specialist' | 'Home Physiotherapist' | 'Post-Op Nurse' | 'Mother & Infant Care';
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  dailyShiftRate: number;
  avatar: string;
  languages: string[];
  verifiedBackground: boolean;
  skills: string[];
}

export interface MedicalEquipment {
  id: string;
  name: string;
  brand: string;
  category: 'Oxygen' | 'Mobility' | 'Beds' | 'Respiratory' | 'Monitoring';
  monthlyRentalPrice: number;
  purchasePrice: number;
  availableForRent: boolean;
  specs: string[];
  depositAmount: number;
  image: string;
  deliveryHours: number;
}

export interface BloodBank {
  id: string;
  name: string;
  area: string;
  distanceKm: number;
  open24x7: boolean;
  helpline: string;
  lastUpdated: string;
  stock: Record<string, number>; // e.g. { 'A+': 12, 'O+': 28, ... }
  address: string;
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: string;
  distanceKm: number;
  lastDonationDaysAgo: number;
  verified: boolean;
  phone: string;
  area: string;
  availability: 'Immediate' | 'Within 2 Hours' | 'On Call';
}

export interface CartItem {
  id: string;
  title: string;
  type: 'medicine' | 'lab_package' | 'equipment';
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
  details?: string;
  requiresPrescription?: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  doctorAvatar: string;
  hospital: string;
  date: string;
  timeSlot: string;
  mode: 'clinic' | 'video';
  fee: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  tokenNumber: string;
}
