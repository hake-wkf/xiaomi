import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles, X, Phone } from 'lucide-react';
import { XiaomiLogo } from './BrandLogos';

interface QuickAuthorizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (accountData: { phoneNumber: string }) => void;
}

export const QuickAuthorizeModal: React.FC<QuickAuthorizeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const quickDemoPhones = [
    '13800138000',
    '18612345678',
    '15988886666',
    '19966668888',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const targetPhone = phoneNumber.trim() || quickDemoPhones[0];

    setTimeout(() => {
      setIsSubmitting(false);
      onConfirm({
        phoneNumber: targetPhone,
      });
      setPhoneNumber('');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Modal Header */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-2.5">
            <XiaomiLogo className="w-8 h-8 rounded-xl" />
            <div>
              <h3 className="text-base font-bold text-gray-900">绑定小米账号</h3>
              <p className="text-[11px] text-gray-400">Xiaomi IoT Open Platform</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-orange-50/70 rounded-2xl p-3.5 border border-orange-100/80 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-orange-900 leading-relaxed">
              <span className="font-bold">免跳转极速授权：</span>
              已对接小米开放平台授权网关，输入手机号后点击确认即可授权绑定并同步设备。
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              小米账号手机号
            </label>
            <div className="relative flex items-center">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="tel"
                maxLength={11}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="请输入完整11位手机号"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-mono rounded-xl pl-10 pr-3.5 py-2.5 outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                autoFocus
              />
            </div>

            {/* Quick Demo Phone Chips */}
            <div className="flex items-center space-x-1.5 mt-2.5 flex-wrap">
              <span className="text-[11px] text-gray-400">快捷填充:</span>
              {quickDemoPhones.slice(0, 3).map((phone) => (
                <button
                  type="button"
                  key={phone}
                  onClick={() => setPhoneNumber(phone)}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-gray-100 hover:bg-orange-50 hover:text-orange-600 text-gray-600 transition-colors cursor-pointer"
                >
                  {phone}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-1 text-[11px] text-gray-400 flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>授权后将自动同步该手机号名下的小米智能设备</span>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-500/20 active:opacity-90 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>正在授权...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>确认授权绑定</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
