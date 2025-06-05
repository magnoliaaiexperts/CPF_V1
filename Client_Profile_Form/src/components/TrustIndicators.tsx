import React from 'react';

const TrustIndicators: React.FC = () => {
  return (
    <div className="magnolia-trust-indicators flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
      <div className="magnolia-security-badge flex items-center justify-center md:justify-start bg-gray-50 p-3 md:p-4 rounded-md border border-gray-200 w-full md:min-w-[220px]">
        <div className="magnolia-security-icon text-xl text-indigo-500 mr-2.5">🔒</div>
        <span className="text-sm md:text-base text-gray-600">Your information is secure & confidential</span>
      </div>
      
      <div className="magnolia-clients-count flex items-center justify-center md:justify-start bg-gray-50 p-3 md:p-4 rounded-md border border-gray-200 w-full md:min-w-[220px]">
        <div className="magnolia-counter-icon text-xl text-indigo-500 mr-2.5">👥</div>
        <span className="text-sm md:text-base text-gray-600">
          Trusted by <strong className="text-gray-800 font-bold">500+</strong> businesses
        </span>
      </div>
    </div>
  );
};

export default TrustIndicators;