import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const RiceTypesView = ({ riceTypes, setRiceTypes }) => {
  const [newType, setNewType] = useState({ name: '', paddyPrice: '', ricePrice: '' });

  const addRiceType = () => {
    if (newType.name && newType.paddyPrice && newType.ricePrice) {
      setRiceTypes([...riceTypes, { ...newType, id: Date.now() }]);
      setNewType({ name: '', paddyPrice: '', ricePrice: '' });
      alert('เพิ่มชนิดข้าวเรียบร้อย');
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  const deleteRiceType = (id) => {
    if (window.confirm('ต้องการลบชนิดข้าวนี้?')) {
      setRiceTypes(riceTypes.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">จัดการชนิดข้าวและราคา</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">เพิ่มชนิดข้าวใหม่</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="ชื่อชนิดข้าว"
            value={newType.name}
            onChange={(e) => setNewType({...newType, name: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="number"
            step="0.01"
            placeholder="ราคารับซื้อเปลือก"
            value={newType.paddyPrice}
            onChange={(e) => setNewType({...newType, paddyPrice: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="number"
            step="0.01"
            placeholder="ราคาขายสาร"
            value={newType.ricePrice}
            onChange={(e) => setNewType({...newType, ricePrice: e.target.value})}
            className="p-2 border rounded"
          />
          <button
            onClick={addRiceType}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            เพิ่มชนิดข้าว
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ชนิดข้าว</th>
              <th className="p-4 text-right">ราคารับซื้อเปลือก (บาท/กก.)</th>
              <th className="p-4 text-right">ราคาขายสาร (บาท/กก.)</th>
              <th className="p-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {riceTypes.map((type) => (
              <tr key={type.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{type.name}</td>
                <td className="p-4 text-right">{parseFloat(type.paddyPrice).toFixed(2)}</td>
                <td className="p-4 text-right">{parseFloat(type.ricePrice).toFixed(2)}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => deleteRiceType(type.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiceTypesView;