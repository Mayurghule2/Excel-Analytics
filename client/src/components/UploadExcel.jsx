import React, { useEffect, useState } from 'react';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import * as XLSX from 'xlsx';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const UploadExcel = ({ darkMode }) => {
  const [userData, setUserData] = useState([10000, 15000, 20000, 75300, 60000, 70000, 75000]);
  const [barDataValues, setBarDataValues] = useState([300, 500, 400, 700, 600]);
  const [userPerMinute, setUserPerMinute] = useState(Array(30).fill(0).map(() => Math.floor(Math.random() * 100)));
  const [sourceData, setSourceData] = useState([8000, 10000, 9000, 12000, 8500, 11500, 9500]);
  const [excelData, setExcelData] = useState([]);

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headers = jsonData[0];
      const rows = jsonData.slice(1, 9);
      const formatted = rows.map(row =>
        headers.reduce((obj, key, i) => {
          obj[key] = row[i];
          return obj;
        }, {})
      );
      setExcelData(formatted);
    };
    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    const userInterval = setInterval(() => {
      const updatedUsers = userData.map(val => Math.max(1000, val + Math.floor(Math.random() * 1000 - 500)));
      setUserData(updatedUsers);

      const newUsers = [...userPerMinute.slice(1), Math.floor(Math.random() * 100)];
      setUserPerMinute(newUsers);
    }, 5000);

    const barInterval = setInterval(() => {
      const updatedSales = barDataValues.map(val => Math.max(100, val + Math.floor(Math.random() * 100 - 50)));
      setBarDataValues(updatedSales);

      const updatedSources = sourceData.map(val => Math.max(1000, val + Math.floor(Math.random() * 1000 - 500)));
      setSourceData(updatedSources);
    }, 7000);

    return () => {
      clearInterval(userInterval);
      clearInterval(barInterval);
    };
  }, [userData, barDataValues, sourceData]);

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-[#f0f0f3] to-[#a5f6f6] text-gray-900'}`}>
 

      <div className="my-20 w-full flex flex-col lg:flex-row justify-around items-start gap-10 px-10">
  
        <div className="w-full lg:w-1/2 text-center p-10 border-2 border-dashed border-blue-400 bg-white dark:bg-gray-800 rounded-md">
          <h2 className="text-2xl font-bold mb-2">Upload Excel File</h2>
          <p className="text-sm mb-4 text-gray-500 dark:text-gray-300">Upload your Excel file (.xls or .xlsx) to analyze and visualize your data</p>
          <label htmlFor="excelUpload" className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12v6m0 0l-3-3m3 3l3-3M12 4v8"></path></svg>
            Upload Excel File
          </label>
          <input id="excelUpload" type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} className="hidden" />
        </div>

      
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-auto max-h-[400px]">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          {excelData.length > 0 ? (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
                  {Object.keys(excelData[0]).map((header, idx) => (
                    <th key={idx} className="px-4 py-2 border">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, idx) => (
                  <tr key={idx} className="text-gray-700 dark:text-gray-200">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="px-4 py-2 border">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No file uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadExcel;