import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

import { FaSignOutAlt} from 'react-icons/fa';
import { MdDashboardCustomize } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { ImUpload } from "react-icons/im";
import { LuMessagesSquare } from "react-icons/lu";
import { RiAdminFill } from "react-icons/ri";
const Sidebar = () => {
   const navigate = useNavigate();

  const firstName = localStorage.getItem('firstName') || 'User'; 
  const lastName = localStorage.getItem('lastName') || 'User'; 
  const fullName = firstName +" "+ lastName;
  const email = localStorage.getItem('userEmail') || 'user@example.com';
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');

    window.dispatchEvent(new Event('authChanged'));

    alert("Logout Successful!!!")
    navigate('/sign-in');
  };

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg flex flex-col justify-between">
     
      <div>
        <div className="bg-gradient-to-r from-[#030d46] to-[#06eaea] text-white p-4 mb-6 pt-8 pb-8">
          <div className="flex items-center gap-2">
            <div className='p-1 bg-white rounded-full'>

            <RiAdminFill className="w-12 h-12 rounded-full bg-gradient-to-r from-[#030d46] to-[#06eaea] p-2"/>
            </div>
            <div>
              <div className="font-semibold">{fullName}</div>
              <div className="text-sm text-gray-100">{email}</div>
            </div>
          </div>
        </div>

        <div className="p-4 ">
          <div className="text-gray-500 text-xs mb-2 uppercase">Main Navigation</div>
          <ul className="space-y-2 text-sm text-gray-700">

            <Link to="/admin/dashboard">
            <div className='flex items-center gap-3 px-2 py-2  hover:bg-gray-100 hover:rounded'>
              <p className='text-lg'> <MdDashboardCustomize /></p>
              <p className='text-base'> Dashboard</p>
            </div>
            </Link>
            <Link to="/admin/users">
            <div className='flex items-center gap-3 px-2 py-2  hover:bg-gray-100 hover:rounded'            >
              <p className='text-lg'> <PiUserListFill /></p>
              <p className='text-base'> User Details</p>
            </div>
            </Link>
            <Link to="/admin/upload-history">
            <div className='flex items-center gap-3 px-2 py-2  hover:bg-gray-100 hover:rounded'>
              <p className='text-lg'> <ImUpload /></p>
              <p className='text-base'>Total Uploads</p>
            </div>
            </Link>
            <Link to="/admin/messages">
            <div className='flex items-center gap-3 px-2 py-2  hover:bg-gray-100 hover:rounded'>
              <p className='text-lg'> <LuMessagesSquare /></p>
              <p className='text-base'> Messages </p>
            </div>
            </Link>
          </ul>

          
        </div>
      </div>

      <div className="p-4 border-t hover:bg-gray-100 rounded hover:text-red-800 ">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 text-base font-semibold "
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
