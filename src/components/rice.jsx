import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const RiceForm = ({ riceTypes, addRiceStock }) => {
  const [formData, setFormData] = useState({
    riceType: '',
    weight: '',
    price: '',
    customer: ''
  });

  const handleSubmit = () => {
    if (formData.riceType && formData.weight && formData.price) {
      addRiceStock(formData);
      setFormData({ riceType: '', weight: '', price: '', customer: '' });
      alert('บันทึกข้าวสารขายออกเรียบร้อย');
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-blue-700">บันทึกข้าวสารขายออก</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">ชนิดข้าว</label>
          <select
            value={formData.riceType}
            onChange={(e) => setFormData({...formData, riceType: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="">เลือกชนิดข้าว</option>
            {riceTypes.map(type => (
              <option key={type.id} value={type.name}>{type.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">น้ำหนัก (กก.)</label>
          <input
            type="number"
            step="0.01"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ราคาขาย (บาท/กก.)</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ลูกค้า</label>
          <input
            type="text"
            value={formData.customer}
            onChange={(e) => setFormData({...formData, customer: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="ชื่อลูกค้า"
          />
        </div>
      </div>
      <button 
        onClick={handleSubmit} 
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
      >
        <Plus size={20} /> บันทึกข้อมูล
      </button>
    </div>
  );
};

export default RiceForm;