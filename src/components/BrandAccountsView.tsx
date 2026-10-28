import React, { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  RefreshCw,
  Trash2,
  Clock,
  Info,
} from 'lucide-react';
import { StatusBar } from './StatusBar';
import { BoundAccount } from '../types';
import { XiaomiLogo } from './BrandLogos';
import { QuickAuthorizeModal } from './QuickAuthorizeModal';
import { UnbindConfirmModal } from './UnbindConfirmModal';

interface BrandAccountsViewProps {
  onBack: () => void;
  boundAccounts: BoundAccount[];
  onAddAccount: (accountData: { phoneNumber: string }) => void;
  onSyncAccount: (accountId: string) => void;
  onUnbindAccount: (accountId: string) => void;
}

export const BrandAccountsView: React.FC<BrandAccountsViewProps> = ({
  onBack,
  boundAccounts,
  onAddAccount,
  onSyncAccount,
  onUnbindAccount,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [accountToUnbind, setAccountToUnbind] = useState<BoundAccount | null>(null);
  const [syncingMap, setSyncingMap] = useState<Record<string, boolean>>({});

  const handleSyncClick = (accountId: string) => {
    setSyncingMap((prev) => ({ ...prev, [accountId]: true }));
    onSyncAccount(accountId);
    setTimeout(() => {
      setSyncingMap((prev) => ({ ...prev, [accountId]: false }));
    }, 800);
  };

  const xiaomiAccounts = boundAccounts.filter((a) => a.brandId === 'xiaomi');

  return (
    <div className="min-h-full bg-[#f8f9fc] text-gray-900 pb-16 flex flex-col font-sans select-none">
      {/* Top Status Bar */}
      <StatusBar darkText={true} />

      {/* Top Navigation */}
      <div className="px-5 pt-2 pb-3 flex items-center justify-between border-b border-gray-100 bg-white">
        <button
          type="button"
          onClick={onBack}
          className="p-1 -ml-1 text-gray-800 hover:text-gray-950 active:opacity-60 transition-opacity cursor-pointer"
          aria-label="返回"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        <h1 className="text-base font-bold text-gray-900">小米账号管理</h1>
        <div className="w-6" /> {/* Balance spacer */}
      </div>

      {/* Main Account Management Area */}
      <div className="px-4 py-3.5 space-y-3.5 flex-1">
        {/* ★ 提示：绑定网关与网络环境要求 ★ */}
        <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-2xl p-3.5 flex items-start space-x-2.5 text-xs text-[#9a3412] shadow-2xs">
          <Info className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[12px]">
            <span className="font-bold text-[#c2410c]">绑定提示：</span>
            绑定时需要使用指定混合网关(91网关系列)，且需要和网关处于同一网络环境下。
          </p>
        </div>

        {/* Section Header: Left has "账号列表", Right has "绑定账号" */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-gray-900">账号列表</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-200/70 text-gray-700">
              {xiaomiAccounts.length}
            </span>
          </div>

          {/* ★ 绑定账号 放到账号列表 右边 ★ */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>绑定账号</span>
          </button>
        </div>

        {/* Account Cards */}
        {xiaomiAccounts.length > 0 ? (
          <div className="space-y-3">
            {xiaomiAccounts.map((account) => {
              const isSyncing = syncingMap[account.id] || account.status === 'syncing';

              return (
                <div
                  key={account.id}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs hover:border-gray-200 transition-all space-y-3"
                >
                  {/* Row 1: Logo + Phone Number (left) & Sync + Unbind (right) */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                        <XiaomiLogo className="w-8 h-8 rounded-lg" />
                      </div>

                      {/* 仅完整手机号，已完全去掉“已授权” */}
                      <span className="text-base font-bold text-gray-900 font-mono tracking-tight truncate">
                        {account.phoneNumber}
                      </span>
                    </div>

                    {/* Right: Actions beside account (Sync & Unbind) */}
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                      {/* 同步按钮 */}
                      <button
                        type="button"
                        onClick={() => handleSyncClick(account.id)}
                        disabled={isSyncing}
                        className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 active:bg-orange-200 text-orange-600 border border-orange-200/80 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                      >
                        <RefreshCw
                          className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-orange-600' : ''}`}
                        />
                        <span>{isSyncing ? '同步中' : '同步'}</span>
                      </button>

                      {/* 解绑按钮 */}
                      <button
                        type="button"
                        onClick={() => setAccountToUnbind(account)}
                        className="px-3 py-1.5 bg-gray-50 hover:bg-rose-50 active:bg-rose-100 text-gray-600 hover:text-rose-600 border border-gray-200/80 hover:border-rose-200 rounded-xl text-xs font-medium flex items-center space-x-1 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>解绑</span>
                      </button>
                    </div>
                  </div>

                  {/* Row 2: 上次同步时间 (独占整行底部，带细分割线，彻底解决换行错乱问题) */}
                  <div className="pt-2.5 border-t border-gray-50 flex items-center text-xs text-gray-400 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 text-gray-300 mr-1.5 flex-shrink-0" />
                    <span>上次同步：</span>
                    <span className="font-mono text-gray-600 font-medium ml-1">
                      {account.lastSyncTime}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-xs space-y-3 mt-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 mx-auto flex items-center justify-center">
              <XiaomiLogo className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">暂无绑定的账号</h4>
              <p className="text-xs text-gray-400 mt-1">
                点击右上角「绑定账号」进行授权接入
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="mt-2 inline-flex items-center space-x-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>绑定账号</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Authorize Modal */}
      <QuickAuthorizeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={(data) => {
          setIsAddModalOpen(false);
          onAddAccount(data);
        }}
      />

      {/* Unbind Confirm Modal */}
      <UnbindConfirmModal
        isOpen={!!accountToUnbind}
        account={accountToUnbind}
        onClose={() => setAccountToUnbind(null)}
        onConfirm={() => {
          if (accountToUnbind) {
            onUnbindAccount(accountToUnbind.id);
            setAccountToUnbind(null);
          }
        }}
      />
    </div>
  );
};
