import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import GenerateInsights from './GenerateInsights';
import { getChartDataById } from '../services/api';
import ThreeDChartView from './ThreeDChartView';
import jsPDF from 'jspdf';

import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  AreaChart, Area,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from 'recharts';

const COLORS = ['#60a5fa', '#f87171', '#34d399', '#fbbf24', '#a78bfa', '#f472b6', '#38bdf8', '#fb923c', '#4ade80'];

const ChartView = () => {
  const { uploadId } = useParams();
  const navigate = useNavigate();
  const chartRef = useRef(null);

  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('image');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChartDataById(uploadId);
        setHeaders(response.data.headers);
        setRows(response.data.rows);
      } catch (error) {
        console.error('Error fetching chart data:', error.message);
        alert('Failed to load chart data');
        navigate('/');
      }
    };
    fetchData();
  }, [uploadId, navigate]);

  const getColumnData = (columnName) => {
    const colIndex = headers.indexOf(columnName);
    return rows.map(row => row[colIndex]);
  };

  const xData = xAxis ? getColumnData(xAxis) : [];
  const yDataRaw = yAxis ? getColumnData(yAxis) : [];
  const yData = yDataRaw.map(val => (isNaN(val) ? 0 : Number(val)));

  const combinedData = xData.map((x, i) => ({
    [xAxis]: x,
    [yAxis]: yData[i]
  }));

  const renderChart = () => {
  if (chartType === '3d-pie' || chartType === '3d-bar') {
  return (
    <ThreeDChartView
    ref={chartRef}
      type={chartType}
      xData={xData}
      yData={yData}
    />
  );
}
    if (!yAxis || (chartType !== 'pie' && !xAxis)) {
      return <p className="text-gray-500">Please select both X and Y axes</p>;
    }

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={yAxis} fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={yAxis} stroke="#f87171" />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={combinedData}>
              <defs>
                <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey={yAxis} stroke="#a78bfa" fillOpacity={1} fill="url(#colorArea)" />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={yData.map((val, i) => ({ name: `Data ${i + 1}`, value: val }))}
                dataKey="value"
                nameKey="name"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {yData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <p className="text-gray-500">Select a chart type</p>;
    }
  };

const handleDownload = async (format) => {
  setShowDropdown(false);
  if (!chartRef.current) return;

  const canvas = await html2canvas(chartRef.current);
  const imgData = canvas.toDataURL('image/png');

  if (format === 'image') {
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = imgData;
    link.click();
  } else if (format === 'pdf') {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('chart.pdf');
  }
};


  return (
    <div className="p-10 min-h-screen bg-gradient-to-tr from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Chart Visualizer</h3>
        <div className="relative inline-block text-left">
  <button
    onClick={() => setShowDropdown((prev) => !prev)}
    className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg shadow transition"
  >
    Download Chart
  </button>

  {showDropdown && (
    <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="py-1">
        <button
          onClick={() => handleDownload('image')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
        >
           Download as Image
        </button>
        <button
          onClick={() => handleDownload('pdf')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
        >
           Download as PDF
        </button>
      </div>
    </div>
  )}
</div>

      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {(chartType !== 'pie' && chartType !== '3d-pie') && (
            <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white bg-white shadow">
              <option value="">📊 Select X Axis</option>
              {headers.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          )}
          <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white bg-white shadow">
            <option value="">📈 Select Y Axis</option>
            {headers.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>

        <div className="flex gap-3 flex-wrap mt-4 md:mt-0">
          {['bar', 'line', 'area', 'pie', '3d-pie', '3d-bar'].map(type => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-5 py-2 rounded-full font-medium shadow transition ${
                chartType === type
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-105'
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <div ref={chartRef} className="w-2/3 h-[600px] p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
          {renderChart()}
        </div>
      </div>

      <div>
        <GenerateInsights headers={headers} rows={rows} />
      </div>
    </div>
  );
};

export default ChartView;
