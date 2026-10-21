/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  TabType,
  Doctor,
  DiagnosticPackage,
  Medicine,
  HomeNurse,
  MedicalEquipment,
  BloodBank,
  BloodDonor,
  CartItem,
  Appointment,
  PhlebotomistInstructions
} from './types';
import {
  MOCK_DOCTORS,
  MOCK_HOSPITAL_BEDS,
  MOCK_DIAGNOSTIC_PACKAGES,
  MOCK_ACCREDITED_LABS,
  INITIAL_PHLEBOTOMIST_TRACKER,
  MOCK_MEDICINES,
  INITIAL_PRESCRIPTION_REVIEW,
  MOCK_HOME_NURSES,
  MOCK_MEDICAL_EQUIPMENT,
  MOCK_BLOOD_BANKS,
  MOCK_BLOOD_DONORS
} from './data/mockData';

import { db, handleFirestoreError, OperationType } from './firebase';
import { collection, doc, setDoc, deleteDoc, getDocs, onSnapshot } from 'firebase/firestore';

import { AndroidShell } from './components/android/AndroidShell';
import { AndroidStatusBar } from './components/android/AndroidStatusBar';
import { AndroidBottomNav } from './components/android/AndroidBottomNav';

import { HomeHub } from './components/home/HomeHub';
import { DoctorFinder } from './components/doctors/DoctorFinder';
import { DiagnosticsView } from './components/diagnostics/DiagnosticsView';
import { PharmacyView } from './components/pharmacy/PharmacyView';
import { HomeNursingView } from './components/nursing/HomeNursingView';
import { BloodBankView } from './components/emergency/BloodBankView';
import { AdminManagementView } from './components/admin/AdminManagementView';

import { PhlebotomistTrackingModal } from './components/diagnostics/PhlebotomistTrackingModal';
import { PhlebotomistInstructionsModal } from './components/diagnostics/PhlebotomistInstructionsModal';
import { PrescriptionUploadModal } from './components/pharmacy/PrescriptionUploadModal';
import { PharmacistApprovalModal } from './components/pharmacy/PharmacistApprovalModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { SymptomCheckerModal } from './components/common/SymptomCheckerModal';
import { EmergencyModal } from './components/common/EmergencyModal';
import { LocationPickerModal } from './components/common/LocationPickerModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentLocation, setCurrentLocation] = useState<string>('Indiranagar, Bengaluru');
  const [tracker, setTracker] = useState(INITIAL_PHLEBOTOMIST_TRACKER);

  // Dynamic Catalog State (Synced with Firestore when online)
  const [medicines, setMedicines] = useState<Medicine[]>(MOCK_MEDICINES);
  const [packages, setPackages] = useState<DiagnosticPackage[]>(MOCK_DIAGNOSTIC_PACKAGES);
  const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [nurses, setNurses] = useState<HomeNurse[]>(MOCK_HOME_NURSES);
  const [equipment, setEquipment] = useState<MedicalEquipment[]>(MOCK_MEDICAL_EQUIPMENT);
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>(MOCK_BLOOD_BANKS);
  const [donors, setDonors] = useState<BloodDonor[]>(MOCK_BLOOD_DONORS);
  const [isSyncing, setIsSyncing] = useState(false);

  // Modals state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showPhlebotomistModal, setShowPhlebotomistModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showPharmacistApprovalModal, setShowPharmacistApprovalModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  // Toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'med-2',
      title: 'Telmisartan 40mg (Telma 40)',
      type: 'medicine',
      price: 112,
      originalPrice: 145,
      quantity: 1,
      requiresPrescription: true,
    },
    {
      id: 'med-5',
      title: 'Paracetamol 650mg (Dolo 650)',
      type: 'medicine',
      price: 31,
      originalPrice: 35,
      quantity: 2,
      requiresPrescription: false,
    }
  ]);

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt-101',
      doctorId: 'doc-1',
      doctorName: 'Dr. Ananya Sen',
      specialty: 'Cardiologist',
      doctorAvatar: MOCK_DOCTORS[0].avatar,
      hospital: 'Manipal Hospital, HAL Airport Rd',
      date: 'Today',
      timeSlot: '04:30 PM',
      mode: 'clinic',
      fee: 700,
      status: 'confirmed',
      tokenNumber: 'A-14',
    }
  ]);

  // Real-time Firestore Listeners
  useEffect(() => {
    // 1. Medicines collection listener
    const unsubMeds = onSnapshot(
      collection(db, 'medicines'),
      (snapshot) => {
        if (!snapshot.empty) {
          const remoteMeds = snapshot.docs.map((docSnap) => docSnap.data() as Medicine);
          setMedicines(remoteMeds);
        }
      },
      (error) => {
        console.warn('Firestore medicines snapshot notice:', error.message);
      }
    );

    // 2. Diagnostic packages collection listener
    const unsubPkgs = onSnapshot(
      collection(db, 'diagnosticPackages'),
      (snapshot) => {
        if (!snapshot.empty) {
          const remotePkgs = snapshot.docs.map((docSnap) => docSnap.data() as DiagnosticPackage);
          setPackages(remotePkgs);
        }
      },
      (error) => {
        console.warn('Firestore packages snapshot notice:', error.message);
      }
    );

    // 3. Doctors collection listener
    const unsubDocs = onSnapshot(
      collection(db, 'doctors'),
      (snapshot) => {
        if (!snapshot.empty) {
          const remoteDocs = snapshot.docs.map((docSnap) => docSnap.data() as Doctor);
          setDoctors(remoteDocs);
        }
      },
      (error) => {
        console.warn('Firestore doctors snapshot notice:', error.message);
      }
    );

    return () => {
      unsubMeds();
      unsubPkgs();
      unsubDocs();
    };
  }, []);

  // One-click Seed Initial Stitch Catalog to Firestore
  const handleSeedToFirestore = async () => {
    setIsSyncing(true);
    try {
      // Seed medicines
      for (const med of MOCK_MEDICINES) {
        await setDoc(doc(db, 'medicines', med.id), med);
      }
      // Seed packages
      for (const pkg of MOCK_DIAGNOSTIC_PACKAGES) {
        await setDoc(doc(db, 'diagnosticPackages', pkg.id), pkg);
      }
      // Seed doctors
      for (const docItem of MOCK_DOCTORS) {
        await setDoc(doc(db, 'doctors', docItem.id), docItem);
      }
      showToast('All stitch medicines, tests, and doctors synced to Firestore!');
    } catch (error) {
      console.error('Error seeding to Firestore:', error);
      showToast('Synced items locally. Check Firestore network connection.');
    } finally {
      setIsSyncing(false);
    }
  };

  // Admin CRUD for Medicines
  const handleAddMedicine = async (med: Medicine) => {
    setMedicines((prev) => [med, ...prev]);
    try {
      await setDoc(doc(db, 'medicines', med.id), med);
    } catch (err) {
      console.warn('Firestore write warning:', err);
    }
    showToast(`Added ${med.name} to pharmacy inventory`);
  };

  const handleDeleteMedicine = async (id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
    try {
      await deleteDoc(doc(db, 'medicines', id));
    } catch (err) {
      console.warn('Firestore delete warning:', err);
    }
    showToast('Medicine removed from inventory');
  };

  // Admin CRUD for Packages
  const handleAddPackage = async (pkg: DiagnosticPackage) => {
    setPackages((prev) => [pkg, ...prev]);
    try {
      await setDoc(doc(db, 'diagnosticPackages', pkg.id), pkg);
    } catch (err) {
      console.warn('Firestore write warning:', err);
    }
    showToast(`Added test package: ${pkg.title}`);
  };

  const handleDeletePackage = async (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteDoc(doc(db, 'diagnosticPackages', id));
    } catch (err) {
      console.warn('Firestore delete warning:', err);
    }
    showToast('Package removed from catalog');
  };

  // Admin CRUD for Doctors
  const handleAddDoctor = async (doctor: Doctor) => {
    setDoctors((prev) => [doctor, ...prev]);
    try {
      await setDoc(doc(db, 'doctors', doctor.id), doctor);
    } catch (err) {
      console.warn('Firestore write warning:', err);
    }
    showToast(`Added ${doctor.name} to doctor directory`);
  };

  const handleDeleteDoctor = async (id: string) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    try {
      await deleteDoc(doc(db, 'doctors', id));
    } catch (err) {
      console.warn('Firestore delete warning:', err);
    }
    showToast('Doctor removed from directory');
  };

  // Bulk Add Handlers for Excel Import
  const handleBulkAddMedicines = async (newMeds: Medicine[]) => {
    setMedicines((prev) => [...newMeds, ...prev]);
    try {
      for (const m of newMeds) {
        await setDoc(doc(db, 'medicines', m.id), m);
      }
    } catch (err) {
      console.warn('Firestore bulk write warning:', err);
    }
    showToast(`Imported ${newMeds.length} medicines via Excel`);
  };

  const handleBulkAddPackages = async (newPkgs: DiagnosticPackage[]) => {
    setPackages((prev) => [...newPkgs, ...prev]);
    try {
      for (const p of newPkgs) {
        await setDoc(doc(db, 'diagnosticPackages', p.id), p);
      }
    } catch (err) {
      console.warn('Firestore bulk write warning:', err);
    }
    showToast(`Imported ${newPkgs.length} lab test packages via Excel`);
  };

  const handleBulkAddDoctors = async (newDocs: Doctor[]) => {
    setDoctors((prev) => [...newDocs, ...prev]);
    try {
      for (const d of newDocs) {
        await setDoc(doc(db, 'doctors', d.id), d);
      }
    } catch (err) {
      console.warn('Firestore bulk write warning:', err);
    }
    showToast(`Imported ${newDocs.length} doctors via Excel`);
  };

  const handleBulkAddNurses = async (newNurses: HomeNurse[]) => {
    setNurses((prev) => [...newNurses, ...prev]);
    try {
      for (const n of newNurses) {
        await setDoc(doc(db, 'homeNurses', n.id), n);
      }
    } catch (err) {
      console.warn('Firestore bulk write warning:', err);
    }
    showToast(`Imported ${newNurses.length} home care nurses via Excel`);
  };

  const handleBulkAddEquipment = async (newEquip: MedicalEquipment[]) => {
    setEquipment((prev) => [...newEquip, ...prev]);
    try {
      for (const eq of newEquip) {
        await setDoc(doc(db, 'medicalEquipment', eq.id), eq);
      }
    } catch (err) {
      console.warn('Firestore bulk write warning:', err);
    }
    showToast(`Imported ${newEquip.length} equipment items via Excel`);
  };

  const handleBulkAddBloodBanks = async (newBanks: BloodBank[]) => {
    setBloodBanks((prev) => [...newBanks, ...prev]);
    try {
      for (const bb of newBanks) {
        await setDoc(doc(db, 'bloodBanks', bb.id), bb);
      }
    } catch (err) {
      console.warn('Firestore bulk write warning:', err);
    }
    showToast(`Imported ${newBanks.length} blood banks via Excel`);
  };

  const handleBulkAddDonors = async (newDonors: BloodDonor[]) => {
    setDonors((prev) => [...newDonors, ...prev]);
    try {
      for (const dn of newDonors) {
        await setDoc(doc(db, 'bloodDonors', dn.id), dn);
      }
    } catch (err) {
      console.warn('Firestore bulk write warning:', err);
    }
    showToast(`Imported ${newDonors.length} emergency donors via Excel`);
  };

  const handleAddToCart = (medicine: Medicine) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === medicine.id);
      if (existing) {
        return prev.map((item) =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: medicine.id,
          title: medicine.name,
          type: 'medicine',
          price: medicine.price,
          originalPrice: medicine.originalPrice,
          quantity: 1,
          requiresPrescription: medicine.requiresPrescription,
        },
      ];
    });
    showToast(`Added ${medicine.name} to cart`);
  };

  const handleAddPackageToCart = (pkg: DiagnosticPackage) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === pkg.id);
      if (existing) {
        return prev;
      }
      return [
        ...prev,
        {
          id: pkg.id,
          title: pkg.title,
          type: 'lab_package',
          price: pkg.price,
          originalPrice: pkg.originalPrice,
          quantity: 1,
          requiresPrescription: false,
        },
      ];
    });
    showToast(`Added ${pkg.title} to cart • Free home pickup scheduled`);
  };

  const handleRentEquipment = (item: MedicalEquipment) => {
    setCartItems((prev) => {
      const existing = prev.find((it) => it.id === item.id);
      if (existing) return prev;
      return [
        ...prev,
        {
          id: item.id,
          title: `${item.name} (1 Month Rental)`,
          type: 'equipment',
          price: item.monthlyRentalPrice,
          quantity: 1,
        },
      ];
    });
    showToast(`Added ${item.name} rental to cart (Delivery in ${item.deliveryHours}h)`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart');
  };

  const handleBookAppointment = (aptData: Omit<Appointment, 'id' | 'tokenNumber'>) => {
    const tokenNumber = `T-${Math.floor(10 + Math.random() * 89)}`;
    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      tokenNumber,
    };
    setAppointments((prev) => [newApt, ...prev]);
    showToast(`Appointment Confirmed with ${aptData.doctorName} (Token ${tokenNumber})`);
  };

  const handleBookNurse = (nurse: HomeNurse) => {
    showToast(`Home Nursing Request booked for ${nurse.name} (Supervisor calling you)`);
  };

  const handleSaveInstructions = (instructions: PhlebotomistInstructions) => {
    setTracker((prev) => ({
      ...prev,
      entryInstructions: instructions,
    }));
    showToast('Entry and gate instructions updated for Ramesh');
  };

  const handleApprovePharmacistCart = (totalAmount: number, itemsCount: number) => {
    setShowPharmacistApprovalModal(false);
    setShowCartDrawer(true);
    showToast(`Approved ${itemsCount} medications by Pharm. Priya Nair`);
  };

  return (
    <AndroidShell>
      {/* Android System Status Bar */}
      <AndroidStatusBar />

      {/* Interactive Main Screens Switcher */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {activeTab === 'home' && (
          <HomeHub
            onNavigateTab={setActiveTab}
            onOpenPhlebotomistModal={() => setShowPhlebotomistModal(true)}
            onSelectDoctor={(doc) => {
              setActiveTab('doctors');
            }}
            onSelectPackage={(pkg) => {
              handleAddPackageToCart(pkg);
              setActiveTab('diagnostics');
            }}
            onOpenSymptomChecker={() => setShowSymptomChecker(true)}
            onOpenEmergencyModal={() => setShowEmergencyModal(true)}
            onOpenAdmin={() => setShowAdminModal(true)}
            doctors={doctors}
            packages={packages}
            currentLocation={currentLocation}
            onOpenLocationPicker={() => setShowLocationPicker(true)}
            cartCount={cartItems.length}
            onOpenCart={() => setShowCartDrawer(true)}
            onOpenPrescriptionUpload={() => setShowPrescriptionModal(true)}
          />
        )}

        {activeTab === 'doctors' && (
          <DoctorFinder
            doctors={doctors}
            hospitals={MOCK_HOSPITAL_BEDS}
            onBookAppointment={handleBookAppointment}
            onOpenEmergencyModal={() => setShowEmergencyModal(true)}
            currentLocation={currentLocation}
          />
        )}

        {activeTab === 'diagnostics' && (
          <DiagnosticsView
            packages={packages}
            labs={MOCK_ACCREDITED_LABS}
            onSelectPackage={handleAddPackageToCart}
            onOpenPhlebotomistModal={() => setShowPhlebotomistModal(true)}
            onOpenPrescriptionUpload={() => setShowPrescriptionModal(true)}
            currentLocation={currentLocation}
          />
        )}

        {activeTab === 'pharmacy' && (
          <PharmacyView
            medicines={medicines}
            onAddToCart={handleAddToCart}
            onOpenPrescriptionUpload={() => setShowPrescriptionModal(true)}
            onOpenPharmacistApproval={() => setShowPharmacistApprovalModal(true)}
            onOpenCart={() => setShowCartDrawer(true)}
            cartCount={cartItems.length}
          />
        )}

        {activeTab === 'nursing' && (
          <HomeNursingView
            nurses={nurses}
            equipment={equipment}
            onBookNurse={handleBookNurse}
            onRentEquipment={handleRentEquipment}
            currentLocation={currentLocation}
          />
        )}

        {activeTab === 'bloodbank' && (
          <BloodBankView
            bloodBanks={bloodBanks}
            donors={donors}
            currentLocation={currentLocation}
          />
        )}
      </div>

      {/* Persistent Toast Notification */}
      {toastMessage && (
        <div className="absolute top-10 inset-x-4 z-50 animate-in slide-in-from-top-3 duration-200">
          <div className="bg-[#0b1c30]/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl flex items-center justify-between border border-slate-700/80">
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white ml-2 text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Android Bottom Navigation Bar */}
      <AndroidBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={cartItems.length}
        hasActivePhlebotomist={true}
      />

      {/* Admin Studio Modal */}
      {showAdminModal && (
        <AdminManagementView
          medicines={medicines}
          packages={packages}
          doctors={doctors}
          nurses={nurses}
          equipment={equipment}
          bloodBanks={bloodBanks}
          donors={donors}
          onAddMedicine={handleAddMedicine}
          onDeleteMedicine={handleDeleteMedicine}
          onBulkAddMedicines={handleBulkAddMedicines}
          onAddPackage={handleAddPackage}
          onDeletePackage={handleDeletePackage}
          onBulkAddPackages={handleBulkAddPackages}
          onAddDoctor={handleAddDoctor}
          onDeleteDoctor={handleDeleteDoctor}
          onBulkAddDoctors={handleBulkAddDoctors}
          onBulkAddNurses={handleBulkAddNurses}
          onBulkAddEquipment={handleBulkAddEquipment}
          onBulkAddBloodBanks={handleBulkAddBloodBanks}
          onBulkAddDonors={handleBulkAddDonors}
          onSeedToFirestore={handleSeedToFirestore}
          isSyncing={isSyncing}
          onClose={() => setShowAdminModal(false)}
        />
      )}

      {/* Modal Overlays */}
      {showPhlebotomistModal && (
        <PhlebotomistTrackingModal
          tracker={tracker}
          onClose={() => setShowPhlebotomistModal(false)}
          onOpenInstructions={() => {
            setShowPhlebotomistModal(false);
            setShowInstructionsModal(true);
          }}
        />
      )}

      {showInstructionsModal && (
        <PhlebotomistInstructionsModal
          initialInstructions={tracker.entryInstructions}
          onSave={handleSaveInstructions}
          onClose={() => setShowInstructionsModal(false)}
        />
      )}

      {showPrescriptionModal && (
        <PrescriptionUploadModal
          onClose={() => setShowPrescriptionModal(false)}
          onUploadSuccess={() => {
            setShowPrescriptionModal(false);
            setShowPharmacistApprovalModal(true);
          }}
        />
      )}

      {showPharmacistApprovalModal && (
        <PharmacistApprovalModal
          review={INITIAL_PRESCRIPTION_REVIEW}
          onClose={() => setShowPharmacistApprovalModal(false)}
          onApproveAndAddToCart={handleApprovePharmacistCart}
        />
      )}

      {showCartDrawer && (
        <CartDrawer
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={() => setCartItems([])}
          onClose={() => setShowCartDrawer(false)}
        />
      )}

      {showSymptomChecker && (
        <SymptomCheckerModal
          onClose={() => setShowSymptomChecker(false)}
          onNavigateTab={setActiveTab}
        />
      )}

      {showEmergencyModal && (
        <EmergencyModal
          onClose={() => setShowEmergencyModal(false)}
          onNavigateTab={setActiveTab}
          currentLocation={currentLocation}
        />
      )}

      {showLocationPicker && (
        <LocationPickerModal
          currentLocation={currentLocation}
          onSelectLocation={setCurrentLocation}
          onClose={() => setShowLocationPicker(false)}
        />
      )}
    </AndroidShell>
  );
}
