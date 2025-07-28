import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getUserDashboardData } from '../services/api';
import { format } from 'date-fns';
import { FiFolder, FiCheckCircle, FiClock, FiPieChart, FiTrendingUp,FiClock as FiRecent,FiXCircle} from 'react-icons/fi';
const COLORS = ['#00C49F', '#FFBB28', '#FF4C61'];

const UserDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getUserDashboardData();
        setDashboard(res.data);
        console.log("Dashboard data:", res.data);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading Dashboard...</p>;

  return (
    <div className="p-6 md:p-10 bg-gradient-to-b from-gray-50 via-white to-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-gray-800 flex items-center gap-3">
  <FiPieChart className="text-blue-600" />
  My Upload Dashboard
</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
  {[
    { label: 'Total Uploads', value: dashboard.totalUploads, color: 'text-blue-600', icon: <FiFolder className="text-blue-500 text-3xl " />, bg: 'bg-gradient-to-r 	from-pink-400 to-rose-500', },
    { label: 'Processed Files', value: dashboard.processed, color: 'text-green-600', icon: <FiCheckCircle className="text-green-500 text-3xl" />,
    bg: 'bg-gradient-to-r 	from-green-500 to-lime-400', },
    { label: 'Pending Files', value: dashboard.pending, color: 'text-yellow-600', icon: <FiClock className="text-yellow-400 text-3xl" />,bg: 'bg-gradient-to-r  from-cyan to-blue-600', },
    { label: 'Failed Files', value: dashboard.failed, color: 'text-yellow-600', icon: <FiXCircle className="text-red-600 text-3xl" />,bg: 'bg-gradient-to-r from-red-600 to-black', },
  ].map((item, idx) => (
    <div key={idx} className={` p-5 shadow-md text-white ${item.bg} transition transform hover:scale-[1.02]`}>
      <h4 className="text-md font-semibold  mb-2">{item.label}</h4>
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold ">{item.value}</div>
        {item.icon}
      </div>
    </div>
  ))}
</div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
  <FiPieChart className="text-purple-600" />
  File Status Distribution
</h4>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                dataKey="value"
                data={[
                  { name: 'Processed', value: dashboard.processed },
                  { name: 'Pending', value: dashboard.pending },
                  { name: 'Failed', value: dashboard.failed },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                label
                fill="#8884d8"
                stroke="#ffffff"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
  <FiTrendingUp className="text-green-600" />
  Upload Trend (by Date)
</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dashboard.uploadTrend}>
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff9a00" stopOpacity={0.9} />
    <stop offset="50%" stopColor="#ff165d" stopOpacity={0.75} />
    <stop offset="100%" stopColor="#ff3c38" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-12 bg-white p-6 rounded-2xl shadow-md">
       <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
  <FiRecent className="text-yellow-600" />
  Recent Uploads
</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="text-left bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
                <th className="p-3">File Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Rows</th>
                <th className="p-3">Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.recentUploads.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">No recent uploads</td>
                </tr>
              ) : (
                dashboard.recentUploads.map((upload, index) => (
                  <tr
                    key={index}
                    className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}
                  >
                    <td className="p-3 font-medium text-gray-700">{upload.file_name}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold capitalize ${
                          upload.status === 'processed'
                            ? 'bg-green-100 text-green-600'
                            : upload.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {upload.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700">{upload.row_count}</td>
                    <td className="p-3 text-gray-500">
                      {format(new Date(upload.upload_date), 'dd MMM yyyy, hh:mm a')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
