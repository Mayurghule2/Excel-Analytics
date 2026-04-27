import React, { useState, useEffect } from 'react';
import { FaFileExcel, FaUsers, FaHashtag, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { fetchDashboardStats } from '../services/api';

export default function StatsCards() {
  const [stats, setStats] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res =  await fetchDashboardStats();
        console.log("Dashboard stats fetched successfully:", res.data);
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError('Could not load stats');
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return <div className="text-red-600 font-bold p-4">{error}</div>;
  }

  if (!stats) {
    return <div className="text-gray-500 p-4">Loading stats...</div>;
  }

  const cardData = [
    {
      label: 'FILES UPLOADED',
      value: stats.totalFilesUploaded.toLocaleString(),
      icon: <FaFileExcel />,
      bgColor: 'bg-gradient-to-r from-[#ff0080] to-[#ffafbd] '
    },
    {
      label: 'REGISTERED USERS',
      value: stats.totalUsers.toLocaleString(),
      icon: <FaUsers />,
      bgColor: 'bg-gradient-to-r from-[#00c6ff] to-[#0072ff]'
    },
    {
      label: 'TOTAL ROWS ANALYZED',
      value: stats.totalRowsAnalyzed.toLocaleString(),
      icon: <FaHashtag />,
      bgColor: 'bg-gradient-to-r from-[#11998e] to-[#38ef7d]'
    },
    {
      label: 'LAST UPLOAD',
      value: stats.lastUploadTimestamp
        ? new Date(stats.lastUploadTimestamp).toLocaleString()
        : 'No Uploads',
      icon: <FaClock />,
      bgColor: 'bg-gradient-to-r from-[#ff4e50] to-[#f9d423]'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cardData.map((item, index) => (
        <div
          key={index}
          className={`p-4 rounded-md shadow flex items-center justify-between ${item.bgColor}`}
        >
          <div>
            <div className="text-sm text-white font-semibold">{item.label}</div>
            <div className="text-xl text-white font-bold">{item.value}</div>
          </div>
          <div className="text-4xl text-white">{item.icon}</div>
        </div>
      ))}
    </div>
  );
}
