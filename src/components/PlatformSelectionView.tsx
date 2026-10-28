import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronRight, X, CheckCircle2, Sparkles } from 'lucide-react';
import { StatusBar } from './StatusBar';
import { BoundAccount, ThirdPartyBrand } from '../types';
import { BRANDS_DATA } from '../data/mockData';
import { BrandLogoItem } from './BrandLogos';

interface PlatformSelectionViewProps {
  onBack: () => void;
  onSelectBrand: (brandId: string) => void;
  onOpenBoundBrands: () => void;
  boundAccounts: BoundAccount[];
}

export const PlatformSelectionView: React.FC<PlatformSelectionViewProps> = ({
  onBack,
  onSelectBrand,
  onOpenBoundBrands,
  boundAccounts,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Per user specification: "目前品牌列表只展示小米"
  // Only Xiaomi is active in the primary list, and search allows filtering.
  const activeBrand = BRANDS_DATA.find((b) => b.id === 'xiaomi') || BRANDS_DATA[0];

  const xiaomiBoundCount = boundAccounts.filter((a) => a.brandId === 'xiaomi').length;
  const isBoundAny = boundAccounts.length > 0;

  // Search filter logic
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const matchesXiaomi =
    !normalizedQuery ||
    activeBrand.name.toLowerCase().includes(normalizedQuery) ||
    activeBrand.enName.toLowerCase().includes(normalizedQuery) ||
    '米家'.includes(normalizedQuery);

  return (
    <div className="min-h-full bg-white text-gray-900 pb-16 flex flex-col font-sans select-none">
      {/* Top Status Bar */}
      <StatusBar darkText={true} />

      {/* Top Navigation Header matching Figure 2 */}
      <div className="px-5 pt-2 pb-1 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="p-1 -ml-1 text-gray-800 hover:text-gray-950 active:opacity-60 transition-opacity"
          aria-label="返回"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Top Right Action: "已绑定品牌" */}
        <button
          type="button"
          onClick={onOpenBoundBrands}
          className="text-[14px] font-medium text-gray-700 hover:text-orange-600 active:opacity-70 transition-colors flex items-center space-x-1 py-1 px-2 rounded-lg"
        >
          <span>已绑定品牌</span>
          {isBoundAny && (
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          )}
        </button>
      </div>

      {/* Page Title */}
      <div className="px-6 pt-2 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-950">选择平台</h1>
      </div>

      {/* Search Input Box */}
      <div className="px-5 pb-5">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none stroke-[2.2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="请输入平台名称"
            className="w-full bg-[#f2f4f7] text-gray-900 placeholder-gray-400 text-sm rounded-full pl-10 pr-9 py-2.5 outline-none focus:ring-2 focus:ring-orange-400/50 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Section Header: 推荐 / 品牌列表 */}
      <div className="px-6 pb-2">
        <span className="text-xs font-semibold text-gray-400 tracking-wider">
          推荐平台
        </span>
      </div>

      {/* Brand List: Currently shows Xiaomi as specified */}
      <div className="flex-1 px-5 space-y-2">
        {matchesXiaomi ? (
          <div
            onClick={() => onSelectBrand(activeBrand.id)}
            className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-xs hover:border-gray-200 active:bg-gray-50 transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center space-x-3.5">
              <BrandLogoItem brandId={activeBrand.id} className="w-11 h-11 rounded-full shadow-xs" />
              <div>
                <span className="text-base font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {activeBrand.name}
                </span>
                <p className="text-xs text-gray-400 mt-0.5">
                  Xiaomi / 米家智能设备平台
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-all" />
          </div>
        ) : (
          <div className="py-12 text-center text-gray-400 space-y-2">
            <p className="text-sm">未搜索到相关平台 "{searchQuery}"</p>
            <p className="text-xs text-gray-400">目前平台列表仅开放【小米】接入，更多品牌即将上线</p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-orange-600 font-medium underline mt-2"
            >
              清空搜索返回小米
            </button>
          </div>
        )}

        {/* Coming Soon Notice Card */}
        <div className="mt-8 bg-gradient-to-r from-gray-50 to-orange-50/30 rounded-2xl p-4 border border-dashed border-gray-200 flex items-start space-x-3">
          <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <p className="font-semibold text-gray-800">更多三方品牌接入中</p>
            <p className="text-gray-400 leading-relaxed">
              华为智能家居、涂鸦智能、美的照明、大金空调等主流生态正加紧适配中，敬请期待。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
