import React, { useState } from 'react';

const Profile = () => {
  const [username, setUsername] = useState('mariyam');
  const [email, setEmail] = useState('mariyam@gmail.com');
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleUpdate = () => {
    alert('Profile updated!');
 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row items-center gap-10 p-8 bg-white dark:bg-gray-800 rounded shadow-md w-full max-w-4xl">
        
        <div>
          <img
            src={profileImage || 'https://www.sapphirewebsolutions.com/wp-content/uploads/2019/09/Web-Development-Trends.jpg'}
            alt="Profile"
            className="w-48 h-48 object-cover rounded-full border-4 border-blue-500 shadow-md"
          />
        </div>
     
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">User Profile</h2>
          
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
