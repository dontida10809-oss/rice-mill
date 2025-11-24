// src/constants/index.js

// Default Rice Types
export const DEFAULT_RICE_TYPES = [
  { id: 1, name: 'ข้าวหอมมะลิ', paddyPrice: 15, ricePrice: 35 },
  { id: 2, name: 'ข้าวหอมนิล', paddyPrice: 12, ricePrice: 28 },
  { id: 3, name: 'ข้าวเหนียว', paddyPrice: 13, ricePrice: 30 },
  { id: 4, name: 'ข้าวขาว 5%', paddyPrice: 10, ricePrice: 22 },
];

// Transaction Types
export const TRANSACTION_TYPES = {
  PADDY_IN: 'paddy_in',
  RICE_OUT: 'rice_out',
};

// Storage Keys
export const STORAGE_KEYS = {
  RICE_TYPES: 'riceTypes',
  PADDY_STOCK: 'paddyStock',
  RICE_STOCK: 'riceStock',
  TRANSACTIONS: 'transactions',
};

// Tab Names
export const TABS = {
  DASHBOARD: 'dashboard',
  STOCK: 'stock',
  TRANSACTIONS: 'transactions',
  TYPES: 'types',
};

// Date Format
export const DATE_FORMAT = {
  TH_SHORT: 'th-TH',
  EN_SHORT: 'en-US',
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELDS: 'กรุณากรอกข้อมูลให้ครบถ้วน',
  SUCCESS_PADDY: 'บันทึกข้าวเปลือกรับเข้าเรียบร้อย',
  SUCCESS_RICE: 'บันทึกข้าวสารขายออกเรียบร้อย',
  SUCCESS_ADD_TYPE: 'เพิ่มชนิดข้าวเรียบร้อย',
  CONFIRM_DELETE: 'ต้องการลบชนิดข้าวนี้?',
};

// Number Format
export const NUMBER_FORMAT = {
  DECIMAL_PLACES: 2,
  LOCALE: 'th-TH',
};