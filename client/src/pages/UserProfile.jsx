import React, { useEffect, useState } from "react";
import { getUserProfile, putUserProfile } from "../services/api";
import { jwtDecode } from "jwt-decode";
import Select from 'react-select';
import { Country, State } from 'country-state-city';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


const countries = Country.getAllCountries().map((country) => ({
  value: country.isoCode,
  label: country.name,
}));


const UserProfile = () => {
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded?.id;
  }
  if (!userId) return;
  const [user, setUser] = useState(null);
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    fetchUser();
  }, [userId]);


  const fetchUser = async () => {
    try {
      const response = await getUserProfile(userId);
      setUser(response.data);
      console.log(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption.label, state: '' });

    const countryStates = State.getStatesOfCountry(selectedOption.value).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));
    setStates(countryStates);
  };

  const handleStateChange = (selectedOption) => {
    setFormData({ ...formData, state: selectedOption.label });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await putUserProfile(userId, formData);
      alert("User updated successfully");
      fetchUser();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update user.");
    }
  };

  if (!user) return <p className="p-4">Loading user...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-lg mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaUser className="text-blue-600" />
        User Profile
      </h2>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["firstName", "lastName", "username", "email", "city", "pincode"].map((field) => (
          <div key={field}>
            <label className="block font-semibold text-gray-800 capitalize mb-1">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-800 font-semibold mb-1">Country</label>
          <Select
            options={countries}
            onChange={handleCountryChange}
            placeholder="Select Country"
          />
        </div>


        <div>
          <label className="block text-gray-800 font-semibold mb-1">State</label>
          <Select
            options={states}
            onChange={handleStateChange}
            placeholder="Select State"
            isDisabled={states.length === 0}
          />
        </div>

        <div className="flex items-center gap-4 mt-5 ">

          <div className="col-span-full">
            <button
              onClick={() => navigate("/user-dashboard")}
              className="text-[#030d46] border border-[#030d46] px-6 py-2 rounded hover:bg-blue-200 font-semibold"
            >
              Back to Dashboard
            </button>
          </div>
          <div className="col-span-full">
            <button
              type="submit"
              className="bg-[#030d46] text-white font-semibold px-6 py-2 rounded hover:opacity-80 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
