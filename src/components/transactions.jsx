import React, { useState } from 'react';
import { Search } from 'lucide-react';

const TransactionsView = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(t => {
    const searchLower = searchTerm.toLowerCase();
    return (
      t.riceType?.toLowerCase().includes(searchLower) ||
      t.source?.toLowerCase().includes(searchLower) ||
      t.customer?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ประวัติการทำรายการ</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="ค้นหา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">วันที่</th>
                <th className="p-4 text-left">ประเภท</th>
                <th className="p-4 text-left">ชนิดข้าว</th>
                <th className="p-4 text-right">น้ำหนัก (กก.)</th>
                <th className="p-4 text-right">ราคา (บาท/กก.)</th>
                <th className="p-4 text-right">ยอดรวม</th>
                <th className="p-4 text-left">หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    ไม่มีข้อมูลการทำรายการ
                  </td>
                </tr>
              ) : (
                filteredTransactions.slice().reverse().map((t) => (
                  <tr key={t.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{new Date(t.date).toLocaleDateString('th-TH')}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        t.type === 'paddy_in' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {t.type === 'paddy_in' ? 'รับเข้า' : 'ขายออก'}
                      </span>
                    </td>
                    <td className="p-4">{t.riceType}</td>
                    <td className="p-4 text-right">{parseFloat(t.weight).toFixed(2)}</td>
                    <td className="p-4 text-right">{parseFloat(t.price).toFixed(2)}</td>
                    <td className="p-4 text-right font-medium">
                      {(parseFloat(t.weight) * parseFloat(t.price)).toFixed(2)}
                    </td>
                    <td className="p-4 text-sm text-gray-600">{t.source || t.customer || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsView;