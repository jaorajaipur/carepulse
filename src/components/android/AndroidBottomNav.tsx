import React from 'react';
import { TabType } from '../../types';
import { Home, Stethoscope, TestTube2, Pill, HeartPulse, Droplet } from 'lucide-react';

interface AndroidBottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  cartCount?: number;
  hasActivePhlebotomist?: boolean;
}

export const AndroidBottomNav: React.FC<AndroidBottomNavProps> = ({
  activeTab,
  onTabChange,
  cartCount = 0,
  hasActivePhlebotomist = false,
}) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'Home',
      icon: Home,
      hasDot: false,
    },
    {
      id: 'doctors' as TabType,
      label: 'Doctors',
      icon: Stethoscope,
      hasDot: false,
    },
    {
      id: 'diagnostics' as TabType,
      label: 'Lab Tests',
      icon: TestTube2,
      hasDot: hasActivePhlebotomist,
      badgeText: hasActivePhlebotomist ? 'Live' : undefined,
    },
    {
      id: 'pharmacy' as TabType,
      label: 'Pharmacy',
      icon: Pill,
      hasDot: cartCount > 0,
      badgeCount: cartCount > 0 ? cartCount : undefined,
    },
    {
      id: 'nursing' as TabType,
      label: 'Home Care',
      icon: HeartPulse,
      hasDot: false,
    },
    {
      id: 'bloodbank' as TabType,
      label: 'Blood SOS',
      icon: Droplet,
      isEmergency: true,
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(11,28,48,0.06)] pb-1">
      <div className="max-w-md mx-auto px-2 h-16 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          if (tab.isEmergency) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all active:scale-95 relative group ${
                  isActive ? 'text-[#ba1a1a]' : 'text-slate-500 hover:text-[#ba1a1a]'
                }`}
              >
                <div
                  className={`w-10 h-7 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-rose-100 text-[#ba1a1a] shadow-sm'
                      : 'group-hover:bg-rose-50 text-rose-600'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2.2] animate-pulse" />
                </div>
                <span
                  className={`text-[10px] mt-0.5 tracking-tight font-bold ${
                    isActive ? 'text-[#ba1a1a]' : 'text-rose-600'
                  }`}
                >
                  {tab.label}
                </span>
                <span className="absolute top-1 right-2.5 w-1.5 h-1.5 rounded-full bg-rose-600 ring-2 ring-white"></span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all active:scale-95 relative ${
                isActive ? 'text-[#006388]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div
                className={`w-11 h-7 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#c5e7ff] text-[#004c6a] shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight ${
                  isActive ? 'font-bold text-[#006388]' : 'font-medium text-slate-500'
                }`}
              >
                {tab.label}
              </span>

              {/* Badge or indicator */}
              {tab.badgeText && (
                <span className="absolute top-1 right-2 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-[#10B981] text-white animate-pulse">
                  {tab.badgeText}
                </span>
              )}
              {tab.badgeCount !== undefined && (
                <span className="absolute top-1 right-2 w-4 h-4 rounded-full text-[10px] font-bold bg-[#c64d34] text-white flex items-center justify-center shadow-sm">
                  {tab.badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Android Bottom Gesture Navigation Pill */}
      <div className="w-full flex items-center justify-center pb-1 pt-0.5 pointer-events-none">
        <div className="w-32 h-1 rounded-full bg-slate-300"></div>
      </div>
    </nav>
  );
};
