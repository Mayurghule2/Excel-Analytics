
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartView = ({ headers = [], rows = [] }) => {
  const chartRef = useRef(null);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('');

  const getColumnData = (columnName) => {
    const colIndex = headers.indexOf(columnName);
    return rows.map(row => row[colIndex]);
  };

  const xData = xAxis ? getColumnData(xAxis) : [];
  const yDataRaw = yAxis ? getColumnData(yAxis) : [];
  const yData = yDataRaw.map(val => (isNaN(val) ? 0 : Number(val)));

  const chartData = {
    labels: chartType === 'pie' ? yData.map((_, i) => `Data ${i + 1}`) : xData,
    datasets: [
      {
        label: `${yAxis} vs ${xAxis}`,
        data: yData,
        backgroundColor: ['#60a5fa', '#f87171', '#34d399', '#fbbf24', '#a78bfa', '#f472b6'],
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };

  const renderChart = () => {
    const props = {
      ref: chartRef,
      data: chartData,
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
      },
    };

    if (!xAxis || !yAxis) return <p className="text-gray-500 dark:text-gray-300">Please select X and Y axes</p>;
    if (chartType === 'bar') return <Bar {...props} />;
    if (chartType === 'line') return <Line {...props} />;
    if (chartType === 'pie') return <Pie {...props} />;
    return <p className="text-gray-500 dark:text-gray-300">Select a chart type</p>;
  };

  const handleDownload = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current);
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Chart Builder</h3>
        <button
          onClick={handleDownload}
          className="bg-blue-900 text-white px-4 py-2 rounded hover:opacity-80"
        >
          Download Chart
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          onChange={(e) => setXAxis(e.target.value)}
          value={xAxis}
          className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select X Axis</option>
          {headers.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>

        <select
          onChange={(e) => setYAxis(e.target.value)}
          value={yAxis}
          className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Y Axis</option>
          {headers.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => setChartType('bar')} className="bg-blue-600 text-white px-4 py-2 rounded">Bar</button>
        <button onClick={() => setChartType('line')} className="bg-green-600 text-white px-4 py-2 rounded">Line</button>
        <button onClick={() => setChartType('pie')} className="bg-pink-600 text-white px-4 py-2 rounded">Pie</button>
      </div>

      <div ref={chartRef} className="h-[300px] overflow-hidden">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartView;
