import React from 'react';
import { Download, FileText } from 'lucide-react';

const ExportData = ({ data, filename = 'rice-mill-data' }) => {
  
  const exportToJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    if (!data.transactions || data.transactions.length === 0) {
      alert('ไม่มีข้อมูลสำหรับส่งออก');
      return;
    }

    // CSV Headers
    const headers = ['วันที่', 'ประเภท', 'ชนิดข้าว', 'น้ำหนัก(กก.)', 'ราคา(บาท/กก.)', 'ยอดรวม', 'หมายเหตุ'];
    
    // CSV Rows
    const rows = data.transactions.map(t => [
      new Date(t.date).toLocaleDateString('th-TH'),
      t.type === 'paddy_in' ? 'รับเข้า' : 'ขายออก',
      t.riceType,
      parseFloat(t.weight).toFixed(2),
      parseFloat(t.price).toFixed(2),
      (parseFloat(t.weight) * parseFloat(t.price)).toFixed(2),
      t.source || t.customer || '-'
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Add BOM for Excel UTF-8 support
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={exportToJSON}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        title="ส่งออกเป็น JSON"
      >
        <Download size={18} />
        JSON
      </button>
      
      <button
        onClick={exportToCSV}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        title="ส่งออกเป็น CSV"
      >
        <FileText size={18} />
        CSV
      </button>
      
      <button
        onClick={printReport}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition no-print"
        title="พิมพ์รายงาน"
      >
        <FileText size={18} />
        พิมพ์
      </button>
    </div>
  );
};

export default ExportData;