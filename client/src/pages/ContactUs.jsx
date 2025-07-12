import React, { useState } from "react";
import { sendContactMessage } from '../services/api';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await sendContactMessage(formData);
    setStatusMessage("✅ Message sent successfully!");
    alert("✅ Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  } catch (err) {
    console.error("Contact error:", err.message);
    setStatusMessage("❌ " + err.message);
  }
};

  return (
    <div className="mb-8 mt-8">
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#030d46] to-[#06eaea] text-white flex-1 p-10">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="mt-4">We’re here to assist you with data insights, Excel automation, and analytics solutions.</p>
          <div className="mt-6 space-y-4">
            <div>
              <strong>Address:</strong><br />
              Excel Analytics HQ, Tech Street 22, Gurugram, Haryana - 122001
            </div>
            <div>
              <strong>Email:</strong><br />
              hello@excelanalytics.in
            </div>
            <div>
              <strong>Phone:</strong><br />
              +91 90123 45678
            </div>
            <div>
              <strong>Support Hours:</strong><br />
              Mon - Fri: 9:00 AM - 6:00 PM IST
            </div>
          </div>
        </div>

        <div className="flex-1 p-10">
          <h2 className="text-2xl font-semibold text-black mb-5">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06eaea]"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06eaea]"
            />
            <input
              name="subject"
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06eaea]"
            />
            <textarea
              name="message"
              placeholder="Tell us about your Excel or analytics query..."
              value={formData.message}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#06eaea]"
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#030d46] to-[#06eaea] hover:from-[#021030] hover:to-[#04caca] text-white py-3 px-6 rounded-lg font-medium transition duration-300"
            >
              Send Message
            </button>
            {statusMessage && (
              <p className="text-sm mt-2 text-green-600">{statusMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
