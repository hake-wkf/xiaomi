import React from 'react';

export const XiaomiLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div
    className={`${className} rounded-2xl bg-[#ff6700] flex items-center justify-center text-white shadow-sm flex-shrink-0 relative overflow-hidden`}
  >
    <svg viewBox="0 0 100 100" className="w-[62%] h-[62%] fill-current">
      {/* Official styled Xiaomi mi monogram */}
      <rect x="18" y="22" width="12" height="56" rx="4" />
      <path d="M42 40 C42 30, 52 22, 64 22 L64 34 C58 34, 54 38, 54 44 L54 78 L42 78 Z" />
      <rect x="66" y="22" width="12" height="56" rx="4" />
      <rect x="42" y="44" width="12" height="34" />
    </svg>
  </div>
);

export const BrandLogoItem: React.FC<{ brandId: string; className?: string }> = ({ brandId, className = 'w-11 h-11' }) => {
  if (brandId === 'xiaomi') {
    return <XiaomiLogo className={className} />;
  }

  // Daikin
  if (brandId === 'daikin') {
    return (
      <div className={`${className} rounded-full bg-white border border-gray-200 flex items-center justify-center p-1.5 shadow-sm`}>
        <div className="w-full h-full bg-amber-500 rounded-sm flex items-center justify-center text-white text-[10px] font-black tracking-tight">
          DAIKIN
        </div>
      </div>
    );
  }

  // Hisense
  if (brandId === 'hisense') {
    return (
      <div className={`${className} rounded-full bg-[#008f82] flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
        爱家
      </div>
    );
  }

  // Hitachi
  if (brandId === 'hitachi') {
    return (
      <div className={`${className} rounded-full bg-[#cc0000] flex items-center justify-center text-white font-bold text-[9px] shadow-sm`}>
        HITACHI
      </div>
    );
  }

  // Narwal
  if (brandId === 'narwal') {
    return (
      <div className={`${className} rounded-full bg-[#3b5998] flex items-center justify-center text-white font-black text-base shadow-sm`}>
        N
      </div>
    );
  }

  // Midea Lighting
  if (brandId === 'midea_lighting') {
    return (
      <div className={`${className} rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-bold text-sm shadow-sm`}>
        <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
        </div>
      </div>
    );
  }

  // Aqara
  if (brandId === 'aqara') {
    return (
      <div className={`${className} rounded-full bg-[#0288d1] flex items-center justify-center text-white font-bold text-[10px] shadow-sm`}>
        Aqara
      </div>
    );
  }

  // AUX
  if (brandId === 'aux') {
    return (
      <div className={`${className} rounded-full bg-sky-50 border border-sky-300 flex items-center justify-center text-[#005bac] font-black text-[11px] shadow-sm`}>
        AUX
      </div>
    );
  }

  // Default fallback
  return (
    <div className={`${className} rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-xs shadow-sm`}>
      {brandId.slice(0, 2).toUpperCase()}
    </div>
  );
};
