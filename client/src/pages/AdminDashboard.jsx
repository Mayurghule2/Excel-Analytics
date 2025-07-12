import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/Topbar';
import StatsCards from '../components/StatsCards';
import ChartsSection from '../components/ChartsSection';
import UploadProjects from '../components/UploadProjects';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <TopBar />
        <StatsCards />
        <ChartsSection />
        <UploadProjects />
      </main>
    </div>
  );
}