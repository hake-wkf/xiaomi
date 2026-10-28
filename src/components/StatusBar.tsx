import React from 'react';
import { Wifi } from 'lucide-react';

interface StatusBarProps {
  darkText?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ darkText = false }) => {
  const textColor = darkText ? 'text-gray-900' : 'text-gray-900';

  return (
    <div className={`w-full px-6 pt-3 pb-2 flex items-center justify-between text-xs font-medium select-none ${textColor} z-20`}>
      <span className="font-semibold text-[13px] tracking-tight">10:35</span>
      <div className="flex items-center space-x-2 text-[11px]">
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
        <span className="font-bold text-[10px] tracking-tighter">5G</span>
        <span className="font-bold text-[10px] tracking-tighter opacity-80">5GA</span>
        <span className="font-bold text-[9px] border border-current px-0.5 rounded leading-none">HD</span>
        <div className="flex items-center space-x-1 pl-0.5">
          <div className="w-5 h-2.5 border border-current rounded-xs p-[1px] flex items-center">
            <div className="w-[82%] h-full bg-current rounded-[1px]" />
          </div>
          <span className="text-[10px] font-semibold">82</span>
        </div>
      </div>
    </div>
  );
};

export const MiniProgramCapsule: React.FC<{ onMore?: () => void; onClose?: () => void; light?: boolean }> = ({
  light = false,
}) => {
  return (
    <div
      className={`flex items-center h-8 rounded-full border px-2.5 py-1 space-x-2 ${
        light
          ? 'bg-black/20 border-white/20 text-white backdrop-blur-sm'
          : 'bg-white/80 border-gray-200/80 text-gray-800 shadow-xs'
      }`}
    >
      <button className="flex items-center justify-center space-x-0.5 hover:opacity-75 transition-opacity px-0.5">
        <span className="w-1 h-1 rounded-full bg-current" />
        <span className="w-1 h-1 rounded-full bg-current" />
        <span className="w-1 h-1 rounded-full bg-current" />
      </button>
      <div className={`w-[1px] h-3.5 ${light ? 'bg-white/30' : 'bg-gray-300'}`} />
      <button className="flex items-center justify-center hover:opacity-75 transition-opacity px-0.5">
        <div className="w-3 h-3 rounded-full border-[1.5px] border-current flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-current" />
        </div>
      </button>
    </div>
  );
};
