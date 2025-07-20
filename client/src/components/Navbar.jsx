import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import Avatar from '../assets/images/avatar.jpg'; 
const Navbar = ({ onFileUpload, onNavigate, darkMode, toggleDarkMode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('User'); 
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateLoginState = () => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');
      setIsLoggedIn(!!token && role === 'user');
      setUserRole(role);
      setUserName(localStorage.getItem('userName') || 'User');
    };

    updateLoginState();
    window.addEventListener('authChanged', updateLoginState);
    return () => window.removeEventListener('authChanged', updateLoginState);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.dispatchEvent(new Event('authChanged'));
    setShowDropdown(false);
    alert('✅ You have been logged out successfully.');
    navigate('/sign-in');
  };

  return (
    <header className={`w-full px-4 py-2 shadow-2xl ${isLoggedIn
        ? 'bg-gradient-to-r from-[#030d46] to-[#06eaea] text-white'
        : 'bg-white text-black'
      }`}>
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/">
          <div className="flex gap-2 items-center">
            <img className="w-16 h-16" src={Logo} alt="logo" />
            <h1 className={`text-2xl font-bold ${isLoggedIn ? 'text-blue-300' : 'text-blue-700'
              }`}>
              EXCEL
            </h1>
            <h1 className="text-2xl font-bold text-[#06eaea]">ANALYTICS</h1>
          </div>
        </Link>

        
        <div className="flex items-center gap-4 
        ">
    
          {!isLoggedIn && (
            <>
              <Link to="/" className="hidden md:block hover:text-blue-600 font-semibold ">Home</Link>
              <a href="#about-us" className="hidden md:block hover:text-blue-600 font-semibold" onClick={(e)=>{e.preventDefault(); document.getElementById("about-us").scrollIntoView({behavior:"smooth"});}}>About Us</a>
              <a href="#services" className="hidden md:block hover:text-blue-600 font-semibold " onClick={(e)=>{e.preventDefault(); document.getElementById("services").scrollIntoView({behavior:"smooth"});}}>Services</a>
              <Link to="/contact" className="hidden md:block hover:text-blue-600 font-semibold">Contact Us</Link>
              <Link to="/sign-in">
                <button className="bg-gradient-to-r from-[#030d46] to-[#06eaea] px-5 py-2 text-white rounded-full font-semibold hover:opacity-70">
                  Sign In
                </button>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <button onClick={() => navigate("/upload-excel")} className="group relative font-semibold text-white "> Upload Excel
                <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-[#00ffff] transition-all duration-500 group-hover:w-full"></span>
              </button>
              <button onClick={() => navigate('/dashboard')} className="group relative font-semibold text-white ">Dashboard
                <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-[#00ffff] transition-all duration-500 group-hover:w-full"></span>
              </button>
              <button onClick={() => navigate('/analytics')} className="group relative font-semibold text-white ">Charts
                <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-[#00ffff] transition-all duration-500 group-hover:w-full"></span>
              </button>
              <button onClick={() => navigate('/history')} className="group relative font-semibold text-white ">Upload History
                <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-[#00ffff] transition-all duration-500 group-hover:w-full"></span>
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 group relative font-semibold text-white "
                >
                  👤 ▾
                  <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-[#00ffff] transition-all duration-500 group-hover:w-full"></span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-52 bg-white text-black rounded shadow-lg z-50 dark:bg-gray-900 dark:text-white overflow-hidden">
                    <div className="flex flex-col items-center border-b p-4">
                      <img src={Avatar} alt="avatar" className="w-16 h-16 rounded-full mb-2 object-cover" />

                      <span className="text-sm font-semibold">{userName}</span>
                    </div>
                    <button onClick={() => { onNavigate('/profile'); setShowDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Profile</button>
                    <button onClick={() => alert('Settings clicked')} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Settings</button>
                    <button onClick={() => alert('Account clicked')} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400">
                      Account <span className="text-xs font-bold ml-1">NEW!</span>
                    </button>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400">Log Out</button>
                  </div>
                )}
              </div>
            </>
          )}


        </div>
      </div>
    </header>
  );
};

export default Navbar;
