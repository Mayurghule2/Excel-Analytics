import React, { useState } from 'react';
import { generateInsights } from '../services/api';
import { FaLightbulb, FaBrain, FaSpinner, FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';

const GenerateInsights = ({ headers, rows }) => {
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setInsights('');

    try {
      const tableData = { headers, rows };
      const res = await generateInsights(tableData);
      setInsights(res.data.summary);
    } catch (err) {
      console.error('Error:', err);
      setError('❌ Failed to generate insights.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const title = 'Generate Data Insights';

    doc.setFontSize(18);
    doc.text(title, 10, 20);

    const lines = doc.splitTextToSize(insights, 180); 
    doc.setFontSize(12);
    doc.text(lines, 10, 30);

    doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="mt-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl max-w-5xl mx-auto transition-all duration-300">
      <div className='flex items-center justify-between mb-6'>
        <h2 className="flex items-center text-2xl font-bold text-gray-800 dark:text-white mb-6">
          <FaBrain className="mr-2 text-blue-600" />
          Generate Data Insights
        </h2>

        <button
          onClick={handleGenerate}
          disabled={loading || !headers.length || !rows.length}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg disabled:opacity-50 transition-all"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FaLightbulb />
              Generate Insights
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="text-red-600 mt-4 font-medium bg-red-100 dark:bg-red-900 p-3 rounded-lg">
          {error}
        </p>
      )}

      {insights && (
        <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border border-gray-300 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
              <FaLightbulb className="mr-2 text-yellow-500" />
              Insights:
            </h3>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
            >
              <FaDownload />
              Download PDF
            </button>
          </div>
          <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
            {insights}
          </p>
        </div>
      )}
    </div>
  );
};

export default GenerateInsights;
