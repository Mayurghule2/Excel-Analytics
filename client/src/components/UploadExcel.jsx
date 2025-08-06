import React, { useEffect, useState } from 'react';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
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
import { IoCloudUploadOutline } from "react-icons/io5";
import { TbAnalyzeFilled } from "react-icons/tb";
import { uploadFile } from '../services/api';

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
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState([10000, 15000, 20000, 75300, 60000, 70000, 75000]);
  const [barDataValues, setBarDataValues] = useState([300, 500, 400, 700, 600]);
  const [userPerMinute, setUserPerMinute] = useState(Array(30).fill(0).map(() => Math.floor(Math.random() * 100)));
  const [sourceData, setSourceData] = useState([8000, 10000, 9000, 12000, 8500, 11500, 9500]);
  const [excelData, setExcelData] = useState([]);


//   if (!selectedFile) {
//     alert("Please upload a file first.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append('file', selectedFile);

//   try {
//     const token = localStorage.getItem('token');

//     const response = await fetch('/api/uploads', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`
//         // ❌ Don't set Content-Type manually, browser will handle it
//       },
//       body: formData
//     });

//     const result = await response.json();

//     if (response.ok) {
//       alert('Upload and analysis successful.');
//       console.log('Upload ID:', result.uploadId);
//     } else {
//       alert('Upload failed: ' + result.message);
//     }
//   } catch (error) {
//     alert('Error: ' + error.message);
//   }
// };

  const handleExcelUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setSelectedFile(file); 

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

const handleAnalyze = async () => {
  if (!selectedFile) {
    alert("Please upload a file first.");
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    

    const response = await uploadFile(formData);

    const result = response.data;

    if (response.status >= 200 && response.status < 300) {
      alert('Upload and analysis successful.');
  navigate(`/charts/${result.uploadId}`);
    } else {
      alert('Upload failed: ' + result.message);
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
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
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-[#aeffff] to-cyan text-gray-900'}`}>
 

      <div className="my-20 w-full flex flex-col justify-around  gap-10 px-10 items-center">
  
        <div className="w-full md:w-2/3  text-center p-10 border-2 border-dashed border-blue-400 bg-white dark:bg-gray-800 rounded-md md:pt-16 md:pb-16 shadow-md flex flex-col items-center gap-4">
          <IoCloudUploadOutline className="w-20 h-20 text-blue-700" />
          <h2 className="text-2xl font-bold mb-2 text-blue-900 ">Upload Excel File</h2>
          <p className="text-sm mb-4 text-gray-500 dark:text-gray-300">Upload your Excel file (.xls or .xlsx) to analyze and visualize your data</p>
          <label htmlFor="excelUpload" className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12v6m0 0l-3-3m3 3l3-3M12 4v8"></path></svg>
            Upload Excel File
          </label>
          <input id="excelUpload" type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} className="hidden" />
        </div>

      
        <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-auto max-h-[400px]">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          {excelData.length > 0 ? (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-200 dark:bg-blue-700 text-gray-700 dark:text-gray-100 ">
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
      <div className='flex items-center gap-2 bg-blue-600 py-2 px-3 rounded text-white font-semibold hover:bg-blue-700 transition-colors'>
       <TbAnalyzeFilled  />
      <button onClick={handleAnalyze} >Analyze</button>

      </div>
      </div>
    </div>
  );
};

export default UploadExcel;