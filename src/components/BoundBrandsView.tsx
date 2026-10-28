import React from 'react';
import { ArrowLeft, ChevronRight, ShieldCheck, Cpu } from 'lucide-react';
import { StatusBar } from './StatusBar';
import { BoundAccount } from '../types';
import { BrandLogoItem } from './BrandLogos';

interface BoundBrandsViewProps {
  onBack: () => void;
  onSelectBrand: (brandId: string) => void;
  boundAccounts: BoundAccount[];
}

export const BoundBrandsView: React.FC<BoundBrandsViewProps> = ({
  onBack,
  onSelectBrand,
  boundAccounts,
}) => {
  // Aggregate accounts by brandId
  const xiaomiAccounts = boundAccounts.filter((a) => a.brandId === 'xiaomi');
  const totalXiaomiDevices = xiaomiAccounts.reduce((sum, a) => sum + a.devices.length, 0);

  return (
    <div className="min-h-full bg-[#f8f9fc] text-gray-900 pb-16 flex flex-col font-sans select-none">
      {/* Top Status Bar */}
      <StatusBar darkText={true} />

      {/* Top Nav Header */}
      <div className="px-5 pt-2 pb-3 flex items-center justify-between border-b border-gray-100 bg-white">
        <button
          type="button"
          onClick={onBack}
          className="p-1 -ml-1 text-gray-800 hover:text-gray-950 active:opacity-60 transition-opacity"
          aria-label="返回"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
        <h1 className="text-base font-bold text-gray-900">已绑定品牌</h1>
        <div className="w-6" /> {/* Balance spacer */}
      </div>

      {/* Subheader summary */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-5 m-4 rounded-2xl shadow-sm">
        <div className="flex items-center space-x-2 text-xs opacity-90">
          <ShieldCheck className="w-4 h-4" />
          <span>第三方生态授权托管中</span>
        </div>
        <div className="mt-3 flex items-baseline space-x-3">
          <span className="text-3xl font-black">{xiaomiAccounts.length > 0 ? 1 : 0}</span>
          <span className="text-xs font-medium opacity-90">个已接入品牌平台</span>
        </div>
        <p className="text-xs text-white/80 mt-1">
          当前已绑定 {xiaomiAccounts.length} 个账号，共同步接入 {totalXiaomiDevices} 台三方设备
        </p>
      </div>

      {/* List of Bound Brands */}
      <div className="px-4 space-y-3">
        <span className="text-xs font-semibold text-gray-400 px-1">
          已授权品牌列表
        </span>

        {xiaomiAccounts.length > 0 ? (
          <div
            onClick={() => onSelectBrand('xiaomi')}
            className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-xs hover:border-orange-200 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <BrandLogoItem brandId="xiaomi" className="w-12 h-12 shadow-xs" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      小米
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                      已连接
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    已绑定 {xiaomiAccounts.length} 个小米账号 · 同步 {totalXiaomiDevices} 个设备
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-xs font-medium text-orange-600">
                <span>管理账号</span>
                <ChevronRight className="w-4 h-4 text-orange-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Account Quick Preview Pills */}
            <div className="mt-3.5 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
              {xiaomiAccounts.map((acc) => (
                <div
                  key={acc.id}
                  className="bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1 text-xs text-gray-600 flex items-center space-x-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-medium font-mono text-gray-800">{acc.phoneNumber}</span>
                  <span className="text-gray-400 text-[11px]">({acc.devices.length}台)</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-3">
              <Cpu className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-gray-800">暂无已绑定的品牌</p>
            <p className="text-xs text-gray-400 mt-1">
              您可以在选择平台列表中选择小米进行多账号授权绑定
            </p>
            <button
              type="button"
              onClick={onBack}
              className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs font-semibold transition-colors"
            >
              前往选择平台绑定
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
