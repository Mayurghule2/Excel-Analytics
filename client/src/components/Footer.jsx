import React, { useState } from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import { subscribeEmail } from "../services/api";
export default function Footer() {
  const [email, setEmail] = useState("");
  const handleSubscribe = async () => {
    try {
      await subscribeEmail(email);
      alert("Subscribed successfully");
      setEmail("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <footer className="bg-[#020a2e] text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 border-b border-blue-800">

        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            EXCEL ANALYTICS
          </h1>
          <p className="text-sm text-blue-300 mt-3 leading-relaxed">
            Transforming raw Excel data into clear, actionable insights for smarter decisions.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Company</h2>
          <ul className="space-y-2 text-sm text-blue-300">
            <li className="hover:text-white transition cursor-pointer">About</li>
            <li className="hover:text-white transition cursor-pointer">Careers</li>
            <li className="hover:text-white transition cursor-pointer">Blog</li>
            <li className="hover:text-white transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Services</h2>
          <ul className="space-y-2 text-sm text-blue-300">
            <li className="hover:text-white transition cursor-pointer">Data Cleaning</li>
            <li className="hover:text-white transition cursor-pointer">Dashboards</li>
            <li className="hover:text-white transition cursor-pointer">Automation</li>
            <li className="hover:text-white transition cursor-pointer">Consulting</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Stay Updated</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="px-3 py-2 rounded-md bg-[#0a144f] text-sm outline-none border border-blue-700 focus:border-blue-400 w-full"
            />
            <button 
              onClick={handleSubscribe}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-sm transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          {[FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map(
            (Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 border border-blue-700 rounded-full hover:bg-blue-600 hover:border-blue-600 transition duration-300"
              >
                <Icon />
              </a>
            )
          )}
        </div>

        {/* Copyright */}
        <p className="text-sm text-blue-300 text-center md:text-right">
          © {new Date().getFullYear()} Excel Analytics. All rights reserved.
        </p>
      </div>
    </footer>
  );
}