import React from 'react';
import DashboardNavbar from '../Components/DashboardNavbar';

const Report = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-8xl mb-4">📊</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Reports & Analytics</h1>
          <p className="text-gray-600 text-lg">Generate comprehensive reports and view detailed analytics.</p>
        </div>
      </main>
    </div>
  );
};

export default Report;