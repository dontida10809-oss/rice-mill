import React from 'react';

const StockView = ({ paddyStock, riceStock, riceTypes }) => {
  const stockByType = {};
  
  riceTypes.forEach(type => {
    const paddyTotal = paddyStock
      .filter(item => item.riceType === type.name)
      .reduce((sum, item) => sum + parseFloat(item.weight || 0), 0);
    
    const riceTotal = riceStock
      .filter(item => item.riceType === type.name)
      .reduce((sum, item) => sum + parseFloat(item.weight || 0), 0);
    
    stockByType[type.name] = {
      paddy: paddyTotal,
      rice: riceTotal
    };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">สต็อกคงเหลือ</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ชนิดข้าว</th>
              <th className="p-4 text-right">ข้าวเปลือก (กก.)</th>
              <th className="p-4 text-right">ข้าวสาร (กก.)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stockByType).map(([type, stock]) => (
              <tr key={type} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{type}</td>
                <td className="p-4 text-right text-green-600">{stock.paddy.toFixed(2)}</td>
                <td className="p-4 text-right text-blue-600">{stock.rice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockView;