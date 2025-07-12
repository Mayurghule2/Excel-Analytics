import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchUploadInsights } from '../services/api';
export default function UploadStatistics() {
  const [progressBars, setProgressBars] = useState([]);
  const [totalUploads, setTotalUploads] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [latestUpload, setLatestUpload] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetchUploadInsights();

        setProgressBars(res.data.progressBars || []);
        setTotalUploads(res.data.totalUploads || 0);
        setTotalRows(res.data.totalRowsProcessed || 0);
        setLatestUpload(res.data.latestUpload || null);
      } catch (err) {
        console.error('Failed to fetch insights:', err);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-md shadow">
        <div className="font-semibold text-blue-600 mb-5">Upload Statistics</div>
        
        {progressBars.map((item, idx) => (
          <div key={idx} className="mb-3">
            <div className="text-sm font-medium text-gray-700">
              {item.title}
              <span className="float-right">{item.percent}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className={`${item.color} h-2 rounded-full`}
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-md shadow">
        <div className="font-semibold text-blue-600 mb-2">Latest Upload</div>
        {latestUpload ? (
          <div className="text-base text-gray-700 flex flex-col gap-4  justify-between">
            <p><strong>File:</strong> {latestUpload.file_name}</p>
            <p><strong>Status:</strong> {latestUpload.status}</p>
            <p><strong>Size:</strong> {latestUpload.sizeMB < 1 ? `${(latestUpload.sizeMB * 1024).toFixed(2)} KB` : `${latestUpload.sizeMB.toFixed(2)} MB`}</p>

            <p><strong>Date:</strong> {new Date(latestUpload.upload_date).toLocaleString()}</p>
          </div>
        ) : (
          <div className="text-gray-500 h-64 flex items-center justify-center">
            No uploads yet 📭
          </div>
        )}
      </div>
    </div>
  );
}
