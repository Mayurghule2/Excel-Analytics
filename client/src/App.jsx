import { useState, useEffect } from 'react'
import SignInForm from './pages/SignInForm'
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import UploadExcel from './components/UploadExcel';
import LandingPage from './components/LandingPage'
import ContactUs
 from './pages/ContactUs'
import AdminDashboard from './pages/AdminDashboard';
function App() {
  const [count, setCount] = useState(0)

   const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, [location]);
  return (
    <> 
      {userRole !== 'admin' && <Navbar   />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/upload-excel" element={<UploadExcel/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
      {console.log("userRole:", userRole)}
       {userRole !== 'admin' && <Footer />}
      
    </>
  )
}

export default App
