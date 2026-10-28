import React from 'react';
import {
  ChevronRight,
  SlidersHorizontal,
  Home,
  Sparkles,
  GitFork,
  Network,
  Router,
  Cpu,
  BarChart2,
  ShieldCheck,
  Radio,
  User,
  LayoutGrid,
} from 'lucide-react';
import { StatusBar, MiniProgramCapsule } from './StatusBar';
import { BoundAccount } from '../types';

interface ProfileViewProps {
  onOpenThirdParty: () => void;
  boundAccounts: BoundAccount[];
  activeTab: 'home' | 'devices' | 'mine';
  setActiveTab: (tab: 'home' | 'devices' | 'mine') => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onOpenThirdParty,
  boundAccounts,
  activeTab,
  setActiveTab,
}) => {
  const totalBoundDevices = boundAccounts.reduce((sum, acc) => sum + acc.devices.length, 0);

  return (
    <div className="min-h-full bg-[#f4f5f9] text-gray-800 pb-20 select-none relative font-sans">
      {/* Top Gradient Header Area */}
      <div className="relative bg-gradient-to-b from-[#f97316] via-[#fb923c] to-[#fed7aa]/50 pb-7 pt-1 px-4 overflow-hidden">
        {/* Top Status Bar */}
        <StatusBar darkText={false} />

        {/* WeChat Mini Program Capsule */}
        <div className="flex justify-end pt-1 pr-1 pb-3">
          <MiniProgramCapsule light={true} />
        </div>

        {/* Large Decorative Watermark '谷' */}
        <div className="absolute right-8 top-10 pointer-events-none opacity-20">
          <svg width="170" height="170" viewBox="0 0 100 100" className="fill-orange-800">
            <rect x="15" y="15" width="70" height="70" rx="18" fill="none" stroke="currentColor" strokeWidth="9" />
            <path
              d="M32 40 L50 25 L68 40 M50 28 L50 72 M34 72 L66 72"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* User Profile Header */}
        <div className="relative z-10 flex items-center justify-between mt-1 px-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              卫不二
            </h1>
            <p className="text-xs text-gray-800/80 mt-1 font-medium tracking-wide">
              账号: 17696180841
            </p>
          </div>

          {/* User Avatar */}
          <div className="relative mr-2">
            <div className="w-16 h-16 rounded-full border-2 border-white/80 overflow-hidden shadow-md bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center">
              <img
                src="/assets/aistudio/7bb9f9774758672ee0bc89d6d56935f4_d02b3de6.jpg"
                alt="卫不二头像"
                className="w-full h-full object-cover scale-[2.2] object-[88%_16%]"
                onError={(e) => {
                  // Fallback to stylized SVG avatar if image crop fails
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold bg-amber-500">
                卫
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row Cards */}
        <div className="grid grid-cols-2 gap-3 mt-5 relative z-10">
          <div className="bg-white/95 backdrop-blur-xs rounded-2xl py-3 px-4 shadow-xs border border-white/70 flex items-center justify-center space-x-2.5">
            <div className="w-6 h-6 flex items-center justify-center text-gray-600">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <line x1="7" y1="8" x2="17" y2="8" />
                <line x1="7" y1="12" x2="17" y2="12" />
                <line x1="7" y1="16" x2="13" y2="16" />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-gray-800">116个网关</span>
          </div>

          <div className="bg-white/95 backdrop-blur-xs rounded-2xl py-3 px-4 shadow-xs border border-white/70 flex items-center justify-center space-x-2.5">
            <div className="w-6 h-6 flex items-center justify-center text-gray-600">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <line x1="7" y1="9" x2="17" y2="9" />
                <line x1="7" y1="14" x2="17" y2="14" />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-gray-800">5405个智能设备</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 -mt-3 relative z-10 space-y-3.5">
        {/* Current Space Card */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-full overflow-hidden border border-gray-100 bg-sky-100 flex-shrink-0">
            <img
              src="/assets/aistudio/7bb9f9774758672ee0bc89d6d56935f4_d02b3de6.jpg"
              alt="空间头像"
              className="w-full h-full object-cover scale-[2.2] object-[88%_16%]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-bold text-sm">
              吉
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-gray-900 truncate">
                吉物办公空间00e04c951411
              </h2>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1.5 space-x-3">
              <div className="flex items-center space-x-1">
                <Home className="w-3.5 h-3.5 text-gray-400" />
                <span>房间 19</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center space-x-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
                <span>设备 174</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-gray-400" />
                <span>成员 64</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu List Group 1: Device and Space Controls */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden divide-y divide-gray-100/70">
          {/* 设备管理 */}
          <button
            type="button"
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[14px] font-medium text-gray-800">设备管理</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>

          {/* 房间设置 */}
          <button
            type="button"
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-emerald-500">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <span className="text-[14px] font-medium text-gray-800">房间设置</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>

          {/* 场景管理 */}
          <button
            type="button"
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center">
                <LayoutGrid className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[14px] font-medium text-gray-800">场景管理</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>

          {/* 联动设置 */}
          <button
            type="button"
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[14px] font-medium text-gray-800">联动设置</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>

          {/* 设备分组 */}
          <button
            type="button"
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center">
                <GitFork className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[14px] font-medium text-gray-800">设备分组</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>

          {/* 网关管理 */}
          <button
            type="button"
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-500 flex items-center justify-center">
                <Router className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[14px] font-medium text-gray-800">网关管理</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>

          {/* ★★★ 新增栏目: 三方品牌设备 (Placed right below 网关管理) ★★★ */}
          <button
            type="button"
            onClick={onOpenThirdParty}
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-orange-50/60 active:bg-orange-100/70 transition-all bg-gradient-to-r from-orange-50/30 to-amber-50/20 group cursor-pointer text-left"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
                <Cpu className="w-4 h-4 stroke-[2.4]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    三方品牌设备
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-600 border border-orange-200">
                    新功能
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">
                  支持小米生态等第三方品牌多账号授权绑定
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              {boundAccounts.length > 0 && (
                <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                  已绑定 {boundAccounts.length} 账号 · {totalBoundDevices} 设备
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Menu List Group 2: History & Account */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden divide-y divide-gray-100/70">
          <button
            type="button"
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-lg bg-orange-100/70 text-orange-600 flex items-center justify-center font-bold text-xs">
                J
              </div>
              <span className="text-[14px] font-medium text-gray-800">历史数据</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>

          <button
            type="button"
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[14px] font-medium text-gray-800">账号与安全</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200/80 px-6 py-2 flex items-center justify-around z-30 shadow-lg">
        {/* 首页 */}
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center space-y-0.5 ${
            activeTab === 'home' ? 'text-orange-500 font-bold' : 'text-gray-400 font-normal'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
          </div>
          <span className="text-[11px]">首页</span>
        </button>

        {/* 设备 */}
        <button
          type="button"
          onClick={() => setActiveTab('devices')}
          className={`flex flex-col items-center justify-center space-y-0.5 ${
            activeTab === 'devices' ? 'text-orange-500 font-bold' : 'text-gray-400 font-normal'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <Radio className="w-5 h-5 stroke-2" />
          </div>
          <span className="text-[11px]">设备</span>
        </button>

        {/* 我的 */}
        <button
          type="button"
          onClick={() => setActiveTab('mine')}
          className={`flex flex-col items-center justify-center space-y-0.5 ${
            activeTab === 'mine' ? 'text-[#ff6700] font-bold' : 'text-gray-400 font-normal'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-current" />
            </div>
          </div>
          <span className="text-[11px]">我的</span>
        </button>
      </div>
    </div>
  );
};
