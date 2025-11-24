import React from 'react';
import { Package, TrendingUp, DollarSign } from 'lucide-react';
import PaddyForm from './paddy';
import RiceForm from './rice';

const Dashboard = ({ paddyStock, riceStock, riceTypes, addPaddyStock, addRiceStock }) => {
  // คำนวณสรุป
  const calculateSummary = () => {
    const totalPaddyWeight = paddyStock.reduce((sum, item) => sum + parseFloat(item.weight || 0), 0);
    const totalPaddyCost = paddyStock.reduce((sum, item) => sum + (parseFloat(item.weight || 0) * parseFloat(item.price || 0)), 0);
    const totalRiceWeight = riceStock.reduce((sum, item) => sum + parseFloat(item.weight || 0), 0);
    const totalRiceRevenue = riceStock.reduce((sum, item) => sum + (parseFloat(item.weight || 0) * parseFloat(item.price || 0)), 0);
    
    return {
      totalPaddyWeight: totalPaddyWeight.toFixed(2),
      totalPaddyCost: totalPaddyCost.toFixed(2),
      totalRiceWeight: totalRiceWeight.toFixed(2),
      totalRiceRevenue: totalRiceRevenue.toFixed(2),
      profit: (totalRiceRevenue - totalPaddyCost).toFixed(2)
    };
  };

  const summary = calculateSummary();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">ภาพรวมธุรกิจ</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">ข้าวเปลือกรับเข้า</p>
              <p className="text-3xl font-bold">{summary.totalPaddyWeight}</p>
              <p className="text-sm">กิโลกรัม</p>
            </div>
            <Package size={48} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">ต้นทุนข้าวเปลือก</p>
              <p className="text-3xl font-bold">{parseFloat(summary.totalPaddyCost).toLocaleString()}</p>
              <p className="text-sm">บาท</p>
            </div>
            <DollarSign size={48} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">ข้าวสารขายออก</p>
              <p className="text-3xl font-bold">{summary.totalRiceWeight}</p>
              <p className="text-sm">กิโลกรัม</p>
            </div>
            <Package size={48} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">กำไร/ขาดทุน</p>
              <p className="text-3xl font-bold">{parseFloat(summary.profit).toLocaleString()}</p>
              <p className="text-sm">บาท</p>
            </div>
            <TrendingUp size={48} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaddyForm riceTypes={riceTypes} addPaddyStock={addPaddyStock} />
        <RiceForm riceTypes={riceTypes} addRiceStock={addRiceStock} />
      </div>
    </div>
  );
};

export default Dashboard;