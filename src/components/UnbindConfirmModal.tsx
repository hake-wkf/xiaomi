import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { BoundAccount } from '../types';

interface UnbindConfirmModalProps {
  isOpen: boolean;
  account: BoundAccount | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const UnbindConfirmModal: React.FC<UnbindConfirmModalProps> = ({
  isOpen,
  account,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-2 text-rose-600">
            <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
            <h3 className="text-base font-bold text-gray-900">解除三方账号绑定</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            您正在解除手机号为{' '}
            <span className="font-bold font-mono text-gray-900">
              {account.phoneNumber}
            </span>{' '}
            的小米账号授权绑定。
          </p>

          <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100 text-xs text-rose-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <span>解除后影响：</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-rose-700">
              <li>此账号名下绑定的 <strong className="font-semibold">{account.devices.length} 台设备</strong> 将从吉物空间移除</li>
              <li>已配置的相关智能联动规则与场景将自动失效</li>
              <li>如需重新使用，需要重新进行平台授权绑定</li>
            </ul>
          </div>

          <div className="pt-2 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              取消
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold shadow-md shadow-rose-600/20 active:opacity-90 flex items-center justify-center space-x-1.5 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>确认解绑</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
