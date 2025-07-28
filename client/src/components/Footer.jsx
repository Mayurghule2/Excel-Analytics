import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-[#030d46] text-white pt-10 pb-6 px-14">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 border-b border-blue-700 pb-8">
        <div>
          <h1 className="text-2xl font-bold">EXCEL ANALYTICS</h1>
          <p className="text-sm text-blue-300 mt-1">Transforming Excel Data Into Actionable Insights</p>
        </div>

        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-md">
          
          <div className="space-y-1">
            <a href="/charts" className="block font-semibold hover:text-blue-300">Charts</a>
            <a href="/filters" className="block hover:text-blue-300">Filters</a>
          </div>
          <div className="space-y-1">
            <a href="/summary" className="block font-semibold hover:text-blue-300">Summary</a>
            <a href="/insights" className="block hover:text-blue-300">AI Insights</a>
            <a href="/reports" className="block hover:text-blue-300">Reports</a>
          </div>
          <div className="space-y-1">
            <a href="/about" className="block font-semibold hover:text-blue-300">About Project</a>
            <a href="/contact" className="block hover:text-blue-300">Contact Us</a>
            <a href="/team" className="block hover:text-blue-300">Meet the Team</a>
          </div>
          <div className="space-y-1">
            <a href="/docs" className="block font-semibold hover:text-blue-300">Documentation</a>
            <a href="/api" className="block hover:text-blue-300">API Reference</a>
          </div>
        </div> */}
      </div>

      <div className="container mx-auto mt-6 flex flex-col items-center gap-4">
        <div className="flex space-x-4 text-white text-lg ">
          <a href="#" className="border p-2 rounded-full"><FaFacebookF className="hover:text-blue-300" /></a>
          <a href="#" className="border p-2 rounded-full"><FaXTwitter className="hover:text-blue-300" /></a>
          <a href="#" className="border p-2 rounded-full"><FaInstagram className="hover:text-blue-300" /></a>
          <a href="#" className="border p-2 rounded-full"><FaLinkedinIn className="hover:text-blue-300" /></a>
          <a href="#" className="border p-2 rounded-full">< FaYoutube  className="hover:text-blue-300" /></a>
        </div>
        <p className="text-sm lg:text-lg text-blue-300">© {new Date().getFullYear()} Excel Analytics. All rights reserved.</p>
      </div>
    </footer>
  );
}