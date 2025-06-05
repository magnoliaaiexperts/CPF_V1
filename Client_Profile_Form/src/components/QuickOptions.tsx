import React from 'react';

interface QuickOptionsProps {
  onDemoClick: () => void;
}

const QuickOptions: React.FC<QuickOptionsProps> = ({ onDemoClick }) => {
  return (
    <div className="magnolia-quick-options flex flex-col md:flex-row items-center md:justify-between bg-gray-100 p-4 md:p-5 rounded-lg mb-6 md:mb-8 text-center md:text-left">
      <div className="magnolia-quick-option-text mb-3 md:mb-0">
        <p className="text-sm md:text-base font-medium text-gray-600">
          Not ready to complete the full profile?
        </p>
      </div>
      <button 
        type="button" 
        className="magnolia-btn-demo bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 md:px-5 rounded-md font-semibold text-sm md:text-base transition duration-300 ease-in-out transform hover:-translate-y-0.5 w-full md:w-auto max-w-[280px]"
        onClick={onDemoClick}
      >
        Schedule a 15-Min Demo
      </button>
    </div>
  );
};

export default QuickOptions;