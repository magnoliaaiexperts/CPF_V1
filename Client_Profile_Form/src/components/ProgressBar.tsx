import React from 'react';

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Basic Info' },
    { number: 2, label: 'AI Requirements' },
    { number: 3, label: 'Technical' },
    { number: 4, label: 'Project' },
    { number: 5, label: 'Communication' }
  ];

  return (
    <div className="magnolia-progress-container mb-6 md:mb-9">
      <div className="magnolia-progress-bar flex justify-between relative">
        <div className="absolute top-1/2 left-4 right-4 h-0.5 md:h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
        
        {steps.map((step) => (
          <div 
            key={step.number}
            className={`
              magnolia-progress-step w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-semibold 
              text-xs md:text-sm relative z-10 border-2 md:border-3 transition-all duration-300
              ${currentStep === step.number ? 'active bg-indigo-500 text-white border-indigo-500 shadow-md' : ''}
              ${currentStep > step.number ? 'completed bg-emerald-500 text-white border-emerald-500' : 'bg-gray-200 text-gray-500 border-gray-200'}
            `}
          >
            {step.number}
          </div>
        ))}
      </div>
      
      <div className="magnolia-progress-labels flex justify-between px-0.5 mt-2">
        {steps.map((step) => (
          <span 
            key={step.number} 
            className="text-xs md:text-sm text-gray-600 text-center w-1/5"
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;