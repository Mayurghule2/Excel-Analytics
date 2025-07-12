import React from 'react';

const projects = [
  { title: 'Large Dataset Uploads', percent: 25, color: 'bg-red-500' },
  { title: 'User Reports Generated', percent: 45, color: 'bg-yellow-500' },
  { title: 'Processed Files', percent: 80, color: 'bg-blue-500' },
  { title: 'Pending Uploads', percent: 10, color: 'bg-green-500' },
];

export default function UploadProjects() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-md shadow">
        <div className="font-semibold text-blue-600 mb-2">Upload Statistics</div>
        {projects.map((project, idx) => (
          <div key={idx} className="mb-3">
            <div className="text-sm font-medium text-gray-700">
              {project.title}
              <span className="float-right">{project.percent}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className={`${project.color} h-2 rounded-full`}
                style={{ width: `${project.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded-md shadow">
        <div className="font-semibold text-blue-600 mb-2">Illustration</div>
        <div className="h-64 flex items-center justify-center text-gray-400">
          📊 [Excel Data Chart Placeholder]
        </div>
      </div>
    </div>
  );
}
