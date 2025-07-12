import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  daily: 'from-[#ff5f6d] to-[#ffc371]',
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
        const res = await axios.get(`/api/admin/uploads/graph/${type}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
         if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        console.warn('Unexpected data format:', res.data);
        setData([]); 
      }
      } catch (err) {
        console.error('Failed to load chart data:', err);
      }
    };
    fetchData();

    
    setIsDark(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, [type]);

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="uploads" fill="#7928ca" />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uploads" stroke="#7928ca" fill="#e0c3fc" />
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
              stroke="#7928ca"
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

        <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-600 ">
          < MdStackedBarChart className="text-3xl"/> Upload Analytics</h2>
        <div className="flex gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-1 rounded bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold"
          >
            <option value="daily" className='text-gray-800'>Daily</option>
            <option value="weekly" className='text-gray-800'>Weekly</option>
            <option value="monthly" className='text-gray-800'>Monthly</option>
          </select>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="px-3 py-1 rounded bg-gradient-to-r from-sky-600 to-sky-400 text-white font-semibold"
          >
            <option value="line" className='text-gray-800'>Line</option>
            <option value="bar" className='text-gray-800'>Bar</option>
            <option value="area" className='text-gray-800'>Area</option>
          </select>
        </div>
      </div>

      <div
        className={`rounded-xl p-1 bg-gradient-to-r ${
          isDark ? 'from-[#0f172a] to-[#1e293b]' : gradientMap[type]
        }`}
      >
        <div className={`rounded-lg p-4 ${isDark ? 'bg-[#1e293b]' : 'bg-white'}`}>
          <ResponsiveContainer width="100%" height={300}>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
