import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import * as THREE from 'three';
import GenerateInsights from './GenerateInsights'; // Adjust the path as needed
import { getChartDataById } from '../services/api';
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

const ChartView = () => {
  const { uploadId } = useParams();
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const threeRef = useRef(null);

  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('');

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

  const chartData = {
    labels: chartType === 'pie' ? yData.map((_, i) => `Data ${i + 1}`) : xData,
    datasets: [
      {
        label: chartType === 'pie' ? yAxis : `${yAxis} vs ${xAxis}`,
        data: yData,
        backgroundColor: [
          '#60a5fa', '#f87171', '#34d399',
          '#fbbf24', '#a78bfa', '#f472b6',
          '#38bdf8', '#fb923c', '#4ade80'
        ],
        borderColor: '#fff',
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

    if ((chartType === 'bar' || chartType === 'line') && (!xAxis || !yAxis)) {
      return <p className="text-gray-500">Please select both X and Y axes</p>;
    }
    if (chartType === 'pie' && !yAxis) {
      return <p className="text-gray-500">Please select Y axis for Pie chart</p>;
    }

    switch (chartType) {
      case 'bar': return <Bar {...props} />;
      case 'line': return <Line {...props} />;
      case 'pie': return <Pie {...props} />;
      case '3d': return <div ref={threeRef} className="w-full h-[500px] rounded-lg" />;
      default: return <p className="text-gray-500">Select a chart type</p>;
    }
  };

  // THREE.JS 3D BAR CHART
  useEffect(() => {
    if (chartType !== '3d' || !threeRef.current || !xAxis || !yAxis) return;

    while (threeRef.current.firstChild) {
      threeRef.current.removeChild(threeRef.current.firstChild);
    }

    const width = threeRef.current.clientWidth;
    const height = 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f0f4f8');

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 40, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    threeRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 100, 100).normalize();
    scene.add(light);

    const maxHeight = Math.max(...yData);
    const barWidth = 2;
    const gap = 3;

    yData.forEach((val, i) => {
      const geometry = new THREE.BoxGeometry(barWidth, val, barWidth);
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(`hsl(${i * 40}, 70%, 60%)`)
      });

      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = i * (barWidth + gap);
      cube.position.y = val / 2;
      scene.add(cube);
    });

    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    const animate = () => {
      requestAnimationFrame(animate);
      scene.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    return () => renderer.dispose();
  }, [chartType, xAxis, yAxis, yData]);

  const handleDownload = async () => {
    if (chartType === '3d') {
      const canvas = threeRef.current?.querySelector('canvas');
      if (!canvas) return;
      const image = canvas.toDataURL();
      const link = document.createElement('a');
      link.href = image;
      link.download = '3d_chart.png';
      link.click();
    } else if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gradient-to-tr from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">📊 2D + 3D Chart Visualizer</h3>
        <button
          onClick={handleDownload}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg shadow transition"
        >
          ⬇️ Download Chart
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {chartType !== 'pie' && (
            <select
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
              className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white bg-white shadow"
            >
              <option value="">📊 Select X Axis</option>
              {headers.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          )}
          <select
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white bg-white shadow"
          >
            <option value="">📈 Select Y Axis</option>
            {headers.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>

        <div className="flex gap-3 flex-wrap mt-4 md:mt-0">
          {['bar', 'line', 'pie', '3d'].map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-5 py-2 rounded-full font-medium shadow transition ${
                chartType === type
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-105'
              }`}
            >
              {type === '3d' ? '3D Bar' : `${type.charAt(0).toUpperCase() + type.slice(1)}`} Chart
            </button>
          ))}
        </div>
      </div>

      <div
        ref={chartType === '3d' ? threeRef : chartRef}
        className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md min-h-[300px] max-w-5xl mx-auto"
      >
        {chartType !== '3d' && renderChart()}
      </div>

      <div>
        <GenerateInsights headers={headers} rows={rows} />
      </div>
    </div>
  );
};

export default ChartView;
