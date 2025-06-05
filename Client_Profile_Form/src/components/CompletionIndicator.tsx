import React, { useMemo } from 'react';

interface CompletionIndicatorProps {
  currentStep: number;
}

const CompletionIndicator: React.FC<CompletionIndicatorProps> = ({ currentStep }) => {
  // Calculate completion percentage based on current step
  const completionPercentage = useMemo(() => {
    const totalSteps = 5;
    return currentStep > 1 ? Math.floor(((currentStep - 1) / totalSteps) * 100) : 0;
  }, [currentStep]);

  return (
    <div className="magnolia-completion-indicator mb-6 md:mb-9">
      <div className="magnolia-progress-wrapper flex justify-between items-center mb-2">
        <div className="magnolia-progress-text font-medium text-sm md:text-base text-gray-600">
          Form Completion:
        </div>
        <div className="magnolia-progress-percentage font-semibold text-sm md:text-base text-indigo-500">
          <span id="completion-percentage">{completionPercentage}</span>%
        </div>
      </div>
      
      <div className="magnolia-progress-outer w-full h-2 md:h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="magnolia-progress-inner h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CompletionIndicator;