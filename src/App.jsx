import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, FileText, Edit2 } from 'lucide-react';
import Dashboard from './components/dashboard';
import StockView from './components/stock';
import TransactionsView from './components/transactions';
import RiceTypesView from './components/rice_type';

// ฟังก์ชันจัดการ Storage
const StorageManager = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Error saving to localStorage:', e);
      return false;
    }
  },
  load: (key, defaultValue = []) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Error loading from localStorage:', e);
      return defaultValue;
    }
  }
};

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [riceTypes, setRiceTypes] = useState([]);
  const [paddyStock, setPaddyStock] = useState([]);
  const [riceStock, setRiceStock] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // โหลดข้อมูลจาก localStorage
  useEffect(() => {
    const loadedRiceTypes = StorageManager.load('riceTypes', [
      { id: 1, name: 'ข้าวหอมมะลิ', paddyPrice: 15, ricePrice: 35 },
      { id: 2, name: 'ข้าวหอมนิล', paddyPrice: 12, ricePrice: 28 },
      { id: 3, name: 'ข้าวเหนียว', paddyPrice: 13, ricePrice: 30 },
      { id: 4, name: 'ข้าวขาว 5%', paddyPrice: 10, ricePrice: 22 },
    ]);
    const loadedPaddyStock = StorageManager.load('paddyStock', []);
    const loadedRiceStock = StorageManager.load('riceStock', []);
    const loadedTransactions = StorageManager.load('transactions', []);

    setRiceTypes(loadedRiceTypes);
    setPaddyStock(loadedPaddyStock);
    setRiceStock(loadedRiceStock);
    setTransactions(loadedTransactions);
  }, []);

  // บันทึกข้อมูลเมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    StorageManager.save('riceTypes', riceTypes);
  }, [riceTypes]);

  useEffect(() => {
    StorageManager.save('paddyStock', paddyStock);
  }, [paddyStock]);

  useEffect(() => {
    StorageManager.save('riceStock', riceStock);
  }, [riceStock]);

  useEffect(() => {
    StorageManager.save('transactions', transactions);
  }, [transactions]);

  // ฟังก์ชันเพิ่มข้าวเปลือกรับเข้า
  const addPaddyStock = (data) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...data,
      type: 'paddy_in'
    };
    setPaddyStock([...paddyStock, newEntry]);
    setTransactions([...transactions, newEntry]);
  };

  // ฟังก์ชันเพิ่มข้าวสารผลิตได้
  const addRiceStock = (data) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...data,
      type: 'rice_out'
    };
    setRiceStock([...riceStock, newEntry]);
    setTransactions([...transactions, newEntry]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">🌾 ระบบจัดการคลังสินค้าโรงสี</h1>
          <p className="text-sm opacity-90 mt-1">Rice Mill Inventory Management System</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === 'dashboard'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp size={20} />
              ภาพรวม
            </div>
          </button>
          <button
            onClick={() => setActiveTab('stock')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === 'stock'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Package size={20} />
              สต็อก
            </div>
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === 'transactions'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText size={20} />
              ประวัติ
            </div>
          </button>
          <button
            onClick={() => setActiveTab('types')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === 'types'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Edit2 size={20} />
              จัดการชนิดข้าว
            </div>
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'dashboard' && (
            <Dashboard
              paddyStock={paddyStock}
              riceStock={riceStock}
              riceTypes={riceTypes}
              addPaddyStock={addPaddyStock}
              addRiceStock={addRiceStock}
            />
          )}
          {activeTab === 'stock' && (
            <StockView
              paddyStock={paddyStock}
              riceStock={riceStock}
              riceTypes={riceTypes}
            />
          )}
          {activeTab === 'transactions' && (
            <TransactionsView transactions={transactions} />
          )}
          {activeTab === 'types' && (
            <RiceTypesView
              riceTypes={riceTypes}
              setRiceTypes={setRiceTypes}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;