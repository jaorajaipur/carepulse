import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface AndroidShellProps {
  children: React.ReactNode;
}

export const AndroidShell: React.FC<AndroidShellProps> = ({ children }) => {
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start sm:py-6 sm:px-4 relative font-sans">
      {/* Floating Device Frame Mode Switcher */}
      <div className="fixed top-3 right-3 z-[100] flex items-center bg-slate-800/90 backdrop-blur-md border border-slate-700/80 rounded-full p-1 shadow-2xl text-xs text-white">
        <button
          onClick={() => setDeviceFrameMode(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-xs font-semibold ${
            deviceFrameMode
              ? 'bg-[#007dab] text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
          title="View in Android Phone Frame"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Pixel 8 Frame</span>
        </button>
        <button
          onClick={() => setDeviceFrameMode(false)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-xs font-semibold ${
            !deviceFrameMode
              ? 'bg-[#007dab] text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
          title="View Responsive Full Screen"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Responsive</span>
        </button>
      </div>

      {deviceFrameMode ? (
        /* Realistic Android Smartphone Frame */
        <div className="w-full max-w-[428px] my-auto relative">
          {/* Hardware Frame Shell */}
          <div className="relative rounded-[48px] bg-slate-950 p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1),0_0_50px_rgba(0,125,171,0.2)] border-[3px] border-slate-800/90 overflow-hidden">
            {/* Side hardware buttons (Power & Volume) */}
            <div className="hidden sm:block absolute -right-[5px] top-28 w-[3px] h-12 bg-slate-700 rounded-r-md"></div>
            <div className="hidden sm:block absolute -left-[5px] top-24 w-[3px] h-10 bg-slate-700 rounded-l-md"></div>
            <div className="hidden sm:block absolute -left-[5px] top-38 w-[3px] h-10 bg-slate-700 rounded-l-md"></div>

            {/* Internal Screen Viewport */}
            <div className="w-full bg-[#f8f9ff] rounded-[38px] overflow-hidden min-h-[854px] max-h-[890px] flex flex-col relative shadow-inner">
              {children}
            </div>
          </div>
        </div>
      ) : (
        /* Full Viewport / Responsive Mode */
        <div className="w-full max-w-lg min-h-screen bg-[#f8f9ff] flex flex-col shadow-2xl relative">
          {children}
        </div>
      )}
    </div>
  );
};
