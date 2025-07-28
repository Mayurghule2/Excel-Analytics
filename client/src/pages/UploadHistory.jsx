import React, { useEffect, useState } from 'react';
import { getUploadHistory, deleteUploadById } from '../services/api';
import { format } from 'date-fns';
import { FaDatabase } from "react-icons/fa";
import { TfiLayoutListThumbAlt } from "react-icons/tfi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { GrStatusInfo } from "react-icons/gr";
import { FiSearch, FiFilter } from 'react-icons/fi';
import { MdDateRange } from 'react-icons/md';
import { FaFileAlt } from 'react-icons/fa';
import { FiRefreshCw } from "react-icons/fi";

const UploadHistory = () => {
  const [uploads, setUploads] = useState([]);
  const [filteredUploads, setFilteredUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [fileSizeRange, setFileSizeRange] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  const fetchHistory = async () => {
    try {
      const response = await getUploadHistory();
      const data = response.data.uploads || [];
      setUploads(data);
      setFilteredUploads(data);
    } catch (err) {
      console.error('Failed to fetch upload history:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    let filtered = uploads;

    if (statusFilter !== "all") {
      filtered = filtered.filter(upload => upload.status === statusFilter);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(upload =>
        upload.file_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (fileSizeRange) {
      filtered = filtered.filter(upload => {
        const sizeMB = upload.file_size / (1024 * 1024); 
        switch (fileSizeRange) {
          case "<1": return sizeMB < 1;
          case "1-10": return sizeMB >= 1 && sizeMB <= 10;
          case "10-50": return sizeMB > 10 && sizeMB <= 50;
          case ">50": return sizeMB > 50;
          default: return true;
        }
      });
    }

    if (monthFilter) {
      filtered = filtered.filter(upload => {
        const uploadMonth = new Date(upload.upload_date).getMonth() + 1;
        return uploadMonth === parseInt(monthFilter);
      });
    }

    setFilteredUploads(filtered);
  }, [statusFilter, searchQuery, fileSizeRange, monthFilter, uploads]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this upload?')) return;

    try {
      await deleteUploadById(id);
      const updated = uploads.filter(upload => upload._id !== id);
      setUploads(updated);
    } catch (err) {
      alert('Failed to delete upload.');
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-tr from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white transition">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">Upload History</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
  <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
    <FiSearch className="text-gray-500" />
    <input
      type="text"
      placeholder="Search by file name"
      className="w-full bg-transparent focus:outline-none"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
    <FiFilter className="text-blue-500" />
    <select
      className="w-full bg-transparent focus:outline-none"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="all">All Statuses</option>
      <option value="processed">Processed</option>
      <option value="pending">Pending</option>
      <option value="failed">Failed</option>
    </select>
  </div>

  <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
    <FaFileAlt className="text-green-500" />
    <select
      className="w-full bg-transparent focus:outline-none"
      value={fileSizeRange}
      onChange={(e) => setFileSizeRange(e.target.value)}
    >
      <option value="">All Sizes</option>
      <option value="<1">Less than 1MB</option>
      <option value="1-10">1MB - 10MB</option>
      <option value="10-50">10MB - 50MB</option>
      <option value=">50">More than 50MB</option>
    </select>
  </div>

  <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
    <MdDateRange className="text-purple-500" />
    <select
      className="w-full bg-transparent focus:outline-none"
      value={monthFilter}
      onChange={(e) => setMonthFilter(e.target.value)}
    >
      <option value="">All Months</option>
      {Array.from({ length: 12 }, (_, i) => {
        const date = new Date(0, i);
        return (
          <option key={i} value={i + 1}>
            {date.toLocaleString('default', { month: 'long' })}
          </option>
        );
      })}
    </select>
  </div>

  <button
    onClick={() => {
      setSearchQuery("");
      setStatusFilter("all");
      setFileSizeRange("");
      setMonthFilter("");
    }}
    className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-md transition duration-200"
  >
    <FiRefreshCw className="text-lg" />
    Reset
  </button>
</div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      ) : filteredUploads.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No matching uploads found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredUploads.map((upload) => {
            const sizeKB = upload.file_size ? (upload.file_size / 1024).toFixed(2) : 'N/A';
            const uploadDate = format(new Date(upload.upload_date), 'dd MMM yyyy, hh:mm a');
            const statusColor = {
              processed: 'text-green-600',
              pending: 'text-yellow-500',
              failed: 'text-red-500',
            }[upload.status] || 'text-gray-500';

            return (
              <div
                key={upload._id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold">{upload.file_name}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className='flex items-center gap-3'><FaDatabase /> <strong>{sizeKB} KB</strong></p>
                    <p className='flex items-center gap-3'> <TfiLayoutListThumbAlt /> <strong>{upload.row_count ?? 'N/A'} rows</strong></p>
                    <p className='flex items-center gap-3'><BsCalendar2DateFill /> <strong>{uploadDate}</strong></p>
                    <p className='flex items-center gap-3'><GrStatusInfo /> <span className={`font-medium ${statusColor}`}>{upload.status}</span></p>
                  </div>
                </div>
                <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleDelete(upload._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-lg shadow"
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UploadHistory;
