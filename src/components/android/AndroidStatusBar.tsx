import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, Activity } from 'lucide-react';

interface AndroidStatusBarProps {
  dark?: boolean;
}

export const AndroidStatusBar: React.FC<AndroidStatusBarProps> = ({ dark = false }) => {
  const [timeStr, setTimeStr] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`h-7 px-5 flex items-center justify-between text-xs font-semibold select-none z-50 pointer-events-none transition-colors duration-200 ${
        dark ? 'text-white' : 'text-slate-800'
      }`}
    >
      {/* Left: Time and app notification indicator */}
      <div className="flex items-center gap-1.5">
        <span className="font-bold tracking-tight text-[13px]">{timeStr}</span>
        <div className="flex items-center gap-1 ml-1 opacity-80">
          <Activity className="w-3 h-3 text-[#007dab]" />
        </div>
      </div>

      {/* Center: Punch-hole camera notch */}
      <div className="w-4 h-4 rounded-full bg-slate-900 ring-2 ring-slate-800/20 shadow-inner flex-shrink-0" />

      {/* Right: Network, 5G, Wi-Fi, Battery */}
      <div className="flex items-center gap-1.5 text-[11px]">
        <span className="text-[10px] font-bold tracking-tighter opacity-80">5G</span>
        <Signal className="w-3.5 h-3.5 opacity-90" />
        <Wifi className="w-3.5 h-3.5 opacity-90" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-bold">96%</span>
          <Battery className="w-4 h-4 fill-current opacity-90" />
        </div>
      </div>
    </div>
  );
};
