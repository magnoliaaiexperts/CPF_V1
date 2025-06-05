import React from 'react';

const ValueBanner: React.FC = () => {
  return (
    <div className="magnolia-value-banner flex flex-col md:flex-row items-start bg-blue-50 text-blue-800 p-4 md:p-5 rounded-lg mb-6 md:mb-8 border-l-4 border-blue-500">
      <div className="magnolia-value-icon text-2xl md:text-3xl mb-2 md:mb-0 md:mr-4 text-blue-500">
        🚀
      </div>
      <div className="magnolia-value-content">
        <h3 className="mb-2 text-lg md:text-xl font-semibold text-blue-700">
          Accelerate Your AI Journey
        </h3>
        <p className="text-sm md:text-base text-blue-800">
          Complete this profile to receive a personalized AI implementation roadmap for your business needs. Average time to complete: 4-5 minutes.
        </p>
      </div>
    </div>
  );
};

export default ValueBanner;