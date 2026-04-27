import React from 'react';

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex-1 min-w-[200px]">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-blue-700 mt-2 flex items-center gap-2">
        {icon}
        {value}
      </div>
    </div>
  );
};

export default DashboardCard;
