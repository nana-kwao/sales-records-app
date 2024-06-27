import React from 'react';
import { saveAs } from 'file-saver';
import { Parser } from 'json2csv';

function SalesReport({ sales }) {
  const generateCSV = () => {
    const fields = ['itemID','item', 'amount'];
    const opts = { fields };

    try {
      const parser = new Parser(opts);
      const csv = parser.parse(sales);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'sales_report.csv');
    } catch (err) {
      console.error('Error generating CSV:', err);
    }
  };

  return (
    <div>
      <button onClick={generateCSV}>Generate Sales Report</button>
    </div>
  );
}

export default SalesReport;
