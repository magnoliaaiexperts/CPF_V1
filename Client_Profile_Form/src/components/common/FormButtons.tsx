import React from 'react';

interface FormButtonsProps {
  showPrevious: boolean;
  onPrevious?: () => void;
  onSave: () => void;
  onNext: () => void;
}

const FormButtons: React.FC<FormButtonsProps> = ({
  showPrevious,
  onPrevious,
  onSave,
  onNext
}) => {
  return (
    <div className="magnolia-buttons flex flex-col md:flex-row md:justify-between gap-3 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
      {showPrevious && (
        <button 
          type="button" 
          className="magnolia-btn-prev order-2 md:order-1 w-full md:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 px-5 rounded-md font-semibold text-sm md:text-base transition duration-300 ease-in-out transform hover:-translate-y-0.5 border border-gray-200"
          onClick={onPrevious}
        >
          Previous
        </button>
      )}
      
      <button 
        type="button" 
        className="magnolia-btn-save order-3 md:order-2 w-full md:w-auto bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 px-5 rounded-md font-semibold text-sm md:text-base transition duration-300 ease-in-out transform hover:-translate-y-0.5 border border-gray-200"
        onClick={onSave}
      >
        Save Progress
      </button>
      
      <button 
        type="button" 
        className="magnolia-btn-next order-1 md:order-3 w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-5 rounded-md font-semibold text-sm md:text-base transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-md"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default FormButtons;