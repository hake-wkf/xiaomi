export interface DeviceItem {
  id: string;
  name: string;
  category: 'socket' | 'light' | 'sensor' | 'curtain' | 'climate' | 'gateway';
  room: string;
  online: boolean;
  power?: boolean;
  value?: string;
  model: string;
}

export interface BoundAccount {
  id: string;
  brandId: string;
  accountName: string;
  phoneNumber: string;
  remark: string;
  authTime: string;
  expireTime: string;
  lastSyncTime: string;
  status: 'active' | 'syncing' | 'expired';
  devices: DeviceItem[];
}

export interface ThirdPartyBrand {
  id: string;
  name: string;
  enName: string;
  description: string;
  iconBg: string;
  logoUrl?: string;
  category: string;
  isAvailable: boolean; // Xiaomi is active, others can be coming soon
}
