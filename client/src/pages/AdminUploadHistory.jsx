import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFileExcel, FaClock, FaUserCircle } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';

const getStatusStyle = (status) => {
  switch (status.toLowerCase()) {
    case 'processed':
      return 'text-green-600 bg-green-100';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'failed':
    case 'error':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const AdminUploadHistory = () => {
  const [uploadHistory, setUploadHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUploadHistory = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('/api/admin/uploads', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const uploads = res.data.map((item) => ({
          id: item._id,
          fileName: item.file_name,
          uploadedBy: item.user_id?.username || 'Unknown',
          date: new Date(item.upload_date).toLocaleDateString(),
          status: item.status,
        }));

        setUploadHistory(uploads);
      } catch (error) {
        console.error('Failed to fetch upload history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUploadHistory();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Upload History</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : uploadHistory.length === 0 ? (
        <p className="text-gray-500">No upload history found.</p>
      ) : (
        <div className="space-y-4 ">
          {uploadHistory.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow flex flex-col md:flex-row items-start md:items-center justify-between p-4 hover:shadow-md transition duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-4 flex-col md:flex-row md:items-center w-full md:w-auto">
                <FaFileExcel className="text-green-600 text-xl mt-1" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">{item.fileName}</p>
                  <div className="text-sm text-gray-600 flex flex-wrap gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <FaUserCircle /> {item.uploadedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <MdOutlineDateRange /> {item.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 md:mt-0">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUploadHistory;
