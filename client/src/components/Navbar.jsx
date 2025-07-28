import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import Avatar from '../assets/images/avatar.jpg';
import { Menu, X } from 'lucide-react';
import { FaUserLarge } from "react-icons/fa6";

const Navbar = ({ onNavigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [fullName, setFullName] = useState('User');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const updateLoginState = () => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');
      const fullName = `${localStorage.getItem('firstName') || ''} ${localStorage.getItem('lastName') || ''}`.trim();

      setIsLoggedIn(!!token && role === 'user');
      setUserRole(role);
      setFullName(fullName || 'User');
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
        {/* Logo */}
        <Link to="/">
          <div className="flex gap-2 items-center">
            <img className="w-14 h-14" src={Logo} alt="logo" />
            <h1 className={`text-2xl font-bold ${isLoggedIn ? 'text-blue-300' : 'text-blue-700'}`}>EXCEL</h1>
            <h1 className="text-2xl font-bold text-[#06eaea]">ANALYTICS</h1>
          </div>
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav Links */}
        <nav className={`flex-col md:flex-row md:flex items-center gap-6 absolute md:static bg-[#030d46] md:bg-transparent shadow-md md:shadow-none w-full md:w-auto top-16 left-0 z-50 p-6 md:p-0 transition-all duration-300 ease-in-out ${showMobileMenu ? 'flex' : 'hidden'}`}>
          {!isLoggedIn && (
            <>
              <Link to="/" className="hover:text-blue-600 font-semibold">Home</Link>
              <a href="#about-us" className="hover:text-blue-600 font-semibold" onClick={(e) => { e.preventDefault(); document.getElementById("about-us").scrollIntoView({ behavior: "smooth" }); }}>About Us</a>
              <a href="#services" className="hover:text-blue-600 font-semibold" onClick={(e) => { e.preventDefault(); document.getElementById("services").scrollIntoView({ behavior: "smooth" }); }}>Services</a>
              <Link to="/contact" className="hover:text-blue-600 font-semibold">Contact Us</Link>
              <Link to="/sign-in">
                <button className="bg-gradient-to-r from-[#030d46] to-[#06eaea] px-5 py-2 text-white rounded-full font-semibold hover:opacity-70">
                  Sign In
                </button>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <button onClick={() => navigate("/upload-excel")} className="font-semibold  group relative ">Upload Excel
                 <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-[#00ffff] transition-all duration-500 group-hover:w-full"></span>
              </button>
              <button onClick={() => navigate("/user-dashboard")} className="font-semibold group relative">Dashboard
                <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-[#00ffff] transition-all duration-500 group-hover:w-full"></span>
              </button>
              {/* <button onClick={() => navigate("/analytics")} className="font-semibold group relative">Charts
                <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-[#00ffff] transition-all duration-500 group-hover:w-full"></span>
              </button> */}
              <button onClick={() => navigate("/history")} className="font-semibold group relative">Upload History
                <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-[#00ffff] transition-all duration-500 group-hover:w-full"></span>
              </button>

              <div className="relative group" ref={dropdownRef}>
                <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center font-semibold gap-1 ">
                  <FaUserLarge className='w-4 h-4 md:w-5 md:h-5' /> ▾
                  <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-[#00ffff] transition-all duration-500 group-hover:w-full"></span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-52 bg-white text-black rounded shadow-lg z-50">
                    <div className="flex flex-col items-center border-b p-4">
                      <img src={Avatar} alt="avatar" className="w-16 h-16 rounded-full mb-2 object-cover" />
                      <span className="text-sm font-semibold">{fullName}</span>
                    </div>
                    <button onClick={() => { navigate('/profile'); setShowDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
                    
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">Log Out</button>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
