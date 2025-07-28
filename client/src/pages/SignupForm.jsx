import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from '../services/api';
const SignupForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    city: "",
    country: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await registerUser(formData);
      console.log("✅ FormData sent to backend:", formData);
      console.log("✅ Backend response:", response);

      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        city: "",
        country: "",
        state: "",
        pincode: "",
      });

      if (response.status === 201) {
        alert("Signup successful! go to Signin...");
        navigate("/signin");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      console.error("❌ Error details:", err.response?.data || err.message);

      if (
        err.response?.status === 400 &&
        err.response.data === "User already exists"
      ) {
        setError("This email is already registered. Try signing in.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[15px] bg-white overflow-y-auto max-h-full p-[10px]"
    >
      <h3 className="text-xl font-semibold mb-4">Signup</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l text-gray-500">
              @
            </span>
            <input
              type="text"
              name="username"
              className="w-full border border-gray-300 px-3 py-2 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            name="country"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Choose...</option>
            <option value="India">India</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State <span className="text-red-500">*</span>
          </label>
          <select
            name="state"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Choose...</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="pincode"
            inputMode="numeric" 
            pattern="[0-9]*" 
            maxLength={6} 
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.pincode}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setFormData({ ...formData, pincode: value });
              }
            }}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-[#030d46] to-[#06eaea] text-white py-2 px-4  hover:opacity-50 transition duration-300 rounded-2xl"
      >
        Sign Up
      </button>
      {error && <div className="text-red-600 font-medium mt-2">{error}</div>}
    </form>
  );
};

export default SignupForm;