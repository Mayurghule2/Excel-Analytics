import React, { useEffect, useState } from 'react';
import { fetchAllUsers, fetchUploadHistory } from '../services/api';
import { Loader2,LoaderCircle, Mail, MapPin, Globe, Calendar, BadgeCheck,FileUp  } from 'lucide-react';
import { FaCircleUser } from "react-icons/fa6";
const UserUploadSummary = () => {
  const [users, setUsers] = useState([]);
  const [uploadCounts, setUploadCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const [usersRes, uploadsRes] = await Promise.all([
          fetchAllUsers(),
          fetchUploadHistory(),
        ]);

        const usersData = usersRes.data;
        const uploads = uploadsRes.data;


        const counts = {};
        uploads.forEach(upload => {
          const userId = upload.user_id._id;
          counts[userId] = (counts[userId] || 0) + 1;
        });

        setUsers(usersData);
        setUploadCounts(counts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user upload data:', error);
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6"> User Details Summary</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div
              key={user._id}
              className="bg-white border border-gray-200  shadow-md p-6 hover:scale-105 transition"
            >
              <div className='flex items-center gap-4 mb-4'>
                <FaCircleUser className='w-8 h-8 text-blue-600' />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {user?.fullName || "Unnamed User"}
              </h3>
              </div>
              <div className="flex items-center ml-2">
              <Mail className="w-4 h-4 mr-2 text-gray-500" />
              <p className="text-sm text-gray-500 mb-1">{user.email}</p>
              </div>
              <div className="flex items-center ml-2">
               <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <p className="text-sm text-gray-500 mb-1">
                {user?.city && user?.state && user?.country && user?.pincode
  ? `${user.city}, ${user.state}, ${user.country} - ${user.pincode}`
  : "Address Not Available"}

              </p>
              </div>
              <div className="flex items-center ml-2">
              <FileUp className="w-4 h-4 mr-2 text-blue-600"/>
              <p className=" text-blue-600 text-sm mb-1 font-medium">
                Total Uploads: {uploadCounts[user._id] || 0}
              </p>
              </div>
              <div className="flex items-center ml-2">
 <BadgeCheck className="w-4 h-4 mr-2 text-gray-500" />
              <p className="text-sm text-gray-600 mt-1  font-medium">
                Role: {user.role.toUpperCase()}
              </p>
              </div>
              <div className="flex items-center ml-2">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <p className="text-sm text-gray-500 mb-1">Joined: {new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserUploadSummary;
