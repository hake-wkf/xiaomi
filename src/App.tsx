/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProfileView } from './components/ProfileView';
import { PlatformSelectionView } from './components/PlatformSelectionView';
import { BoundBrandsView } from './components/BoundBrandsView';
import { BrandAccountsView } from './components/BrandAccountsView';
import { ToastContainer, ToastMessage } from './components/Toast';
import { INITIAL_BOUND_ACCOUNTS } from './data/mockData';
import { BoundAccount, DeviceItem } from './types';
import { Smartphone, Monitor, RotateCcw } from 'lucide-react';

type CurrentView = 'profile' | 'platforms' | 'bound_brands' | 'brand_accounts';

export default function App() {
  const [currentView, setCurrentView] = useState<CurrentView>('profile');
  const [selectedBrandId, setSelectedBrandId] = useState<string>('xiaomi');
  const [activeTab, setActiveTab] = useState<'home' | 'devices' | 'mine'>('mine');
  const [isDesktopFrame, setIsDesktopFrame] = useState(true);

  // Load bound accounts with fallback to initial mock data
  const [boundAccounts, setBoundAccounts] = useState<BoundAccount[]>(() => {
    try {
      const saved = localStorage.getItem('jiwu_bound_accounts');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_BOUND_ACCOUNTS;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jiwu_bound_accounts', JSON.stringify(boundAccounts));
    } catch {
      // ignore
    }
  }, [boundAccounts]);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Reset to initial demo data
  const handleResetData = () => {
    setBoundAccounts(INITIAL_BOUND_ACCOUNTS);
    addToast({
      type: 'info',
      title: '已重置演示数据',
      description: '恢复初始2个已绑定小米账号状态',
    });
  };

  // Add account handler (Simulated fast authorization as per "授权绑定页面不需要画出来")
  const handleAddAccount = (data: { phoneNumber: string }) => {
    const newId = `acc-xm-${Date.now()}`;
    const now = new Date();
    const formattedNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    // Sample newly discovered Xiaomi devices for this account
    const sampleNewDevices: DeviceItem[] = [
      {
        id: `dev-${Date.now()}-1`,
        name: `米家智能插座3`,
        category: 'socket',
        room: '默认房间',
        online: true,
        power: true,
        value: '功率 42.1W',
        model: 'ZNCZ08LM',
      },
      {
        id: `dev-${Date.now()}-2`,
        name: `米家LED吸顶灯`,
        category: 'light',
        room: '默认房间',
        online: true,
        power: true,
        value: '亮度 80% | 暖白光',
        model: 'MJXD01YL',
      },
      {
        id: `dev-${Date.now()}-3`,
        name: `米家温湿度传感器2`,
        category: 'sensor',
        room: '默认房间',
        online: true,
        value: '23.4℃ / 48%RH',
        model: 'LYWSD03MMC',
      },
    ];

    const newAccount: BoundAccount = {
      id: newId,
      brandId: 'xiaomi',
      accountName: data.phoneNumber,
      phoneNumber: data.phoneNumber,
      remark: '',
      authTime: formattedNow,
      expireTime: `${now.getFullYear() + 1}-10-27 12:00`,
      lastSyncTime: formattedNow,
      status: 'active',
      devices: sampleNewDevices,
    };

    setBoundAccounts((prev) => [newAccount, ...prev]);

    addToast({
      type: 'success',
      title: '小米账号授权绑定成功',
      description: `账号 ${data.phoneNumber} 绑定成功，已同步设备`,
    });
  };

  // Sync account handler ("账号旁边有同步按钮")
  const handleSyncAccount = (accountId: string) => {
    const now = new Date();
    const formattedNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    setBoundAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === accountId) {
          return {
            ...acc,
            lastSyncTime: formattedNow,
            // Randomly update telemetry for realistic feedback
            devices: acc.devices.map((d) => {
              if (d.category === 'socket') {
                return { ...d, value: `功率 ${(30 + Math.random() * 80).toFixed(1)}W` };
              }
              if (d.category === 'sensor' && d.value?.includes('℃')) {
                return { ...d, value: `${(21 + Math.random() * 4).toFixed(1)}℃ / ${(45 + Math.random() * 15).toFixed(0)}%RH` };
              }
              return d;
            }),
          };
        }
        return acc;
      })
    );

    const targetAccount = boundAccounts.find((a) => a.id === accountId);
    addToast({
      type: 'success',
      title: '同步完成',
      description: `账号 ${targetAccount?.phoneNumber || ''} 设备状态已更新`,
    });
  };

  // Unbind account handler ("可以解绑账号信息")
  const handleUnbindAccount = (accountId: string) => {
    const targetAccount = boundAccounts.find((a) => a.id === accountId);
    setBoundAccounts((prev) => prev.filter((acc) => acc.id !== accountId));
    addToast({
      type: 'info',
      title: '已解除账号绑定',
      description: `账号 ${targetAccount?.phoneNumber || ''} 及名下设备已移除`,
    });
  };

  // Toggle power of a device inside an account
  const handleToggleDevicePower = (accountId: string, deviceId: string) => {
    setBoundAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === accountId) {
          return {
            ...acc,
            devices: acc.devices.map((d) => {
              if (d.id === deviceId) {
                const nextPower = !d.power;
                return {
                  ...d,
                  power: nextPower,
                  value: d.category === 'socket' ? (nextPower ? '功率 65.2W' : '已关机 (待机中)') : d.value,
                };
              }
              return d;
            }),
          };
        }
        return acc;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col items-center justify-start md:justify-center p-0 md:p-6 font-sans">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Top Floating Control Bar (Desktop Only) */}
      <aside aria-label="原型控制栏" className="hidden md:flex items-center justify-between w-full max-w-md mb-3 px-4 py-2 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/60 shadow-lg text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">吉物智能物联 · 三方品牌设备</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleResetData}
            title="重置测试数据"
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsDesktopFrame(!isDesktopFrame)}
            title={isDesktopFrame ? '切换全屏预览' : '切换手机外框'}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
          >
            {isDesktopFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          </button>
        </div>
      </aside>

      {/* Mobile Device Canvas Frame */}
      <div
        className={`w-full transition-all duration-300 relative ${
          isDesktopFrame
            ? 'max-w-[420px] h-[92vh] max-h-[880px] rounded-[42px] border-[10px] border-slate-800/95 shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-slate-700/50 bg-[#f4f5f9]'
            : 'max-w-md min-h-screen bg-[#f4f5f9]'
        }`}
      >
        {/* Phone Speaker Notch Indicator (when framed) */}
        {isDesktopFrame && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-40 flex items-center justify-center space-x-2 pointer-events-none">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
            <div className="w-10 h-1 bg-slate-800 rounded-full" />
          </div>
        )}

        {/* Scrollable Screen Inner Viewport */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden relative">
          {/* VIEW 1: Profile View (Figure 1: "我的" profile with "三方品牌设备" below "网关管理") */}
          {currentView === 'profile' && (
            <ProfileView
              onOpenThirdParty={() => setCurrentView('platforms')}
              boundAccounts={boundAccounts}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}

          {/* VIEW 2: Platform Selection (Figure 2: "选择平台", search, only Xiaomi shown, top-right "已绑定品牌") */}
          {currentView === 'platforms' && (
            <PlatformSelectionView
              onBack={() => setCurrentView('profile')}
              onSelectBrand={(brandId) => {
                setSelectedBrandId(brandId);
                setCurrentView('brand_accounts');
              }}
              onOpenBoundBrands={() => setCurrentView('bound_brands')}
              boundAccounts={boundAccounts}
            />
          )}

          {/* VIEW 3: Bound Brands View ("已绑定品牌", shows customer bound brand information) */}
          {currentView === 'bound_brands' && (
            <BoundBrandsView
              onBack={() => setCurrentView('platforms')}
              onSelectBrand={(brandId) => {
                setSelectedBrandId(brandId);
                setCurrentView('brand_accounts');
              }}
              boundAccounts={boundAccounts}
            />
          )}

          {/* VIEW 4: Brand Accounts Management (Xiaomi account details, multi-account, sync buttons, unbind) */}
          {currentView === 'brand_accounts' && (
            <BrandAccountsView
              onBack={() => setCurrentView('platforms')}
              boundAccounts={boundAccounts}
              onAddAccount={handleAddAccount}
              onSyncAccount={handleSyncAccount}
              onUnbindAccount={handleUnbindAccount}
            />
          )}
        </div>

        {/* Home Indicator bar (when framed) */}
        {isDesktopFrame && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400/50 rounded-full pointer-events-none z-40" />
        )}
      </div>

      {/* Quick Navigation Drawer for easy testing on wide screens */}
      <nav aria-label="页面切换调试导航" className="hidden md:flex items-center space-x-2 mt-3 text-xs text-slate-400">
        <span>当前视图直达:</span>
        <button
          type="button"
          onClick={() => setCurrentView('profile')}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            currentView === 'profile'
              ? 'bg-orange-500 text-white font-bold'
              : 'bg-slate-800 hover:text-white'
          }`}
        >
          图一: 我的主页
        </button>
        <button
          type="button"
          onClick={() => setCurrentView('platforms')}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            currentView === 'platforms'
              ? 'bg-orange-500 text-white font-bold'
              : 'bg-slate-800 hover:text-white'
          }`}
        >
          图二: 选择平台
        </button>
        <button
          type="button"
          onClick={() => setCurrentView('bound_brands')}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            currentView === 'bound_brands'
              ? 'bg-orange-500 text-white font-bold'
              : 'bg-slate-800 hover:text-white'
          }`}
        >
          已绑定品牌
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedBrandId('xiaomi');
            setCurrentView('brand_accounts');
          }}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            currentView === 'brand_accounts'
              ? 'bg-orange-500 text-white font-bold'
              : 'bg-slate-800 hover:text-white'
          }`}
        >
          小米账号管理 (同步/解绑/新增)
        </button>
      </nav>
    </div>
  );
}
