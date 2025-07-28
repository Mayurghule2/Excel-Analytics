import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchChartData } from '../services/api';
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { MdStackedBarChart } from "react-icons/md";

const gradientMap = {
  daily: 'from-[#ff5f6f] to-[#ffc371]',
  weekly: 'from-[#56CCF2] to-[#2F80ED]',
  monthly: 'from-[#11998e] to-[#38ef7d]',
};

const ChartsSection = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState('daily');
  const [chartType, setChartType] = useState('line');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No auth token found.');
          return;
        }

        const res = await fetchChartData(type)

        console.log("Fetched status:", res.status);
        console.log("Fetched data:", res.data);

        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.warn('Unexpected data format:', res.data);
          setData([]);
        }
      } catch (err) {
        console.error('Failed to fetch chart data:', err.response?.data || err.message);
      }
    };

    fetchData();
    setIsDark(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, [type]);

  useEffect(() => {
    console.log("Chart data updated:", data);
  }, [data]);

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            
             <defs>
    <linearGradient id="multiCyanGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />  
      <stop offset="33%" stopColor="#06b6d4" stopOpacity={0.8} /> 
      <stop offset="66%" stopColor="#67e8f9" stopOpacity={0.8} /> 
      <stop offset="100%" stopColor="#67e8f9" stopOpacity={0.7} /> 
    </linearGradient>
  </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="uploads" fill="url(#multiCyanGradient)" />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
  <defs>
    <linearGradient id="cyanGradientFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#67e8f9" stopOpacity={0.6} /> 
    </linearGradient>
  </defs>
  
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="label" />
  <YAxis />
  <Tooltip />
  <Area
    type="monotone"
    dataKey="uploads"
    stroke="#06b6d4" 
    fill="url(#cyanGradientFill)"
  />
</AreaChart>

        );
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="uploads"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div
      className={`rounded-lg shadow-lg p-6 transition-all duration-300 ${
        isDark ? 'bg-[#1e293b] text-white' : 'bg-white'
      } mb-6`}
    >
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-600">
          <MdStackedBarChart className="text-3xl" /> Upload Analytics
        </h2>
        <div className="flex gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-1 rounded bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold"
          >
            <option value="daily" className="text-gray-800">Daily</option>
            <option value="weekly" className="text-gray-800">Weekly</option>
            <option value="monthly" className="text-gray-800">Monthly</option>
          </select>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="px-3 py-1 rounded bg-gradient-to-r from-sky-600 to-sky-400 text-white font-semibold"
          >
            <option value="line" className="text-gray-800">Line</option>
            <option value="bar" className="text-gray-800">Bar</option>
            <option value="area" className="text-gray-800">Area</option>
          </select>
        </div>
      </div>

      <div className={`rounded-xl p-1 bg-gradient-to-r ${
        isDark ? 'from-[#0f172a] to-[#1e293b]' : gradientMap[type]
      }`}>
        <div className={`rounded-lg p-4 ${isDark ? 'bg-[#1e293b]' : 'bg-white'}`}>
          <div style={{ border: '1px solid #ccc', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              {data.length > 0 ? renderChart() : (
                <p className="text-center text-gray-500">No chart data available</p>
              )}
            </ResponsiveContainer>
          </div>
         
          
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
