import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp, resetPassword } from "../services/api";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPwd: "",
    confirmPwd: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      await sendOtp(formData.email);
      console.log("OTP sent to:", formData.email);
      setOtpSent(true);
      alert("OTP sent to your email successfully!");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp(formData.email, otpInput);
      console.log(response.data.message);
      setOtpVerified(true);
      alert("OTP Verified!");
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP. Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify OTP before submitting.");
      return;
    }

    if (formData.newPwd.length < 8 || formData.confirmPwd.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (formData.newPwd !== formData.confirmPwd) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword(formData.email, formData.newPwd);
      console.log("Password reset response:", response.data);
      alert("Password has been reset successfully!");
      navigate("/sign-in");
    } catch (error) {
      console.error("Password reset failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex justify-center items-center p-8">
      <div className="bg-white border border-black rounded-xl p-6 w-full max-w-md shadow-lg">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold">Set Password</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registered Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />

        
          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOtp}
              className="mt-6 w-full bg-gradient-to-r from-[#030d46] to-[#06eaea] text-white py-2 px-4 hover:opacity-50 transition duration-300 rounded-2xl"
            >
              Send OTP
            </button>
          ) : (
            <p className="text-green-600 text-sm">OTP sent to your email.</p>
          )}

          {otpSent && !otpVerified && (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="otp"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="mt-6 w-full bg-gradient-to-r from-[#030d46] to-[#06eaea] text-white py-2 px-4 hover:opacity-50 transition duration-300 rounded-2xl"
              >
                Verify OTP
              </button>
            </>
          )}

    
          {otpVerified && (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="newPwd"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.newPwd}
                onChange={handleChange}
                minLength={8}
                required
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPwd"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.confirmPwd}
                onChange={handleChange}
                minLength={8}
                required
              />

              <button
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-[#030d46] to-[#06eaea] text-white py-2 px-4 hover:opacity-50 transition duration-300 rounded-2xl"
              >
                Set Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
